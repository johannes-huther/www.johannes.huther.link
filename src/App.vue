<template>
  <v-app>
    <header style="display: flex">
      <img
        class="centered"
        src="../img/johannes-huther-icon.svg"
        width="128px"
        alt="Icon of Johannes Huther"
      />
    </header>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

/**
 * The main {@link Vue}-View that contains the App.
 */
@Component({
  metaInfo: {
    titleTemplate: "%s - Johannes Huther",
  },
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
.v-application a {
  margin: 10px;
  color: var(--v-accent);
  &.router-link-exact-active {
    text-decoration: none;
  }
}

.centered {
  margin-right: auto;
  margin-left: auto;
}
</style>
