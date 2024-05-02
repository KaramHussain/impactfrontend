<template>

  <main>

    <impactHeader />

    <impactSidebar />

    <div class="app-content content">

      <div class="content-overlay"></div>

        <div class="content-wrapper">

          
          
          <h3 class="content-header-title mb-0 d-inline-block mr-2">Collector reports</h3>
          <breadcrumbs path="claims" />
          
        
          <div class="content-header row">

          
            <div class="col-12">
                <h4 class="my-1">Filters</h4>
                <date-filter :to.sync="filters.to" :from.sync="filters.from" />
            </div>

            <div class="col-md-6">
              <label for="">Performance Type</label>
              <div class="dropdown">
                <a class="btn btn-light filter-btn btn-sm dropdown-toggle" href="#" role="button" id="responseLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Select headers
                </a>

                <div class="dropdown-menu" aria-labelledby="responseLink">
                  
                  <a class="dropdown-item" href="javascript:void(0)" v-for="{key, value} in claimHeaders" :key="value">
                    <label :for="value">
                      <input type="checkbox" :checked="shouldBeChecked(value, 'graphType')" :id="value" :value="value" name="claimHeader" @change="addFilter($event, 'graphType')"> 
                      {{key}}
                    </label>
                  </a>

                </div>

              </div>

            </div>

    
            <div class="col-md-6">

                <div class="form-group">
                    
                  <label class="form-label" for="status">Payers</label> 

                  <div class="dropdown">
                    <a class="btn btn-light filter-btn btn-sm dropdown-toggle" href="#" role="button" id="statusLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Select Payers
                    </a>

                    <div class="dropdown-menu" aria-labelledby="statusLink">
                        
                      <a class="dropdown-item" href="javascript:void(0)" v-for="payer in payers" :key="payer['PAYER ID']">
                        <label>
                          <input type="checkbox" :checked="shouldBeChecked(payer['PAYER ID'], 'payers')" :id="payer['PAYER ID']" :value="payer['PAYER ID']" name="status" @change="addFilter($event, 'payers')"> 
                          {{payer['PAYER NAME']}}
                        </label>
                      </a>

                    </div>

                  </div>

                </div>
                
            </div>

            <div class="filter col-12 mb-1">
              <button class="btn btn-primary btn-sm" @click.prevent="filter">Filter</button>
              <button class="btn btn-primary btn-sm" @click.prevent="reset">Reset</button>
            </div>   

          </div>

          <div class="content-body">

            <section id="dom">

              <div class="card">
                      
                <div class="card-content collapse show">
                    
                  <div class="card-body card-dashboard">
                    <collector-stats :types="filters.graphType" />
                  </div>

                </div>

              </div>

              <div class="card">
                      
                <div class="card-content collapse show">
                    
                  <div class="card-body card-dashboard">
                    <collector-average :types="filters.graphType" />
                  </div>

                </div>

              </div>

            </section>

          </div>

        </div>

    </div>

    <impactFooter />

  </main>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import impactHeader from '@/components/layouts/impact-header'
import impactFooter from '@/components/layouts/impact-footer'
import impactSidebar from '@/components/layouts/impact-sidebar'
import breadcrumbs from '@/components/breadcrumbs'
import dateFilter from '@/components/filters/date-filter'
import collectorStats from '@/components/charts/reports/collector-stats'
import collectorAverage from '@/components/charts/reports/collector-average'


export default {

  middleware: ['auth', 'admin'],

  head() {
    return {
      title: 'Claims list'
    }
  },

  components: {
    impactHeader,
    impactFooter,
    impactSidebar,
    breadcrumbs,
    dateFilter,
    collectorStats,
    collectorAverage
  },

  data() {
    return {
      filters: {
        from: null,
        to: null,
        graphType: [],
        payers: []
      }
    }
  },

  computed: {
    
    ...mapGetters('profile', {
      payers: 'payers'
    }),

    claimHeaders() {
      return [
        {key: 'Resubmitted', value: 'submitted' },
        {key: 'Expected Revenue', value: 'expected_revenue' },
        {key: 'Avg collected raito', value: 'avg_collected_raito' },
        {key: 'Avg days to collect', value: 'avg_days_to_collect' },
        {key: 'Collected revenue', value: 'collected_revenue' }
      ]
    }
  },
   

  methods: {

    ...mapActions({
      fetchPayers : 'profile/fetchPayers',
      collectData : 'graphs/collectData'
    }),

    filter() {
      this.$router.replace({
        query: {
          ...this.validatedFilters()
        }
      })

      this.getCollectorStats()
    },

    shouldBeChecked(value, type) {
      return this.filters[type].includes(value)
    },

    addFilter(event, type) {
      let values = [...this.filters[type]]
      if(event.target.checked) {
        values = [...values, event.target.value]
      }
      else {
        values = values.filter((res) => res !== event.target.value)
      }
      this.$set(this.filters, type, values)
    },

    routeFilters() {
      if(this.$route.query) {
        let qs = this.$route.query
        this.filters.from = qs.from
        this.filters.to = qs.to
        this.filters.payers = qs.payers || []
        this.filters.graphType = qs.graphType || []
      }
    },

    reset() {
     
      this.filters.from = null
      this.filters.to = null
      this.filters.payers = []
      this.filters.graphType = []
      this.filter() 
    },


    validatedFilters() {
      let filters = {}
      for(const [key, value] of Object.entries(this.filters)) {
        if(value == null || value == 0 || value == '' || value == 'undefined') {
          continue
        }
        filters[key] = value
      }
      return filters
    },

    getCollectorStats() {

      let filters = this.validatedFilters() 

      return new Promise((resolve) => {
 
        this.$axios.post('provider/get-collector-stats-reports', {...filters})
        .then(({data}) => {
          
          this.collectData({data, name: 'collectorStats'})

        })

      })  
      
    }

  },

  created() {
    this.fetchPayers()
    this.routeFilters()
    this.getCollectorStats()    
  },

}

</script>

<style lang="scss" scoped>
  .dropdown .dropdown-menu .dropdown-item {
    padding: 5px 15px !important;
  }
  .filter-btn {
    background: #fff !important;
    color:#222 !important;
    width:100%;
    text-align:left;
    border:1px solid #babfc7 !important;
  }
</style>
