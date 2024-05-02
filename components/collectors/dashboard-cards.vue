<template>
  
    <div class="row">
        
        <dashboard-card 
            class="col-xl-4 col-lg-6 col-md-6 col-12"
            title="Summary Total charges" 
            :value="priceShorter(totalCharges) + ' | ' + totalClaims" 
            icon="fas fa-money-bill-wave-alt font-large-2 warning" 
            @clicked="$emit('clicked', $event)"
            formattedTitle="all"
        />

        <!-- <dashboard-card 
            class="col-xl-4 col-lg-6 col-md-6 col-12"
            title="Due charges" 
            :value="priceShorter(dueCharges)" 
            icon="fas fa-money-check-alt font-large-2 danger" 
        /> -->

        <dashboard-card 
            class="col-xl-4 col-lg-6 col-md-6 col-12"
            title="Expected Revenue" 
            :value="priceShorter(moneyGathered) + ' | ' + submittedClaims" 
            icon="fas fa-file-invoice-dollar font-large-2 info"
            @clicked="$emit('clicked', $event)" 
            formattedTitle="submitted"
        />

        <dashboard-card 
            class="col-xl-4 col-lg-6 col-md-6 col-12"
            title="Pending Claims" 
            :value="priceShorter(dueCharges) + ' | ' + unpaidClaims" 
            icon="fas fa-receipt font-large-2 success" 
            @clicked="$emit('clicked', $event)"
            formattedTitle="assigned"
        />

        <dashboard-card 
            class="col-xl-4 col-lg-6 col-md-6 col-12"
            title="Collected Revenue" 
            :value="priceShorter(resolvedCharges) + ' | ' + resolvedClaims" 
            icon="fas fa-donate font-large-2 info"
            @clicked="$emit('clicked', $event)" 
            formattedTitle="accepted"
        />

        <dashboard-card 
            class="col-xl-4 col-lg-6 col-md-6 col-12"
            title="Average Collected Ratio" 
            :value="averageCollected" 
            icon="fas fa-money-check-alt font-large-2 danger" 
            @clicked="$emit('clicked', $event)"
            formattedTitle="avg_raito"
        />

        <dashboard-card 
            class="col-xl-4 col-lg-6 col-md-6 col-12"
            title="Avg days to collect" 
            :value="0" 
            icon="fas fa-hand-holding-usd font-large-2 info" 
            @clicked="$emit('clicked', $event)"
            formattedTitle="avg_days_to_collect"
        />


    </div>
            
</template>

<script>
import dashboardCard from './dashboard-card'
export default {

    components: {
        dashboardCard
    },

    props: [
        'claims'
    ],

    computed: {
        
        unpaidClaims() {
            return this.filteredClaims('assigned').length
        },

        submittedClaims() {
            return this.filteredClaims('submitted').length
        },

        resolvedClaims() {
            return this.filteredClaims('accepted', 'claim_status').length
        },

        resolvedCharges() {
          return this.charges('accepted', 'claim_status')  
        },

        totalCharges() { 
            let charges = this.charges
            return charges('assigned') + charges('submitted') + charges('denied', 'claim_status')
        },

        moneyGathered() { 
           let charges = this.charges
           return charges('submitted') + charges('denied', 'claim_status')
        },
        
        dueCharges() {
            return this.totalCharges - this.moneyGathered
        },

        totalClaims() {
            return this.unpaidClaims + this.submittedClaims + this.resolvedClaims
        },

        averageCollected() {
            return (this.resolvedCharges / this.totalCharges).toFixed(2)
        }
    },

    methods: {
        filteredClaims(status, key = 'status') {
            return this.claims.filter(claim => claim[key].toLowerCase() === status.toLowerCase())
        },
        getTotalCharges(claims = []) {
            claims = claims.length ? claims : this.claims
            if(!claims.length) return 0
            return claims.map(claim => claim.total_claim_charges)
            .reduce(((acc, value) => acc + value), 0)
        },
        charges(status, key = 'status') {
            return Number(this.getTotalCharges(this.filteredClaims(status, key)))
        }
    }
}
</script>
