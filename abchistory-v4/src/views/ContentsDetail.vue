<template>
  <div class="contentsdetail">
    <div>URL：{{ $route.params.problem.url }}</div>
    <div>難易度：{{ $route.params.problem.level }}</div>
    <div>問題の概要：{{ $route.params.problem.discription }}</div>
    <div>解法:{{ $route.params.problem.solution }}</div>
    <h2>開発中m(_ _)m</h2>
  </div>
</template>

<script>
export default {
  props: {
    id : String,
  }
};
</script>

