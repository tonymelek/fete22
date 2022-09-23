<template>
    <Modal purpose="userDetails" :userDetails="currentUser"/>  
    <div class="container">    
        <div class="d-flex justify-content-around">
            <h1 class="text-center">Attendance {{date.display}}</h1>
            <button class="btn btn-success my-2">Submit Attendance</button>
        </div>
        <div >
        <div class="table-wrapper">
        <table class="table table-striped table-bordered">
            <thead >
                <tr>
                    <th>#</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>
                        <div class="d-flex flex-wrap justify-content-between">
                        <span>Grade</span>
                        <select v-model="selectedClass" @change="selectClass">
                            <option value=""></option>
                            <option v-for="grade in classes" :key="grade" :value="grade">
                            {{grade}}
                            </option>
                        </select>
                        <span v-if="selectedClass===''">
                            <span class="material-symbols-outlined pe-2 cursor-pointer" :class="selectedSort==='asc'&&'selected'"  @click="sort('asc')">arrow_upward</span>
                            <span class="material-symbols-outlined cursor-pointer" :class="selectedSort==='desc'&&'selected'"  @click="sort('desc')">arrow_downward</span>
                        </span>
                        </div>
                    </th>
                    <!-- <th v-if="date.isSaturday">Attendance</th> -->
                    <th>Attendance</th>

                    <th>Last 4 Attendances</th>
                </tr>
            </thead>
            <tbody v-if="users.length!==0" >  
                <tr v-for="(user,index) in users" :key="index" class="shade" @click="displayUser(user)">
                <td>{{index+1}}</td>
                <td>{{user.firstName}}</td>
                <td>{{user.lastName}}</td>
                <td>{{user.grade}}</td>
                <!-- <td v-if="date.isSaturday"> -->
                <td>
                    <input type="checkbox" :checked="user.attendance.includes(date.iso)" @change="handleNewAttendance($event,index)">
                </td>
                <td>
                    {{getLast4Attendance(user)}}
                </td>
                </tr>
            </tbody>
            <div v-else>Loading ...</div>
        </table>
        </div>
        </div>

    </div>
</template>

<script>
    import { db } from '../../firebase/main';
    import { collection, query, where, getDocs,orderBy } from '@firebase/firestore';
import Modal from '../commons/Modal.vue';
    export default {
    name: "attendance-sheet",
    data: () => ({
        users: [],
        allUsers:[],
        selectedClass: "",
        selectedSort: "",
        currentUser:{},
        classes:[]
    }),
    computed: {
        date() {
            const date = new Date();
            const options = { year: "numeric", month: "numeric", day: "numeric" };
            const isSaturday = date.toLocaleDateString("en-AU", { weekday: "long" }) === "Saturday";
            const display = date.toLocaleDateString("en-AU", options);
            return { display, isSaturday, iso: date.toISOString().slice(0, 10) };
        },
       
    },
    watch:{
      allUsers:{
          handler(){
            this.classes= [...new Set(this.allUsers.map(a => a.grade))].sort()
        },
        deep:true   
        }
    },
    mounted() {
        const q = query(collection(db, "people"), where("grade", "not-in", ["G7", "G N"]), orderBy("grade"));
        const readDocs = async () => {
            const snapShot = await getDocs(q);
            const data = snapShot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            this.users = data;
            this.allUsers=data;
        };
        readDocs();
    },
    methods: {
        handleNewAttendance(e, index) {
            if (e.target.checked && !this.users[index].attendance.includes(this.date.iso)) {
                this.users[index].attendance.push(this.date.iso);
            }
            else if (!e.target.checked && this.users[index].attendance.includes(this.date.iso)) {
                const indexToDelete = this.users[index].attendance.indexOf(this.date.iso);
                this.users[index].attendance.splice(indexToDelete, 1);
            }
            console.log(index, this.users[index]);
        },
        sort(direction) {
            this.selectedSort = direction;
            this.users =
                this.users
                    .filter(a => !["G7", "GN"].includes(a.grade))
                    .filter(a => a.role === "Student")
                    .sort((a, b) => a.firstName.localeCompare(b.firstName))
                    .sort((a, b) => direction === "asc" ? a.grade.localeCompare(b.grade) : b.grade.localeCompare(a.grade));
        },
        getLast4Attendance(user) {
            const options = { year: "2-digit", month: "numeric", day: "numeric" };
            return user.attendance.slice(-4) // Last four in Attendance Array
                .map(date => new Date(date).toLocaleDateString("en-AU", options)) // format to short Australian date
                .join(", "); // convert to string with comma delimiter
        },
        selectClass() {
            if (this.selectedClass !== "")
                this.selectedSort = "";
            this.users = this.allUsers
                .sort((a, b) => a.firstName.localeCompare(b.firstName))
                .filter(user => user.grade.includes(this.selectedClass));
        },
        displayUser(user){
            this.currentUser=user;
            this.$store.commit('setModalData',{ display:'d-flex'});
           // window.scrollTo(0,0);
        }
    },
    components: { Modal }
}
</script>

<style scoped>
.cursor-pointer{
    cursor: pointer;
}
.cursor-pointer:hover{
    transform: scale(1.25);
    font-weight: 800;
    color: red;
}
.selected{
    transform: scale(1.25);
    font-weight: 800;
    color: rgb(24, 209, 138);
}
.shade:hover{
    background: rgba(0, 0, 0, 0.397);
    cursor: pointer;
}
.table-wrapper{
  display: block;
  height: 85vh;
  overflow-y: scroll;
}
th{
  z-index: 5;
  position: sticky;
  top: 0;
  background: white;
 box-shadow: inset 0 1px 0 #000000, inset 0 -1px 0 #000000;
}
</style>