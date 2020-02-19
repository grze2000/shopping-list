<template>
    <main class="flex-container">
        <Sidebar>
            <h2 class="app-name">{{ appName }}</h2><button @click="logout()">Wyloguj się</button>
            <List :items="categories" title="Kategorie"></List>
            <List :items="lists" title="Listy"></List>
        </Sidebar>
        <Content>
            <ProductList :products="lists[0].items"></ProductList>
        </Content>
    </main>
</template>

<script>
import axios from 'axios'
import Sidebar from  '../components/Sidebar.vue'
import Content from '../components/Content.vue'
import List from '../components/List.vue'
import ProductList from '../components/ProductList.vue'

export default {
    name: 'Home',
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
    },
    created() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get(`${process.env.VUE_APP_API_URL}/lists`)
        .then(response => {
            this.lists = response.data;
        })
        .catch(err => {
            this.$router.push('/login');
        });
    },
    methods: {
        logout() {
            localStorage.removeItem('jwtToken');
            this.$router.push('/login');
        }
    }
}
</script>

<style> 
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
