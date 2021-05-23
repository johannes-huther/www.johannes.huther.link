<template>
  <v-app>
    <header style="display: flex">
      <img
        class="centered"
        src="../public/img/johannes-huther-icon.svg"
        width="128px"
        alt="Icon of Johannes Huther"
      />
    </header>
    <v-main>
      <router-view />
    </v-main>
    <v-footer>
      <v-col>
        <v-row class="justify-center">
          <span>
            The source code of this website is licensed under the MIT license.
          </span>
        </v-row>
        <v-row class="justify-center">
          <span>
            View the source code and license on
            <v-chip
              small
              href="https://github.com/johannes-huther/www.johannes.huther.link"
              id="gh-link"
            >
              <v-icon>mdi-github</v-icon>
              GitHub
            </v-chip>
          </span>
        </v-row>
      </v-col>
    </v-footer>
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

#gh-link {
  padding: 0 2px 0 0;
  margin: 0;
}
</style>
