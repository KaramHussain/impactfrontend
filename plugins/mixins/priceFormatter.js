import Vue from 'vue'

export function priceFormatter(price, currency = 'USD') {

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  });
  return formatter.format(price)

}

export function priceShorter(price) {
  // console.log(Math.abs(price))
  if(Math.abs(price) > 999999) {
    return '$' + Math.sign(price)*((Math.abs(price)/1000000).toFixed(1)) + 'M';
  }
  else if(Math.abs(price) > 999) {
    return '$' + Math.sign(price)*((Math.abs(price)/1000).toFixed(1)) + 'k';
  }
  else {
    return priceFormatter(price, 'USD')
  }
}

export function formatDigit(digit) {
  if(!digit) return 
  return digit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const formatterFunction = {

  install(Vue, options) {

    Vue.mixin({

      computed: {

        formatter() {

          return function(price, currency = 'USD') {
            return priceFormatter(price, currency) || 0
          }

        },

        priceShorter() {

          return function(price) {
            return priceShorter(price) || 0
          }

        },

        digitFormatter() {
          return function(digit) {
            return formatDigit(digit)
          }
        }

      }

    })

  }

}

Vue.use(formatterFunction)
