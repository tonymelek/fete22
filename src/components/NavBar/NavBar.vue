<template>
   <nav class=" container d-flex justify-content-end py-1 bg-dark">
<div v-if="!signedIn && location==='/login'" class="d-flex justify-content-end">
  <button  class="btn btn-primary mx-2" :class="{'btn-secondary':selectedForm==='Sign in'}" @click="selectForm('Sign in')" :disabled="selectedForm==='Sign in'">Sign In</button>
  <button  class="btn btn-primary mx-2" :class="{'btn-secondary':selectedForm==='Sign up'}" @click="selectForm('Sign up')" :disabled="selectedForm==='Sign up'">Sign Up</button>
</div>
<div v-if="signedIn">
    <span class="text-light">Welcome, </span><router-link class="me-3" to="/myProfile">{{user.displayName || 'User'}}</router-link>
    <button class="btn btn-secondary" @click="handleSignOut">Sign Out</button> 
</div>
</nav>
</template>

<script>
    import {auth} from '../../firebase/main';
    import { signOut } from 'firebase/auth'
    export default {
        name:'nav-bar',
         data:()=>({
            selectedForm:"Sign in",
        }),
        computed:{
            signedIn(){
                return !!this.$store.state.loggedInUser;
            },
            user(){
                return this.$store.state.loggedInUser;
            },
            location(){
                return this.$router.currentRoute.value.fullPath;
            }
        },
        methods:{
            async handleSignOut(){
                try{
                    await signOut(auth);
                    this.$router.push('/login');
                }catch(err){
                    console.log(err);
                }
            },
            selectForm(form){
                this.selectedForm=form
                this.$store.commit('setSelectedForm',form);
        }
        },
        mounted(){
            this.selectedForm=this.$store.getters.getSelectedForm;
            auth.onAuthStateChanged(user=> {
            if (user) {
                console.log(user);
                this.$store.commit('setLoggedInUser',user)
                this.$router.push('/');
            }else{
                this.$store.commit('setLoggedInUser',null)
                console.log('no user signed in');
                // getDocs(collection(db, "shops")).then(snapShot=>{
                // console.log(snapShot.docs[0].data());
                // })
            
            }
            });
        }
    }
</script>

<style scoped>

</style>