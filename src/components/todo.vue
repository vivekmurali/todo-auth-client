<template>
  <div class="container">
    <h1 class="title">Hello World!</h1>
    <h2 class="subtitle">I am Vivek</h2>
    <b-form-input
      type="text"
      class="mb-4"
      id="input-box"
      minlength="3"
      v-model="message"
      :placeholder="hi"
      @keydown.enter="newNote()"
    />
    <b-list-group>
      <b-list-group-item v-for="(name, index) in dat" :key="name._id">
        {{name.title}}
        <b-button class="float-right" size="sm" variant="danger" @click="deleteTodo(name, index)">X</b-button>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>


<script>
export default {
  name: "todo",
  data() {
    return {
      hi: "hello",
      message: "",
      dat: [],
      token: "",
    };
  },
  methods: {
    hello: function () {
      console.log("hello");
    },
    newNote: function () {
      let cookies = document.cookie.split("; ").map((a) => a.split("="));
      let object = Object.fromEntries(cookies);
      fetch("http://localhost:3000/notes/new", {
        headers: {
          Accept: "application/json, text,plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${object.token}`,
        },
        method: "POST",
        body: JSON.stringify({ title: this.message }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.setData(res);
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
    setData: function (data) {
      this.dat.push(data);
    },
    deleteTodo: function (name, index) {
      let cookies = document.cookie.split("; ").map((a) => a.split("="));
      let object = Object.fromEntries(cookies);
      fetch("http://localhost:3000/notes/delete/" + this.dat[index]._id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${object.token}`,
        },
      })
        .then(() => {
          this.dat.splice(index, 1);
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    let cookies = document.cookie.split("; ").map((a) => a.split("="));
    let object = Object.fromEntries(cookies);
    if (!object.token) {
      this.$router.push("/login");
    } else {
      fetch("http://localhost:3000/notes", {
        headers: {
          Authorization: `Bearer ${object.token}`,
        },
      })
        .then((res) => {
          if (res.status == 401) {
            this.$router.push("/login");
            return;
          }
          return res.json();
        })
        .then((dat) => {
          this.dat = dat.map((a) => a);
        })
        .catch((err) => console.log(err));
    }
  },
};
</script>