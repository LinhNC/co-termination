export default {
  data() {
    return {
      searchMembers: [],
      searchTeamMemberId: "",
      searchName: "",
      searchLicenceId: "",
      errorMessages: [],
      showSearchDialog: false,
      loadingTable: false,
    };
  },
  methods: {
    clearElements() {
      this.searchMembers = [];
      this.searchTeamMemberId = "";
      this.searchName = "";
      this.searchLicenceId = "";
      this.errorMessages = "";
      this.showSearchDialog = false;
    },
  },
};
