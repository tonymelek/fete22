<template>
        <div class="col">
             <label :for="fieldName">{{label}}</label>
            <input class="form-control"  :id="fieldName" type="text"  v-model="fieldValue" @change="emitNewValue"/>
        </div>
</template>

<script>
    export default {
        name:'text-input-field',
        props:{
            label:{
                type:String,
                required:true
            },
            fieldName:{
                type:String,
                required:true
            },
            originalValue:{
                type:String,
                required:true
            }
        },
        data:()=>({
            fieldValue:this?.originalValue
        }),
        methods:{
            emitNewValue(){
                this.$emit("updateFormdata",{[this.fieldName]:this.fieldValue})
            }
        },
        mounted(){
                 this.fieldValue=this.originalValue;
        },
        watch:{
            originalValue(){
                 this.fieldValue=this.originalValue;
            }
        }
    }
</script>

<style scoped>

</style>