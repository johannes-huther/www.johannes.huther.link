<template>
  <img
    class="centered loading-icon"
    src="../../public/img/johannes-huther-icon.svg"
    alt="Icon of Johannes Huther"
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

/**
 * A {@link Vue}-component with a rotating icon.
 */
@Component({})
export default class LoadingIcon extends Vue {}
</script>

<style scoped lang="scss">
.loading-icon {
  animation: loading-animation 4s infinite;
  width: 40%;
  max-height: 80%;
}

@keyframes loading-animation {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(-90deg);
  }

  50% {
    transform: rotate(-180deg);
  }

  75% {
    transform: rotate(-270deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}
</style>
