<template>
  <main class="news-channel">
    <div class="news-channel__header">
      <h1 class="news-channel__title">Инфо-блог</h1>
      <button class="news-channel__add-button" @click="onAddClick"></button>
    </div>
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
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.news-channel__header {
  display: flex;
}

.news-channel__title {
  text-align: center;
}

.news-channel__add-button {
  margin-left: 50px;
  border: none;
  background-color: rgb(233, 152, 152);
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

@media (max-width: 560px) {
  .news-channel__title {
    font-size: 25px;
  }
}
</style>