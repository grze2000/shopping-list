<template>
    <section class="sidebar">
        <slot></slot>
    </section>
</template>

<script>
export default {
    name: 'Sidebar'
}
</script>

<style scoped>
    .sidebar {
        width: 20%;
        min-width: 200px;
        height: 100vh;
        color: #eee;
        background-color: var(--main-bg-color);
        box-sizing: border-box;
    }
</style>