<template>
    <main class="flex-container"  @contextmenu.prevent="">
        <Sidebar :class="{hideSidebar}">
            <h2 class="app-name">{{ appName }}</h2>
            <section class="content-wrapper">
                <List :items="categories"
                    :selected="selected"
                    @selectItem="selectCategory"
                    @addItem="addCategory"
                    title="Kategorie"
                ></List>
                <List :items="lists"
                    :selected="selected"
                    @selectItem="selectList"
                    @addItem="addList"
                    @removeItem="removeList"
                    title="Listy"
                ></List>
                <h4 class="list-title all-products" :class="selected==='all-products' ? 'active' : ''" @click="showAll">
                    Wszystkie produkty
                    <span>{{ productCount }}</span>
                </h4>
            </section>
            <section class="sidebar-bottom">
                <i class="icon-list-bullet" @click="hideSidebar = !hideSidebar"></i>
                <i class="icon-arrows-cw" @click="refresh" title="Odśwież"></i>
                <i class="icon-logout" title="Wyloguj się" @click="logout"></i>
            </section>
        </Sidebar>
        <Content>
            <ProductView v-if="activeProduct"
                :product="activeProduct"
                :categories="categories"
                @editProduct="editProduct"
                @addProduct="saveProduct"
                @cancel="activeProduct = undefined"
            ></ProductView>
            <ProductList v-else
                :title="activeList.name"
                :add="addToSelected"
                :products="activeList.items"
                @selectProduct="selectProduct"
                @removeProduct="removeProduct"
                @modifyProduct="modifyProduct"
                @addProduct="addProduct"
            ></ProductList>
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
            productCount: 0,
            activeList: {
                name: undefined,
                items: []
            },
            activeProduct: undefined,
            selected: 0,
            selectedType: undefined,
            addToSelected: true,
            hideSidebar: true,
        }
    },
    async created() {
        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
            const lists = await axios.get(`${process.env.VUE_APP_API_URL}/lists`);
            const categories = await axios.get(`${process.env.VUE_APP_API_URL}/categories`);
            const products = await axios.get(`${process.env.VUE_APP_API_URL}/product-count`);
            this.lists = lists.data;
            this.categories = categories.data;
            this.productCount = products.data.productCount;
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
                const products = await axios.get(`${process.env.VUE_APP_API_URL}/product-count`);
                this.lists = lists.data;
                this.categories = categories.data;
                this.productCount = products.data.productCount;
                if(this.selected) {
                    if(this.selectedType === 'list') {
                        var activeListProducts = await axios.get(`${process.env.VUE_APP_API_URL}/lists/${this.selected}/items`);
                    } else if(this.selectedType === 'category') {
                        var activeListProducts = await axios.get(`${process.env.VUE_APP_API_URL}/categories/${this.selected}/items`);
                    } else if(this.selectedType === 'all') {
                        var activeListProducts = await axios.get(`${process.env.VUE_APP_API_URL}/products`);
                    }
                    this.activeList = activeListProducts.data;
                }
            } catch(err) {
                console.error(err);
            }
        },
        showAll() {
            this.activeProduct = undefined;
            this.selected = 'all-products';
            this.selectedType = 'all';
            this.addToSelected = false;
            this.hideSidebar = true;
            axios.get(`${process.env.VUE_APP_API_URL}/products`)
            .then(response => {
                this.activeList = response.data;
                this.productCount = response.data.itemCount;
            })
            .catch(err => {
                console.error(err);
            });
        },
        selectList(id) {
            this.activeProduct = undefined;
            this.selected = id;
            this.selectedType = 'list';
            this.addToSelected = true;
            this.hideSidebar = true;
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
                const index = this.lists.findIndex(x => x._id === id);
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
                axios.patch(`${process.env.VUE_APP_API_URL}/lists/${item.listId}/items/${id}`, {bought: item.bought})
                .catch(err => {
                    console.error(err);
                });
            }
        },
        removeProduct(id) {
            const item = this.activeList.items.find(x => x._id === id);
            if(typeof item !== 'undefined') {
                axios.delete(`${process.env.VUE_APP_API_URL}/lists/${item.listId}/items/${id}`)
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
                price: 0,
                priority: 1,
                quantity: 1,
                description: '',
                firstURL: '',
                secondURL: ''
            }
        },
        editProduct(id) {
            const {_id, bought, ...data} = this.activeProduct;
            axios.patch(`${process.env.VUE_APP_API_URL}/lists/${data.listId}/items/${id}`, data)
            .then(response => {
                this.refresh();
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
            this.selectedType = 'category';
            this.addToSelected = false;
            this.hideSidebar = true;
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
        margin: 0;
        padding: 0.8em 0;
    }
    i {
        cursor: pointer;
    }
    i:hover {
        color: var(--main-font-color);
    }
    .all-products {
        padding: 4px 10px;
        cursor: pointer;
        display: flex;
        margin: 25px 0 10px 0;
    }
    .content-wrapper {
        max-height: calc(100vh - 108px);
        overflow: auto;
    }
    .content-wrapper::-webkit-scrollbar-thumb {
        background-color: var(--main-bg-active-color);
        border-radius: 10px;
    }
    .icon-list-bullet {
        display: none;
    }
    @media screen and (max-width: 768px) {
        .sidebar .app-name {
            border-bottom: 1px solid silver;
        }
        .hideSidebar .app-name,
        .hideSidebar .content-wrapper {
            display: none !important;
        }
        .hideSidebar {
            height: auto !important;
        }
        .icon-list-bullet {
            display: block;
        }
    }
</style>
