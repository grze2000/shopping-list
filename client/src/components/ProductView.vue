<template>
    <section class="product-list-container">
        <form class="form grid-container">
            <div class="grid-item-name">
                <label for="name">Nazwa</label> 
                <input type="text" id="name" :value="product.name">
            </div>
            <div class="grid-item-price">
                <label for="price">Cena</label>
                <input type="number" id="price" min="0" step="0.01" :value="product.price ? product.price : 0">
            </div>
            <div class="grid-item-priority">
                <label for="priority">Priorytet</label>
                <input type="number" id="priority" min="0" value="1">
            </div>
            <div class="grid-item-description">
                <label for="description">Opis</label>
                <textarea id="description"></textarea>
            </div>
            <div class="grid-item-category">
                <label for="category">Kategoria</label>
                <select>
                    <option>XD</option>
                </select>
            </div>
            <div class="grid-item-link1">
                <label for="allegro-link">Link do Allegro</label> 
                <input type="text" id="allegro-link">
            </div>
            <div class="grid-item-link2">
                <label for="aliexpress-link">Link do Aliexpress</label> 
                <input type="text" id="aliexpress-link">
            </div>
            <div class="grid-item-submit">
                <input v-if="product === 'add'" type="submit" value="Dodaj">
                <input v-else type="submit" value="Zapisz">
            </div>
        </form>
    </section>
</template>

<script>
export default {
    name: 'ProductView',
    props: ['product']
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
        grid-column: 4 / 5;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
    }
    .grid-item-submit > input {
        width: 50% !important;
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
    label {
        color: var(--main-bg-color);
        font-weight: bold;
    }
</style>