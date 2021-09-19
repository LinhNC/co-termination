<template>
  <v-dialog v-model="showSearchDialog" persistent max-width="1000px">
    <v-card>
      <v-card-title style="justify-content: center" class="mb-5">Search Team Members
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <div class="col-7 mx-auto">
              <v-text-field
                  outlined
                  dense
                  v-model="searchTeamMemberId"
                  label="Team Member ID"
                  hide-details="auto"
              />
            </div>
          </v-row>
          <v-row>
            <div class="col-7 mx-auto">
              <v-text-field
                  outlined
                  dense
                  v-model="searchName"
                  label="Name"
                  hide-details="auto"
              />
            </div>
          </v-row>
          <v-row>
            <div class="col-7 mx-auto">
              <v-text-field
                  outlined
                  dense
                  v-model="searchLicenceId"
                  label="Licence ID"
                  hide-details="auto"
              />
            </div>
          </v-row>

          <v-row>
            <div class="col-7 mx-auto" style="text-align: right">
              <v-btn color="primary" @click="searchTeamMembers">Search</v-btn>
            </div>
          </v-row>
          <v-row>
            <div class="col-12 mx-auto">
              <ValidationObserver ref="form">
                <v-data-table
                    class="c-table-bordered"
                    :headers="tableHeaders"
                    :items="searchMembers"
                    show-select
                    item-key="teamMemberId"
                    v-model="selectedItems"
                    :loading="loadingTable"
                    loading-text="Loading... Please wait"
                    hide-default-footer
                >
                  <template v-slot:[`item.sn`]="{ item }">
                    {{ searchMembers.indexOf(item) + 1 }}
                  </template>
                  <template v-slot:[`item.dateEvent`]="{ item }">
                    <v-menu
                        ref="menu-dateEvent"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <ValidationProvider
                            :rules="`${
                            selectedItems.indexOf(item) > -1
                              ? 'required|isValidDate'
                              : ''
                          }`"
                            v-slot="{ errors }"
                        >
                          <v-text-field
                              v-model="item.dateEvent"
                              persistent-hint
                              append-icon="mdi-calendar"
                              v-bind="attrs"
                              v-on="on"
                              outlined
                              dense
                              hide-details="auto"
                          ></v-text-field>
                          <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </template>

                      <v-date-picker
                          v-model="item.dateEvent"
                          no-title
                      ></v-date-picker>
                    </v-menu>
                  </template>

                  <template v-slot:[`item.remarks`]="{ item }">
                    <ValidationProvider rules="" v-slot="{ errors }">
                      <v-text-field
                          outlined
                          dense
                          v-model="item.remarks"
                          label="Remarks"
                          :error-messages="errors"
                          hide-details="auto"
                      />
                    </ValidationProvider>
                  </template>
                </v-data-table>
              </ValidationObserver>
            </div>
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
            <div class="col-12 mx-auto" style="text-align: right">
              <v-btn color="primary" @click="cancelSearchDialog" class="mr-2"
              >Cancel
              </v-btn
              >
              <v-btn color="primary" @click="submitTeamMembers">Submit</v-btn>
            </div>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import TerminationDataService from "@/services/TerminationDataService";
import Utils from "@/common/utils";
import searchCriteriaMixin from "@/components/mixins/searchCriteriaMixin";

export default {
  name: "BulkAddMember",
  mixins: [searchCriteriaMixin],
  components: {},
  data() {
    return {
      selectedItems: [],
      tableHeadersFull: [
        {
          value: "sn",
          text: "S/N",
          sortable: false,
          align: "center",
          width: 20,
        },
        {
          value: "teamMemberId",
          text: "Member ID",

          width: "130px",
        },
        {value: "name", text: "Name", width: "130px"},
        {
          value: "licenceId",
          text: "Licence ID",

          width: "130px",
        },
        {
          value: "dateEvent",
          text: "Date of Event",
          width: "180px",
        },
        {
          value: "remarks",
          text: "Remarks",
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      terminationMembers: "terminationMembers",
      termination: "termination",
    }),
    tableHeaders() {
      return this.tableHeadersFull;
    },
  },
  methods: {
    ...mapActions(["addTerminationMembers"]),
    async searchTeamMembers() {
      this.errorMessages = [];
      this.selectedItems = [];
      this.loadingTable = true;
      this.searchMembers = await TerminationDataService.searchTeamMembers({
        teamMemberId: this.searchTeamMemberId,
        name: this.searchName,
        licenceId: this.searchLicenceId,
      });
      this.loadingTable = false;
    },
    cancelSearchDialog() {
      this.selectedItems = [];
      this.clearElements();
    },
    async validateMembersExist() {
      let validMembersExist = "";
      this.selectedItems.map((item) => {
        if (Utils.validateItemExist(this.terminationMembers, item)) {
          if (validMembersExist === "") {
            validMembersExist = item.teamMemberId;
          } else {
            validMembersExist += "," + item.teamMemberId;
          }
        }
      });

      if (validMembersExist.length > 0) {
        this.errorMessages.push(
            "Member(s) ID " +
            validMembersExist +
            " are already exist from Deployment members."
        );
      }
    },
    async submitTeamMembers() {
      this.errorMessages = [];
      if (this.selectedItems.length === 0) {
        this.errorMessages.push("Please choose at least one member to add.");
        return;
      }
      let validForm = await this.$refs.form.validate();
      if (!validForm) {
        this.errorMessages.push("Some fields are mandatory.");
      }
      await this.validateMembersExist();
      if (!validForm || this.errorMessages.length > 0) {
        return;
      }
      this.addTerminationMembers(this.selectedItems);
      this.selectedItems = [];
      this.clearElements();
    },
  },
};
</script>
