import { defineStore } from "pinia";
import { products } from "../data/products";
import { categories } from "../data/categories";

export const useProductsStore = defineStore("products", {
  state: () => {
    return {
      products,
      categories,
      pageSize: 5,
      pageIndex: 1,
      filter: { category: "", sort: "", search: "" },
    };
  },
  actions: {
    handleDeleteProduct(id) {
      this.products = this.products.filter((item) => item.id !== id);
    },
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

  getters: {
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
});
