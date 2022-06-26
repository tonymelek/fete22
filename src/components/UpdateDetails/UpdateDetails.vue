<template>
<Modal :display="displayModal" :modalType="modalType" :modalText="modalText" @hideModal="hideModal"/>
<div  v-if="!!user" class="container">
  <div class="mx-auto my-3 p-3 card full-width">
  <h3 class="w-100 text-left">Update my profile</h3>
  <div v-if="!user.displayName || !user.emailVerified" class="card my-1 p-2 bg-warning">
    Please, update your display name and verify your e-mail to navigate the application.
  </div>
  <form>
    <div class="row  my-2">
       <label class="col-3 text-left mx-2">Display name</label>
       <div class="d-flex col-8" v-if="!edit">
       <p  class="text-left my-0 me-3">{{user.displayName}}</p> <a href="#" @click="startEdit"><small>Change</small></a>
       </div>
       <input v-else class="col-8" type="text" v-model="displayName"/>
    </div>
      <div class="row my-3">
       <label class="col-3 text-left mx-2">Email</label>
       <p class="col-8 text-left m-0">{{user.email}}
         <sup>
      <span class="badge rounded-pill" 
      :class="{'bg-success-light text-success':user.emailVerified, 'text-danger bg-danger-light':!user.emailVerified}">
      {{user.emailVerified?'email verified':'email not verified'}}</span>
      </sup>
      <button v-if="!user.emailVerified" class="small-btn btn-success mx-2" :disabled="loading" @click="verifyEmail"><small>Verify</small></button>
      </p>
    </div>
    <div v-if="edit" class="d-flex justify-content-around flex-wrap">
        <button @click="update" class="btn btn-warning my-3 min-btn-width" :disabled="loading">{{loading?'Loading..':'Update'}}</button>
        <button @click="cancel" class="btn btn-danger my-3 min-btn-width">Cancel</button>
    </div>
  </form>
</div>
</div>
</template>

<script>
import Modal from '../commons/Modal.vue';
import {sendEmailVerification,updateProfile} from 'firebase/auth'
export default {
    name:"Update-Details",
    components:{
        Modal
    },
    data(){
    return{
        displayName:'',
        edit:false,
        loading:false,
        displayModal:'d-none',
        modalText:'',
        modalType:'success'

    }
    },
    computed:{
        user(){
            return this.$store.state.loggedInUser;
        }
    },
    methods:{
    async update(e){
        e.preventDefault();
        this.loading=true;
        await updateProfile(this.user, { displayName:this.displayName });
        this.loading=false;
        this.edit=false;
        this.modalText= "Your display name has been successfully updated";
        this.modalType='success';
        this.displayModal='d-flex';
    } ,
    startEdit(e){
        e.preventDefault();
        this.edit=true;
        this.displayName=this.user.displayName

    },
    cancel(e){
         e.preventDefault();
        this.edit=false;
    },
    async verifyEmail(e){
        e.preventDefault();
        this.loading=true;
        await sendEmailVerification(this.user);
        this.loading=false;
        this.modalText= "Verification e-mail has been sent, check your spam/junk for e-mail from 'noreply@archangel-fete.firebaseapp.com' and click the link to activate your account";
        this.modalType='success';
        this.displayModal='d-flex';

    },
    hideModal(){
        this.displayModal='d-none';
    }
   
    },
 
}
</script>

<style scoped>
.min-btn-width{
    min-width: 8rem;
}
.full-width{
    width:100%;
}
</style>