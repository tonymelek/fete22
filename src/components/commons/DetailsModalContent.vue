<template>
    <div>
       <h2 class="text-center">{{userDetails.firstName}} {{userDetails.lastName}}</h2>
      <form v-if="formData!==null">
      <div class="row">
        <!-- <div class="col">
             <label for="firstName">First name</label>
            <input class="form-control"  id="firstName" type="text" v-model="formData.firstName"/>
        </div> -->
        <TextInput label="First name" fieldName="firstName" :originalValue="formData.firstName" @updateFormdata="updateFormData"/>
        <TextInput label="Last name" fieldName="lastName" :originalValue="formData.lastName" @updateFormdata="updateFormData"/>

        <!-- <div class="col">
            <label for="lastName">Last name</label>
            <input class="form-control"  id="lastName" type="text" v-model="formData.lastName"/>
        </div> -->
      </div>
       <div class="row">
        <div class="col">
           <label for="grade">Grade</label>
            <select name="select-grade" id="grade" class="form-select" v-model="formData.grade">
                <option v-for="grade in grades" :key="grade" :value="grade">{{grade}}</option>
            </select>
        </div>
        <div class="col">
            <label for="role">Role</label>
            <select name="select-role" id="role" class="form-select" v-model="formData.role">
                <option v-for="role in roles" :key="role" :value="role">{{role}}</option>
            </select>
        </div>
       </div> 
       <div class="row">
        <div class="col">
            <label for="birthday">Birthday</label>
            <input id="birthday" class="form-control" type="date" v-model="formData.Birthday"/>
        </div>
        <div class="col">
           <label for="role">Gender</label>
            <select name="select-gender" id="gender" class="form-select" v-model="formData.Gender">
                <option v-for="gender in genders" :key="gender" :value="gender">{{gender}}</option>
            </select>
        </div>
       </div>   
       
       </form>
       <p>Address: <span v-if="userDetails.unit!==''">{{userDetails.unit}}/ </span>
       {{userDetails['street number']}} 
       {{userDetails['street name']}} 
       {{userDetails['street type']}}, {{userDetails['suburb']}}, VIC {{userDetails.postcode}}</p>
       <p>Attendance: {{userDetails.attendance}}</p>
       <p>Mother name: {{userDetails['Parent 1 me (mum)']}}</p>
       <p>Mother mobile: {{userDetails['Parent1phoneNumber']}}</p>
       <p>Mother email: {{userDetails['Parent 1 Email']}}</p>
       <p>Father name: {{userDetails['Parent 2 name Dad']}}</p>
       <p>Father mobile: {{userDetails['Parent2phoneNumber']}}</p>
       <p>Father email: {{userDetails['Parent 2 Email']}}</p>
     
    </div>
</template>

<script>
import TextInput from './TextInput.vue';
    export default {
    name: "datails-modal-content",
    props: {
        userDetails: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        formData: null,
        grades: ["Kinder", "Prep", "G1", "G2", "G3", "G4", "G5", "G6"],
        roles: ["Student", "Servant"],
        genders: ["Male", "Female"]
    }),
    watch: {
        userDetails: {
            handler() {
                this.formData = { ...this.userDetails, Birthday: this.formatDate(this.userDetails.Birthday) };
            },
            deep: true
        }
    },
    methods: {
        formatDate(stringDate) {
            if (!stringDate.includes("/"))
                return stringDate;
            const array = stringDate.split("/");
            return `${array[2]}-${array[1]}-${array[0]}`;
        },
        updateFormData(fieldData){
            this.formData={...this.formData,...fieldData}
            console.log(this.formData);
        }
    },
    components: { TextInput }
}
</script>

<style scoped>

</style>