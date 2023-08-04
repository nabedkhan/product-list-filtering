<template>
  <ul class="flex justify-center mt-10 space-x-1 text-sm">
    <li>
      <button
        @click="$emit('prev')"
        :disabled="currentPage === 1"
        class="flex items-center justify-center h-10 px-4 ml-0 leading-tight text-gray-200 transition-all bg-gray-800 border border-gray-700 rounded-l-lg hover:bg-gray-200 hover:text-gray-700 disabled:opacity-60 disabled:hover:bg-gray-800 disabled:cursor-not-allowed"
      >
        Previous
      </button>
    </li>

    <li v-for="page in pageCount" :key="page">
      <button
        class="flex items-center justify-center h-10 px-4 leading-tight text-gray-200 transition-all bg-gray-800 border border-gray-700 hover:bg-gray-200 hover:text-gray-700"
        :class="{
          'bg-gray-900 border-gray-800': page === currentPage,
        }"
      >
        {{ page }}
      </button>
    </li>

    <li>
      <button
        @click="$emit('next')"
        class="flex items-center justify-center h-10 px-4 leading-tight text-gray-200 transition-all bg-gray-800 border border-gray-700 rounded-r-lg hover:bg-gray-200 hover:text-gray-700 disabled:opacity-60 disabled:hover:bg-gray-800 disabled:cursor-not-allowed"
        :disabled="currentPage === pageCount"
      >
        Next
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    pageCount: {
      type: Number,
      required: true,
      default: 0,
    },
    currentPage: {
      type: Number,
    },
  },
};
</script>
