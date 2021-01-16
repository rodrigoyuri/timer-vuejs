var app = new Vue({
  el: '#app',
  data: {
    hours: '00',
    minutes: '00',
    seconds: '00',
    interval: '',
    disable: false,
    buttonStop: {
      change: false,
      textButton: 'PAUSE',
      icon: 'fas fa-pause'
    },
  },

  methods: {
    startTimer: function() {
      this.interval = setInterval(this.executeTime, 1000)
      this.disable = true
    },

    stopTimer: function() {
      if(this.buttonStop.change) {
        this.startTimer()
      } else {
        clearInterval(this.interval)
      }

      this.changeButtonStop()
    },
    
    resetTimer: function() {
      this.initialState()   
      clearInterval(this.interval);
    },

    changeButtonStop: function() {
      this.buttonStop.change = !this.buttonStop.change
      this.buttonStop.textButton = this.buttonStop.change ? 'RETOMAR' : 'PAUSE'
      this.buttonStop.icon = this.buttonStop.change ? 'fas fa-step-backward' : 'fas fa-pause'
    },

    executeTime: function() {
      if(this.minutes == '59') {
        this.hours = this.validateDigit(this.hours)
        this.minutes = '00'
      } else if(this.seconds == '59') {
        this.minutes = this.validateDigit(this.minutes)
        this.seconds = '00'
      } else {
        this.seconds = this.validateDigit(this.seconds)
      }
    },
    
    validateDigit: function(digit) {
      if(digit < 9) {
        return this.formatDigit(digit)
      }
      return ++digit
    },

    formatDigit: function(valueTimer) {
      let resultValue = valueTimer.split('')
      resultValue[1] = ++resultValue[1]
      return resultValue.join('')
    },

    initialState: function() {
      this.hours = '00'
      this.minutes = '00'
      this.seconds = '00'
      this.disable = false
      this.buttonStop.change = false
      this.buttonStop.textButton = 'PAUSE'
      this.buttonStop.icon = 'fas fa-pause' 
    }
  }
})