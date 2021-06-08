/**
 * A regular Expression that matches git ref's that are tags.
 */
const VERSION_REGEXP = new RegExp("(?<=refs\\/tags\\/).*");

/**
 * Returns the current version, either a release version (e.g. `v0.1.0`) or a short commit SHA.
 */
export function getVersion(): string {
  const ref = process.env.VUE_APP_GIT_REF,
    sha = process.env.VUE_APP_GIT_SHA;
  let match;
  if (ref !== undefined && (match = ref.match(VERSION_REGEXP)) !== null) {
    return match[0];
  } else if (sha !== undefined) {
    return sha.substr(0, 7);
  } else {
    throw new Error("Error retrieving current revision.");
  }
}
