<template>
  <section class="posts-list">
    <Select
      :selected="selected"
      :options="categories"
      @select="sortByCategories"
    />
    <span v-if="sortMessage" class="posts-list__sort-message">
      {{ sortMessage }}</span
    >
    <ul class="posts-list__grid">
      <PostItem
        v-for="(post, index) in items"
        :index="index"
        :key="index"
        :post="post"
      />
    </ul>
    <Paginate
      v-if="sortedProducts.length > 0"
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
import Select from "./Select.vue";

export default {
  name: "PostsList",
  data() {
    return {
      categories: [
        { name: "Все", value: "all" },
        { name: "Понравившиеся", value: "isLiked" },
      ],
      selected: "Все",
      sortedProducts: [],
      sortMessage: "",
    };
  },
  components: {
    PostItem,
    Select,
  },
  computed: {
    ...mapGetters(["allPosts"]),
  },
  watch: {
    sortedProducts: function () {
      return this.setUpPagination(this.sortedProducts);
    },
    allPosts: function () {
      if (this.selected === "Понравившиеся") {
        this.selected = "Понравившиеся";
        this.sortedProducts = this.allPosts.filter(
          (item) => item.isLikeActive === true
        );
      } else {
        this.selected = "Все";
        this.sortedProducts = this.allPosts;
      }
    },
  },
  mounted() {
    this.sortedProducts = this.allPosts;
    this.setUpPagination(this.sortedProducts);
  },
  mixins: [paginationMixin],
  methods: {
    sortByCategories(category) {
      console.log(category);
      if (category.value === "all") {
        this.selected = "Все";
        this.sortedProducts = this.allPosts;
        this.sortMessage = "";
      }
      if (category.value === "isLiked") {
        this.selected = "Понравившиеся";
        this.sortedProducts = this.allPosts.filter(
          (item) => item.isLikeActive === true
        );
        if (this.sortedProducts.length === 0) {
          this.sortMessage = "Понравившихся публикаций нет";
        }
      }
    },
  },
};
</script>

<style>
.posts-list {
  max-width: 600px;
  width: 100%;
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
.posts-list__sort-message {
  align-self: start;
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