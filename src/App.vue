<template>
  <div id="app">
    <div id="nav">
      <b-button to="/" type="is-link">home</b-button>|
      <b-button to="/login" type="is-link">login</b-button>|
      <b-button to="/register" type="is-link">Register</b-button>|
      <b-button @click="logout()">logout</b-button>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    logout: function () {
      console.log("logout");
      let cookies = document.cookie.split("; ").map((a) => a.split("="));
      let object = Object.fromEntries(cookies);
      if (object.token) {
        document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
