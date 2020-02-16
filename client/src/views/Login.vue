<template>
    <div>
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <input type="text" name="login.username" placeholder="Email" v-model.trim="login.email"/>
            </div>
            <div class="form-group">
                <input type="password" name="password" placeholder="Hasło" v-model.trim="login.password"/>
            </div>
            <div class="form-group">
                <input type="submit" value="Zaloguj się">
            </div>
            <div class="form-gorup" v-if="error != ''">
                {{ error.data.message }}
            </div>
            Nie masz konta? <a href="#" @click.prevent="register()">Zarejestruj się</a>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',
    data() {
        return {
            login: {},
            error: ""
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            axios.post('http://localhost:3000/login', this.login)
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

<style scoped>

</style>