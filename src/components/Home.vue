<template>
   <div class="container">
    <div class="row">
      <div class="col-lg-6 col-12">
        <div v-for="type in allTypes" :key="type">
              <input type="checkbox" :id="type" :value="type" v-model="selectedTypes">
              <label :for="type">{{type}}</label>
        </div>
       
        <FoodItem v-for="item in foodItems.filter(v=>selectedTypes.includes(v.type))" :name="item.name" :type="item.type" :key="item"
          @updateOrder="orderUpdater" />
      </div>
      <div class="col-lg-6 col-12">
        <p class="sticky-top">Order Status: {{ detailedOrder.status }} - $ {{total}}</p>
        <div v-for="(item, index) in Object.keys(computedOrder)" :key="index">
          <strong>
{{ item}}
          </strong>
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
import FoodItem from './FoodItem.vue'
import { foodItems} from '../constants'

    export default {
        name:'Home-Page',
        components: {
    FoodItem
  },
  data: () => ({
    foodItems,
    detailedOrder: { },
    selectedTypes:[],
    allTypes:foodItems.map(v=>v.type),
    status:'draft'
  }),
    methods: {
    orderUpdater(order) {     
      this.detailedOrder = { ...this.detailedOrder, ...order }
    }
  },
  computed: {
    computedOrder() {
      const items  = this.detailedOrder;
      const cleanedOrder={}
      const selectedItemNames= this.foodItems.filter(v=>this.selectedTypes.includes(v.type)).map(v=>v.name)
      for(let item in items){
        if(!selectedItemNames.includes(item)) continue
        if (items[item].subtotal===0 ||['price','subtotal'].includes(item)) continue
         for(let subItem in items[item]){
          if(items[item][subItem].price===0)continue
          cleanedOrder[item]={...cleanedOrder[item],[subItem]:items[item][subItem]}
         } 
      }
      return cleanedOrder
    },
    total(){
      const selectedItemNames= this.foodItems.filter(v=>this.selectedTypes.includes(v.type)).map(v=>v.name)
      return Object.keys(this.detailedOrder)
      .filter(v=>selectedItemNames.includes(v))
      .reduce((a,b)=>a+this.detailedOrder[b].subtotal,0)
    },
    orderToSubmit(){
      return{
        userId:'',
        status:this.status,
        total:this.total,
        orderDetails:this.computedOrder
      }
    }
  }
  }
</script>

<style scoped>

</style>