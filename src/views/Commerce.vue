<template>
  <div>
    <div>
      <b-carousel
        id="1"
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <!-- Text slides with image -->
        <b-carousel-slide
          :caption="commerce.name"
          :text="commerce.description"
          :img-src="`http://127.0.0.1:8000/${
            commerce.img
              ? 'storage/' + commerce.img
              : 'img/product-placeholder.jpg'
          }`"
          style="max-height: 25rem"
        ></b-carousel-slide>
      </b-carousel>
      <!-- 
      <div
        class="
          col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3
          d-flex
          justify-content-center
        "
        v-for="item in products"
        :key="item"
      >
        <router-link
          :to="{ name: 'Commerce', params: { id: item.id } }"
          class="text-decoration-none text-body"
        >
          <b-card
            :title="item.name"
            :img-src="`http://127.0.0.1:8000/${item.product_img ? 'storage/' + item.product_img : 'img/product-placeholder.jpg'}`"
            img-alt="Image"
            img-top
            img-height="200px;"
            tag="article"
            style="max-width: 20rem"
            class="my-3"
          >
            <b-card-text class="mb-3" style="max-height: 5rem; overflow: hidden">
              <b>Precio:</b> {{ item.price }}
            </b-card-text>
            <b-card-text style="max-height: 5rem; overflow: hidden">
              <b>Descripcion:</b> {{ item.description }}
            </b-card-text>
          </b-card>
        </router-link>
      </div> -->
      <b-container>
        <b-row>
          <h1 class="mb-4 mt-3 text-center">Productos de {{ commerce.name }}</h1>

          <b-col
            v-for="(item, index) of products"
            :key="index"
            cols="12"
            md="6"
            lg="4"
            xl="3"
            class="d-flex justify-content-center m-2 p-4"
          >
            <!-- <router-link :to="{ name: 'Products', params: { commerce: item.id }}"> -->
            <b-card
              :title="item.name"
              :img-src="`http://127.0.0.1:8000/${
                item.product_img
                  ? 'storage/' + item.product_img
                  : 'img/product-placeholder.jpg'
              }`"
              img-alt="Commerce"
              img-top
              tag="article"
              style="max-width: 30rem"
              class="mb-3 cardShadow"
              @mouseover="hover = true"
              @mouseleave="hover = false"
            >
              <b-card-text style="max-height: 12rem; overflow: hidden">
                <span v-for="(category, index) of productCategories" :key="index">
                  <span v-if="item.category_id == category.id">
                    {{ category.name }}
                  </span>
                </span>
              </b-card-text>
              <b-card-text style="max-height: 5rem; overflow: hidden">
                <vue-intl-numberformat locale="es-CO" formatStyle="currency" currency="COP" :number="item.price"></vue-intl-numberformat>
              </b-card-text>
              <b-card-text style="max-height: 12rem; overflow: hidden">
                {{ item.description }}
              </b-card-text>
            </b-card>
            <!-- </router-link> -->
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import VueIntlNumberformat from 'vue-intl-numberformat';

export default {
  components : {
    VueIntlNumberformat,
  },
  name: "Commerce",
  data() {
    return {
      commerce: [],
      products: [],
      productCategories: [],
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    async requestCommerce() {
      let id = this.$route.params.id;
      axios.get(`getCommerce?id=${id}`).then((response) => {
        if (response.data.code == 200) {
          console.log(response.data.data);
          this.commerce = response.data.data;
        }
      });
    },
    async requestProducts() {
      console.log("Inside");
      let commerceId = this.$route.params.id;
      console.log(commerceId);
      axios.get(`getProducts?id=${commerceId}`).then((response) => {
        if (response.data.code == 200) {
          console.log(response.data.data);
          this.products = response.data.data;
        }
      });
    },

    async requestProductCategories() {
      console.log("product cateogires ");
      let commerceId = this.$route.params.id;
      console.log(commerceId);
      axios.get(`getProductCategories?id=${commerceId}`).then((response) => {
        if (response.data.code == 200) {
          console.log(response.data.data);
          this.productCategories = response.data.data;
        }
      });
    },
  },
  async beforeMount() {
    await this.requestCommerce();
    await this.requestProducts();
    await this.requestProductCategories();
  },
};
</script>
