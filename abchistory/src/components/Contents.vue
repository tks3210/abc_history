<template>
  <div class="contents">
    <div class="contentsmain">
      <div class="addproblem">
        問題を追加してください
        <br />URL
        <input type="text" v-model="problem.url" />
        <br />難易度
        <select v-model="problem.level">
          <option disabled="disabled">難易度を選択してください</option>
          <option value="1">1:3分以内に解けた</option>
          <option value="2">2:10分以内に解けた</option>
          <option value="3">3:1時間以内に解けた</option>
          <option value="4">4:1時間以上で解けた</option>
          <option value="5">5:解説を見て解けた</option>
          <option value="6">6:解けなかった</option>
        </select>
        <br />カテゴリ
        <input type="text" v-model="tag" />
        <button @click="addtag">カテゴリの追加</button>
        <br />問題の概要
        <textarea v-model="problem.discription"></textarea>
        <br />問題の解法
        <textarea v-model="problem.solution"></textarea>
        <br />
        <button @click="addproblem">問題の追加</button>
      </div>
      <div class="showproblem">
        問題一覧
        <h3 class="title">test</h3>
        <ul>
          <li class="title" v-for="pm in problems" v-bind:key="pm.url">{{pm.url}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "Vue";
export default {
  name: "contents",
  data() {
    return {
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
      this.init();
    },
    addtag: function() {
      this.problem.tags.push(this.tag);
      this.tag = "";
    }
  }
};
</script>
