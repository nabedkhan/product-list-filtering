<template>
  <table class="w-full text-sm text-left text-white">
    <!-- TABLE HEAD BLOCK -->
    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th v-for="head in tableHead" :key="head" scope="col" class="px-6 py-3">
          {{ head }}
        </th>
      </tr>
    </thead>

    <!-- TABLE BODY BLOCK -->
    <tbody class="divide-y divide-gray-700">
      <!-- TABLE ROW BLOCK -->
      <TableItem
        v-for="product in products"
        :product="product"
        :key="product.id"
      />

      <!-- NOT FOUND PRODUCT MESSAGE -->
      <tr v-if="products.length === 0">
        <td colspan="5" class="py-24 text-center bg-gray-900">
          <p class="text-2xl">Product Not Found!</p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from "pinia";
import TableItem from "./TableItem.vue";
import { useProductsStore } from "../store/products";

export default {
  components: { TableItem },

  data() {
    return {
      tableHead: [
        "Product Image",
        "Product Name",
        "Category",
        "Price",
        "Action",
      ],
    };
  },

  computed: {
    ...mapState(useProductsStore, ["products"]),
  },
};
</script>
