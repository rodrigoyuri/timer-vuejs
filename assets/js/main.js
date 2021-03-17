var app = new Vue({
  el: '#app',
  data: {
    hours: '00',
    minutes: '00',
    seconds: '00',
    interval: '',
    disableButtons: false,
    disableInputsTimer: false,
    buttonStop: {
      change: false,
      textButton: 'PAUSE',
      icon: 'fas fa-pause'
    },
    showInput: false,
    type: 'stopWatch'
  },

  methods: {
    startTimer: function() {
      if(this.type == 'timer') {
        this.interval = setInterval(this.executeTimer, 1000)
      } else {
        this.interval = setInterval(this.executeStopwatch, 1000)
      }
      this.disableButtons = true
      this.disableInputsTimer = true
    },

    stopTimer: function() {
      if(this.buttonStop.change) {
        this.startTimer()
      } else {
        clearInterval(this.interval)
      }
      this.disableInputsTimer = false
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

    executeStopwatch: function() {
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

    executeTimer: function() {
      if(this.hours != '00' && this.minutes == '00' && this.seconds == '00') {
        this.hours = this.validateDigit(this.hours)
        this.minutes = '59'
        this.seconds = '59'
      } else if(this.minutes != '00' && this.seconds == '00') {
        this.minutes = this.validateDigit(this.minutes)
         this.seconds = '59'
      } else if(this.seconds == '00') {
        this.notificationSound()
        this.resetTimer()
      }
      else {
        this.seconds = this.validateDigit(this.seconds)
      }
    },
    
    validateDigit: function(digit) {
      if(this.type == 'timer') {
        if(digit <= 10) {
          return this.formatDigit(digit)
        }
        return --digit  

      } else {
        if(digit < 9) {
          return this.formatDigit(digit)
        } 
        return ++digit

      }
    },

    formatDigit: function(valueTimer) {
      let resultValue;
      
      if(this.type == 'stopWatch') {
        resultValue = valueTimer.split('')
        resultValue[1] = ++resultValue[1]
        return resultValue.join('')
      } else {
        resultValue = ['0', '0']
        resultValue[1] = --valueTimer
        return resultValue.join('')
      }
      
    },

    initialState: function() {
      this.hours = '00'
      this.minutes = '00'
      this.seconds = '00'
      this.disableButtons = false
      this.disableInputsTimer = false
      this.buttonStop.change = false
      this.buttonStop.textButton = 'PAUSE'
      this.buttonStop.icon = 'fas fa-pause' 
    },

    renderInputTimer: function() {
      this.showInput = true
      this.type = 'timer'
    },

    renderStopwatch: function() {
      this.showInput = false
      this.type = 'stopWatch'
    },

    notificationSound: function() {
      let audio = new Audio('./assets/sounds/bell_ring.ogg')
      audio.play()
    }
  }
})