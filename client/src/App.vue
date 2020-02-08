<template>
  <div id="app">
    <main class="flex-container">
        <Sidebar>
            <h2 class="app-name">{{ appName }}</h2>
            <List :items="categories" title="Kategorie"></List>
            <List :items="lists" title="Listy"></List>
        </Sidebar>
        <Content>
            
        </Content>
    </main>
  </div>
</template>

<script>
import Sidebar from  './components/Sidebar.vue'
import Content from './components/Content.vue'
import List from './components/List.vue'

export default {
    name: 'App',
    components: {
        Sidebar,
        Content,
        List
    },
    data() {
        return {
            categories: [
                {name: "Owoce", size: 3},
                {name: "Elektronika", size: 15},
                {name: "Napoje", size: 6}
            ],
            lists: [
                {name: "Lista 1", size: 2},
                {name: "Codzienna", size: 0}
            ],
            appName: "ShoppingList"
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
