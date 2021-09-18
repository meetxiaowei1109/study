<template>
  <div id="app">
    <div style="white-space: pre-line;">
      {{a}}
    </div>
    <HelloWorld 
    />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data(){
    return {
      a: {
        a:1,
          b:2,
          c:3,
          a1:1,
          b1:2,
          c1:3,
          a2:1,
          b2:2,
          c2:3,
          a3:1,
          b3:2,
          c3:3,
          a4:1,
          b4:2,
          c4:3
      }
    }
  },
  mounted(){
  },
  methods: {
    
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
video {
  width: 200px;
}
</style>
