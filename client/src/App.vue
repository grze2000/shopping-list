<template>
  <div id="app">
    <main class="flex-container">
        <Sidebar>
            <h2 class="app-name">{{ appName }}</h2>
            
        </Sidebar>
        <Content>
            
        </Content>
    </main>
  </div>
</template>

<script>
import Sidebar from  './components/Sidebar.vue'
import Content from './components/Content.vue'

export default {
    name: 'App',
    components: {
        Sidebar,
        Content
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
