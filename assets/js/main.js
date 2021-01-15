var app = new Vue({
  el: '#app',
  data: {
    hours: '00',
    minutes: '00',
    seconds: '00',
    interval: '',
    disable: false,
    changeButtonPause: {
      change: false,
      textButton: 'PAUSE',
      icon: 'fas fa-pause'
    }
  },

  methods: {
    startTimer: function() {
      this.interval = setInterval(this.executeTime, 1000)
      this.disable = true
    },

    stopTimer: function() {
      if(this.changeButtonPause.change) {
        this.startTimer()
      } else {
        clearInterval(this.interval)
      }

      this.changeButtonPause.change = !this.changeButtonPause.change
      this.changeButtonPause.textButton = this.changeButtonPause.change ? 'RETOMAR' : 'PAUSE'
      this.changeButtonPause.icon = this.changeButtonPause.change ? 'fas fa-step-backward' : 'fas fa-pause'
    },
    
    resetTimer: function() {
        this.hours = '00'
        this.minutes = '00'
        this.seconds = '00'
        this.stopTimer();
        this.disable = false
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
    }
  }
})