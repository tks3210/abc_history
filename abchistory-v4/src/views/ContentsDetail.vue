<template>
  <div class="contentsdetail">
    <div>URL：{{ $route.params.problem.URL }}</div>
    <div>難易度：{{ $route.params.problem.difficulty }}</div>
    <div>問題の概要：{{ $route.params.problem.description }}</div>
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

