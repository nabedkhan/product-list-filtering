<template>
  <table class="w-full text-sm text-left text-white min-w-[60rem]">
    <!-- TABLE HEAD BLOCK -->
    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3">
          <input
            id="select"
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-transparent border-gray-400 rounded focus:ring-offset-gray-50 focus:ring-1"
            @input="handleSelectAllRow($event)"
            :disabled="products.length === 0"
            :indeterminate="selected.length > 0"
          />
        </th>

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
        <td colspan="7" class="py-24 text-center bg-gray-900">
          <p class="text-2xl">Product Not Found!</p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import TableItem from "./TableItem.vue";

export default {
  components: { TableItem },
  props: {
    products: { type: Array, required: true, default: [] },
  },

  data() {
    return {
      tableHead: [
        "Product Image",
        "Product Name",
        "Category",
        "Price",
        "Rating",
        "Action",
      ],
    };
  },

  inject: ["selected", "handleSelectAllRow"],
};
</script>
