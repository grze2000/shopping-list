<template>
    <div>
        <h4 class="list-title">{{ title }}<i class="icon-plus" @click="showInput()"></i></h4>
        <ul class="list">
            <li class="product-add" v-if="add"><input type="text" ref="input" v-model="newListName" @keyup.enter="addList()" @keyup.esc="add = false; newListName = ''"/><i class="icon-ok" @click="addList()"></i><i class="icon-cancel" @click="add = false; newListName = ''"></i></li>
            <li v-for="item in items" :key="item.id" @click="onClick(item.id)" :class="selected===item.id ? 'active' : ''">{{ item.name }}<span>{{ item.itemCount }}</span></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'list',
    props: ['title', 'items', 'selected'],
    data() {
        return {
            add: false,
            newListName: ''
        }
    },
    methods: {
        onClick(itemId) {
            this.$emit('selectList', itemId);
        },
        addList() {
            this.newListName = this.newListName.trim();
            if(this.newListName === '') {
                alert('Podaj nazwę listy');
            } else if(!/^[\wżźćńółęąśŻŹĆĄŚĘŁÓŃ \.!?,:;\-&]{1,50}$/.test(this.newListName)) {
                alert('Nazwa listy zawiera niedozwolone znaki');
            } else {
                this.$emit('addList', this.newListName);
                this.add = false;
                this.newListName = ''
            }
        },
        showInput() {
            this.add = !this.add;
            if(this.add) {
                this.$nextTick(() => this.$refs.input.focus());
            }
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
    .list-title > i, .product-add > i {
        margin-left: auto;
    }
    .active {
        color: var(--main-font-color);
        background-color: var(--main-bg-active-color);
        font-weight: bold;
    }
</style>