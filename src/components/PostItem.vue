<template>
  <li class="posts-list__item">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <button @click="onDeleteClick">Удалить</button>
    <button @click="onEditClick">Редактировать</button>
  </li>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions([
      "deletePost",
      "setPopupVisible",
      "setPopupAddVisible",
      "setPopupType",
      "setEditedPost",
    ]),

    onDeleteClick() {
      console.log("s");
      this.setPopupType({
        title: "Удалить пост?",
        popupFunction: this.delete,
      });
      this.setPopupVisible(true);
    },

    delete() {
      console.log("d");
      this.deletePost(this.index);
    },

    onEditClick() {
      console.log("редактировать");
      console.log(this.post);
      this.setEditedPost(this.post);
      this.setPopupAddVisible(true);
    },
  },
};
</script>

<style>
</style>