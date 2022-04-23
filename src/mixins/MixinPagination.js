import _ from 'lodash'


export default {
  data() {
    return {
      page: 1,
      pageSize: 3,
      pageCount: 0,
      allItems: [],
      items: []
    }
  },
  methods: {
    setUpPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize)
      this.pageCount = _.size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },
    handleChangePage(page) {
      // this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[page - 1] || this.allItems[0]
    },
  }
}