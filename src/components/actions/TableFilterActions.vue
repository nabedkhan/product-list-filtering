<template>
  <div class="flex items-center gap-4">
    <div class="max-w-xs w-full">
      <select
        :value="modelValue.category"
        @input="updateValue('category', $event.target.value)"
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
        :value="modelValue.sort"
        @input="updateValue('sort', $event.target.value)"
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
        :value="modelValue.search"
        @input="updateValue('search', $event.target.value)"
        class="bg-gray-50 border border-gray-300 outline-none text-gray-800 text-sm rounded-lg block w-full p-3"
        placeholder="Search product by name"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: { type: Object, default: {} },
    categories: { type: Array, default: [], required: true },
  },
  methods: {
    toCapitalize(text) {
      return text
        .split(" ")
        .map((text) => text.charAt(0).toUpperCase() + text.slice(1))
        .join(" ");
    },

    updateValue(key, value) {
      this.$emit("update:modelValue", { ...this.modelValue, [key]: value });
    },
  },
};
</script>
