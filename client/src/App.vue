<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
    @import  '~vue-context/dist/css/vue-context.css';

    .v-context {
        padding: 0;
        font-size: 0.8em;
        font-weight: normal;
    }
    .v-context > li > a {
        padding: .5rem 1rem;
    }
    :root {
        --main-bg-color: #33915d;
        --main-bg-hover-color: #5ea07b;
        --main-bg-active-color: #4eac78;
        --main-font-color: #ffbb3c;
    } 
    body {
        margin: 0;
        font-family: 'Montserrat', sans-serif;
        background-color: #eee;
    }
</style>
