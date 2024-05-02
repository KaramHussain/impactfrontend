<template>
    <div v-if="payer">
        Payer contact information:<br>
        {{payer['PAYER LAST NAME']}}<br>
        {{payer['COMMUNICATION NUMBER']}}
    </div>
</template>

<script>
export default {
    props: ['payer']
}
</script>

<style>

</style>