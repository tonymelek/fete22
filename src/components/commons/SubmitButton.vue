<template>
  <button type="submit" :class="buttonData.class" :disabled="buttonData.loading">{{buttonData.label}}</button>
</template>

<script>
    export default {
        name:'submit-button',
        props:{
            buttonData: {
                type: Object,
                required: true,
            }
        }
    }
</script>

<style scoped>

</style>