<template>
  <div class="p-4">
    <div class="row">
      <aside class="col-lg-2">
        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-1 variant="light"
                >Tipo de comercio</b-button
              >
            </b-card-header>
            <b-collapse
              id="accordion-1"
              visible
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-form-radio-group
                  v-model="selected"
                  :options="options"
                  class="mb-3"
                  value-field="item"
                  text-field="name"
                  disabled-field="notEnabled"
                ></b-form-radio-group>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-2 variant="light"
                >Ciudad</b-button
              >
            </b-card-header>
            <b-collapse
              id="accordion-2"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <label class="mb-2">Departamento</label>
                <b-form-select
                  class="p-1 mb-3 row"
                  @change="requestCities"
                  v-model="department_id"
                  :options="departments"
                ></b-form-select>

                <div v-if="department_id">
                  <label class="mb-2">Ciudad</label>
                  <b-form-select
                    class="p-1 mb-3 row"
                    v-model="city"
                    :options="cities"
                  ></b-form-select>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </aside>

      <div
        class="
          col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3
          d-flex
          justify-content-center
        "
        v-for="item in commerces"
        :key="item"
      >
        <router-link
          :to="{ name: 'Commerce', params: { id: item.id } }"
          class="text-decoration-none text-body"
        >
          <b-card
            :title="item.name"
            :img-src="`http://127.0.0.1:8000/${item.img ? 'storage/' + item.img : 'img/product-placeholder.jpg'}`"
            img-alt="Image"
            img-top
            img-height="200px;"
            tag="article"
            style="max-width: 20rem"
            class="my-3"
          >
            <b-card-text style="max-height: 5rem; overflow: hidden">
              {{ item.description }}
            </b-card-text>
          </b-card>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Commerces",
  data() {
    return {
      commerces: [],
      selected: "",
      options: [],
      departments: [],
      department_id: null,
      cities: [],
      city: "",
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
    async requestCommerceTypes() {
      axios.get("getCommerceTypes").then((response) => {
        if (response.data.code == 200) {
          this.options = response.data.data;
        }
      });
    },
    async requestCommerces() {
      axios
        .get(`getCommerces?type=${this.selected}&city=${this.city}`)
        .then((response) => {
          if (response.data.code == 200) {
            this.commerces = response.data.data;
          }
        });
    },
  },
  watch: {
    async selected() {
      await this.requestCommerces();
    },
    async city() {
      await this.requestCommerces();
    },
  },
  async beforeMount() {
    await this.requestDepartments();
    await this.requestCommerceTypes();
    await this.requestCommerces();
  },
};
</script>
