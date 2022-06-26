<template>
  <div class="card my-3 p-3">
    <div class="d-flex justify-content-between">
      <h4 class="mb-3">{{ name }}</h4>
      <p>${{ subtotal }}</p>
    </div>

    <div class="container justify-content-end">
      <div v-for="option in foodOptions[type].options" :key="option" class="row">
        <p class="pt-2 m-0 col-xl-4 col-12"> {{ option }}</p>
        <div class="col-xl-8 col-12 d-flex mb-2 justify-content-stretch">
          <div class="d-flex align-items-center">
            <span>Qty.</span>
            <input type="number" class="form-control w-rem-3 d-inline-block" id="name"
              v-model="newOrder[option].quantity">
          </div>
          <div v-if="isSizabelItem(type)" class="d-flex align-items-center">
            <span>Size</span>
            <select class="form-select mx-2 w-rem-8" aria-label=" Select options"
              v-model="newOrder[option].selectedSize">
              <option selected></option>
              <option v-for="option in Object.keys(foodOptions[type].price)" :key="option" :value="option">{{ option
              }}-${{ foodOptions[type].price[option] }}
              </option>
            </select>
          </div>
        </div>
      </div>



    </div>




  </div>
</template>

<script>
import { foodOptions } from '@/constants';
export default {
  name: 'FoodItem',
  data: () => ({
    newOrder: {}
    ,
    subtotal: 0,
    foodOptions
  }),
  created() {
    for (const option of this.foodOptions[this.type].options) {
      this.newOrder[option] = { quantity: 0, selectedSize: '', price: 0 }
    }
    //console.log(this.newOrder);
  },
  watch: {
    newOrder: {
      deep: true,
      handler(val) {
        let subtotal = 0;
        for (let item in val) {
          const { quantity, selectedSize } = val[item];
          if (quantity < 0 || quantity > 10) this.newOrder[item].quantity = 0;
         // if (this.newOrder[item].quantity !== 0) {
            this.newOrder[item].price = (this.isSizabelItem(this.type) ?
              quantity * foodOptions[this.type].price[selectedSize]
              : quantity * foodOptions[this.type].price) || 0
          // }
          subtotal += this.newOrder[item].price;
        }
        this.subtotal = subtotal;
        this.$emit("updateOrder", { [this.name]: { ...val, subtotal } })

      }
    }


  },
  props: {
    type: String,
    name: String
  },
  methods: {
    isSizabelItem(type) {
      return typeof this.foodOptions[type].price !== 'number'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.w-rem-3 {
  width: 5rem;
  margin-right: 1rem;

}

.w-rem-8 {
  width: 9rem;

}
</style>
