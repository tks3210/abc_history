<template>
  <div class="addproblem">
    <h3 class="presentense">問題を追加してください</h3>
    <div class="url">
      URL
      <input type="text" v-model="problem.url" />
    </div>
    <div class="level">
      難易度
      <select v-model="problem.level">
        <option disabled="disabled">難易度を選択してください</option>
        <option value="1">1:3分以内に解けた</option>
        <option value="2">2:10分以内に解けた</option>
        <option value="3">3:1時間以内に解けた</option>
        <option value="4">4:1時間以上で解けた</option>
        <option value="5">5:解説を見て解けた</option>
        <option value="6">6:解けなかった</option>
      </select>
    </div>
    <div class = "category">
      カテゴリ
      <input type="text" v-model="tag" />
      <button @click="addtag">カテゴリの追加</button>
    </div>
    <div class="disctription">
      問題の概要
      <textarea v-model="problem.discription"></textarea>
    </div>
    <div class="solution">
      問題の解法
      <textarea v-model="problem.solution"></textarea>
    </div>
    <button @click="addproblem">問題の追加</button>
    <button @click="logout">ログアウト</button>
  </div>
</template>


<script>
import Vue from "vue";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
export default {
  name: "addproblem",
  data() {
    return {
      db: null,
      tag: "",
      problem: {
        url: "",
        level: 0,
        tags: [],
        discription: "",
        solution: ""
      },
      problems: [],
      selected: 0
    };
  },
  created: function() {
    firebase
      .firestore()
      .collection("data")
      .doc("contents")
      .get()
      .then(doc => {
        if (doc.exists && doc.data().problems) {
          this.problems = doc.data().problems;
        }
      });
  },
  methods: {
    init: function() {
      this.problem.url = "";
      this.problem.level = "";
      this.problem.tags = [];
      this.problem.discription = "";
      this.problem.solution = "";
    },
    addproblem: function() {
      var pm = Vue.util.extend({}, this.problem);
      this.problems.push(pm);
      firebase
        .firestore()
        .collection("data")
        .doc("contents")
        .set({ problems: this.problems });
      this.init();
    },
    addtag: function() {
      this.problem.tags.push(this.tag);
      this.tag = "";
    },
    logout: function() {
      firebase.auth().signOut();
    }
  }
};
</script>
