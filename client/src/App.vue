<template>
  <div id="app">
    <main class="flex-container">
        <Sidebar>
            <h2 class="app-name">{{ appName }}</h2>
            <List :items="categories" title="Kategorie"></List>
            <List :items="lists" title="Listy"></List>
        </Sidebar>
        <Content>
            <ProductList :products="lists[0].items"></ProductList>
        </Content>
    </main>
  </div>
</template>

<script>
import Sidebar from  './components/Sidebar.vue'
import Content from './components/Content.vue'
import List from './components/List.vue'
import ProductList from './components/ProductList.vue'

export default {
    name: 'App',
    components: {
        Sidebar,
        Content,
        List,
        ProductList
    },
    data() {
        return {
            categories: [
                {id: 3, name: 'Owoce', size: 3},
                {id: 4, name: 'Elektronika', size: 15},
                {id: 5, name: 'Napoje', size: 6}
            ],
            lists: [
                {id: 1, name: 'Lista 1', size: 2, items: [
                    {
                        name: 'Akumulator Li-Pol 1200mAh',
                        price: 20.02
                    },
                    {
                        name: 'Moduł 3 w 1 - akcelerometr, żyroskop i magnetometr',
                        price: 30.99
                    }
                ]},
                {id: 2, name: 'Codzienna', size: 0}
            ],
            appName: 'ShoppingList',
            selected: 0
        }
    }
}
</script>

<style> 
    :root {
        --main-bg-color: #33915d;
        --main-bg-hover-color: #5ea07b;
        --main-font-color: #ffbb3c;
    } 
    body {
        margin: 0;
        font-family: 'Montserrat', sans-serif;
    }
    h1 {
        box-sizing: border-box;
    }
    .flex-container {
        display: flex;
        flex-direction: row;
    }
    .app-name {
        text-align: center;
        color: var(--main-font-color);
    }
</style>
