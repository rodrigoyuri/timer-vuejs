var app = new Vue({
    el: '#app',
    data: {
        clock: '00:00'
    },
    methods: {
        startTimer: () => {
            
        },

        pauseTimer: () => {

        },
        
        resetTimer: () => {
            this.clock = '00:00'
        }
    }
})