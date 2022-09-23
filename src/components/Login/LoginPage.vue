<template>
<Modal purpose="notification"/>
<div class="container d-flex justify-content-center">
<div class="max-width-500 card p-3 m-2">
<h3 class="w-100 text-left mb-4">{{selectedForm}} Form</h3>
<form @submit="handleFormSubmit">
  <div class="mb-3">
    <label for="exampleInputEmail1" class="w-100 text-left">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" :disabled="modalData.display!=='d-none'" v-model="email">
  </div>
  <div class="mb-3">
    <label for="password" class="w-100 text-left">Password</label>
    <input type="password" class="form-control" id="password" v-model="password" :disabled="modalData.display!=='d-none'">
  </div>

  <SubmitButton :buttonData="{loading,label:loading?'Loading ..':selectedForm,class:'btn btn-primary w-50'}"/>

</form>
<a href=""  @click="resetPassword" :disabled="!loading">Send e-mail to reset password</a>
</div>
</div>
</template>

<script>
import Modal from '../commons/Modal.vue';
import SubmitButton from '../commons/SubmitButton.vue';
import { auth} from '../../firebase/main';
// import { collection, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail } from 'firebase/auth'
//import { router } from '../../router';

export default {
  name: 'LoginPage',
  components:{
    Modal,
    SubmitButton
  },
  data:()=>({
    email:"",
    password:"",
    user:null,
    false:false,
    signedIn:true,
    loading:false
  }),
  computed:{
    selectedForm(){
      return this.$store.state.selectedForm;
    },
    modalData(){return this.$store.state.modalData}
  },
  mounted(){

  },
  methods:{

    async handleFormSubmit(e){
      e.preventDefault();
      this.loading=true;
      switch (this.selectedForm){
        case 'Sign in':
          this.handleSignIn()
          break;
        case 'Sign up':
          this.handleSignUp()
          break;
        default:
          break;    
      }
  
    },
    async handleSignUp(){
        try{
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        this.loading=false;
       const newModalData={
            display:'d-flex',
            modalType:'success',
            modalText:"You have been successfully signed up to the app, you can navigate the app"
        }
         this.$store.commit('setModalData',newModalData);
      
      }catch(err){
        if(err.code==='auth/email-already-in-use'){
            this.loading=false;
            const newModalData={
            display:'d-flex',
            modalType:'error',
            modalText:"This email already exists, please use Sign-in form to login or reset your password"
        }
         this.$store.commit('setModalData',newModalData);
          } 
        
        }
    }

    ,
    async handleSignIn(){
      this.loading=true;
      let modalType='';
      let modalText='';
     
      try{
        await signInWithEmailAndPassword(auth, this.email, this.password);
      }catch(error){
        modalType="error"
        if(error.code==='auth/wrong-password'){
            modalText="This email already exists, but you typed wrong password,try again or reset your password"
      }else if(error.code==='auth/user-not-found') {
        modalText="This email is not found in the database, check for typos or Sign up"
      }
      const newModalData={
            display:'d-flex',
            modalType,
            modalText
        }
         this.$store.commit('setModalData',newModalData);
    }
    this.loading=false;

    } ,

  async resetPassword(e){ 
    e.preventDefault();
    this.loading=true;
    try{
      await sendPasswordResetEmail(auth, this.email);
        const newModalData={
            display:'d-flex',
            modalType:'success',
            modalText:"Reset Password e-mail has been sent to you, please check your e-mail, you find the e-mail in your spam/ junk folder"
        }
         this.$store.commit('setModalData',newModalData);
    }
  catch(error) {
       const newModalData={
            display:'d-flex',
            modalType:'error',
            modalText:error.code==='auth/user-not-found' && 'This email is not found in the database, check for typos or Sign up'
        }
         this.$store.commit('setModalData',newModalData);
  }
  this.loading=false;
  }
  }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.max-width-500{
  width: 100%;
  max-width: 500px;
}
.text-left{
  text-align: left!important;
}
.bg-danger-light{
  background: #FFF0F0;
}
.bg-success-light{
  background: #90EE90;
}
.small-btn{
 border-radius: 1rem;
 padding: 0 1rem;
}
</style>
