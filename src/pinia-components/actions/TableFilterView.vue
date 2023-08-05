<template>
  <div class="flex items-center gap-3 mt-5">
    <Chip
      v-if="filter.category"
      :title="filter.category"
      :handleDeleteFilter="() => handleDeleteFilter('category')"
    />

    <Chip
      v-if="filter.sort"
      :title="filter.sort"
      :handleDeleteFilter="() => handleDeleteFilter('sort')"
    />

    <Chip
      v-if="filter.search"
      :title="filter.search"
      :handleDeleteFilter="() => handleDeleteFilter('search')"
    />
  </div>
</template>

<script>
import { mapState } from "pinia";
import Chip from "../Chip.vue";
import { useProductsStore } from "../../store/products";

export default {
  // props: {
  //   handleDeleteFilter: {
  //     type: Function,
  //     required: true,
  //   },
  //   filter: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  components: { Chip },
  computed: {
    ...mapState(useProductsStore, ["filter", "handleDeleteFilter"]),
  },
};
</script>
