<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/contents">Contents</router-link>
      <router-link to="/add">Register</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#nav {
  display: flex;
  align-items: center;
  background: #222;
}
#nav a {
  display: block;
  padding: 0.5em;
  color: #eee;
  line-height: 1em;
  text-decoration: none;
}
</style>
