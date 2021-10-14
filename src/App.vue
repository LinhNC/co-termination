<template>
  <v-app>
    <government-agency-website :auto-hide="true" />

    <!-- Logo and Title -->
    <v-app-bar app color="white" class="elevation-1">
      <v-img
        src="./assets/cra-logo.png"
        max-height="100"
        max-width="180"
        class="mr-6"
      ></v-img>

      <v-app-bar-title>
        <span class="flex flex-grow-1"> {{ appTitle }} </span>
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <!-- Loading -->
      <!-- <v-overlay :value="$store.getters.getIsLoading">
        <v-progress-circular
          indeterminate
          color="white"
          size="64"
        ></v-progress-circular>
      </v-overlay> -->
      <v-container>
        <Termination />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { APP_TITLE } from "./common/config.js";
import GovernmentAgencyWebsite from "./components/common/GovernmentAgencyWebsite";
import Termination from "./components/Termination";

export default {
  name: "App",
  components: {
    GovernmentAgencyWebsite,
    Termination,
  },
  data() {
    return {
      appTitle: APP_TITLE,
	  test:"1233",
    };
  },
  computed: {},
};
</script>


