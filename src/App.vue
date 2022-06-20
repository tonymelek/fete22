<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 col-12">
        <FoodItem v-for="(item, index) in foodItems" :name="item.name" :type="item.type" :key="index"
          @updateOrder="orderUpdater" />
      </div>
      <div class="col-lg-6 col-12">
        <p class="sticky-top">Order Status: {{ detailedOrder.status }} - $ {{total}}</p>
        <div v-for="(item, index) in Object.keys(computedOrder)" :key="index">
          {{ item}}
        <div v-for="subItem in Object.keys(computedOrder[item])" :key="`${item}-${subItem}`">
            <div v-if="subItem !=='subtotal'"> 
              {{ subItem }} <span v-if="computedOrder[item][subItem].selectedSize"> - {{
              computedOrder[item][subItem].selectedSize
          }}</span> x {{ computedOrder[item][subItem].quantity }}- ${{ computedOrder[item][subItem].price }}
            </div>
        </div> 
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
    detailedOrder: { status: 'draft' },
    total:0
  }),
  computed: {
    computedOrder() {
      // eslint-disable-next-line
      const { status, ...items } = this.detailedOrder;
       const sth={}
      for(let item in items){
        if (items[item].subtotal===0 ||['price','subtotal'].includes(item)) continue
         for(let subItem in items[item]){
          if(items[item][subItem].price===0)continue
          sth[item]={...sth[item],[subItem]:items[item][subItem]}
         } 
        //console.log(item, Object.keys(items[item]),items[item])
      }
      // console.log(sth);
      // // let x=Object.keys(items).map(item=>Object.keys(items[item])
      // //   .filter(v=>!['price','subtotal'].includes(v))
      // //    );
      // //console.log(x);
      // for (let item in items) {
      //   //console.log(item,Object.keys(items[item]));
      //   if (items[item].price === 0) delete items[item]
      // }
      return sth
    }
  },
  methods: {
    orderUpdater(order) {     
      this.detailedOrder = { ...this.detailedOrder, ...order }
      this.total=Object.keys(this.detailedOrder)
      .filter(v=>v!=='status')
      .reduce((a,b)=>a+this.detailedOrder[b].subtotal,0)
    }
  }
}
</script>

<style>
</style>
