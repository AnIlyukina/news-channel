<template>
  <div class="app">
    <button
      v-if="allPosts.length === 0"
      class="app__get-button"
      @click="getPosts"
    >
      Загрузить
    </button>
    <NewsChannel v-if="allPosts.length > 0" />
    <transition name="fade">
      <Preloader v-if="loading" />
    </transition>
    <transition name="fade">
      <Error v-if="errorMessage" :message="errorMessage" />
    </transition>
    <transition name="fade">
      <PopupConfirm v-if="popupVisible" />
    </transition>
    <transition name="fade">
      <PopupNews v-if="popupAddVisible" :editedPost="editedPost" />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import Preloader from "./components/Preloader.vue";
import Error from "./components/Error.vue";
import NewsChannel from "./components/NewsChannel.vue";
import PopupConfirm from "./components/PopupConfirm.vue";
import PopupNews from "./components/PopupNews.vue";

export default {
  name: "App",
  components: {
    Preloader,
    Error,
    PopupConfirm,
    PopupNews,
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
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  min-width: 320px;
}
.app__get-button {
  margin-top: 50px;
  font-family: Helvetica;
  letter-spacing: 0.4em;
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  color: rgb(71, 126, 232);
  cursor: pointer;
  border: 1px solid rgba(71, 126, 232, 0.5);
  padding: 15px 30px;
  border-color: none;
  border-radius: 30px;
  transition: all 600ms cubic-bezier(0.2, 0, 0, 0.8);
}

.app__get-button:hover {
  background-color: rgba(71, 126, 232, 0.5);
  color: white;
  outline-offset: 500px;
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
