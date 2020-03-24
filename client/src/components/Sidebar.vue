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
        display: flex;
        flex-direction: column;
    }
    .sidebar-bottom {
        margin-top: auto;
        padding: 10px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    @media screen and (max-width: 768px) {
        .sidebar {
            width: 100%;
            position: fixed;
            left: 0;
            bottom: 0;
        }
        .sidebar-bottom {
            border-top: 1px solid silver;
            text-align: center;
        }
        .sidebar-bottom i {
            flex-basis: 33%;
        }
    }
</style>