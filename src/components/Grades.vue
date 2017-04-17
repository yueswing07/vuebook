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
                            <tr><input type="text" class='gradeInput' :ref='createRef(subject.name)' placeholder='Neu' @keyup='gradechange(subject.name)'></tr>
                        </td>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    import awesome from '../awesomeDebug'
    export default {
        data(){
            return {
                newgrade: ''
            }
        },
        computed: {
            gradesObserv: function(){
                return this.$store.state.gradelist
            }
        },
        methods: {
            gradechange(currSubj){
                var trimmedRefName = this.createRef(currSubj)
                var newGrade = this.$refs[trimmedRefName][0].value
                /* Can only pass one additional paramter to the store object */
                /* This object can be expanded as needed to pass further informations if needed */
                var paraObject = {
                    'lernfeld': currSubj,
                    'newGrade': newGrade
                }
                this.$store.commit('updateSingleGrade',paraObject)
                this.$refs[trimmedRefName][0].value = ''
            },
            /* Vue doesn't like spaces in the ref name */
            createRef(_subject){
                return _subject.replace(/\s+/, "") 
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