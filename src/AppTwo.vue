<template>
  <div class="container mx-auto my-8">
    <div class="p-4 py-5 mb-10 bg-gray-800 rounded-xl">
      <!-- FILTER ACTIONS -->
      <TableFilterActions v-model="filter" :categories="categories" />

      <!-- FILTER APPLIED VIEWER -->
      <TableFilterView v-if="filterApplied" v-model="filter" />
    </div>

    <!-- PRODUCT TABLE BLOCK -->
    <div class="relative py-5 overflow-x-auto bg-gray-800 rounded-xl">
      <div
        class="flex items-center justify-between px-4 pb-4"
        v-if="selected.length > 0"
      >
        <p class="font-medium text-slate-200">{{ selected.length }} Selected</p>
        <button
          class="p-1 rounded-full ring-1 ring-gray-700"
          @click="handleDeleteSelectedProduct()"
        >
          <svg fill="none" viewBox="0 0 24 24" class="w-6 h-6 stroke-slate-200">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 12v5M14 12v5M4 7h16M6 10v8a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-8M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5Z"
            />
          </svg>
        </button>
      </div>

      <Table :products="filteredProductsWithPagination" />
    </div>

    <!-- PAGINATION BLOCK -->
    <Pagination
      :currentPage="pageIndex"
      :pageCount="pageCount"
      @prev="handlePrevPage()"
      @next="handleNextPage()"
    />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { products } from "./data/products";
import { categories } from "./data/categories";
// COMPONENTS
import Table from "./components/Table.vue";
import TableFilterView from "./components/actions/TableFilterView.vue";
import TableFilterActions from "./components/actions/TableFilterActions.vue";
import Pagination from "./components/Pagination.vue";
import { computed } from "vue";

export default {
  components: { Table, TableFilterActions, TableFilterView, Pagination },
  data() {
    return {
      pageSize: 5,
      pageIndex: 1,
      products: [...products],
      categories: [...categories],
      filter: { category: "", sort: "", search: "" },
      selected: [],
    };
  },
  methods: {
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

    async handleDeleteProduct(productId) {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure want to delete?",
        showCancelButton: true,
        confirmButtonText: "Delete",
        icon: "info",

        customClass: {
          popup: "rounded-xl bg-gray-800 text-gray-200",
          container: "backdrop-opacity-70",
          title: "text-3xl",
          confirmButton: "bg-red-500 focus:shadow-none",
          cancelButton: "bg-gray-700 focus:shadow-none",
          icon: "text-red-500 border-red-500",
        },
      });

      if (isConfirmed) {
        this.products = this.products.filter((item) => item.id !== productId);
      }
    },

    async handleDeleteSelectedProduct() {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure want to delete?",
        showCancelButton: true,
        confirmButtonText: "Delete",
        icon: "info",

        customClass: {
          popup: "rounded-xl bg-gray-800 text-gray-200",
          container: "backdrop-opacity-70",
          title: "text-3xl",
          confirmButton: "bg-red-500 focus:shadow-none",
          cancelButton: "bg-gray-700 focus:shadow-none",
          icon: "text-red-500 border-red-500",
        },
      });

      if (isConfirmed) {
        this.products = this.products.filter(
          (item) => !this.selected.includes(item.id)
        );
        this.selected = [];
      }
    },

    handleSelectAllRow(e) {
      if (e.target.checked) {
        this.selected = this.filteredProducts.map((item) => item.id);
      } else {
        this.selected = [];
      }
    },

    handleSelectRow(e, productId) {
      if (e.target.checked) {
        this.selected.push(productId);
      } else {
        this.selected = this.selected.filter((id) => id != productId);
      }
    },
  },
  computed: {
    filterApplied() {
      return (
        Object.keys(this.filter).filter((item) => this.filter[item]).length > 0
      );
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
      return Math.ceil(this.filteredProducts.length / this.pageSize);
    },

    filteredProductsWithPagination() {
      const firstIndex = (this.pageIndex - 1) * this.pageSize;
      const lastIndex = this.pageIndex * this.pageSize;
      return this.filteredProducts.slice(firstIndex, lastIndex);
    },
  },

  provide() {
    return {
      selected: computed(() => this.selected),
      handleSelectRow: this.handleSelectRow,
      handleSelectAllRow: this.handleSelectAllRow,
      handleDeleteProduct: this.handleDeleteProduct,
    };
  },
};
</script>
