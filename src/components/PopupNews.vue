<template>
  <section class="popup popup_type_news">
    <form class="popup__form popup__form_type_news" name="form">
      <button type="button" class="popup__close" @click="closePopup"></button>
      <h2 class="popup__form-title">
        {{ this.editedPost.id ? "Редактировать пост" : "Новый пост" }}
      </h2>
      <label class="popup__label" for="post-title">Название поста:</label>
      <input
        class="popup__input"
        v-model="post.title"
        type="text"
        id="post-title"
        autocomplete="off"
      />
      <label class="popup__label" for="post-text">Описание: </label>
      <textarea
        class="popup__input"
        v-model="post.body"
        type="text"
        id="post-text"
        rows="10"
      />
      <div class="popup__buttons">
        <button
          @click.enter.prevent="closePopup"
          type="submit"
          class="popup__button"
        >
          Отменить
        </button>
        <button
          @click.enter.prevent="createNewPost"
          type="submit"
          :class="['popup__button', !modelValid && 'disabled']"
          :disabled="!modelValid"
        >
          Сохранить
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  name: "PopupNews",
  created() {
    if (this.editedPost.id) {
      this.post = {
        id: this.editedPost.id,
        title: this.editedPost.title,
        body: this.editedPost.body,
        isLikeActive: this.editedPost.isLikeActive,
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
    modelValid() {
      return !this.$v.post.$invalid;
    },
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
    createNewPost() {
      if (this.editedPost.id) {
        this.setPopupType({
          title: "Сохранить изменения?",
          popupFunction: this.editPost,
        });
        this.setPopupVisible(true);
      } else {
        this.createPost({
          id: this.allPosts.length + 1,
          isLikeActive: false,
          ...this.post,
        });
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
  validations: {
    post: {
      title: {
        required,
      },
      body: {
        required,
      },
    },
  },
};
</script>

<style>
.popup__label {
  margin: 10px 0;
}
.popup__input {
  border: none;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  padding: 5px;
}
.popup_type_news {
  z-index: 1;
}

.popup__form_type_news {
  max-width: 800px;
  color: black;
  background-color: rgb(255, 255, 255);
}
.disabled {
  opacity: 0.5;
}
</style>