<template>
<div @click="handleShowDetail(12)">
 {{a}}
</div>
</template>
<script>

export default {
  name: "HelloWorld",
  props: {
    a : String,
    handleShowDetail: Function
  },
  data() {
    return {
    };
  },
  methods: {
      
  },
};
</script>
<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
