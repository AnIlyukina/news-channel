<template>
  <main class="news-channel">
    <h1 class="news-channel__title">Новости</h1>
    <button class="news-channel__add-button" @click="onAddClick"></button>
    <PostsList />
  </main>
</template>

<script>
import { mapActions } from "vuex";
import PostsList from "./PostsList.vue";
export default {
  name: "NewChannel",
  components: {
    PostsList,
  },
  methods: {
    ...mapActions(["setPopupAddVisible"]),
    onAddClick() {
      this.setPopupAddVisible(true);
    },
  },
};
</script>

<style>
.news-channel {
  max-width: 800px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.news-channel__title {
  text-align: center;
}

.news-channel__add-button {
  border: none;
  background-color: rgb(160, 193, 179);
  padding: 20px 20px;
  border-radius: 50%;
  color: white;
  align-self: end;
  background-image: url("../assets/icon__add-button.png");
  background-size: 16px;
  background-repeat: no-repeat;
  background-position: center;
  transition: opacity 0.3s ease-in-out;
}

.news-channel__add-button:hover {
  opacity: 0.5;
  cursor: pointer;
}
</style>