const requiredKeys=[  "order_id",
"order_total",
"orderpayment_type",
"orderstatus_name",
"customer_name",
"payment_pickupday",
]

const app = {
    data() {
        return {
            orders:[],
            cleanedOrders:[]
        }

    },
    computed: {
        

    },
    methods: {
        cleanData(){
            this.cleanedOrders=JSON.parse(this.orders).map(order=>{
                const cleanedOrder={}
                for (let key in order) {
                    if (requiredKeys.includes(key)||key.match(/product_id_[\d]+/)){
                        if(key.includes('payment_pickupday')){
                            const dateArray=order.payment_pickupday.split(' ')[1].split('.');
                            const time=parseInt(order.payment_pickuptime.split(':')[0]);
                            cleanedOrder.date=new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}T${time<6?time+12:time}:00:00.000Z`);
                            cleanedOrder.time=new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}T${time<6?time+12:time}:00:00.000Z`).getTime();   

                        }else if(key.match(/product_id_[\d]+/)){
                            const product_num=key.split('_')[(key.split('_').length-1)];
                            if(!cleanedOrder.orderItems)cleanedOrder.orderItems=[]
                            if(order[`product_name_${product_num}`]!=='') 
                            cleanedOrder.orderItems.push({
                                name: order[`product_name_${product_num}`],
                                options:order[`product_options_${product_num}`],
                                quantity:order[`product_quantity_${product_num}`],
                                total:order[`product_total_with_tax_${product_num}`],
                            }); 
                        }
                        else{
                            cleanedOrder[key]=order[key]
                        }
                    }
                    
                }
                    return cleanedOrder;
                }).filter(order=>order.orderstatus_name!=='Cancelled')
                .sort((a,b)=>a.time-b.time);
        },
        getDate(time){
            return `${new Date(time).toDateString()} - ${new Date(time).getUTCHours()}`;
        }
    }

}
Vue.createApp(app).mount('#app')
