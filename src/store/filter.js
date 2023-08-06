import { defineStore } from "pinia";
import { useProductsStore } from "./products";

export const useProductFilterStore = defineStore("productFilter", {
  state: () => ({
    filter: { category: "", sort: "", search: "" },
  }),

  getters: {
    filterApplied() {
      return (
        Object.keys(this.filter).filter((item) => this.filter[item]).length > 0
      );
    },

    filteredProducts() {
      let filteredProducts = [];

      const { category, sort, search } = this.filter;

      const { products } = useProductsStore();

      // FILTER LIST BASED ON SELECTED CATEGORY
      filteredProducts = products.filter((product) => {
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
  },
});
