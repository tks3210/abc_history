<template>
  <div class="addproblem">
    <h3 class="presentense">問題を追加してください</h3>
    <div class="url">
      <div class="subtitle">基本情報</div>
      <input type="text" v-model="problem.contestName" v-on:change="makeURL" placeholder="コンテスト名[Ex: abc160]" />
      <input type="text" v-model="problem.problemName" v-on:change="makeURL" placeholder="問題名[Ex: abc160_c]" />
      <div>
        <a v-bind:href = "problem.URL" target = "_blank">{{problem.URL}}</a>
      </div>
      <v-select v-model="problem.score" :items="scores" placeholder="得点を選択"></v-select>
    </div>
    <div class="level">
      <div class="subtitle">難易度</div>
      <v-select v-model="problem.difficulty" :items="levels" placeholder="難易度を選択"></v-select>
    </div>
    <div class="category">
      <div class="subtitle">カテゴリ</div>
      <div class="categorySelect">
        <v-select v-model="problem.categoryList" :items="categoryDict" placeholder="関連するタグを選択" multiple></v-select>
      </div>
      <div class="newcategory">
        <input type="text" v-model="categoryNew" />
        <v-btn @click="addcategory">新規カテゴリの追加</v-btn>
      </div>
    </div>
    <div class="disctription">
      <div class="subtitle">概要</div>
      <textarea v-model="problem.description"></textarea>
    </div>
    <div class="solution">
      <div class="subtitle">解法</div>
      <textarea v-model="problem.solution"></textarea>
    </div>
    <div class="knowledge">
      <div class="subtitle">知見</div>
      <textarea v-model="problem.knowledge"></textarea>
    </div>
    <v-btn @click="logout">ログアウト</v-btn>
    <v-btn @click="addcol">問題の追加</v-btn>

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
        URL: "",
        contestName: "",
        problemName: "",
        score: 0,
        difficulty: 0,
        categoryList: [],
        description: "",
        solution: "",
        knowledge: ""
      },
      problems: [],
      categoryDict: [],
      scores: [100,200,300,400,500,600,700,800],
      levels: [
        {value:1, text:"3分以内に解けた"},
        {value:2, text:"10分以内に解けた"},
        {value:3, text:"1時間以内に解けた"},
        {value:4, text:"1時間以上で解けた"},
        {value:5, text:"解説を見て解けた"},
        {value:6, text:"解けなかった"},      
      ],
      dbCategory: firebase.firestore().collection("data").doc("contents").collection("categories"),
      dbProblem: firebase.firestore().collection("data").doc("contents").collection("problems")
    };
  },
  created: function() {
    var dict = [];
    this.dbCategory.get().then(function(query) {
      query.forEach(function(doc) {
        dict.push(doc.data().category);
      })
    });
    this.categoryDict = dict;
  },
  methods: {
    init: function() {
      this.problem.URL = "";
      this.problem.contestName = "";
      this.problem.problemName = "";
      this.problem.score = 0;
      this.problem.difficulty = 0;
      this.problem.categoryList = [];
      this.problem.description = "";
      this.problem.solution = "";
      this.problem.knowledge = "";
    },
    makeURL: function(){
      if (this.problem.contestName == "" || this.problem.problemName == "") return;      
      var URL = "https://atcoder.jp/contests/"+ this.problem.contestName + "/tasks/"+ this.problem.problemName;
      this.problem.URL = URL;
    },
    addcategory: function() {
      this.categoryDict.push(this.categoryNew);
      this.dbCategory.add({ category: this.categoryNew });
      this.categoryNew = "";
    },
    logout: function() {
      firebase.auth().signOut();
    },
    addcol: function() {
      this.dbProblem.doc(this.problem.problemName).set(this.problem);
    },
    getcol: function() {
      this.dbProblem.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
        });
      });
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
  width: 30%;
  max-width: 400px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  margin: auto;
}

.v-select {
  width:25%;
  margin: auto;
}

textarea {
  width: 60%;
  height: 160px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.url {
  display: flex;
  flex-direction: column;
  text-align: center;
}

/* .addproblem .url input[type="text"]{
	width: 80%;
	margin: 0px;
} */
/* 

.addproblem .level {
  position: relative;
	width: 80%;
	margin: 40px 3%;
} */

.category {
  display: flex;
  flex-direction: column;
  text-align: center;
}

</style>