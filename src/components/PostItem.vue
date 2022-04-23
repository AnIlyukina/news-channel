<template>
  <li class="posts-list__item">
    <div class="posts-list__item-block posts-list__item-block_type_title">
      <h2 class="posts-list__title">{{ post.title }}</h2>
      <button class="posts-list__delete-button" @click="onDeleteClick"></button>
    </div>
    <div class="posts-list__item-block posts-list__item-block_type_body">
      <p
        :class="[
          isOpenAllBody ? 'posts-list__body active' : 'posts-list__body',
        ]"
      >
        {{ post.body }}
      </p>
      <span
        v-if="isOpenAllBody === false"
        @click="onOpenAllBody"
        class="posts-list__more-button"
        >...</span
      >
      <span
        v-if="isOpenAllBody"
        @click="onCloseAllBody"
        class="posts-list__less-button"
      ></span>
    </div>
    <button class="posts-list__edit-button" @click="onEditClick"></button>
  </li>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PostItem",
  data() {
    return {
      isOpenAllBody: false,
    };
  },
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
    onOpenAllBody() {
      this.isOpenAllBody = true;
    },
    onCloseAllBody() {
      this.isOpenAllBody = false;
    },
  },
};
</script>

<style>
.posts-list__item {
  padding: 10px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(147, 142, 142);
  border-radius: 30px 0 30px 0;
  box-shadow: -1em 0 0.4em rgb(112, 112, 112);
}
.posts-list__item-block {
  display: flex;
}
.posts-list__item-block_type_title {
  justify-content: space-between;
}

.posts-list__title {
  text-align: center;
  margin: 0 auto;
  font-size: 20px;
  padding: 0 30px 0 50px;
}

.posts-list__body {
  margin-top: 15px;
  height: 37px;
  overflow: hidden;
  max-width: 530px;
  text-align: justify;
}

.posts-list__delete-button {
  max-width: 30px;
  width: 100%;
  background-size: 25px;
  background-position: start;
  background-repeat: no-repeat;
  color: rgba(0, 0, 0, 0.556);
  border: none;
  background-color: transparent;
  background-image: url("../assets/icon__delete.svg");
  transition: opacity 0.3s ease-in-out;
}

.posts-list__delete-button:hover {
  opacity: 0.5;
  cursor: pointer;
}
.posts-list__more-button {
  display: flex;
  margin-left: 4px;
  font-weight: 600;
  align-items: flex-end;
  transition: opacity 0.3s ease-in-out;
  color: gray;
}
.active {
  height: 100%;
  overflow: visible;
}
.posts-list__more-button:hover {
  opacity: 0.5;
  cursor: pointer;
}

.posts-list__less-button {
  padding: 0px 15px;
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 15px;
  background-image: url("../assets/icon__less-button.png");
}

.posts-list__edit-button {
  padding: 14px;
  background-size: 24px;
  background-position: start;
  background-repeat: no-repeat;
  color: rgba(0, 0, 0, 0.556);
  align-self: end;
  margin-top: 5px;
  border: none;
  background-color: transparent;
  background-image: url("../assets/icons__edit-button.svg");
  transition: opacity 0.3s ease-in-out;
}

.posts-list__edit-button:hover {
  opacity: 0.5;
  cursor: pointer;
}
</style>