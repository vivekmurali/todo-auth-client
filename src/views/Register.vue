<template>
  <div class="container">
    <h1 class="display1">Register</h1>
    <b-form>
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
      />
      <b-button id="register-btn" class="m-3" variant="primary" @click.once="register()">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      auth: "",
    };
  },
  methods: {
    register: function () {
      document.getElementById("register-btn").disabled = true;
      if (this.email == "" || this.password == "") return;
      fetch("https://api.vivekmurali.tech/register", {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: this.email, password: this.password }),
      }).then((res) => {
        if (res.status == 200) {
          this.$router.push("/login");
        } else {
          this.email = "";
          this.password = "";
        }
      });
    },
  },
};
</script>