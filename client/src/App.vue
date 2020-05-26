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
    ::-webkit-scrollbar {
        width: 10px;
    }
    .form input[type=text],
    .form input[type=password],
    .form input[type=email],
    .form input[type=number],
    .form input[type=url],
    .form select,
    .form textarea {
        border-radius: 3px;
        padding: 10px;
        border: 1px solid #bbb;
        width: 100%;
        box-sizing: border-box;
    }
    .form input:focus, .form select:focus, .form textarea:focus {
        outline-color: var(--main-bg-hover-color);
    }
    textarea {
        resize: none;
    }
    .form input[type=submit] {
        border-radius: 3px;
        background-color: var(--main-bg-color);
        color: #fff;
        padding: 10px;
        border: 0;
        width: 100%;
    }
    .form input[type=submit]:hover {
        background-color: var(--main-bg-hover-color);
        cursor: pointer;
    }
    .form-group {
        padding: 10px;
    }
    .form.form30 {
        width: 30%;
        margin: 0 auto;
        min-width: 300px;
    }
    .alert {
        padding: 7px 0;
        margin: 0 10px;
        border-radius: 1px;
    }
    .alert-error {
        background-color: #ff9d9dcc;
        color: #9c2424cc;
    }
    .alert-success {
        background-color: #98da9c;
        color: #2d7a50;
    }
    .msg {
        font-size: 0.9em;
    }
    .text-center {
        text-align: center;
    }
</style>
