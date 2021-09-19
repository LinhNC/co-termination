<template>
  <v-dialog v-model="showSearchDialog" persistent max-width="600px">
    <v-card>
      <v-card-title style="justify-content: center" class="mb-5"
        >Search Team Members</v-card-title
      >
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
              <v-btn color="primary" @click="cancelSearchDialog" class="mr-2"
                >Cancel</v-btn
              >
              <v-btn color="primary" @click="searchTeamMembers">Search</v-btn>
            </div>
          </v-row>
          <v-row>
            <div class="col-12 mx-auto">
              <v-data-table
                class="c-table-bordered"
                :headers="tableHeaders"
                :items="searchMembers"
                :loading="loadingTable"
                loading-text="Loading... Please wait"
                hide-default-footer
              >
                <template v-slot:[`item.sn`]="{ item }">
                  {{ searchMembers.indexOf(item) + 1 }}
                </template>
                <!-- Actions -->
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn color="primary" @click="selectItem(item)"
                    >Select</v-btn
                  >
                </template>
              </v-data-table>
            </div>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import TerminationDataService from "@/services/TerminationDataService";
import searchCriteriaMixin from "@/components/mixins/searchCriteriaMixin";
export default {
  name: "SearchMember",
  mixins: [searchCriteriaMixin],
  data() {
    return {
      tableHeaders: [
        { value: "sn", text: "S/N", sortable: false },
        { value: "teamMemberId", text: "Member ID" },
        { value: "name", text: "Name" },
        { value: "licenceId", text: "Licence ID" },
        { value: "actions", text: "Actions", sortable: false },
      ],
    };
  },
  methods: {
    cancelSearchDialog() {
      this.clearElements();
    },
    selectItem(item) {
      this.$emit("changeEditedItem", item);
      this.clearElements();
    },
    async searchTeamMembers() {
      this.loadingTable = true;
      this.searchMembers = await TerminationDataService.searchTeamMembers({
        teamMemberId: this.searchTeamMemberId,
        name: this.searchName,
        licenceId: this.searchLicenceId,
      });
      this.loadingTable = false;
    },
  },
};
</script>
