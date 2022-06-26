<template>
    <div class="modal-container" :class="display" >
        <div :class="modalBg[modalType]" class="card m-3 p-2 max-width-500 ">
        <div class="d-flex justify-content-end">
            <button class="btn btn-light w-3-rem" @click="hideModal">x</button>
        </div>
           
            <h2 class="text-center">{{modalTitle[modalType]}}</h2>
            <p class="p-2">{{modalText}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name:"modal-container",
        props:{
            display:{
                type:String,
                default:'d-none',
                required: false
            },
            modalType:{
                type:String,
                default:'success',
                required: false
            },
             modalText:{
                type:String,
                default:'no text passed',
                required: false
            }

        },
        data:()=>({
            modalBg:{
                'success':'bg-success-light',
                'error':'bg-danger-light'
            },
            modalTitle:{
                'success':'Congratulations !',
                'error': 'Error !'
            },
            displayModal:'d-none'
        }),
        methods:{
            hideModal(e){
                e.preventDefault();
                this.$emit('hideModal','d-none')
            }
        }
       
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
    background-color: transparent;
}
</style>