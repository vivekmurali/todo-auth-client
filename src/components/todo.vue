<template>
  <div class="container">
    <b-form-input
      type="text"
      class="mt-4 mb-4"
      id="input-box"
      minlength="3"
      v-model="message"
      :placeholder="Task"
      @keydown.enter="newNote()"
    />
    <b-list-group>
      <transition-group name="fadeDown">
        <b-list-group-item
          v-for="(name, index) in dat"
          :key="name._id"
          :class="{ strike: name.done}"
        >
          <b-form-checkbox class="float-left" @change="toggle(name, index)" :checked="name.done" />
          {{name.title}}
          <b-button class="float-right" size="sm" variant="danger" @click="deleteTodo(name, index)">
            <b-icon icon="trash" />
          </b-button>
        </b-list-group-item>
      </transition-group>
    </b-list-group>
  </div>
</template>


<script>
export default {
  name: "todo",
  data() {
    return {
      Task: "Add new Task",
      message: "",
      dat: [],
      token: "",
      isActive: false,
    };
  },
  methods: {
    hello: function () {
      console.log("hello");
    },
    toggle: function (name, index) {
      let cookies = document.cookie.split("; ").map((a) => a.split("="));
      let object = Object.fromEntries(cookies);
      this.dat[index].done = !this.dat[index].done;
      fetch("https://api.vivekmurali.tech/notes/edit/" + this.dat[index]._id, {
        method: "PUT",
        headers: {
          Accept: "application/json, text,plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${object.token}`,
        },
        body: JSON.stringify({ done: this.dat[index].done }),
      });
    },
    newNote: function () {
      let cookies = document.cookie.split("; ").map((a) => a.split("="));
      let object = Object.fromEntries(cookies);
      fetch("https://api.vivekmurali.tech/notes/new", {
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
          this.message = "";
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
      fetch(
        "https://api.vivekmurali.tech/notes/delete/" + this.dat[index]._id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${object.token}`,
          },
        }
      )
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
      fetch("https://api.vivekmurali.tech/notes", {
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
<style>
.strike {
  text-decoration: line-through;
  transition: 0.2s;
  color: grey;
}
</style>