<template>
    <main class="flex-container"  @contextmenu.prevent="">
        <Sidebar>
            <h2 class="app-name">{{ appName }}</h2>
            <List :items="categories" :selected="selected" @selectItem="selectCategory" @addItem="addCategory" title="Kategorie"></List>
            <List :items="lists" :selected="selected" @selectItem="selectList" @addItem="addList" @removeItem="removeList" title="Listy"></List>
            <section class="sidebar-bottom"><i class="icon-arrows-cw" @click="refresh" title="Odśwież"></i><i class="icon-logout" title="Wyloguj się" @click="logout"></i></section>
        </Sidebar>
        <Content>
            <ProductView v-if="activeProduct" :product="activeProduct" @editProduct="editProduct" @addProduct="saveProduct"></ProductView>
            <ProductList v-else :title="activeList.name" :products="activeList.items" @selectProduct="selectProduct" @removeProduct="removeProduct"
            @modifyProduct="modifyProduct" @addProduct="addProduct"></ProductList>
        </Content>
    </main>
</template>

<script>
import axios from 'axios'
import Sidebar from  '../components/Sidebar.vue'
import Content from '../components/Content.vue'
import List from '../components/List.vue'
import ProductList from '../components/ProductList.vue'
import ProductView from '../components/ProductView.vue'

export default {
    name: 'Home',
    components: {
        Sidebar,
        Content,
        List,
        ProductList,
        ProductView
    },
    data() {
        return {
            appName: process.env.VUE_APP_NAME,
            categories: [],
            lists: [],
            activeList: {
                name: undefined,
                items: []
            },
            activeProduct: undefined,
            selected: 0,
        }
    },
    async created() {
        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
            const lists = await axios.get(`${process.env.VUE_APP_API_URL}/lists`);
            const categories = await axios.get(`${process.env.VUE_APP_API_URL}/categories`);
            this.lists = lists.data;
            this.categories = categories.data;
        } catch(err) {
            this.$router.push('/login');
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('jwtToken');
            this.$router.push('/login');
        },
        async refresh() {
            try {
                const lists = await axios.get(`${process.env.VUE_APP_API_URL}/lists`);
                const categories = await axios.get(`${process.env.VUE_APP_API_URL}/categories`);
                this.lists = lists.data;
                this.categories = categories.data;
                if(this.selected) {
                    const products = await axios.get(`${process.env.VUE_APP_API_URL}/lists/${this.selected}/items`);
                    this.activeList = products.data;
                }
            } catch(err) {
                console.error(err);
            }
        },
        selectList(id) {
            this.activeProduct = undefined;
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
                if(index !== -1) {
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
            if(index !== -1) {
                axios.delete(`${process.env.VUE_APP_API_URL}/lists/${this.selected}/items/${id}`)
                .then(response => {
                    this.refresh();
                })
                .catch(err => {
                    console.error(err);
                });
            }
        },
        modifyProduct(id) {
            const product = this.activeList.items.find(x => x._id === id);
            if(typeof product !== 'undefined') {
                this.activeProduct = product;
            }
        },
        addProduct() {
            this.activeProduct = {
                name: '',
                price: 0
            }
        },
        editProduct(id) {
            const {_id, bought, ...data} = this.activeProduct;
            axios.patch(`${process.env.VUE_APP_API_URL}/lists/${this.selected}/items/${id}`, data)
            .then(response => {
                this.activeProduct = undefined;
            })
            .catch(err => {
                console.error(err);
            });
        },
        saveProduct() {
            axios.post(`${process.env.VUE_APP_API_URL}/lists/${this.selected}/items`, this.activeProduct)
            .then(response => {
                this.refresh();
                this.activeProduct = undefined;
            })
            .catch(err => {
                console.error(err);
            });
        },
        selectCategory(id) {
            this.activeProduct = undefined;
            this.selected = id;
            axios.get(`${process.env.VUE_APP_API_URL}/categories/${id}/items`)
            .then(response => {
                this.activeList = response.data;
            })
            .catch(err => {
                console.error(err);
            });
        },
        addCategory(categoryName) {
            axios.post(`${process.env.VUE_APP_API_URL}/categories`, {name: categoryName})
            .then(response => {
                this.categories.push(response.data);
            })
            .catch(err => {
                console.error(err);
            });
        },
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
