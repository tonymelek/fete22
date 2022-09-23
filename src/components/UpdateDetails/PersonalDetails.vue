<template>
  <div class="my-3 p-3 card" v-if="!!user">
 <h3 class="w-100 text-left">Personal details</h3>
  <form @submit="handleSubmit">
    <label for="firstName">First name</label>
    <input class="form-control"  id="firstName" type="text" v-model="firstName"/>
    <label for="lastName">Last name</label>
    <input class="form-control"  id="lastName" type="text" v-model="lastName"/>
    <label for="grade">Grade</label>
    <select name="select-grade" id="grade" class="form-select" v-model="selectedGrade">
        <option v-for="grade in grades" :key="grade" :value="grade">{{grade}}</option>
    </select>
    <label for="email">Email</label>
    <input class="form-control"  id="email" type="text" :value="user.email" disabled/>
    <label for="mobile">Mobile</label>
    <input class="form-control"  id="mobile" type="text" v-model="mobile"/>
     <label for="role">Role</label>
    <select name="select-role" id="role" class="form-select" v-model="selectedRole">
        <option value="Servant">Servant</option>
        <option value="Student">Student</option>
    </select>
    <label for="address">Address</label>
    <input class="form-control" ref="address"  id="address" type="text" v-model="address"/>

      <SubmitButton :buttonData="{loading,label:loading?'Loading ..':'Submit',class:'btn btn-primary mt-4 w-100'}"/>

</form>
 </div>
</template>
<script>
    import { db } from '../../firebase/main';
    import { doc, setDoc,getDoc} from 'firebase/firestore'
    import SubmitButton from '../commons/SubmitButton.vue';
    export default {
        name:'personal-details',
        loadAFWIdget: true,
        components:{
            SubmitButton
        },
        data:()=>({
            firstName:'',
            lastName:'',
            grades:['Kinder','Prep','G1','G2','G3','G4','G5','G6'],
            selectedRole:'',
            mobile:'',
            selectedGrade:'',
            address:'',
            usedWidget:false,
            loading:false

        }),
        computed:{
            user(){
            return this.$store.state.loggedInUser;
        },
         modalData(){return this.$store.state.modalData}
        },
        async mounted(){
          const widget = new window.AddressFinder.Widget(
                this.$refs.address,
                'ADDRESSFINDER_DEMO_KEY',
                // T7C39AMBHQ8EWXNPY6DF
                'AU', {
                    "address_params": {
                        "gnaf": "1",
                           "state_codes":'VIC'  
                    }
                }
            );
            widget.on('address:select', (fullAddress)=> {
                this.usedWidget=true;
                this.address= fullAddress
            });
            const docRef = doc(db, "users", this.user.email);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
             this.usedWidget=true;   
            const{firstName,mobile,address,grade,role,lastName}=docSnap.data();
             this.selectedRole=role;
             this.mobile=mobile;
             this.selectedGrade=grade;
             this.address=address;
             this.firstName=firstName;
            this.lastName=lastName;
            }
        },
        methods:{
            async handleSubmit(e){
                e.preventDefault();
                let newModalData;
                this.loading=true;
                console.log(
            this.selectedRole,
            this.mobile,
            this.selectedGrade,
            this.address,
            this.firstName,
            this.lastName,
            this.usedWidget
                )
            if(this.usedWidget){
             try{
            await setDoc(doc(db, "users", this.user.email), {
            role:this.selectedRole,
            mobile:this.mobile,
            grade:this.selectedGrade,
            address:this.address,
            firstName:this.firstName,
            lastName:this.lastName,
                });    
           newModalData={
            display:'d-flex',
            modalType:'success',
            modalText:`You have been successfully updated data for ${this.user.email}` 
            }
            
             }catch(error){
            newModalData={
            display:'d-flex',
            modalType:'error',
            modalText:`${error.code}` 
            }
             }   
            this.$store.commit('setModalData',newModalData);              
            } else{
            newModalData={
            display:'d-flex',
            modalType:'error',
            modalText:`Please, select a valid address from the suggested options` 
            }
            }
             this.loading=false;  
              
            }
        }
    };
    
</script>

<style scoped>

</style>