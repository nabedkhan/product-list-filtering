import { defineStore } from "pinia";
import { useProductFilterStore } from "./filter";

export const useProductPagination = defineStore("productPagination", {
  state: () => ({
    pageSize: 5,
    pageIndex: 1,
  }),

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
  },

  getters: {
    pageCount() {
      const { filteredProducts } = useProductFilterStore();
      return Math.ceil(filteredProducts.length / this.pageSize);
    },

    filteredProductsWithPagination() {
      const { filteredProducts } = useProductFilterStore();

      const firstIndex = (this.pageIndex - 1) * this.pageSize;
      const lastIndex = this.pageIndex * this.pageSize;
      return filteredProducts.slice(firstIndex, lastIndex);
    },
  },
});
