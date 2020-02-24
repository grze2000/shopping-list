<template>
    <section class="product-list-container">
        <h3 class="product-list-title">{{ title }}<div class="product-title-icons"><i class="icon-plus" title="Dodaj produkt"></i></div></h3>
        <ul class="product-list">
            <li v-for="product in products" :key="product.name" @click="product.bought = !product.bought; markProduct(product._id)" :class="{checked: product.bought}">
                <div class="checkbox"></div>
                <div class="product-content">{{ product.name}}{{ product.price ? ` (${product.price} zł)` : '' }}</div>
                <div class="product-icons"><i class="icon-pencil"></i><i class="icon-cancel" @click.stop="removeProduct()"></i></div>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name: 'ProductList',
    props: ['title', 'products'],
    methods: {
        markProduct(productId) {
            this.$emit('selectProduct', productId);
        },
        removeProduct() {
            alert('ok');
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
        padding: 10px 15px;
        display: flex;
        align-items: center;
    }
    .product-list > li:hover {
        background-color: #f2f6f2;
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