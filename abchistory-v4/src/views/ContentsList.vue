<template>
  <div class="contents">
    <div class="query">
      <div>検索ワード</div>
      <input type="text" v-model="keyword.contest" placeholder="コンテスト名(Ex: abc162)"/>
      <input type="text" v-model="keyword.category" placeholder="カテゴリ(Ex: 累積和、公約数)"/>
    </div>
    <div class="showproblem">
      <div class="subtitle">
        問題一覧
      </div>
      <div class="problems">
        <div class="oneproblem" v-for="pm in filteredproblems" v-bind:key="pm.problemName">
          <div class="ptop">
            <div class="pname">{{pm.problemName}}</div>
            <div class="plevel">{{pm.difficulty | showStarFromLevel}}</div>
          </div>
          <div class="pcat">
            <span v-for="cat in pm.categoryList" v-bind:key="cat">{{ cat }}</span> 
          </div>
          <div class="pmain">{{pm.description}}</div>
          <router-link :to="{name: 'ContenstDetail', params: {id:pm.problemName}}" >詳細</router-link>
        </div>
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
      keyword: {
        contest: "",
        problem: "",
        category: "",
        level: 0,
      },
      tag: "",
      problems: [],
      selected: 0,
    };
  },
  created: function() {
    var dbProblem = firebase.firestore().collection("data").doc("contents").collection("problems");
    dbProblem.get().then(query => {
      query.forEach(doc => {
        this.problems.push(doc.data());
      })
    });
  },
  computed: {
    filteredproblems: function() {
      var data = this.problems;
      var query_con = this.keyword.contest;
      var query_cat = this.keyword.category;
      if(query_con) {
        data = data.filter(function (row) {
            return row.contestName == query_con;
        })
      }
      if(query_cat) {
        data = data.filter(function (row) {
            return Object.keys(row.categoryList).some(function (key) {
                return String(row.categoryList[key]).indexOf(query_cat) > -1
            })
        })
      }
      return data;
    }
  },
  filters: {
    showStarFromLevel: function(difficulty) {
      var stars = "";
      for (let index = 0; index < difficulty; index++) {
        stars += "★";
      }
      return stars;
    },
    limitedFromDisc: function(description, limited) {
      var str = description;
      var dot = "...";
      if (description.length > limited - dot.length) {
        str = str.substring(0, limited - dot.length);
        str += dot;
      }
      return str;
    }
  }
};
</script>

<style scoped>
.query {
  margin-top: 1cm;
  margin-bottom: 1cm;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.query input[type="text"] {
  width: 60%;
  max-width: 400px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.showproblem {
  padding-top: 1cm;
  border-top: 1px solid blue;
}

.problems {
  display: flex;
  flex-wrap: wrap;
}

.oneproblem {
  display: column;
  margin: 2em 1em;
  position: relative;
  padding: 0.25em 1em;
  border: solid 2px #ffcb8a;
  border-radius: 3px 0 3px 0;
  width: 5cm;
  height: 5cm;
}
.pname,
.plevel {
  float: left;
  width: 50%;
}

.pname {
  font-size:16px;
  font-weight: 700;
}

.plevel {
  text-align: right;
  font-size:12px;
  font-weight: 700;
}

.ptop{
  margin-top: 5px;
  margin-bottom: 2px;
}

.ptop:after {
  content: "";
  display: block;
  clear: both;
}


.oneproblem .pcat {
  margin-right:3%;
  font-weight: 700;
  text-align: right;
  margin-bottom:10px;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.oneproblem .pcat span{
  margin: 2px;
  font-size: 8px;
}

.oneproblem .pmain {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.router-link {
  font-size: 10;
  text-align:right;
  margin-right:3%;
}
</style>