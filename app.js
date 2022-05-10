const requiredKeys = ["invoice",
    "order_total",
    "orderpayment_type",
    "orderstatus_name",
    "customer_name",
    "payment_pickupday",
]

const app = {
    data() {
        return {
            orders: [],
            cleanedOrders: [],
            displayDates: []
        }

    },
    computed: {
        sortedTotal() {
            let totals = {}
            this.cleanedOrders.forEach(order => order.orderItems.forEach(item => {
                if (totals[`${item.name}-${item.options}`]) {
                    totals[`${item.name}-${item.options}`] += parseInt(item.quantity);
                } else {
                    totals[`${item.name}-${item.options}`] = parseInt(item.quantity);
                }
            }))
            return Object.keys(totals)
                .sort()
                .reduce((acc, key) => ({
                    ...acc, [key]: totals[key]
                }), {})
        }

    },
    methods: {
        cleanData() {
            this.cleanedOrders = JSON.parse(this.orders).map(order => {
                const cleanedOrder = {}
                for (let key in order) {
                    if (requiredKeys.includes(key) || key.match(/product_id_[\d]+/)) {
                        if (key.includes('payment_pickupday')) {
                            const dateArray = order.payment_pickupday.split(' ')[1].split('.');
                            const time = parseInt(order.payment_pickuptime.split(':')[0]);
                            const cleanedOrderIsoDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}T${time < 6 ? time + 12 : time}:00:00.000Z`
                            cleanedOrder.isodate = cleanedOrderIsoDate;
                            cleanedOrder.date = new Date(cleanedOrderIsoDate);
                            cleanedOrder.time = new Date(cleanedOrderIsoDate).getTime();

                        } else if (key.match(/product_id_[\d]+/)) {
                            const product_num = key.split('_')[(key.split('_').length - 1)];
                            if (!cleanedOrder.orderItems) cleanedOrder.orderItems = []
                            if (order[`product_name_${product_num}`] !== '')
                                cleanedOrder.orderItems.push({
                                    name: order[`product_name_${product_num}`],
                                    options: this.cleanOption(order[`product_options_${product_num}`]),
                                    quantity: order[`product_quantity_${product_num}`],
                                    total: order[`product_total_with_tax_${product_num}`],
                                });
                        }
                        else {
                            cleanedOrder[key] = order[key]
                        }
                    }

                }
                return cleanedOrder;
            }).filter(order => order.orderstatus_name !== 'Cancelled')
                .sort((a, b) => a.time - b.time)
                .filter(order => this.displayDates.includes(order.isodate.split('T')[0]))

        },
        getDate(time) {
            const date = new Date(time);
            const shortTime = `${date.getUTCHours()}:00`;
            const shortDate = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
            return `${shortDate} ${shortTime}`
        },
        cleanOption(option) {
            const optionArray = option.includes("|") ? option.split("|") : [option];
            const cleanedOptionArray = optionArray.map(option => option.includes(":") ? option.split(":")[1] : option);
            return `${cleanedOptionArray[0]}${cleanedOptionArray[1] ? ` | ${cleanedOptionArray[1]}` : ''}`
        }
    }

}
Vue.createApp(app).mount('#app')
