<template>
  <div class="login-page">
    <div class="form">
      <b-alert variant="success" show v-if="this.$route.params.registered">Registro exitoso</b-alert>
      <form class="login-form" @submit="requestLogin">
        <input type="email" placeholder="E-mail" v-model="form.email" />
        <p class="text-danger text-error" v-html="emailError"></p>
        <input
          type="password"
          placeholder="contraseña"
          v-model="form.password"
        />
        <p class="text-danger text-error" v-html="passwordError"></p>
        <button type="submit">login</button>
        <p class="message">
          ¿Sin registrar? <router-link :to="{ name: 'Register' }">Crea una cuenta</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      show: false,
      emailError: "",
      passwordError: "",
    };
  },
  methods: {
    ...mapMutations(["setLogin"]),
    async requestLogin(event) {
      event.preventDefault();
      axios.post("login", this.form).then((response) => {
        if (response.data.code == 406) {
          response.data.message.email
            ? (this.emailError = response.data.message.email[0])
            : "";
          response.data.message.password
            ? (this.passwordError = response.data.message.password[0])
            : "";
        }

        if (response.data.code == 200) {
          this.setLogin(response.data.data);
          this.$router.push("/");
        }
      });
    },
  },
  computed: {
    ...mapState(["isAuth"]),
  },
  beforeMount() {
    this.isAuth ? this.$router.push("/") : "";
  },
};
</script>
<style lang="css" scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4caf50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: #43a047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4caf50;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
.text-error {
  font-size: 0.85rem !important;
}
</style>