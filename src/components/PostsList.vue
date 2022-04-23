<template>
  <section class="posts-list">
    <ul class="posts-list__grid">
      <PostItem
        v-for="(post, index) in allPosts"
        :index="index"
        :key="index"
        :post="post"
      />
    </ul>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import PostItem from "./PostItem.vue";

export default {
  name: "PostsList",
  components: {
    PostItem,
  },
  computed: {
    ...mapGetters(["allPosts"]),
  },
};
</script>

<style>
.posts-list {
  max-width: 600px;
}

.posts-list {
  margin: 20px;
}

.posts-list__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-row-gap: 10px;
  list-style-type: none;
}
</style>