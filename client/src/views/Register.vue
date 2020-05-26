<template>
    <div>
        <h1 class="app-name">{{ appName }}</h1>
        <form @submit="onSubmit" class="form form30 text-center">
            <div class="form-group">
                <input type="email" placeholder="Email" v-model.trim="register.email"/>
            </div>
            <div class="form-group">
                <input type="password" placeholder="Hasło" v-model.trim="register.password"/>
            </div>
            <div class="form-group">
                <input type="password" placeholder="Powtórz hasło" v-model.trim="register.passwordRepeat"/>
            </div>
            <div class="form-group">
                <input type="submit" value="Zarejestruj się"/>
            </div>
            <div class="form-group msg alert" :class="[alert.type]" v-if="alert.message !== ''">
                {{ alert.message }}
            </div>
            <div class="form-group msg">
                Masz już konto? <a href="" @click.prevent="login()">Zaloguj się</a>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Register',
    data() {
        return {
            appName: process.env.VUE_APP_NAME,
            register: {},
            alert: {
                type: 'alert-error',
                message: ''
            }
        };
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            axios.post(`${process.env.VUE_APP_API_URL}/register`, this.register)
            .then(response => {
                this.alert.type = 'alert-success';
                this.alert.message = 'Konto zostało utworzone. Możesz sie zalogować.';
                setTimeout(() => this.$router.push('/login'), 2000);
            })
            .catch(err => {
                this.alert.type = 'alert-error';
                this.alert.message = err.response.data.message;
            });
        },
        login() {
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>

</style>