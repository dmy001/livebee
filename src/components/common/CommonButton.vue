<template>
  <button
    class="
      block
      mx-auto
      bg-gradient-to-r
      w-64
      h-9
      rounded-3xl
      text-white
      from-secondary
      to-primary
    "
  >
    {{ title }}
  </button>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  props: {
    title: String,
  },
  // setup(props) {
  //   const state = reactive({
  //     title: props.title,
  //   });
  //   return {
  //     ...toRefs(state),
  //   };
  // },
});
</script>
