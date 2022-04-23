<template>
  <div class="popup-newPost">
    <form class="popup-newPost__form" name="form">
      <button
        type="button"
        class="popup-newPost__close"
        @click="closePopup"
      ></button>
      <h2 class="popup-newPost__form-title">Новый пост</h2>
      <label for="post-title">Заголовок поста</label>
      <input v-model="post.title" type="text" id="post-title" />
      <label for="post-text">Описание </label>
      <textarea v-model="post.body" type="text" id="post-text" rows="5" />
      <div class="popup-newPost__buttons">
        <button
          @click="createNewPost"
          type="submit"
          class="popup-newPost__button"
        >
          Сохранить
        </button>
        <button class="popup-newPost__button">Отменить</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PopupPost",
  created() {
    if (this.editedPost.id) {
      this.post = {
        id: this.editedPost.id,
        title: this.editedPost.title,
        body: this.editedPost.body,
      };
    }
  },
  props: {
    editedPost: {
      type: Object,
      require: false,
    },
  },
  computed: {
    ...mapGetters(["allPosts"]),
  },
  methods: {
    ...mapActions([
      "setPopupAddVisible",
      "setPopupVisible",
      "setEditedPost",
      "setPopupType",
      "createPost",
      "updatePost",
    ]),
    closePopup() {
      if (this.editedPost) {
        this.setEditedPost({});
      }
      this.setPopupAddVisible(false);
    },
    createNewPost(e) {
      e.preventDefault();
      if (this.editedPost.id) {
        this.setPopupType({
          title: "Сохранить изменения?",
          popupFunction: this.editPost,
        });
        this.setPopupVisible(true);
      } else {
        this.createPost({ id: this.allPosts.length + 1, ...this.post });
        this.setPopupAddVisible(false);
      }
    },
    editPost() {
      this.updatePost(this.post);
      this.setPopupAddVisible(false);
      this.setPopupVisible(false);
      this.setEditedPost({});
    },
  },
  data() {
    return {
      post: {
        title: " ",
        body: " ",
      },
    };
  },
};
</script>

<style>
.popup-newPost {
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  z-index: 1;
  font-size: 18px;
}

.popup-newPost__form-title {
  text-align: center;
}

.popup-newPost__form {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  line-height: 17px;
  padding: 14px 36px 36px 36px;
  box-sizing: border-box;
}

.popup-newPost__close {
  width: 22px;
  height: 22px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.3s;
  background-image: url("../assets/close.png");
  background-size: contain;
  margin-left: auto;
}

.popup-newPost__buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.popup-newPost__button {
  width: 40%;
  color: #000000;
  cursor: pointer;
  border: none;
  background-color: rgba(0, 0, 0, 0.63);
  border-radius: 10px;
  color: rgb(255, 255, 255);
  margin-top: 40px;
  padding: 5px;
  font-size: 18px;
  z-index: 1;
}

@media (max-width: 560px) {
  .popup-newPost {
    padding: 0 20px;
    font-size: 14px;
  }
  .popup-newPost__close {
    width: 16px;
    height: 16px;
  }
  .popup-newPost__button {
    width: 35%;
    font-size: 14px;
  }
}
@media (max-width: 425px) {
  .ppopup-newPost__form {
    padding: 10px 20px 20px 20px;
  }
}
</style>