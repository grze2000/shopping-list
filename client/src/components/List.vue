<template>
    <div>
        <h4 class="list-title">{{ title }}<i class="icon-plus"></i></h4>
        <ul class="list">
            <li v-for="item in items" :key="item.id" @click="onClick(item.id)" :class="selected===item.id ? 'active' : ''">{{ item.name }}<span>{{ item.itemCount }}</span></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'list',
    props: ['title', 'items', 'selected'],
    methods: {
        onClick(itemId) {
            this.$emit('selectList', itemId);
        }
    }
}
</script>

<style scoped>
    .list {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    .list > li {
        padding: 4px 10px 4px 25px;
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
        display: flex;
    }
    .list-title > i {
        margin-left: auto;
    }
    .active {
        color: var(--main-font-color);
        background-color: var(--main-bg-active-color);
        font-weight: bold;
    }
</style>