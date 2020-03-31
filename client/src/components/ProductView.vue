<template>
    <section class="product-list-container">
        <form class="form grid-container">
            <div class="grid-item-name">
                <label for="name">Nazwa</label> 
                <input type="text" id="name" v-model="product.name"/>
            </div>
            <div class="grid-item-price">
                <label for="price">Cena</label>
                <input type="number" id="price" min="0" step="0.01" v-model.number="product.price"/>
            </div>
            <div class="grid-item-priority">
                <label for="priority">Priorytet</label>
                <input type="number" id="priority" min="0" v-model.number="product.priority"/>
            </div>
            <div class="grid-item-description">
                <label for="description">Opis</label>
                <textarea id="description" v-model="product.description"></textarea>
            </div>
            <div class="grid-item-category">
                <label for="category">Kategoria</label>
                <select v-model="category" @change="product.category = category === '' ? null : category">
                    <option value="">Bez kategorii</option>
                    <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
                </select>
            </div>
            <div class="grid-item-link1">
                <label for="allegro-link">Link do sklepu</label> 
                <input type="url" id="allegro-link" v-model="product.firstURL">
            </div>
            <div class="grid-item-link2">
                <label for="aliexpress-link">Link do sklepu</label> 
                <input type="url" id="aliexpress-link" v-model="product.secondURL">
            </div>
            <div class="grid-item-submit">
                <div class="grid-item-message">{{ message }}</div>
                <input v-if="typeof product._id === 'undefined'" type="submit" value="Dodaj" @click.prevent="addProduct">
                <input v-else type="submit" value="Zapisz" @click.prevent="editProduct">
            </div>
        </form>
    </section>
</template>

<script>
export default {
    name: 'ProductView',
    props: ['product', 'categories'],
    data() {
        return {
            category: typeof this.product.category !== 'undefined' ? this.product.category : '',
            message: ''
        }
    },
    methods: {
        validateForm() {
            if(!this.product.name.trim().length) {
                this.message = 'Podaj nazwę produktu';
            } else if(!/^[\wżźćńółęąśŻŹĆĄŚĘŁÓŃ \.!?,:;\-&']+$/.test(this.product.name)) {
                this.message = 'Nazwa zawiera nieprawidłowe znaki';
            } else if(isNaN(this.product.price)) {
                this.message = 'Podaj prawidłową cenę';
            } else if(!Number.isInteger(this.product.priority)) {
                this.message = 'Podaj prawidłowy priorytet';
            } else if(!/^[\wżźćńółęąśŻŹĆĄŚĘŁÓŃ \.!?,:;\-&]*$/.test(this.product.description)) {
                this.message = 'Opis zawiera niedozwolone znaki';
            } else if((this.product.firstURL.trim().length && !/^https?:\/\/(www\.)?([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(this.product.firstURL))
            || (this.product.secondURL.trim().length && !/^https?:\/\/(www\.)?([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(this.product.secondURL))) {
                this.message = 'Podaj prawidłowy link';
            } else {
                return true;
            }
            return false;
        },
        addProduct() {
            if(this.validateForm()) {
                this.$emit('addProduct');
            }
        },
        editProduct() {
            if(this.validateForm()) {
                this.$emit('editProduct', this.product._id);
            }
        }
    }
}
</script>

<style>
    .grid-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(5, 1fr);
        grid-gap: 10px 15px;
        padding: 10px 20px;
        font-size: 0.9em;
    }
    .grid-item-name {
        grid-column: 1 / 5;
    }
    .grid-item-price {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
    }
    .grid-item-submit {
        grid-row: 5 / 6;
        grid-column: 1 / 5;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;
    }
    .grid-item-submit > input {
        width: auto !important;
        min-width: 100px;
        font-weight: bold;
    }
    .grid-item-description {
        grid-row: 2 / 4;
        grid-column: 3 / 5;
        display: flex;
        flex-direction: column;
    }
    .grid-item-description > textarea {
        flex-grow: 1;
    }
    .grid-item-category {
        grid-row: 3 / 4;
        grid-column: 1 / 3;
    }
    .grid-item-link1 {
        grid-row: 4 / 5;
        grid-column: 1 / 3;
    }
    .grid-item-link2 {
        grid-row: 4 / 5;
        grid-column: 3 / 5;
    }
    .grid-item-message {
        padding: 10px;
    }
    label {
        color: var(--main-bg-color);
        font-weight: bold;
    }
    @media screen and (max-width: 768px) {
        .grid-container {
            display: flex;
            flex-direction: column;
        }
        .grid-container > div {
            margin: 5px 0;
        }
    }
</style>