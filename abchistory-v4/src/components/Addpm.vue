<template>
  <div class="addproblem">
    <h3 class="presentense">問題を追加してください</h3>
    <div class="url">
      <div class="subtitle">URL</div>
      <input type="text" v-model="problem.url" placeholder="問題のURL" />
    </div>
    <div class="level">
      <div class="subtitle">難易度</div>
      <select v-model="problem.level">
        <option value="0">難易度を選択してください</option>
        <option value="1">1:3分以内に解けた</option>
        <option value="2">2:10分以内に解けた</option>
        <option value="3">3:1時間以内に解けた</option>
        <option value="4">4:1時間以上で解けた</option>
        <option value="5">5:解説を見て解けた</option>
        <option value="6">6:解けなかった</option>
      </select>
    </div>
    <div class="category">
      <div class="subtitle">カテゴリ</div>
      <div class="categorySelect">
        <select v-model="problem.categories" multiple>
          <option disabled="disabled">問題の類型を選択してください</option>
          <option v-for="cat in categoryDict" v-bind:key="cat">{{cat}}</option>
        </select>
        <div class="showcategory">
          <div v-for="cat in problem.categories" v-bind:key="cat">{{cat}}</div>
        </div>
      </div>
      <div class="newcategory">
        <input type="text" v-model="categoryNew" />
        <button @click="addcategory">新規カテゴリの追加</button>
      </div>
    </div>
    <div class="disctription">
      <div class="subtitle">問題の概要</div>
      <textarea v-model="problem.discription"></textarea>
    </div>
    <div class="solution">
      <div class="subtitle">問題の解法</div>
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
      categoryNew: "",
      problem: {
        url: "",
        level: 0,
        categories: [],
        discription: "",
        solution: ""
      },
      problems: [],
      categoryDict: []
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
    firebase
      .firestore()
      .collection("data")
      .doc("contents")
      .get()
      .then(doc => {
        if (doc.exists && doc.data().categoryDict) {
          this.categoryDict = doc.data().categoryDict;
        }
      });
  },
  methods: {
    init: function() {
      this.problem.url = "";
      this.problem.level = "";
      this.problem.categories = [];
      this.problem.discription = "";
      this.problem.solution = "";
    },
    addproblem: function() {
      var pm = Vue.util.extend({}, this.problem);
      this.problems.push(pm);
      var db = firebase
        .firestore()
        .collection("data")
        .doc("contents");
      db.update({ problems: this.problems });
      this.init();
    },
    addcategory: function() {
      this.categoryDict.push(this.categoryNew);
      var db = firebase
        .firestore()
        .collection("data")
        .doc("contents");
      db.update({ categoryDict: this.categoryDict });
      this.categoryNew = "";
    },
    logout: function() {
      firebase.auth().signOut();
    }
  }
};
</script>


<style scoped>
.subtitle {
  margin-left: 10%;
  text-align: left;
  text-decoration: underline;
  font-weight: 700;
}

input[type="text"] {
  width: 100%;
  max-width: 400px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

textarea {
  width: 80%;
  height: 260px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
/* .addproblem .url {
  position: relative;
	width: 80%;
	margin: 40px 3%;
}

.addproblem .level {
  position: relative;
	width: 80%;
	margin: 40px 3%;
} */

.categorySelect {
  margin: 0 auto;
  width: 60%;
  display: flex;
}

.categorySelect select {
  position: relative;
  width: 50%;
  height: 4cm;
}

.categorySelect div {
  position: relative;
  width: 50%;
}

.newcategory {
  margin-top: 1em;
}
</style>