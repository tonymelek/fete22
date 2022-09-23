<template>
    <div class="modal-container" :class="modalData.display " >
        <div class="card m-3 p-2 max-width-500 modal-bg">
         <div class="d-flex justify-content-end">
            <button class="btn btn-danger w-3-rem" @click="hideModal"> <strong>X</strong> </button>
         </div>
           
        <NotificationModalContent v-if="purpose==='notification'"/>  
        <DetailsModalContent :userDetails="userDetails"  v-if="purpose==='userDetails'" />

        </div>
    </div>
</template>

<script>
import NotificationModalContent from './NotificationModalContent.vue';
import DetailsModalContent from './DetailsModalContent.vue';
    export default {
    name: "modal-container",
    props:{
        purpose:{
            type:String,
            required:true
        },
        userDetails:{
            type:Object,
            required:false
        }
    },
    computed: {
        modalData() { return this.$store.state.modalData; }
    },
    methods: {
        hideModal(e) {
            e.preventDefault();
            this.$store.commit("setModalData", { ...this.modalData, display: "d-none" });
        }
    },
    components: { NotificationModalContent, DetailsModalContent }
}
</script>

<style scoped>
body,html{
    height: 100%;
}
.modal-container{
    width: 100%;
    height:100%;
    background-color: white;
    position: absolute;
    z-index:10;
    display: flex;
    justify-content: center;
    align-items:flex-start;
}
.max-width-500{
    width:100%;
    max-width:500px;
}
.w-3-rem{
    width:3rem;
}

.modal-bg{
    background: beige;
}
</style>