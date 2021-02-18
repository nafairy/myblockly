<template>
  <div>
    <h2>题目</h2>
    <div v-html="Algname.title"></div>
  </div>
</template>

<script>
import {titleMap} from "../../../static/AlgDescriptions/Titles";

export default {
  name: "Title",
  props: {
    algname: String
  },
  data() {
    return {
      Algname: titleMap.get(this.algname)
    };
  },
  methods:{

  }
}
</script>

<style scoped>

</style>
