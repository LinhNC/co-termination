<template>
  <div class="col-12 mx-auto">
    <v-data-table
      class="c-table-bordered"
      hide-default-footer
      :headers="tableHeaders"
      :items="terminationMembers"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="mr-2"></v-toolbar-title>
          <invalid-data v-if="!isValidSection" />
          <v-spacer></v-spacer>
          <v-btn color="primary" depressed @click="addItem">
            Add Members
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:[`item.sn`]="{ item }">
        {{ terminationMembers.indexOf(item) + 1 }}
      </template>
      <!-- Actions -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="showDialog" persistent max-width="500px">
      <v-card>
        <v-card-title style="justify-content: center" class="mb-5"
          >Team Members</v-card-title
        >
        <v-card-text>
          <ValidationObserver ref="form">
            <v-row>
              <div class="col-10 mx-auto">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <v-text-field
                    outlined
                    dense
                    v-model="editedItem.teamMemberId"
                    label="Team Member ID *"
                    hide-details="auto"
                    :error-messages="errors"
                  >
                    <template v-slot:append-outer>
                      <v-btn
                        style="height: 32px"
                        color="primary"
                        @click="showSearchMemberDialog"
                        >Search</v-btn
                      >
                    </template>
                  </v-text-field>
                  <!-- <span class="text-danger">{{ errors[0] }}</span> -->
                </ValidationProvider>
              </div>
            </v-row>
            <v-row>
              <div class="col-10 mx-auto">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <v-text-field
                    outlined
                    dense
                    v-model="editedItem.name"
                    label="Name *"
                    disabled
                    hide-details="auto"
                    :error-messages="errors"
                  />
                </ValidationProvider>
              </div>
            </v-row>
            <v-row>
              <div class="col-10 mx-auto">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <v-text-field
                    outlined
                    dense
                    v-model="editedItem.licenceId"
                    label="Licence ID *"
                    :error-messages="errors"
                    disabled
                    hide-details="auto"
                  />
                </ValidationProvider>
              </div>
            </v-row>

            <v-row>
              <div class="col-10 mx-auto">
                <v-menu
                  ref="menuDateEvent"
                  v-model="menuDateEvent"
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
                        v-model="editedItem.dateEvent"
                        label="Date of Event *"
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
                    v-model="editedItem.dateEvent"
                    no-title
                    hide-details="auto"
                    @input="menuDateEvent = false"
                  ></v-date-picker>
                </v-menu>
              </div>
            </v-row>
            <v-row>
              <div class="col-10 mx-auto">
                <ValidationProvider rules="" v-slot="{ errors }">
                  <v-text-field
                    outlined
                    dense
                    v-model="editedItem.remarks"
                    label="Remarks"
                    :error-messages="errors"
                    hide-details="auto"
                  />
                </ValidationProvider>
              </div>
            </v-row>
            <v-row v-if="errorMessage.length > 0">
              <div class="col-10 ml-8">
                <span class="text-danger">{{ errorMessage }}</span>
              </div>
            </v-row>
            <v-row>
              <div class="col-10 mx-auto">
                <div style="text-align: right">
                  <v-btn color="primary" @click="cancelDialog" class="mr-2"
                    >Cancel</v-btn
                  >
                  <v-btn color="primary" @click="submitItem">Submit</v-btn>
                </div>
              </div>
            </v-row>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </v-dialog>

    <SearchMember
      ref="SearchMember"
      v-on:changeEditedItem="updateEditedItem($event)"
    />
    <BulkAddMember ref="BulkAddMember" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Utils from "@/common/utils";
import SearchMember from "@/components/SearchMember";
import BulkAddMember from "@/components/BulkAddMember";
export default {
  name: "TerminationTeam",
  components: {
    SearchMember,
    BulkAddMember,
  },
  data() {
    return {
      editedItem: {},
      originalEditItem: {},
      editedItemIndex: -1,
      isValidSection: true,
      showDialog: false,
      menuDateEvent: false,

      errorMessage: "",
      tableHeadersFull: [
        { value: "sn", text: "S/N", sortable: false },
        { value: "teamMemberId", text: "Team Member ID", width: "160px" },
        { value: "name", text: "Name" },
        { value: "licenceId", text: "Licence ID", width: "140px" },
        {
          value: "dateEvent",
          text: "Date of Event",
          width: "140px",
        },
        {
          value: "remarks",
          text: "Remarks",
        },

        { value: "actions", text: "Actions", sortable: false },
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
  watch: {
    terminationMembers: {
      handler() {
        this.isValidSection = this.terminationMembers.length > 0;
      },
      deep: true,
    },
  },
  methods: {
    addItem() {
      this.$refs.BulkAddMember.$data.showSearchDialog = true;
    },
    clearElements() {
      this.showDialog = false;
      //this.editedItem = {};
      this.originalEditItem = {};
      this.editedItemIndex = -1;
      this.errorMessage = "";
    },
    cancelDialog() {
      this.clearElements();
    },
    editItem(item) {
      this.editedItemIndex = this.terminationMembers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.originalEditItem = Object.assign({}, item);
      this.showDialog = true;
    },
    deleteItem(item) {
      let deleteItemIndex = this.terminationMembers.indexOf(item);
      this.terminationMembers.splice(deleteItemIndex, 1);
    },
    showSearchMemberDialog() {
      this.$refs.SearchMember.$data.showSearchDialog = true;
    },
    updateEditedItem(item) {
      this.editedItem.teamMemberId = item.teamMemberId;
      this.editedItem.name = item.name;
      this.editedItem.licenceId = item.licenceId;
    },
    validateMemberExists() {
      if (this.originalEditItem.teamMemberId != this.editedItem.teamMemberId) {
        if (
          Utils.validateItemExist(this.terminationMembers, {
            teamMemberId: this.editedItem.teamMemberId,
          })
        ) {
          this.errorMessage =
            "Member ID " +
            this.editedItem.teamMemberId +
            " is already exist from Termination members.";
          console.log("SUBMITED FORM FAIL");
          return;
        }
      }
    },
    async submitItem() {
      let validForm = await this.$refs.form.validate();
      if (!validForm) {
        return;
      }
      this.validateMemberExists();
      if (this.editedItemIndex > -1) {
        Object.assign(
          this.terminationMembers[this.editedItemIndex],
          this.editedItem
        );
      } else {
        this.terminationMembers.push(this.editedItem);
      }
      this.clearElements();
    },
  },
  created() {},
};
</script>
