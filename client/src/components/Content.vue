<template>
    <section class="content">
        <slot></slot>
    </section>
</template>

<script>
export default {
    name: 'Content'
}
</script>

<style scoped>
    .content {
        width: 80%;
        height: 100vh;
        padding: 15px;
        box-sizing: border-box;
    }
</style>