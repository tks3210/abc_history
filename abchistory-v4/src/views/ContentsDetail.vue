<template>
  <div class="contentsdetail">
    <div>URL：{{ problem.URL }}</div>
    <div>難易度：{{ problem.difficulty }}</div>
    <div>問題の概要：{{ problem.description }}</div>
    <div>解法:{{ problem.solution }}</div>
  </div>
</template>

<script>
import Vue from "vue";
import * as firebase from "firebase/app";
import "firebase/firestore";

export default {
  props: {
    id : String,
  },
  data() {
    return {
      problem : {},
    };
  },
  created: function() {
    var dbProblem = firebase.firestore().collection("data").doc("contents").collection("problems").doc(this.id);
    dbProblem.get().then(doc => {
      if (doc.exists){
        this.problem = doc.data();
      }
    });
  }
};
</script>

