<template>
  <v-app v-if="!loading">
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
    <v-footer class="footer">
      <v-col>
        <v-row class="justify-center">
          <span> Copyright © 2021 Johannes Huther </span>
        </v-row>
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
              :href="GIT_ROOT"
              id="gh-link"
              color="#24292e"
              text-color="white"
            >
              <v-icon class="pr-1 medium_icon">mdi-github</v-icon>
              GitHub
            </v-chip>
            <GitHubVersionLink :git-root="GIT_ROOT" :version="version">
            </GitHubVersionLink>
          </span>
        </v-row>
      </v-col>
    </v-footer>
  </v-app>
  <v-app v-else class="justify-center align-center">
    <LoadingIcon></LoadingIcon>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GitHubVersionLink from "@/components/GitHubVersionLink.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";

/**
 * The link to the GitHub repository.
 */
const GIT_ROOT = "https://github.com/johannes-huther/www.johannes.huther.link";

/**
 * The main {@link Vue}-View that contains the App.
 */
@Component({
  components: { LoadingIcon, GitHubVersionLink },
  metaInfo: {
    titleTemplate: "%s - Johannes Huther",
  },
  data() {
    return { GIT_ROOT };
  },
})
export default class App extends Vue {
  /**
   * A boolean indicating whether all API calls have been finished (`false`) or if they are still loading.
   */
  loading = true;

  /**
   * The current version of this software. Either a release version (e.g. `v0.1.0`) or a short commit SHA.
   */
  version!: string;

  /**
   * Fetches the version from the API and sets {@link #loading} to false.
   */
  async mounted(): Promise<void> {
    this.version = (await (await fetch("/api/version")).json())["version"];
    this.loading = false;
  }
}
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
  margin: auto;
}

.footer {
  font-size: 12px;
}

#gh-link {
  .medium_icon {
    font-size: 24px;
    width: fit-content;
  }
  padding: 2px 6px 2px 0;
  margin: 0;
}
</style>
