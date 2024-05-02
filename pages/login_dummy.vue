<template>

  <div>
    <button @click.prevent="loginAsAdmin">Login as admin</button>
    <button @click.prevent="loginAsCollector">Login as collector</button>

    <div>

      <can I="edit" a="comment">
        <a href="#">Edit comment</a><br>
      </can>
      <p>This is a comment</p>
      <!-- <can I="delete" a="comment"> -->
        <a href="#" @click.prevent="deleteComment">Delete comment</a><br>
      <!-- </can> -->
      <can I="post" a="comment">
        <a href="#">Post comment</a><br>
      </can>

    </div>

  </div>

</template>

<script>

export default {

  data() {
    return {
      collector : {
        email: 'imranr970@gmail.com',
        password: 'password'
      },
      admin: {
        email: 'imranr970@outlook.com',
        password: 'password'
      }
    };
  },

  methods: {

    loginAsAdmin() {

      this.$auth.login({
        data: this.admin
      });

    },
    loginAsCollector() {

      this.$auth.login({
        data: this.collector
      });

    },

    deleteComment() {
      if(!this.$can('delete', 'comment')) {
        alert("Hello! you are not authorized to delete this comment")
      }
    }

  }
}
</script>
