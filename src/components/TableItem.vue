<template>
  <tr>
    <td class="px-6 py-4">
      <input
        id="select"
        type="checkbox"
        :checked="selected.includes(product.id)"
        @input="(e) => handleSelectRow(e.target.checked, product.id)"
        class="w-4 h-4 text-blue-600 bg-transparent border-gray-600 rounded cursor-pointer focus:ring-offset-gray-800 focus:ring-1"
      />
    </td>

    <td class="max-w-xs px-6 py-4 font-medium">
      <div class="inline-flex items-center gap-4">
        <img
          class="rounded w-14 h-14"
          :src="product.image"
          alt="Default avatar"
        />

        <span>{{ product.title }}</span>
      </div>
    </td>

    <td class="px-6 py-4 capitalize">
      {{ product.category }}
    </td>

    <td class="px-6 py-4">${{ product.price }}</td>

    <td class="px-6 py-4">
      <div class="flex items-center">
        <svg
          class="w-4 h-4 mr-1 text-yellow-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path
            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
          />
        </svg>

        <p class="ml-2 text-sm font-bold">
          {{ product.rating.rate }}
        </p>

        <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
        <span class="text-sm font-medium underline">
          ({{ product.rating.count }})
        </span>
      </div>
    </td>

    <td class="px-6 py-4 text-2xl">
      <span
        class="cursor-pointer"
        @click="() => handleDeleteProduct(product.id)"
      >
        &times;
      </span>
    </td>
  </tr>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useProductsStore } from "../store/products";

export default {
  props: {
    product: { type: Object, required: true, default: {} },
  },

  computed: {
    ...mapState(useProductsStore, ["selected"]),
  },

  methods: {
    ...mapActions(useProductsStore, ["handleDeleteProduct", "handleSelectRow"]),
  },
};
</script>
