<template>
<Modal :display="displayModal" :modalType="modalType" :modalText="modalText"/>
<div class="container d-flex justify-content-center">
<div class="max-width-500 card p-3 m-2">
<h3 class="w-100 text-left mb-4">{{selectedForm}} Form</h3>
<form @submit="handleFormSubmit">
  <div class="mb-3">
    <label for="exampleInputEmail1" class="w-100 text-left">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="w-100 text-left">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
  </div>
  <button type="submit" class="btn btn-primary w-50" :disabled="loading">{{loading?"Loading":selectedForm}}</button>
</form>

</div>
</div>
</template>

<script>
import Modal from '../commons/Modal.vue';
import { auth} from '../../firebase/main';
// import { collection, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth'
//import { router } from '../../router';

export default {
  name: 'LoginPage',
  components:{
    Modal
  },
  data:()=>({
    email:"",
    password:"",
    error:"",
    success:"",
    user:null,
    false:false,
    signedIn:true,
    displayModal:'d-none',
    modalType:'success',
    modalText:'',
    loading:false
  }),
  computed:{
    selectedForm(){
      return this.$store.state.selectedForm;
    }
  },
  mounted(){

  },
  methods:{

    async handleFormSubmit(e){
      e.preventDefault();
      this.loading=true;
      this.error='';
      this.success='';
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
        this.success="You have been successfully signed up to the app, you can navigate the app"
        this.modalText=this.success;
        this.modalType="success"
        this.displayModal="d-flex"
        this.loading=false;
      
      }catch(err){
        if(err.code==='auth/email-already-in-use'){
            this.error="This email already exists, please use Sign-in form to login or reset your password"
            this.modalText=this.error;
            this.modalType="error"
            this.displayModal="d-flex"
            this.loading=false;
          } 
        
        }
    }

    ,
    async handleSignIn(){
      try{
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.success="You have been successfully signed in to the app, you will be redirected now";
        this.loading=false;
      }catch(error){
        if(error.code==='auth/wrong-password'){
            this.error="This email already exists, but you typed wrong password,try again or reset your password"
      }else if(error.code==='auth/user-not-found') {
        this.error="This email is not found in the database, check for typos or Sign up"
      }
       this.loading=false;
    }
  },

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
