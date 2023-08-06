import { defineStore } from "pinia";
import Swal from "sweetalert2";

import { products } from "../data/products";
import { categories } from "../data/categories";

export const useProductsStore = defineStore("products", {
  state: () => {
    return {
      pageSize: 5,
      pageIndex: 1,
      selected: [],
      products: [...products],
      categories: [...categories],
      filter: { category: "", sort: "", search: "" },
    };
  },
  actions: {
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

    handleSelectAllRow(checked) {
      if (checked) {
        this.selected = this.filteredProducts.map((item) => item.id);
      } else {
        this.selected = [];
      }
    },

    handleSelectRow(checked, productId) {
      if (checked) {
        this.selected.push(productId);
      } else {
        this.selected = this.selected.filter((id) => id != productId);
      }
    },
  },

  getters: {
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
});
