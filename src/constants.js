export const foodItems = [
    { name: "Middle-East pies (Fatayer)", type: "pies" },
    { name: "Sandwitch", type: "sandwitch" },
    { name: "Container", type: "container" }
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
    }
}