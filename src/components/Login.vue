<template>
    <div class="wrapper container">
        <input type="button" value='Anmelden mit Google' class='btn btn-primary' @click='login("google")'>
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        },
        props: [
            'loginType'
        ],
        methods: {
            login: function(providerName){
                var loginInfos = {
                    'providerName': providerName,
                    'loginType': this.loginType
                }
                this.$store.commit('loginUser',loginInfos)
            },
        }
    }
</script>