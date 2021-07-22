<template>
  <div>
    <div>
      <b-carousel
        id="carousel-1"
        
        
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
          :img-src="`http://127.0.0.1:8000/${commerce.img ? 'storage/' + commerce.img : 'img/product-placeholder.jpg'}`"
          style="max-height:25rem"
        ></b-carousel-slide>
      </b-carousel>

    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Commerce",
  data() {
    return {
      commerce: [],
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
  },
  async beforeMount() {
    await this.requestCommerce();
  },
};
</script>
