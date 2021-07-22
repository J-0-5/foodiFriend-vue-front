<template>
  <form @submit="requestRegister">
    <h1>Registrarse</h1>

    <fieldset>
      <legend><span class="number">1</span>Información basica</legend>
      <label>Nombre *</label>
      <input type="text" v-model="form.name" required />

      <label>Apellido *</label>
      <input type="text" v-model="form.lastName" required />

      <label>Tipo de documento *</label>
      <select v-model="form.docType" required>
        <option value="1">Cédula de ciudadanía</option>
        <option value="2">Cédula de extranjería</option>
      </select>

      <label>Número de documento *</label>
      <input type="text" v-model="form.docNum" required />

      <label>Departamento *</label>
      <select @change="requestCities" v-model="department_id" required>
        <optgroup label="Departamentos">
          <option v-for="item in departments" :key="item.value" :value="item.value">
            {{ item.text }}
          </option>
        </optgroup>
      </select>

      <div v-if="department_id">
        <label>Ciudad *</label>
        <select v-model="form.city" required>
          <optgroup label="Ciudades">
            <option v-for="item in cities" :key="item.value" :value="item.value">
              {{ item.text }}
            </option>
          </optgroup>
        </select>
      </div>

      <label>Dirección *</label>
      <input type="text" v-model="form.address" required />
    </fieldset>

    <fieldset>
      <legend><span class="number">2</span>Info de sesión</legend>
      <label for="mail">E-mail *</label>
      <input type="email" v-model="form.email" />

      <label for="password">Contraseña *</label>
      <input type="password" v-model="form.password" required />

      <label for="password">Confirmar contraseña *</label>
      <input type="password" v-model="form.password_confirmation" required />
    </fieldset>

    <p class="text-danger text-error" v-html="messageError"></p>

    <button type="submit">Registrarse</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      departments: [],
      department_id: null,
      cities: [],
      form: {
        name: "",
        lastName: "",
        docType: null,
        docNum: "",
        city: null,
        address: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      messageError: "",
    };
  },
  methods: {
    async requestDepartments() {
      axios.get("getDepartments").then((response) => {
        if (response.data.code == 200) {
          this.departments = response.data.data;
        }
      });
    },
    async requestCities() {
      axios
        .get(`getCities?department_id=${this.department_id}`)
        .then((response) => {
          if (response.data.code == 200) {
            this.cities = response.data.data;
          }
        });
    },
    async requestRegister(event) {
      event.preventDefault();
      axios.post("register", this.form).then((response) => {
        console.log(response);
        if (response.data.code == 406) {
          this.messageError = response.data.message;
        }
        if (response.data.code == 201) {
          this.$router.push({ name: "Login", params: { registered: true } });
        }
      });
    },
  },
  beforeMount() {
    this.requestDepartments();
  },
};
</script>

<style lang="css" scoped>
*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  font-family: "Nunito", sans-serif;
  color: #384047;
}

form {
  max-width: 300px;
  margin: 10px auto;
  padding: 10px 20px;
  background: #f4f7f8;
  border-radius: 8px;
}

h1 {
  margin: 0 0 30px 0;
  text-align: center;
}

input[type="text"],
input[type="password"],
input[type="date"],
input[type="datetime"],
input[type="email"],
input[type="number"],
input[type="search"],
input[type="tel"],
input[type="time"],
input[type="url"],
textarea,
select {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  font-size: 16px;
  height: auto;
  margin: 0;
  outline: 0;
  padding: 15px;
  width: 100%;
  background-color: #e8eeef;
  color: #8a97a0;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
  margin-bottom: 30px;
}

input[type="radio"],
input[type="checkbox"] {
  margin: 0 4px 8px 0;
}

select {
  padding: 6px;
  height: 32px;
  border-radius: 2px;
}

button {
  padding: 19px 39px 18px 39px;
  color: #fff;
  background-color: #4caf50;
  font-size: 18px;
  text-align: center;
  font-style: normal;
  border-radius: 5px;
  width: 100%;
  border: 1px solid #3ac162;
  border-width: 1px 1px 3px;
  box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
  margin-bottom: 10px;
}

fieldset {
  margin-bottom: 30px;
  border: none;
}

legend {
  font-size: 1.4em;
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 8px;
}

label.light {
  font-weight: 300;
  display: inline;
}

.number {
  background-color: #4caf50;
  color: #fff;
  height: 30px;
  width: 30px;
  display: inline-block;
  font-size: 0.8em;
  margin-right: 4px;
  line-height: 30px;
  text-align: center;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);
  border-radius: 100%;
}

@media screen and (min-width: 480px) {
  form {
    max-width: 480px;
  }
}
</style>