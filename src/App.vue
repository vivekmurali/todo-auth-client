<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item class="m-1" to="/" data-toggle="collapse" type="is-link">Home</b-nav-item>
          <b-nav-item
            class="m-1"
            to="/login"
            data-toggle="collapse"
            v-if="!this.log"
            type="is-link"
          >Login</b-nav-item>
          <b-nav-item
            class="m-1"
            to="/register"
            data-toggle="collapse"
            v-if="!this.log"
            type="is-link"
          >Register</b-nav-item>
          <b-nav-item class="m-1" data-toggle="collapse" v-if="this.log" @click="logout()">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      log: false,
    };
  },
  methods: {
    logout: function () {
      let cookies = document.cookie.split("; ").map((a) => a.split("="));
      let object = Object.fromEntries(cookies);
      if (object.token) {
        document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        this.log = false;
        this.$router.push("/login");
      }
    },
  },
  updated: function () {
    let cookies = document.cookie.split("; ").map((a) => a.split("="));
    let object = Object.fromEntries(cookies);
    if (object.token) {
      this.log = true;
    }
  },
  mounted: function () {
    let cookies = document.cookie.split("; ").map((a) => a.split("="));
    let object = Object.fromEntries(cookies);
    if (object.token) {
      this.log = true;
    }
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
