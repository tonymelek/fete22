export const foodItems = [
    { name: "Middle-East pies (Fatayer)", type: "pies" },
    { name: "Sandwitch", type: "sandwitch" },
    { name: "Container", type: "container" },
    { name: "Mombar", type: "mombar"},
    { name: "Vine Leaves (waraq 3enab)", type: "vine-leaves"}

];

export const foodOptions = {
    pies: {
        options: ['Pasterma & Cheese', 'Vegetables', 'Minced meat', 'Sausage'],
        price: { Small: 5, Medium: 9, Large: 14 }
    },
    sandwitch: {
        options: ['Sausage', 'Alexandrian Liver'],
        price: 5
    },

    container: {
        options: ['Sausage', 'Alexandrian Liver'],
        price: { Small: 5, Large: 10 }
    },
    mombar: {
        options:['Mombar'],
        price: {"1/4kg":7.5,"1/5kg":15,"1kg":30}
    },
    "vine-leaves": {
        options:['Vine Leaves'],
        price: {"1/4kg":7.5,"1/5kg":15,"1kg":30}
    }
}