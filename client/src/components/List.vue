<template>
    <div>
        <h4 class="list-title">{{ title }}</h4>
        <ul class="list">
            <li v-for="item in items" :key="item">{{ item.name }}<span>{{ item.size }}</span></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'list',
    props: ['title', 'items']
}
</script>

<style scoped>
    .list {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    .list > li {
        padding: 4px 25px;
        cursor: pointer;
        display: flex;
    }
    .list > li:hover {
        background-color: var(--main-bg-hover-color);
    }
    .list > li > span {
        margin-left: auto;
        background-color: #ffffff2d;
        height: 100%;
        padding: 0 7px;
        text-align: center;
        border-radius: 2px;
    }
    .list-title {
        margin: 25px 0 10px 0;
        padding: 0 10px;
    }
    .selected { /* to-do */
        color: var(--main-font-color);
        font-weight: bold;
    }
</style>