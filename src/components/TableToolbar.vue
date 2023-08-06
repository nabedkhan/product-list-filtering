<template>
  <Transition name="slide-fade">
    <div
      class="flex items-center justify-between px-4 pb-4"
      v-if="selected.length > 0"
    >
      <p class="font-medium text-slate-200">{{ selected.length }} Selected</p>
      <button
        class="p-1 rounded-full ring-1 ring-gray-700"
        @click="handleDeleteSelectedProduct()"
      >
        <svg fill="none" viewBox="0 0 24 24" class="w-6 h-6 stroke-slate-200">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 12v5M14 12v5M4 7h16M6 10v8a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-8M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5Z"
          />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useProductsStore } from "../store/products";
export default {
  computed: {
    ...mapState(useProductsStore, ["selected"]),
  },

  methods: {
    ...mapActions(useProductsStore, ["handleDeleteSelectedProduct"]),
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
