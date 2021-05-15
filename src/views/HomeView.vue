<template>
  <div style="display: flex; flex-direction: column">
    <p class="content centered">
      This is the personal website of Johannes Huther.
    </p>
    <p class="content centered">More content coming soon.</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  metaInfo: {
    title: "Home",
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.centered {
  margin-right: auto;
  margin-left: auto;
}
</style>
