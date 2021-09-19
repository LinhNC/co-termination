<template>
  <v-container>
    <v-card>
      <v-card-title style="justify-content: center" class="mb-5"
      >Termination (CO for SE Cat A, B, C1)
      </v-card-title>
      <v-card-text>
        <ValidationObserver ref="form">
          <v-form>
            <v-row>
              <div class="col-6">
                <ValidationProvider
                    :rules="{
                    required: true,
                  }"
                    v-slot="{ errors, valid }"
                >
                  <v-select
                      outlined
                      dense
                      label="Notification Nature *"
                      :items="notificationNatures"
                      item-text="label"
                      v-model="termination.notificationNature"
                      :error-messages="errors"
                      :success="valid"
                      hide-details="auto"
                  />
                </ValidationProvider>
              </div>
            </v-row>
            <v-row>
              <div class="col-6">
                <ValidationProvider
                    :rules="{
                    required: true,
                  }"
                    v-slot="{ errors, valid }"
                >
                  <v-select
                      outlined
                      dense
                      label="Reason for Termination *"
                      :items="terminationReasons"
                      item-text="label"
                      v-model="termination.terminationReason"
                      :error-messages="errors"
                      :success="valid"
                      class="required"
                      hide-details="auto"
                  />
                </ValidationProvider>
              </div>
            </v-row>
            <v-row>
              <div class="col-6">
                <v-menu
                    ref="menu-dateNotification"
                    v-model="menuDateNotification"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                    hide-details="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <ValidationProvider
                        rules="required|isValidDate"
                        v-slot="{ errors }"
                    >
                      <v-text-field
                          v-model="termination.dateNotification"
                          label="Date of Notification *"
                          persistent-hint
                          append-icon="mdi-calendar"
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          dense
                          :error-messages="errors"
                          hide-details="auto"
                      ></v-text-field>
                    </ValidationProvider>
                  </template>
                  <v-date-picker
                      v-model="termination.dateNotification"
                      no-title
                      hide-details="auto"
                      @input="menuDateNotification = false"
                  ></v-date-picker>
                </v-menu>
              </div>
            </v-row>
            <v-row>
              <TerminationTeam ref="TerminationTeam"/>
            </v-row>
            <v-row>
              <div
                  v-for="(error, idx) in errorMessages"
                  :key="idx"
                  class="col-12"
                  style="text-align: left; padding-top: 0; padding-bottom: 0"
              >
                <span class="text-danger">{{ error }}</span>
              </div>
            </v-row>
            <v-row>
              <div class="col-12" style="text-align: right">
                <v-btn color="primary" @click="submitForm">Submit</v-btn>
              </div>
            </v-row>
          </v-form>
        </ValidationObserver>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
"use strict";
import {mapGetters} from "vuex";
import {mapActions} from "vuex";
import TerminationTeam from "@/components/TerminationTeam";

export default {
  name: "Termination",
  components: {
    TerminationTeam,
  },
  data() {
    return {
      menuDateNotification: false,
      errorMessages: [],
    };
  },
  computed: {
    // Init the data, options list
    ...mapGetters({
      notificationNatures: "notificationNatures",
      terminationReasons: "terminationReasons",
      termination: "termination",
      terminationMembers: "terminationMembers",
    }),
  },
  methods: {
    ...mapActions([
      "getNotificationNatures",
      "getTerminationReasons",
      "getTerminationData",
    ]),
    async submitForm() {
      this.errorMessages = [];
      let validForm = await this.$refs.form.validate();
      if (!validForm) {
        this.errorMessages.push("Some fields are mandatory.");
      }
      if (this.terminationMembers.length === 0) {
        this.errorMessages.push("Please add at least one member to submit.");
      }
      if (!validForm || this.terminationMembers.length === 0) {
        return;
      }
      console.log(this.termination);
      console.log(this.terminationMembers);

      let dataSubmit = {
        ...this.termination,
        TEAM_MEMBER: [...this.terminationMembers],
      };
      console.log(dataSubmit);
      console.log("SUBMITTED FORM OK");
    },
  },
  async created() {
    await this.getNotificationNatures();
    await this.getTerminationReasons();
    //These values are not retained. These dropdown lists will be populated from Master Data.
    //await this.getTerminationData();
  },
  watch: {},
};
</script>


