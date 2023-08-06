<template>
  <ul class="flex justify-center mt-10 space-x-1 text-sm">
    <li>
      <button
        @click="handlePrevPage()"
        :disabled="pageIndex === 1"
        class="flex items-center justify-center h-10 px-4 ml-0 leading-tight text-gray-200 transition-all bg-gray-800 border border-gray-700 rounded-l-lg hover:bg-gray-200 hover:text-gray-700 disabled:opacity-60 disabled:hover:bg-gray-800 disabled:cursor-not-allowed"
      >
        Previous
      </button>
    </li>

    <li v-for="page in pageCount" :key="page">
      <button
        class="flex items-center justify-center h-10 px-4 leading-tight text-gray-200 transition-all bg-gray-800 border border-gray-700 hover:bg-gray-200 hover:text-gray-700"
        :class="{ 'bg-gray-900 border-gray-800': page === pageIndex }"
      >
        {{ page }}
      </button>
    </li>

    <li>
      <button
        @click="handleNextPage()"
        class="flex items-center justify-center h-10 px-4 leading-tight text-gray-200 transition-all bg-gray-800 border border-gray-700 rounded-r-lg hover:bg-gray-200 hover:text-gray-700 disabled:opacity-60 disabled:hover:bg-gray-800 disabled:cursor-not-allowed"
        :disabled="pageIndex === pageCount"
      >
        Next
      </button>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useProductPagination } from "../store/pagination";

export default {
  computed: {
    ...mapState(useProductPagination, ["pageIndex", "pageCount"]),
  },

  methods: {
    ...mapActions(useProductPagination, ["handleNextPage", "handlePrevPage"]),
  },
};
</script>
