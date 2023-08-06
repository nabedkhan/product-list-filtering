import { defineStore } from "pinia";
import Swal from "sweetalert2";

import { products } from "../data/products";
import { categories } from "../data/categories";

const OPTIONS = {
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
};

export const useProductsStore = defineStore("products", {
  state: () => {
    return {
      selected: [],
      products: [...products],
      categories: [...categories],
    };
  },
  actions: {
    async handleDeleteProduct(productId) {
      const { isConfirmed } = await Swal.fire(OPTIONS);

      if (isConfirmed) {
        this.products = this.products.filter((item) => item.id !== productId);
      }
    },

    async handleDeleteSelectedProduct() {
      const { isConfirmed } = await Swal.fire(OPTIONS);

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
});
