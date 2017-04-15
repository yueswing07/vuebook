<template>
    <div class="container">
        <div class="row">
            <h2>Notenliste</h2>
        </div>
        <div class="row">
            <ul name="marklist" id="marklist">
                <li v-for='mark in marklist'>Lernfeld: {{mark.lf}} || Note {{mark.mark}}</li>
            </ul>
        </div>
    </div>    
</template>

<script>
import awesome from '../awesomeDebug'
import firebase from 'firebase'

export default {
    props:[
        'currentuser'
    ],
    data() {
        return {
            marklist: null
        }
    },
    created() {
        var that = this
        firebase.database().ref('users/'+this.currentuser.uid+'/marks').once('value').then((snapshot) => {
            that.marklist = snapshot.val()
        })
    },
}
</script>

<style>
    #marklist{
        list-style: none;
        margin-left: 0;
        padding-left: 0;
    }
</style>