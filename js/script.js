
const { createApp } = Vue

createApp({
    data() {
        return {
            contacts: [
                {
                    num: 1,
                    name: "Michele",
                    description: "Avatar Michele",
                },
                {
                    num: 2,
                    name: "Fabio",
                    description: "Avatar Fabio",
                },
                {
                    num: 3,
                    name: "Samuele",
                    description: "Avatar Samuele",
                },
                {
                    num: 6,
                    name: "Claudia",
                    description: "Avatar Claudia",
                },
                {
                    num: 7,
                    name: "Federico",
                    description: "Avatar Federico",
                },
                {
                    num: 8,
                    name: "Davide",
                    description: "Avatar Davide",
                },
            ]
        }
    },
    methods: {

    }
}).mount('#app')
