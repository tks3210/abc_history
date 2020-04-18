<template>
  <div id = "app">
    <Login v-if="!isLogin"></Login>
    <Addpm v-if="isLogin"></Addpm>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import Login from "../components/Login.vue";
import Addpm from "../components/Addpm.vue";
export default {
  name: "app",
  data() {
    return {
      isLogin: false,
      userData: null,
    }
  },
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.isLogin = true;
        this.userData = user;
      } else {
        this.isLogin = false;
        this.userData = null;
      }
    });
  },
  components: {
    Login: Login,
    Addpm: Addpm
  }
};
</script>