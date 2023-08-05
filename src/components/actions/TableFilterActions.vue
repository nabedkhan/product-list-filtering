<template>
  <div class="flex flex-col items-center gap-4 md:flex-row">
    <div class="w-full xl:max-w-xs lg:max-w-[15rem] md:max-w-[12rem]">
      <select
        id="category"
        :value="modelValue.category"
        @input="updateValue('category', $event.target.value)"
        class="w-full p-4 text-sm text-gray-800 border border-gray-300 outline-none rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
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

    <div class="w-full xl:max-w-xs lg:max-w-[15rem] md:max-w-[12rem]">
      <select
        id="sort"
        :value="modelValue.sort"
        @input="updateValue('sort', $event.target.value)"
        class="w-full p-4 text-sm text-gray-800 border border-gray-300 outline-none rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
      >
        <option selected value="">Sort By Price</option>
        <option value="low-high">Low to High</option>
        <option value="high-low">High to Low</option>
      </select>
    </div>

    <div class="flex-1 w-full">
      <div class="relative w-full">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <input
          type="search"
          :value="modelValue.search"
          @input="updateValue('search', $event.target.value)"
          class="w-full p-4 pl-10 text-sm text-gray-800 border border-gray-300 outline-none rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Product..."
        />
      </div>
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
