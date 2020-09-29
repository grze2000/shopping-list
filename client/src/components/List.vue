<template>
    <div>
        <h4 class="list-title">{{ title }}<i class="icon-plus" @click="showAddInput()"></i></h4>
        <ul class="list">
            <li class="product-add" v-if="add">
                <input type="text" ref="addInput" maxlength="50" v-model="newItemName" @keyup.enter="addItem()" @keyup.esc="add = false; newItemName = ''"/>
                <i class="icon-ok" @click="addItem()"></i>
                <i class="icon-cancel" @click="add = false; newItemName = ''"></i>
            </li>
            <li v-for="item in items" 
                :key="item._id"
                @click="$emit('selectItem', item._id);"
                :class="{'active': selected===item._id, 'product-add': rename.itemID === item._id}"
                @contextmenu.prevent="$refs.listContextMenu.open($event, {id: item._id, name: item.name})">
                <template v-if="rename.itemID === item._id">
                    <input type="text" ref="renameInput" maxlength="50" v-model="rename.value" @keyup.enter="renameItem()" @keyup.esc="rename.itemID = null"/>
                    <i class="icon-ok" @click="renameItem()"></i>
                    <i class="icon-cancel" @click="rename.itemID = null"></i>
                </template>
                <template v-else>
                    {{ item.name }}<span>{{ item.itemCount }}</span>
                </template>
            </li>
        </ul>
        <vue-context ref="listContextMenu">
            <template slot-scope="listId">
                <li>
                    <a href="#" @click.prevent="showRenameInput(listId.data)">Zmień nazwę</a>
                </li>
                <li>
                    <a href="#" @click.prevent="$emit('removeItem', listId.data.id)">Usuń</a>
                </li>
            </template>
        </vue-context>
    </div>
</template>

<script>
import VueContext from 'vue-context'

export default {
    name: 'list',
    props: ['title', 'items', 'selected'],
    components: {
        VueContext
    },
    data() {
        return {
            add: false,
            newItemName: '',
            rename: {
                itemID: null,
                value: ''
            }
        }
    },
    methods: {
        renameItem() {
            if(!this.rename.value.trim().length) {
                alert('Podaj nazwę listy');
            } else if(!/^[\wżźćńółęąśŻŹĆĄŚĘŁÓŃ \.!?,:;\-&']{1,50}$/.test(this.rename.value)) {
                alert('Nazwa listy zawiera niedozwolone znaki');
            } else {
                this.$emit('renameItem', {id: this.rename.itemID, name: this.rename.value});
                this.rename.itemID = null;
                this.rename.value = '';
            }
        },
        showRenameInput(item) {
            this.rename.itemID = item.id;
            this.rename.value = item.name;
            this.$nextTick(() => this.$refs.renameInput[0].focus());
        },
        addItem() {
            this.newItemName = this.newItemName.trim();
            if(this.newItemName === '') {
                alert('Podaj nazwę listy');
            } else if(!/^[\wżźćńółęąśŻŹĆĄŚĘŁÓŃ \.!?,:;\-&']{1,50}$/.test(this.newItemName)) {
                alert('Nazwa listy zawiera niedozwolone znaki');
            } else {
                this.$emit('addItem', this.newItemName);
                this.add = false;
                this.newItemName = ''
            }
        },
        showAddInput() {
            this.add = !this.add;
            if(this.add) {
                this.$nextTick(() => this.$refs.addInput.focus());
            }
        }
    }
}
</script>

<style>
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
    .list > li:hover, .all-products:hover {
        background-color: var(--main-bg-hover-color);
    }
    .list > li > span, .all-products > span {
        margin-left: auto;
        background-color: #ffffff2d;
        align-self: start;
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
    .product-add > input {
        min-width: 0;
        border-radius: 2px;
        border: 0;
        margin-right: 2px;
        padding: 0 5px;
        box-sizing: border-box;
        flex-grow: 1;
    }
    .active {
        color: var(--main-font-color);
        background-color: var(--main-bg-active-color);
        font-weight: bold;
    }
</style>