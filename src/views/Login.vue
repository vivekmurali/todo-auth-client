<template>
  <div class="container">
    <h1 class="display1">Login</h1>
    <b-form-input
      type="text"
      name="email"
      placeholder="Username"
      autocomplete="off"
      v-model="email"
      class="mt-3"
      style="width: 50%; margin: auto;"
    />
    <b-form-input
      class="mt-3"
      type="password"
      name="password"
      placeholder="Password"
      v-model="password"
      style="width: 50%; margin: auto;"
      @keydown.enter.once="login()"
    />
    <b-button id="login-btn" class="m-3" variant="primary" @click.once="login()">Submit</b-button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      auth: "",
    };
  },
  methods: {
    login: function () {
      document.getElementById("login-btn").disabled = true;
      if (this.email == "" || this.password == "") return;
      fetch("https:/api.vivekmurali.tech/login", {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: this.email, password: this.password }),
      })
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          } else {
            this.email = "";
            this.password = "";
          }
        })
        .then((res) => {
          this.auth = res.token;
          this.$cookies.set("token", this.auth, "2d");
          // document.cookie=`token=${this.auth}; HttpOnly`;
          this.$router.push({ name: "todo", params: { token: this.auth } });
        });
    },
  },
};
</script>