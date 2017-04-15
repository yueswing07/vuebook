<template>
<h1  v-if='userStoreWatch'>test component: {{userStoreWatch.uid}}</h1>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  created() {
    console.log('Test Created. Increment counter by 1')
    this.$store.commit('increment')
  },
  computed: {
    countMethod() {
      return this.$store.state.count
    },
    userStoreWatch() {
      return this.$store.state.loggedInUser
    }

  },
}

</script>