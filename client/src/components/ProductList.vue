<template>
    <section class="product-list-container">
        <h3 class="product-list-title">{{ title }}<div class="product-title-icons"><i class="icon-plus" title="Dodaj produkt"></i></div></h3>
        <ul class="product-list">
            <li v-for="product in products" :key="product.name" @click="onClick(product._id)">
                <label :for="product.name">
                    <input type="checkbox" :id="product.name" :checked="product.bought">&emsp; {{ product.name}} {{ product.price }}
                    <div class="product-icons"><i class="icon-pencil"></i><i class="icon-cancel"></i></div>
                </label>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name: 'ProductList',
    props: ['title', 'products'],
    methods: {
        onClick(productId) {
            this.$emit('selectProduct', productId);
        }
    }
}
</script>

<style scoped>
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
    }
    .product-list > li:hover {
        background-color: #f2f6f2;
    }
    .product-list > li > label {
        padding: 10px 15px;
        display: flex;
        align-items: center;
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
</style>