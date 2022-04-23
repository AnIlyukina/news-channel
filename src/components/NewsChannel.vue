<template>
  <section>
    <button class="news-channel__add-button" @click="onAddClick"></button>
    <PostsList />
  </section>
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
.news-channel__add-button {
  border: none;
  background-color: rgb(34, 241, 151);
  padding: 15px 15px;
  border-radius: 50%;
  color: white;
  align-self: flex-end;
  background-image: url("../assets/addButtonWhite.png");
  background-size: 10px;
  background-repeat: no-repeat;
  background-position: center;
}

.pagination {
  margin: 0 auto;
  padding: 10px;
  display: flex;
  width: 300px;
  list-style-type: none;
  justify-content: space-between;
  font-weight: 500;
  font-size: 20px;
  color: rgb(55, 105, 105);
}
</style>