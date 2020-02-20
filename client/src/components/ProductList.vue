<template>
    <section class="product-list-container">
        <h3 class="product-list-title">{{ title }}</h3>
        <ul class="product-list">
            <li v-for="product in products" :key="product.name">
                <label :for="product.name">
                    <input type="checkbox" :id="product.name">&emsp; {{ product.name}} {{ product.price }}
                </label>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name: 'ProductList',
    props: ['title', 'products']
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
        padding: 12px 15px;
        display: block;
    }
    .product-list-title {
        margin: 0;
        padding: 10px;
    }
</style>