<template>
  <div class="news-channel">
    <button
      v-if="allPosts.length === 0"
      class="news-channel__get-button"
      @click="getPosts"
    >
      Загрузить новости
    </button>
    <NewsChannel v-if="allPosts.length > 0" />
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
import NewsChannel from "./components/NewsChannel.vue";
import PopupConfirm from "./components/PopupConfirm.vue";
import PopupPost from "./components/PopupPost.vue";

export default {
  name: "App",
  components: {
    Loader,
    Error,
    PopupConfirm,
    PopupPost,
    NewsChannel,
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
    ...mapActions(["setPosts"]),
    getPosts() {
      console.log("sg");
      this.setPosts();
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
