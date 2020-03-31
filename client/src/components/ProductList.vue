<template>
    <section class="product-list-container">
        <h3 class="product-list-title">
            {{ typeof title !== 'undefined' ? title : 'Nie wybrano listy' }}
            <div class="product-title-icons">
                <i class="icon-sort-alt-down" @click="sortSelect = !sortSelect" title="Sortowanie"></i>
                <transition name="slide">
                    <select class="sort-type" v-if="sortSelect" v-model="sortType" @change="changeSortType">
                        <option v-for="type in sortTypes" :key="type.name" :value="type.value">{{ type.name }}</option>
                    </select>
                </transition>
                <i class="icon-plus" title="Dodaj produkt" v-if="add" @click="$emit('addProduct')"></i>
            </div>
        </h3>
        <ul class="product-list">
            <li v-for="product in orderedProducts" :key="product.name" @click="product.bought = !product.bought; $emit('selectProduct', product._id)" :class="{checked: product.bought}" @contextmenu="$refs.productContextMenu.open($event, product)">
                <div class="checkbox"></div>
                <div class="product-content">
                    {{ product.name}}{{ product.price ? ` (${product.price} zł)` : '' }}
                </div>
                <div class="product-icons">
                    <i class="icon-pencil" @click.stop="$emit('modifyProduct', product._id)"></i>
                    <i class="icon-cancel" @click.stop="$emit('removeProduct', product._id)"></i>
                </div>
            </li>
        </ul>
        <h4 class="product-list-title" v-if="products.length">
            {{ summary }}
        </h4>
        <h4 class="product-list-title" v-else>
            Brak produktów
        </h4>
        <vue-context ref="productContextMenu">
            <template slot-scope="product" v-if="product.data">
                <li>
                    <a :href="product.data.firstURL" target="_blank" v-if="product.data.firstURL !== ''">{{ 'Przejdź do '+product.data.firstURL.match(/^https?:\/\/(www\.)?([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i)[2] }}</a>
                </li>
                <li>
                    <a :href="product.data.secondURL" target="_blank" v-if="product.data.secondURL !== ''">{{ 'Przejdź do '+product.data.secondURL.match(/^https?:\/\/(www\.)?([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i)[2] }}</a>
                </li>
                <li>
                    <a href="#" @click.prevent="$emit('modifyProduct', product.data._id)">Edytuj</a>
                </li>
                <li>
                    <a href="#" @click.prevent="$emit('removeProduct', product.data._id)">Usuń</a>
                </li>
            </template>
        </vue-context>
    </section>
</template>

<script>
import VueContext from 'vue-context'
import orderBy from 'lodash.orderby'
import axios from 'axios'

export default {
    name: 'ProductList',
    props: ['title', 'products', 'add'],
    components: {
        VueContext
    },
    data() {
        return {
            sortSelect: false,
            sortType: 'name asc',
            sortTypes: [
                {
                    value: 'name asc',
                    name: 'Nazwa'
                },
                {
                    value: 'price asc',
                    name: 'Cena (rosnąco)'
                },
                {
                    value: 'price desc',
                    name: 'Cena (malejąco)'
                },
                {
                    value: 'priority desc',
                    name: 'Priorytet'
                },
                {
                    value: 'bought asc',
                    name: 'Stan'
                }
            ]
        }
    },
    created() {
        axios.get(`${process.env.VUE_APP_API_URL}/user`)
        .then(response => {
            this.sortType = response.data.sortType;
        })
        .catch(err => {
            console.error(err);
        })
    },
    methods: {
        text(number) {
            let text = 'produktów';
            if([2, 3, 4].includes(number % 10)) {
                text = 'produkty';
            } else if(number % 10 === 1) {
                text = 'produkt';
            }
            return text;
        },
        changeSortType() {
            axios.patch(`${process.env.VUE_APP_API_URL}/user`, {sortType: this.sortType})
            .catch(err => {
                console.error(err);
            })
        }
    },
    computed: {
        summary: function() {
            const sum = this.products.reduce((t, x) => t += x.price, 0).toFixed(2);
            const count = this.products.length;
            const sumCond = this.products.filter(x => x.bought).reduce((t, x) => t += x.price, 0).toFixed(2);
            const countCond = this.products.filter(x => x.bought).length;
            return `${count} ${this.text(count)} (${sum} zł) | Kupionych: ${countCond} ${this.text(countCond)} (${sumCond} zł)`;
        },
        orderedProducts: function() {
            return orderBy(this.products, [this.sortType.split(' ')[0], 'name'], this.sortType.split(' ')[1]);
        }
    }
}
</script>

<style>
    .product-list-container {
        background-color: #f9f9f9;
        border-radius: 5px;
        -webkit-box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.063);
        -moz-box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.063);
        box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.063);
    }
    .product-list {
        list-style: none;
        margin: 0;
        padding: 0;
        overflow: auto;
        max-height: calc(100vh - 114px);
    }
    .product-list::-webkit-scrollbar-thumb {
        background-color: var(--main-bg-hover-color);
        border-radius: 10px;
    }
    .product-list > li {
        border-top: 2px solid #eee;
        cursor: default;
        user-select: none;
        padding: 10px 15px;
        display: flex;
        align-items: center;
    }
    .product-list > li:hover {
        background-color: #f2f6f2;
    }
    .product-list > li:last-child {
        border-bottom: 2px solid #eee;
    }
    .product-content {
        padding: 0 8px;
    }
    .product-list-title {
        margin: 0;
        padding: 10px;
        display: flex;
        align-items: center;
        color: var(--main-bg-color);
    }
    .product-title-icons {
        margin-left: auto;
        min-height: 25px;
    }
    .product-list-title i {
        color: var(--main-bg-color);
    }
    .product-list-title i:hover {
        color: var(--main-font-color);
    }
    .product-icons {
        margin-left: auto;
    }
    .product-icons > i {
        color: #cddfd0;
        font-size: 1.2em;
    }
    .product-icons > i:hover {
        color: var(--main-font-color);
    }
    .product-icons > i.icon-cancel:hover {
        color: #ff5d5d;
    }
    .checkbox {
        border-radius: 50%;
        border: 2px solid var(--main-bg-hover-color);
        width: 18px;
        height: 18px;
    }
    .product-list > li.checked > .checkbox {
        background-color: var(--main-bg-color);
        border-color: var(--main-bg-color);
    }
    .product-list > li.checked {
        background-color: #e5f0ea;
    }
    .sort-type {
        border-radius: 3px;
        padding: 2px;
        margin: 0 5px;
    }
    .slide-enter-active {
        animation: slide-in 1s;
    }
    .slide-leave-active {
        animation: slide-in 1s reverse;
    }
    @keyframes slide-in {
        from {
            max-width: 0;
        }
        to {
            max-width: 126px;
        }
    }
    @media screen and (max-width: 768px) {
         .product-list {
            max-height: calc(100vh - 241px);
        }
    }
</style>