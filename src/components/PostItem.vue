<template>
  <li class="posts-list__item">
    <div class="posts-list__item-block posts-list__item-block_type_title">
      <button
        :class="[
          post.isLikeActive
            ? 'posts-list__button post-list__button_type_like active-like'
            : 'posts-list__button post-list__button_type_like',
        ]"
        @click="onLikeClick"
      ></button>
      <h2 class="posts-list__title">{{ post.title }}</h2>
      <button
        class="posts-list__button post-list__button_type_delete"
        @click="onDeleteClick"
      ></button>
    </div>
    <div class="posts-list__item-block posts-list__item-block_type_body">
      <p
        :class="[
          isOpenAllBody ? 'posts-list__body active-more' : 'posts-list__body',
        ]"
      >
        {{ post.body }}
      </p>
      <span
        v-if="isOpenAllBody === false"
        @click="onOpenAllBody"
        class="posts-list__more-button"
      ></span>
      <span
        v-if="isOpenAllBody"
        @click="onCloseAllBody"
        class="posts-list__less-button"
      ></span>
    </div>
    <button
      class="posts-list__button post-list__button_type_edit"
      @click="onEditClick"
    ></button>
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
      "likePost",
    ]),
    onDeleteClick() {
      this.setPopupType({
        title: "Удалить пост?",
        popupFunction: this.delete,
      });
      this.setPopupVisible(true);
    },

    delete() {
      this.deletePost(this.index);
    },

    onEditClick() {
      this.setEditedPost(this.post);
      this.setPopupAddVisible(true);
    },
    onOpenAllBody() {
      this.isOpenAllBody = true;
    },
    onLikeClick() {
      this.likePost(this.post);
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
  box-shadow: -1em 0 0.4em rgb(112, 112, 112);
}
.posts-list__item-block {
  display: flex;
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

.posts-list__button {
  max-width: 30px;
  width: 100%;
  height: 30px;
  background-size: 25px;
  background-position: center;
  background-repeat: no-repeat;
  color: rgba(0, 0, 0, 0.556);
  border: none;
  background-color: transparent;
  transition: opacity 0.3s ease-in-out;
}
.post-list__button_type_delete {
  background-image: url("../assets/icon__delete.svg");
}

.post-list__button_type_edit {
  background-image: url("../assets/icons__edit-button.svg");
  margin-top: 10px;
}

.post-list__button_type_like {
  background-image: url("../assets/icon__like.png");
}
.active-like {
  background-image: url("../assets/icon__like_active.png");
}
.posts-list__delete-button:hover {
  opacity: 0.5;
  cursor: pointer;
}
.posts-list__more-button {
  padding: 0px 15px;
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 15px;
  background-image: url("../assets/icon__more-button.png");
}
.active-more {
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

.posts-list__edit-button:hover {
  opacity: 0.5;
  cursor: pointer;
}

@media (max-width: 560px) {
  .posts-list__title {
    font-size: 14px;
    padding: 0 10px 0 20px;
  }

  .posts-list__body {
    font-size: 12px;
    height: 30px;
    max-width: 290px;
  }

  .posts-list__delete-button {
    max-width: 30px;
    width: 100%;
    height: 20px;
    background-size: 20px;
  }
}
</style>