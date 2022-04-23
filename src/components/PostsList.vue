<template>
  <section class="posts-list">
    <ul class="posts-list__grid">
      <PostItem
        v-for="(post, index) in items"
        :index="index"
        :key="index"
        :post="post"
      />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="handleChangePage"
        :prev-text="'Назад'"
        :next-text="'Впeред'"
        :container-class="'pagination'"
      />
    </ul>
  </section>
</template>

<script>
import PostItem from "./PostItem.vue";
import paginationMixin from "../mixins/MixinPagination";
import { mapGetters } from "vuex";

export default {
  name: "PostsList",
  components: {
    PostItem,
  },

  computed: {
    ...mapGetters(["allPosts"]),
  },
  watch: {
    allPosts: function () {
      return this.setUpPagination(this.allPosts);
    },
  },
  mounted() {
    this.setUpPagination(this.allPosts);
  },
  mixins: [paginationMixin],
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