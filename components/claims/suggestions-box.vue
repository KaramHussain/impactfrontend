<template>  
    <div class="suggestions-box" v-if="suggestions.length">
        <ul>
            <li @click="$emit('select', suggestion.term)" v-for="(suggestion, index) in suggestions" :key="index">
                {{suggestion.term}}
            </li>
        </ul>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters('claims', {
            suggestions: 'suggestions'
        })
    }
}
</script>
