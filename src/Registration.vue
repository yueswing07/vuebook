<template>
    <div class="wrapper container">
        <div class="row">
            <div class="col-md-12">
                <h1>Weitere Daten benötigt!</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h2>Herzlich Willkommen: {{this.$store.state.loggedInUser.displayName}}</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
            <h2>Schulinformationen</h2>
            <label for="class_selection">Bitte Ihre Klasse auswählen</label>
                <select name="class_selection" id="class_selection" v-model='classSelection'>
                    <option v-for='schoolclass in classlist' v-bind:value='{activeClass:schoolclass}'>{{schoolclass}}</option>
                </select>
            <label for="teacher_selection">Bitte Ihren Klassenlehrer auswählen</label>
                <select name="teacher_selection" id="teacher_selection" v-model='teacherSelection'>
                    <option v-for='teacher in teacherlist' v-bind:value='{activeTeacher:teacher.uid}'>{{teacher.lastname}} {{teacher.firstname}}</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h2>Daten zu Ihrem Unternehmen</h2>
                <ul>
                    <li :class='error_company_name'>
                        <label for="company_name">Name des Unternehmens</label>
                        <input type="text" id='company_name' placeholder='Name des Unternehmens' v-model='value_company_name'>
                    </li>
                    <li :class='error_company_plz'>
                        <label for="company_plz">Postleitzahl</label>
                        <input type="text" id='company_plz' placeholder='PLZ' v-model='value_company_plz'>
                    </li :class='error_company_city'>
                    <li>
                        <label for="company_city">Ort</label>
                        <input type="text" id='company_city' placeholder='Ort' v-model='value_company_city'>
                    </li>
                    <li :class='error_company_street'>
                        <label for="company_street">Straße und Hausnummer</label>
                        <input type="text" id='company_street' placeholder='Str. und Nr.' v-model='value_company_street'>
                    </li>
                </ul>
                <h3>Daten zu Ihrem Ausbilder</h3>
                <ul>
                    <li :class='error_instructor_name'>
                        <label for="instructor_name">Name</label>
                        <input type="text" id='instructor_name' placeholder='Name' v-model='value_instructor_name'>    
                    </li>
                    <li :class='error_instructor_email'>
                        <label for="instructor_email">E-Mail</label>
                        <input type="text" id='instructor_name' placeholder='Email' v-model='value_instructor_email'>    
                    </li>
                    <li :class='error_instructor_phone'>
                        <label for="instructor_phone">Telefonnummer</label>
                        <input type="text" id='instructor_name' placeholder='Tel.' v-model='value_instructor_phone'>
                    </li>
                </ul>
                <input type="button" class='btn btn-primary' value='Senden' @click='sendData()'>
                <input type="button" class='btn btn-danger' value='Abbrechen' @click='candelRegistration()'>
            </div>            
        </div>
    </div>
    

</template>

