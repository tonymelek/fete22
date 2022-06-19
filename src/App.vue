<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 col-12">
        <FoodItem v-for="(item, index) in foodItems" :name="item.name" :type="item.type" :key="index"
          @updateOrder="orderUpdater" />
      </div>
      <div class="col-lg-6 col-12">
        <p>Order Status: {{ detailedOrder.status }}</p>
        <div v-for="(item, index) in Object.keys(computedOrder)" :key="index">
          {{ item }} - {{ computedOrder[item].selectedOption }} <span v-if="computedOrder[item].selectedSize"> - {{
              computedOrder[item].selectedSize
          }}</span> x {{
    computedOrder[item].quantity
}}-{{ computedOrder[item].price }}
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import FoodItem from './components/FoodItem.vue'
import { foodItems } from './constants'
export default {
  name: 'App',
  components: {
    FoodItem
  },
  data: () => ({
    foodItems,
    detailedOrder: { status: 'draft' }
  }),
  computed: {
    computedOrder() {
      // eslint-disable-next-line
      const { status, ...items } = this.detailedOrder;
      // const nonZeroItems = Object.keys(items).filter(item => {
      //   if (items[item].price > 0) return items[item]
      // });
      // console.log(nonZeroItems)
      for (let item in items) {
        if (items[item].price === 0) delete items[item]
      }
      return items
    }
  },
  methods: {
    orderUpdater(order) {
      this.detailedOrder = { ...this.detailedOrder, ...order }
      console.log(this.detailedOrder)
    }
  }
}
</script>

<style>
</style>
