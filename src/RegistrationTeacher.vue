<template>
    <div class="wrapper container">
        <div class="row">
            <div class="col-md-12">
                <h1>Registrierung als Lehrer</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <input type="password" v-model='registrationToken' :class='valid_class'>
            </div>
        </div>
        <div class="row" v-if='valid_class === "success" '>
            <div class="col-md-12">
                <h2>Weitere Informationen</h2>
                <p>Ihr Name: {{this.$store.state.loggedInUser.displayName}}</p>
                <h2>Ihre Klassen</h2>
                <ul>
                    <li v-for='schoolClass in classlist'>
                        <label :for='schoolClass'>{{schoolClass}}</label>
                        <input type="checkbox" :value='schoolClass' :id='schoolClass' v-model="checkedNames">    
                    </li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <input type="button" class='btn btn-primary' value='Abschicken' @click='registerAsTeacher()'>
            </div>
        </div>
    </div>
</template>
<script>
    import firebase from 'firebase'
    import awesome from './awesomeDebug'
    var secretToken = ''
    export default {
        data(){
            return {
                registrationToken: '',
                valid_class: '',
                classlist: '',
                checkedNames: [],
                userObject: {
                    name: '',
                    uid: '',
                    classlist: [],
                    timestamp: '',
                    isTeacher: '',
                }
            }
        },
        created() {
            /* Redirect invalid users */
            if ( this.$store.state.loggedInUser.isRegistered ){
                this.$router.push('/app')
            } else {
                var that = this
                firebase.database().ref('resources/teacherToken/').once('value', snapshot => {
                    this.secretToken = snapshot.val().token.toString()
                })
                firebase.database().ref('classes').once('value', snapshot => {
                    this.classlist = snapshot.val()
                })
            }
        },
        watch: {
            registrationToken: function(){
                if ( this.registrationToken === this.secretToken ){
                    this.valid_class = 'success'
                } else {
                    this.valid_class = 'error'
                }
            },
        },
        methods: {
            registerAsTeacher(){
                this.userObject.timestamp = new Date()
                this.userObject.name = this.$store.state.loggedInUser.displayName
                this.userObject.uid = this.$store.state.loggedInUser.uid
                this.userObject.classlist = this.classlist
                this.userObject.isTeacher = true
                this.$store.commit('registerUser', this.userObject)
            }
        }
    }
</script>
<style scoped>
    .error {
        box-shadow: 0 0 0 2px red;
    }
    .success{
        box-shadow: 0 0 0 2px green;
    }
    ul li {
        display: inline-block;
        width: 100px;
    }
    ul li input{
        position: absolute;
        left: 50px;
        top: 7px;
    }
</style>