<script>
    import awesome from './awesomeDebug'
    import firebase from 'firebase'
    export default {
        data() {
            return {
                // lists //
                classlist: '',
                teacherlist: '',
                // selections //
                classSelection: '',
                teacherSelection: {
                    activeTeacher: {
                        firstname: '',
                        lastname: ''
                    }
                },
                // Input value //
                value_company_name: '',
                value_company_plz: '',
                value_company_city: '',
                value_company_street: '',
                value_instructor_name: '',
                value_instructor_email: '',
                value_instructor_phone: '',
                // error //
                error_company_name: '',
                error_company_plz: '',
                error_company_street: '',
                error_company_city: '',
                error_instructor_name: '',
                error_instructor_email: '',
                error_instructor_phone: '',
                // user object for database //
                userObject: {
                    teacher: '',
                    class: '',
                    uid: '',
                    timestamp: '',
                    name: '',
                    isRegistered: '',
                    company: {
                        name: '',
                        plz: '',
                        street: '',
                        city: '',
                    },
                    instructor: {
                        name: '',
                        email: '',
                        phone: ''
                    }
                }
            }
        },
        created() {
            /* Redirect invalid users */
            if ( this.$store.state.loggedInUser.isRegistered ){
                this.$router.push('/app')
            }
            awesome.debug('debug','Registration.vue','Registration component loaded',this.$store.state.loggedInUser)
            /* Prefill form values */
            firebase.database().ref('classes/').once('value', snapshot => {
                this.classlist = snapshot.val()
            })
            firebase.database().ref('teachers/').once('value', snapshot => {
                this.teacherlist = snapshot.val()
            })            
        },
        watch: {
            classSelection: function(){
                if ( this.classSelection.activeClass && this.classSelection.activeClass !== '' ){
                    this.userObject.class = this.classSelection.activeClass
                }
            },
            teacherSelection: function(){
                if ( this.teacherSelection.activeTeacher && this.teacherSelection.activeTeacher !== '' ){
                    this.userObject.teacher = this.teacherSelection.activeTeacher
                }
            },
            value_company_name: function(){
                if ( this.value_company_name === '' ){
                    this.error_company_name = 'error'
                    this.userObject.company.name = ''
                } else {
                    this.error_company_name = ''
                    this.userObject.company.name = this.value_company_name
                }
            },
            value_company_plz: function(){
                if ( this.value_company_plz === '' ){
                    this.error_company_plz = 'error'
                    this.userObject.company.plz = ''
                } else {
                    this.error_company_plz = ''
                    this.userObject.company.plz = this.value_company_plz
                }
            },
            value_company_city: function(){
                if ( this.value_company_city === '' ){
                    this.error_company_city = 'error'
                    this.userObject.company.city = ''
                } else {
                    this.error_company_city = ''
                    this.userObject.company.city = this.value_company_city
                }
            },
            value_company_street: function(){
                if ( this.value_company_street === '' ){
                    this.error_company_street = 'error'
                    this.userObject.company.street = ''
                } else {
                    this.error_company_street = ''
                    this.userObject.company.street = this.value_company_street
                }
            },
            value_instructor_name: function(){
                if ( this.value_instructor_name === '' ){
                    this.error_instructor_name = 'error'
                    this.userObject.instructor.name = ''
                } else {
                    this.error_instructor_name = ''
                    this.userObject.instructor.name = this.value_instructor_name
                }
            },
            value_instructor_email: function(){
                if ( this.value_instructor_email === '' ){
                    this.error_instructor_email = 'error'
                    this.userObject.instructor.email = ''
                } else {
                    this.error_instructor_email = ''
                    this.userObject.instructor.email = this.value_instructor_email
                }
            },
            value_instructor_phone: function(){
                if ( this.value_instructor_phone === '' ){
                    this.error_instructor_phone = 'error'
                    this.userObject.instructor.phone = ''
                } else {
                    this.error_instructor_phone = ''
                    this.userObject.instructor.phone = this.value_instructor_phone
                }
            },
        },
        methods: {
            sendData: function(){
                if(this.userObject.class === '' || this.userObject.teacher === '' || this.userObject.company.name === '' || this.userObject.company.city === '' || this.userObject.plz === '' || this.userObject.street === '' || this.userObject.instructor.name === '' || this.userObject.instructor.email === '' || this.userObject.instructor.phone === ''){
                    awesome.debug('servere','Registration.vue','Some values are missing')
                } else {
                    this.userObject.timestamp = new Date()
                    this.userObject.uid = this.$store.state.loggedInUser.uid
                    this.userObject.name = this.$store.state.loggedInUser.displayName
                    this.userObject.isRegistered = true
                    this.$store.commit('registerUser',this.userObject)
                }
            },
            candelRegistration: function(){
                this.$router.push('/')
            }
        },
    }
</script>
<style scoped>
    ul{
        list-style: none;
        padding-left: 0;
    }
    ul li {
        position: relative;
    }
    ul li input{
        position: absolute;
        right: 0;
    }
    .summarylist{

    }
    .summarylist-item{
        min-height: 35px;
    }
    .fixed-text{
        font-weight: bold;
        position: absolute;
    }
    .variable-text{
        position: relative;
        left: 220px;
    }
    .error{
        color: red;
    }
</style>