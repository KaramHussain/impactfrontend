<template>
  
    <div class="row">

        <dashboard-card 
            class="col-xl-3 col-lg-3 col-md-6 col-12"
            title="Summary Total charges" 
            :value="priceShorter(stats.total_charges) + ' | ' + totalClaims" 
            icon="fas fa-money-bill-wave-alt font-large-2 warning"
            @clicked="$emit('clicked', $event)"
            formattedTitle="all"  
        />

        <dashboard-card 
            class="col-xl-3 col-lg-3 col-md-6 col-12"
            title="Expected revenue" 
            :value="priceShorter(stats.expected_revenue) + ' | ' + expectedClaims" 
            icon="fas fa-file-invoice-dollar font-large-2 info"
            @clicked="$emit('clicked', $event)" 
            formattedTitle="denied"
        />
    
        <dashboard-card 
            class="col-xl-3 col-lg-3 col-md-6 col-12"
            title="Unpassed Claims" 
            :value="priceShorter(stats.due_charges) + ' | ' + stats.unpaid_claims" 
            icon="fas fa-receipt font-large-2 success" 
            @clicked="$emit('clicked', $event)"
            formattedTitle="unpaid_claims"
        />

        <dashboard-card 
            class="col-xl-3 col-lg-3 col-md-6 col-12"
            title="Collected Revenue" 
            :value="priceShorter(stats.money_gathered) + ' | ' + stats.eob_accepted_claims" 
            icon="fas fa-donate font-large-2 info"
            @clicked="$emit('clicked', $event)"
            formattedTitle="accepted" 
        />

        <dashboard-card 
            class="col-xl-3 col-lg-3 col-md-6 col-12"
            title="Re submitted" 
            :value="priceShorter(stats.submitted_charges) + ' | ' + stats.submitted_claims" 
            icon="fas fa-donate font-large-2 info"
            @clicked="$emit('clicked', $event)"
            formattedTitle="submitted" 
        />

        <dashboard-card 
            class="col-xl-3 col-lg-3 col-md-6 col-12"
            title="Due charges" 
            :value="priceShorter(stats.due_charges) + ' | ' + stats.unpaid_claims" 
            icon="fas fa-money-check-alt font-large-2 danger"
            @clicked="$emit('clicked', $event)" 
            formattedTitle="unpaid_claims" 
        />

        <!-- @clicked="$emit('clicked', $event)" -->
        <dashboard-card 
            class="col-xl-3 col-lg-3 col-md-6 col-12"
            title="Avg collected raito" 
            :value="(stats.eob_accepted_claims / totalClaims).toFixed(2)" 
            icon="fas fa-file-invoice-dollar font-large-2 info"
            formattedTitle="avg_collected_raito" 
        />

        <dashboard-card 
            class="col-xl-3 col-lg-3 col-md-6 col-12"
            title="Avg days to collect" 
            :value="stats.avg_days_to_resolve" 
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

    props: {
        stats: {
            required: true,
            type: Object
        }
    },

    computed: {

        expectedClaims() {
            return Number(this.stats.eob_denied_claims) + Number(this.stats.submitted_claims)
        },

        totalClaims() {
           
            let total =  
            (parseInt(this.stats.assigned_claims) 
            + parseInt(this.stats.submitted_claims) 
            + parseInt(this.stats.resolved_claims) 
            + parseInt(this.stats.opened_claims))
            return total
        }
    }

}
</script>
