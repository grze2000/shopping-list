<template>
    <div>
        <form action="/login" method="POST">
            <div class="form-group">
                <input type="text" name="username" placeholder="Email"/>
            </div>
            <div class="form-group">
                <input type="password" name="password" placeholder="Hasło"/>
            </div>
            <div class="form-group">
                <input type="submit" value="Zaloguj się">
            </div>
            Nie masz konta? <a href="#">Zarejestruj się</a>
        </form>
    </div>
</template>

<style scoped>

</style>