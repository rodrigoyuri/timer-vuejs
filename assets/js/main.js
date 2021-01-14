var app = new Vue({
  el: '#app',
  data: {
    hours: '00',
    minutes: '00',
    seconds: '00',
    interval: ''
  },

  methods: {
    startTimer: function() {
      this.interval = setInterval(this.executeTime, 1000)
    },

    stopTimer: function() {
      clearInterval(this.interval)
    },
    
    resetTimer: function() {
        this.hours = '00'
        this.minutes = '00'
        this.seconds = '00'
        this.stopTimer();
    },

    executeTime: function() {
      if(this.minutes == '60') {
        this.hours++
        this.minutes = '00'
      }

      if(this.seconds == '60') {
        this.minutes++
        this.seconds = '00'
      }

      if(this.seconds > 9) {
        this.seconds++
      }

      this.seconds++
    }
  }
})