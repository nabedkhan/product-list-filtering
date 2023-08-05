<template>
  <tr>
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
      <span class="cursor-pointer" @click="handleDeleteProduct(product.id)"
        >&times;</span
      >
    </td>
  </tr>
</template>

<script>
import { mapState } from "pinia";
import { useProductsStore } from "../store/products";

export default {
  props: {
    product: {
      type: Object,
      required: true,
      default: {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: { rate: 3.9, count: 120 },
      },
    },
  },

  computed: {
    ...mapState(useProductsStore, ["handleDeleteProduct"]),
  },
};
</script>
