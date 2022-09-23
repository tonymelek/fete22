<template>
    <div>
            <h2 class="text-center" :class="modalBg[modalData.modalType]" >{{modalTitle[modalData.modalType]}}</h2>
            <p class="p-2 text-center">{{modalData.modalText}}</p>
    </div>
</template>

<script>
    export default {
        name:"notification-modal-content",
        data:()=>({
            modalBg:{
                'success':'green',
                'error':'red'
            },
            modalTitle:{
                'success':'Congratulations !',
                'error': 'Error !'
            }
        }),
        computed:{
            modalData(){return this.$store.state.modalData}
        },
    }
</script>

<style scoped>
.green{
    color: rgb(29, 172, 29);
}
.red{
    color:red;
}
</style>