<template>
  <div class="login">
    <button @click="LoginByGoogle">Login by Google</button>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "login",
  data() {
    return {
      msg: "Welcome to MyMarkdown"
    };
  },
  methods: {
    LoginByGoogle: function() {
      firebase
        .auth()
        .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
  }
};
</script>
