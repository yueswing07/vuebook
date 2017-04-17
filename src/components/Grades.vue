<template>
    <div class="wrapper container">
        <div class="row">
            <div class="col-md-12">
                <h1>Noten Übersicht</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <table class='gradestable'>
                    <thead>
                        <td v-for='subject in gradesObserv'>{{subject.name}}</td>
                    </thead>
                    <tbody>
                        <td v-for='subject in gradesObserv' class='gradestable-body-item'>
                            <span>Note {{subject.grade}}</span>
                            <tr><input type="text" class='gradeInput' placeholder='Neu'></tr>
                        </td>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                subjectlist: '',
                edit_subject: ''
            }
        },
        computed: {
            gradesObserv: function(){
                return this.$store.state.gradelist
            }
        },

    }
</script>
<style scoped>
    .gradeInput{
        max-width: 50px;
    }
    .gradestable-body-item{
        padding-right: 70px;
    }

</style>