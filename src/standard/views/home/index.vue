<template>
  <div class="hello">
    我是standard
    <t></t>
  </div>
</template>

<script>
import t from './t';
export default {
  components: {
    t,
  },
  data() {
    return {
      msg: 'Welcome to Ecaray',
    };
  },
};
</script>
<style  scoped>
.hello {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: 60vh;
}
</style>
