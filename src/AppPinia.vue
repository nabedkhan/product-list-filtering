<template>
  <div class="container mx-auto my-8">
    <div class="p-4 py-5 mb-10 bg-gray-800 rounded-xl">
      <!-- FILTER ACTIONS -->
      <TableFilterActions v-model="filter" :categories="categories" />

      <!-- FILTER APPLIED VIEWER -->
      <TableFilterView
        v-if="filterApplied"
        :filter="filter"
        :handleDeleteFilter="handleDeleteFilter"
      />
    </div>

    <!-- PRODUCT TABLE BLOCK -->
    <div class="relative py-5 overflow-x-auto bg-gray-800 rounded-xl">
      <Table :products="filteredProductsWithPagination" />
    </div>

    <!-- PAGINATION BLOCK -->
    <ul class="inline-flex -space-x-px text-sm">
      <li>
        <button
          @click="handlePrevPage()"
          class="flex items-center justify-center h-8 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
        >
          Previous
        </button>
      </li>

      <li v-for="page in pageCount" :key="page">
        <button
          class="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        >
          {{ page }}
        </button>
      </li>

      <li>
        <button
          @click="handleNextPage()"
          class="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
        >
          Next
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { products } from "./data/products";
import { categories } from "./data/categories";
// COMPONENTS
import Table from "./components/Table.vue";
import TableFilterView from "./components/actions/TableFilterView.vue";
import TableFilterActions from "./components/actions/TableFilterActions.vue";

export default {
  components: { Table, TableFilterActions, TableFilterView },
  data() {
    return {
      pageSize: 5,
      pageIndex: 1,
      products: [...products],
      categories: [...categories],
      filter: { category: "", sort: "", search: "" },
    };
  },
  methods: {
    handleDeleteFilter(key) {
      this.filter[key] = "";
    },

    handleNextPage() {
      if (this.pageIndex < this.pageCount) {
        this.pageIndex++;
      }
    },
    handlePrevPage() {
      if (this.pageIndex > 1) {
        this.pageIndex--;
      }
    },
  },
  computed: {
    filterApplied() {
      const keys = Object.keys(this.filter);
      return keys.filter((item) => this.filter[item]).length > 0;
    },

    filteredProducts() {
      let filteredProducts = [];

      const { category, sort, search } = this.filter;

      // FILTER LIST BASED ON SELECTED CATEGORY
      filteredProducts = this.products.filter((product) => {
        if (category) return product.category === category;
        else return true;
      });

      // SORT LIST BASED ON SELECTED
      if (sort) {
        if (sort === "low-high")
          filteredProducts.sort((a, b) => a.price - b.price);

        if (sort === "high-low")
          filteredProducts.sort((a, b) => b.price - a.price);
      }

      // FILTER LIST BASED ON SELECTED SEARCH VALUE
      filteredProducts = filteredProducts.filter((product) => {
        if (search)
          return product.title
            .toLowerCase()
            .includes(search.toLowerCase().trim());
        else return true;
      });

      return filteredProducts;
    },

    pageCount() {
      return this.filteredProducts.length / this.pageSize;
    },

    filteredProductsWithPagination() {
      const firstIndex = (this.pageIndex - 1) * this.pageSize;
      const lastIndex = this.pageIndex * this.pageSize;
      return this.filteredProducts.slice(firstIndex, lastIndex);
    },
  },
};
</script>
