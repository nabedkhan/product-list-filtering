<template>
  <div class="container mx-auto my-8">
    <div class="bg-gray-800 py-5 rounded-xl mb-10 p-4">
      <div class="flex items-center gap-4">
        <div class="max-w-xs w-full">
          <select
            v-model="categoryFilter"
            class="bg-gray-50 border border-gray-300 outline-none text-gray-800 text-sm rounded-lg p-3 w-full"
          >
            <option selected value="">Category</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ toCapitalize(category) }}
            </option>
          </select>
        </div>

        <div class="max-w-xs w-full">
          <select
            v-model="priceFilter"
            class="bg-gray-50 border border-gray-300 outline-none text-gray-800 text-sm rounded-lg p-3 w-full"
          >
            <option selected value="">Sort By Price</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        <div class="flex-1">
          <input
            type="text"
            v-model="searchFilter"
            class="bg-gray-50 border border-gray-300 outline-none text-gray-800 text-sm rounded-lg block w-full p-3"
            placeholder="Search product by name"
          />
        </div>
      </div>

      <div class="flex items-center gap-3 mt-5">
        <span
          v-if="categoryFilter"
          class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-grey-800 bg-white rounded-md"
        >
          {{ categoryFilter }}
          <button
            type="button"
            @click="handleDeleteFilter('categoryFilter')"
            class="inline-flex items-center p-1 ml-2 text-sm text-red-500 bg-transparent rounded-sm hover:bg-red-100"
          >
            <svg
              class="w-2 h-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </span>

        <span
          v-if="priceFilter"
          @click="handleDeleteFilter('priceFilter')"
          class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-grey-800 bg-white rounded-md"
        >
          {{ priceFilter }}
          <button
            type="button"
            class="inline-flex items-center p-1 ml-2 text-sm text-red-500 bg-transparent rounded-sm hover:bg-red-100"
          >
            <svg
              class="w-2 h-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </span>

        <span
          v-if="searchFilter"
          @click="handleDeleteFilter('searchFilter')"
          class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-grey-800 bg-white rounded-md"
        >
          {{ searchFilter }}
          <button
            type="button"
            class="inline-flex items-center p-1 ml-2 text-sm text-red-500 bg-transparent rounded-sm hover:bg-red-100"
          >
            <svg
              class="w-2 h-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </span>
      </div>
    </div>

    <div class="relative overflow-x-auto bg-gray-800 py-5 rounded-xl">
      <table class="w-full text-sm text-left text-white">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">Product Image</th>
            <th scope="col" class="px-6 py-3">Product name</th>
            <th scope="col" class="px-6 py-3">Category</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-700">
          <tr v-for="product in filteredProducts" :key="product.id">
            <td class="px-6 py-4">
              <img
                class="w-20 h-20 rounded"
                :src="product.image"
                alt="Default avatar"
              />
            </td>

            <th class="px-6 py-4 font-medium">
              {{ product.title }}
            </th>

            <td class="px-6 py-4">
              {{ product.category }}
            </td>

            <td class="px-6 py-4">${{ product.price }}</td>

            <td class="px-6 py-4 text-2xl">
              <span class="cursor-pointer">&times;</span>
            </td>
          </tr>

          <tr v-if="filteredProducts.length === 0">
            <td colspan="5" class="bg-gray-900 py-24 text-center">
              <p class="text-2xl">Product Not Found!</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { products } from "./data/products";
import { categories } from "./data/categories";

export default {
  data() {
    return {
      products: [...products],
      categories: [...categories],

      categoryFilter: "",
      priceFilter: "",
      searchFilter: "",
    };
  },

  methods: {
    toCapitalize(text) {
      return text
        .split(" ")
        .map((text) => text.charAt(0).toUpperCase() + text.slice(1))
        .join(" ");
    },

    handleDeleteFilter(type) {
      this[type] = "";
    },
  },

  computed: {
    filteredProducts() {
      let filteredProducts = [];

      filteredProducts = this.products.filter((product) => {
        if (this.categoryFilter)
          return product.category === this.categoryFilter;
        else return true;
      });

      if (this.priceFilter) {
        if (this.priceFilter === "low-high")
          filteredProducts.sort((a, b) => a.price - b.price);

        if (this.priceFilter === "high-low")
          filteredProducts.sort((a, b) => b.price - a.price);
      }

      filteredProducts = filteredProducts.filter((product) => {
        if (this.searchFilter)
          return product.title
            .toLowerCase()
            .includes(this.searchFilter.toLowerCase().trim());
        else return true;
      });

      return filteredProducts;
    },
  },
};
</script>
