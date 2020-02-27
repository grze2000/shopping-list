<template>
    <main class="flex-container"  @contextmenu.prevent="">
        <Sidebar>
            <h2 class="app-name">{{ appName }}</h2>
            <List :items="categories" title="Kategorie"></List>
            <List :items="lists" :selected="selected" @selectList="selectList" @addList="addList" @removeList="removeList" title="Listy"></List>
            <section class="sidebar-bottom"><i class="icon-logout" title="Wyloguj się" @click="logout()"></i></section>
        </Sidebar>
        <Content>
            <ProductList :title="activeList.name" :products="activeList.items" @selectProduct="selectProduct" @removeProduct="removeProduct"></ProductList>
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
            appName: process.env.VUE_APP_NAME,
            categories: [
                {id: 3, name: 'Owoce', itemCount: 3},
                {id: 4, name: 'Elektronika', itemCount: 15},
                {id: 5, name: 'Napoje', itemCount: 6}
            ],
            lists: [],
            activeList: {
                name: 'Nie wybrano listy',
                items: []
            },
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
        },
        selectList(id) {
            this.selected = id;
            axios.get(`${process.env.VUE_APP_API_URL}/lists/${id}/items`)
            .then(response => {
                this.activeList = response.data;
            })
            .catch(err => {
                console.error(err);
            });
        },
        addList(listName) {
            axios.post(`${process.env.VUE_APP_API_URL}/lists`, {name: listName})
            .then(response => {
                this.lists.push(response.data);
            })
            .catch(err => {
                console.error(err);
            });
        },
        removeList(id) {
            axios.delete(`${process.env.VUE_APP_API_URL}/lists/${id}`)
            .then(response => {
                const index = this.lists.findIndex(x => x.id === id);
                if(index != -1) {
                    this.lists.splice(index, 1);
                }
            })
            .catch(err => {
                console.error(err);
            });
        },
        selectProduct(id) {
            const item = this.activeList.items.find(x => x._id === id);
            if(typeof item !== 'undefined') {
                axios.patch(`${process.env.VUE_APP_API_URL}/lists/${this.selected}/items/${id}`, {bought: item.bought})
                .catch(err => {
                    console.error(err);
                });
            }
        },
        removeProduct(id) {
            const index = this.activeList.items.findIndex(x => x._id === id);
            if(index != -1) {
                axios.delete(`${process.env.VUE_APP_API_URL}/lists/${this.selected}/items/${id}`)
                .then(response => {
                    this.activeList.items.splice(index, 1);
                })
                .catch(err => {
                    console.error(err);
                });
            }
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
    i {
        cursor: pointer;
    }
    i:hover {
        color: var(--main-font-color);
    }
</style>
