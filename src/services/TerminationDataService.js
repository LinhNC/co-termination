import { sampleData } from "../data/sampleData";
class TerminationDataService {
  data;
  constructor() {
    this.data = new sampleData();
  }
  async getTerminationData() {
    //let Termination_Zero_Config = this.data.Termination_Zero_Config;
    let Termination_With_Config = await this.data.Termination_With_Config;
    let Termination_Members = await this.data.Termination_Members;
    //return { termination: Termination_Zero_Config, members: [] };
    return {
      termination: Termination_With_Config,
      members: Termination_Members,
    };
  }
  async searchTeamMembers(item) {
    let Team_Members = await this.data.Team_Members;

    let searchedItems = Team_Members.map((elem) => {
      if (
        ((item.teamMemberId != "" &&
          elem.teamMemberId.toString().indexOf(item.teamMemberId) !== -1) ||
          item.teamMemberId === "") &&
        ((item.name != "" && elem.name.toString().indexOf(item.name) !== -1) ||
          item.name === "") &&
        ((item.licenceId != "" &&
          elem.licenceId.toString().indexOf(item.licenceId) !== -1) ||
          item.licenceId === "")
      )
        return {
          ...elem,
          dateEvent: "",
          remarks: "",
        };
    });
    // fake waiting 0.2s
    await new Promise((r) => setTimeout(r, 200));
    console.log(searchedItems);
    return searchedItems;
  }

  /*  async getCustomers({ commit }) {
      const response = await HTTP.get(API_GET_CUSTOMERS);
      const results = response.data;
      this.customers = results.map((cus) => ({
        customerId: cus.customerID,
        name: cus.name,
        customerType: cus.customerType,
      }));
      print(this.customers);
      this.cuss = [
        { customerId: "123", name: "ABC", customerType: "General" },
        { customerId: "234", name: "VFR", customerType: "General" },
      ];
      commit("SET_CUSTOMERS", this.customers);
    }, */
}

export default new TerminationDataService();
