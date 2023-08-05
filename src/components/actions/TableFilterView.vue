<template>
  <div class="flex items-center gap-3 mt-5">
    <div v-for="key in keys" :key="key">
      <Chip
        v-if="modelValue[key]"
        :title="modelValue[key]"
        :handleDeleteFilter="() => handleDelete(key)"
      />
    </div>
  </div>
</template>

<script>
import Chip from "../Chip.vue";

export default {
  props: {
    modelValue: { type: Object, required: true, default: {} },
  },
  components: { Chip },

  methods: {
    handleDelete(key) {
      this.$emit("update:modelValue", { ...this.modelValue, [key]: "" });
    },
  },

  computed: {
    keys() {
      return Object.keys(this.modelValue);
    },
  },
};
</script>
