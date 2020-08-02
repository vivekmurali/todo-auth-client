<template>
  <div class="home">
    <input type="text" name="email" placeholder="Email" autocomplete="off" v-model="email" />
    <input type="password" name="password" placeholder="Password" v-model="password" />
    <input type="submit" @click.once="register()" />
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
      fetch("http://localhost:3000/register", {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: this.email, password: this.password }),
      }).then((res) => {
        if (res.status == 200) {
            this.$router.push('/login');
        } else {
          this.email = "";
          this.password = "";
        }
      });
    },
  },
};
</script>