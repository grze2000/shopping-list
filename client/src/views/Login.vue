<template>
    <div>
        <h1 class="app-name">{{ appName }}</h1>
        <form @submit.prevent="onSubmit" class="form">
            <div class="form-group">
                <input type="email" placeholder="Email" v-model.trim="login.email"/>
            </div>
            <div class="form-group">
                <input type="password" placeholder="Hasło" v-model.trim="login.password"/>
            </div>
            <div class="form-group">
                <input type="submit" value="Zaloguj się">
            </div>
            <div class="form-gorup msg error" v-if="error !== ''">
                {{ error.data.message }}
            </div>
            <div class="form-group msg">
                Nie masz konta? <a href="#" @click.prevent="register()">Zarejestruj się</a>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',
    data() {
        return {
            appName: process.env.VUE_APP_NAME,
            login: {},
            error: ""
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            axios.post(`${process.env.VUE_APP_API_URL}/login`, this.login)
            .then(response => {
                localStorage.setItem('jwtToken', response.data.token);
                this.$router.push('/');
            })
            .catch(err => {
                this.error = err.response;
            });
        },
        register() {
            this.$router.push('/register');
        }
    }
}
</script>

<style>

</style>