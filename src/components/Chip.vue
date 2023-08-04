<template>
  <span
    class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium bg-white rounded-md text-grey-800"
  >
    {{ title }}

    <button
      type="button"
      @click="handleDeleteFilter()"
      class="inline-flex items-center p-1 ml-2 text-sm text-red-500 bg-transparent rounded-sm hover:bg-red-100"
    >
      <svg
        class="w-2 h-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>
  </span>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    handleDeleteFilter: { type: Function, required: true },
  },
};
</script>
