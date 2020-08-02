<template>
  <div class="home">
    <input type="text" name="email" placeholder="Email" autocomplete="off" v-model="email" />
    <input type="password" name="password" placeholder="Password" v-model="password" />
    <input type="submit" @click.once="login()" />
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
      fetch("http://localhost:3000/login", {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: this.email, password: this.password }),
      })
        .then((res) => {
          if (res.status == 200) {
            console.log("logged in");
            return res.json();
          } else {
            this.email = "";
            this.password = "";
          }
        })
        .then((res) => {
          this.auth = res.token;
          this.$cookies.set("token", this.auth, );
          this.$router.push({ name: "todo", params: { token: this.auth } });
        });
    },
  },
};
</script>