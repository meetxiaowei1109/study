<template>
  <div>{{one}}</div>
</template>

<script>
export default {
  data(){
    return {
      one: 1,
    }
  },
  beforeCreate() {
    console.log('beforeCreate');
    setTimeout(()=>{
      console.log(++this.one);
    })
  },
  updated() {
    console.log('update');
  },
}
</script>

<style>

</style>