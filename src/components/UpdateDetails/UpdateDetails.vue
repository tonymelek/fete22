<template>
<Modal purpose="notification"/>
<div  class="container">
<div class="row">
    <div class="col-lg-5 col-md-6 offset-lg-1">
    <ProfileDetails/>
</div>
<div class="col-lg-5 col-md-6 ">
<PersonalDetails/>
</div>
</div>
</div>
</template>

<script>
import Modal from '../commons/Modal.vue';
import ProfileDetails from './ProfileDetails.vue';
import PersonalDetails from './PersonalDetails.vue';


export default {
    name:"Update-Details",
    components:{
    Modal,
    ProfileDetails,
    PersonalDetails
}
}
</script>

<style scoped>

</style>