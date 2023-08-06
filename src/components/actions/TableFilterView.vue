<template>
  <div class="flex items-center gap-3 mt-5" v-if="filterApplied">
    <div v-for="key in Object.keys(filter)" :key="key">
      <Chip
        v-if="filter[key]"
        :title="filter[key]"
        :handleDeleteFilter="() => handleDelete(key)"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import Chip from "../Chip.vue";
import { useProductsStore } from "../../store/products";

export default {
  components: { Chip },

  methods: {
    handleDelete(key) {
      this.filter[key] = "";
    },
  },

  computed: {
    ...mapState(useProductsStore, ["filter", "filterApplied"]),
  },
};
</script>
