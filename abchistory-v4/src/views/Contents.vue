<template>
  <div class="contents">
    <div class="query">
    検索ワード
    <input type="text" v-model="keyword" />
    </div>
    <div class="showproblem">
      問題一覧
      <div class="oneproblem"
      v-for="pm in problems"
      v-bind:key="pm.url"
      >
      <!-- <p>{{pm.url | getContestFromURL}}</p> -->
      <div class = "ptop">
        <h3 class="pname">{{pm.url | getProblemFromURL}}</h3>
        <p class="plevel">{{pm.level | showStarFromLevel }}</p>
      </div>
      <p>{{pm.discription | limitedFromDisc(limited) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import * as firebase from "firebase/app";
import "firebase/firestore";
export default {
  name: "contents",
  data() {
    return {
      limited: 40,
      keyword: "",
      tag: "",
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
  filters: {
    getContestFromURL: function(link) {
      var links = link.split('/');
      var num = links.length;
      return links[num-3];
    },
    getProblemFromURL: function(link) {
      var links = link.split('/');
      var num = links.length;
      return links[num-1];
    },
    showStarFromLevel: function(level) {
      var stars = ""
      for (let index = 0; index < level; index++) {
        stars += "★";
      }
      return stars;
    },
    limitedFromDisc: function(discription, limited){
      var str = discription;
      var dot = "...";
      if (discription.length > limited - dot.length){
        str = str.substring(0, limited - dot.length);
        str += dot;
      }
      return str;
    }
  }
};
</script>

<style scoped>
.oneproblem{
    margin:2em 1em;
    position: relative;
    padding: 0.25em 1em;
    border: solid 2px #ffcb8a;
    border-radius: 3px 0 3px 0;
    width: 5cm;
    height: 5cm;
    
}

.oneproblem .pname, .oneproblem .plevel {
  float: left;
  width: 50%;
}

.oneproblem .ptop:after {
  content: "";
  display: block;
  clear: both;
}

.query {
  margin-top: 1cm;
}

.showproblem {
  display: flex;
  margin-top: 1cm;
  border-top: 1px solid blue;
}

</style>