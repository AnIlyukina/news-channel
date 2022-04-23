<template>
  <div class="news-channel">
    <button class="news-channel__get-button" @click="getPosts">
      Загрузить новости
    </button>
    <button class="news-channel__add-button" @click="onAddClick"></button>
    <PostsList v-if="allPosts" />
    <transition name="fade">
      <Loader v-if="loading" />
    </transition>
    <transition name="fade">
      <Error v-if="errorMessage" :message="errorMessage" />
    </transition>
    <transition name="fade">
      <PopupConfirm v-if="popupVisible" />
    </transition>
    <transition name="fade">
      <PopupPost v-if="popupAddVisible" :editedPost="editedPost" />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import Loader from "./components/Loader.vue";
import Error from "./components/Error.vue";
import PostsList from "./components/PostsList.vue";
import PopupConfirm from "./components/PopupConfirm.vue";
import PopupPost from "./components/PopupPost.vue";

export default {
  name: "App",
  components: {
    Loader,
    Error,
    PostsList,
    PopupConfirm,
    PopupPost,
  },
  computed: {
    ...mapGetters(["allPosts"]),
    ...mapState([
      "loading",
      "editedPost",
      "errorMessage",
      "popupVisible",
      "popupAddVisible",
    ]),
  },
  methods: {
    ...mapActions(["setPosts", "setPopupAddVisible"]),
    getPosts() {
      console.log("sg");
      this.setPosts();
    },
    onAddClick() {
      console.log("d");
      this.setPopupAddVisible(true);
    },
  },
};
</script>

<style>
body,
* {
  margin: 0;
  padding: 0;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}
.news-channel {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 200px 20px 200px;
  min-width: 320px;
}
.news-channel__get-button {
  border: none;
  background-color: cornflowerblue;
  padding: 10px 15px;
  border-radius: 10px;
  color: white;
}

.news-channel__add-button {
  border: none;
  background-color: rgb(34, 241, 151);
  padding: 15px 15px;
  border-radius: 50%;
  color: white;
  align-self: flex-end;
  background-image: url("./assets/addButtonWhite.png");
  background-size: 10px;
  background-repeat: no-repeat;
  background-position: center;
}

.news-channel__get-button:hover {
  cursor: pointer;
  opacity: 0.7;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
</style>
