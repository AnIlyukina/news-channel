<template>
  <section class="posts-list">
    <ul class="posts-list__grid">
      <PostItem
        v-for="(post, index) in items"
        :index="index"
        :key="index"
        :post="post"
      />
    </ul>
    <Paginate
      v-model="page"
      :page-count="pageCount"
      :click-handler="handleChangePage"
      :prev-text="'<<'"
      :next-text="'>>'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    />
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
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.pagination {
  margin: 0 auto;
  padding: 10px;
  display: flex;
  width: 300px;
  list-style-type: none;
  justify-content: space-between;
  font-weight: 900;
  font-size: 20px;
  color: rgb(238, 131, 131);
}

.page-item {
  padding: 0 5px;
  border-radius: 10px;
  color: rgb(111, 110, 110);
}
.active {
  background-color: rgb(233, 152, 152);
}
</style>