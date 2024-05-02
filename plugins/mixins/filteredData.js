
import Vue from 'vue'

const filteredData = {

  install(Vue, options) {

    Vue.mixin({

      computed: {

        filteredItems() {

          return (data, searchTerm = null, sort = {}) => {

            if(searchTerm != null) {
              data = data.filter((row) => {

                return Object.keys(row).some((key) => {
                  let value = row[key]
                  return  String(value).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
                })

              })
            }

            if(sort.key) {

              data = this.lodash.orderBy(data, (row) => {
                let value = row[sort.key]

                if(this.sort.key.indexOf('.') > -1) { //nested key || object

                  let nested_key = this.sort.key.split('.')
                  value = row[nested_key[0]][nested_key[nested_key.length-1]]

                  if(this.sort.key == 'created_at.date') {
                    value = this.$moment(value).format('ll')
                  }
                }

                if(!isNaN(parseFloat(value))) {
                  return parseFloat(value) 
                }

                return String(row[sort.key]).toLowerCase()

              }, sort.order)

            }

            return  data
          }


        }

      }

    })

  }

}

Vue.use(filteredData)
