<template>
    <div class="wrapper container">
        <input type="button" value='Anmelden mit Google' class='btn btn-primary btn-custom' @click='login("google")'>
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
<style lang='less'>
    @import '../assets/variables.less';
    .btn-custom{
        background-color: @btn-background-light;
        border-color: @btn-background-dark;
        border-radius: 0;
        margin-bottom: 15px;
    }
</style>