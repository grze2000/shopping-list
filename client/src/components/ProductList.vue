<template>
    <section class="product-list-container">
        <h3 class="product-list-title">
            {{ typeof title !== 'undefined' ? title : 'Nie wybrano listy' }}
            <div class="product-title-icons">
                <i class="icon-plus" title="Dodaj produkt" v-if="add" @click="$emit('addProduct')"></i>
            </div>
        </h3>
        <ul class="product-list">
            <li v-for="product in products" :key="product.name" @click="product.bought = !product.bought; $emit('selectProduct', product._id)" :class="{checked: product.bought}" @contextmenu="$refs.productContextMenu.open($event, product)">
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

export default {
    name: 'ProductList',
    props: ['title', 'products', 'add'],
    components: {
        VueContext
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
        }
    },
    computed: {
        summary: function() {
            const sum = this.products.reduce((t, x) => t += x.price, 0).toPrecision(3);
            const count = this.products.length;
            const sumCond = this.products.filter(x => x.bought).reduce((t, x) => t += x.price, 0).toPrecision(3);
            const countCond = this.products.filter(x => x.bought).length;
            return `${count} ${this.text(count)} (${sum} zł) | Kupionych: ${countCond} ${this.text(countCond)} (${sumCond} zł)`;
        }
    }
}
</script>

<style>
    .product-list-container {
        background-color: #f9f9f9;
        border-radius: 5px;
        -webkit-box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.75);
        box-shadow: 0px 0px 9px 0px #00000010;
    }
    .product-list {
        list-style: none;
        margin: 0;
        padding: 0;
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
</style>