<template>    
    <div class="container-fluid above-the-fold container-fluid">        
        <div class="headline-image"></div>
        <div class="row">
            <div class="col-sm-12 header-wrapper">
                <div class="container-fluid header-content">                    
                    <div class="row">
                        <div class="col-sm-12 center-text">
                            <h1>DCB</h1>
                            <h2>Your digital class book</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import login from './components/Login'
export default {
    data() {
        return {

        }
    },
    components: {
        login
    }
}
</script>
<style lang="less">
    @import 'assets/variables.less';
    .headline-image{
        background-image: url("./assets/header2.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        filter: blur(5px);
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
    }
    .above-the-fold{
        color: white;
        .header-wrapper{
            display: grid;
            grid-template-columns: repeat(3,100vw);
            grid-gap: 10px;
            grid-auto-rows: minmax(100%, auto);
            .header-content{
                grid-column: 1;
                grid-row: 40;
            }
        }
    }
    .center-text{
        text-align: center;
    }
</style>



<!--
        <div class="row">
            <div class="col-sm-12 col-md-6 teacher-side center-text">
                 <h2>Anmelden als Lehrer</h2>
                <login :loginType='"teacher"'></login>
            </div>
            <div class="col-sm-12 col-md-6 student-side center-text">
                <h2>Anmelden als Schüler</h2>
                <login :loginType='"student"'></login>
            </div>
        </div>


        CREDITS:
        Lucy G - Down Arrow
        Madebyoliver - Notebook
        Becris - Responsive

        -->