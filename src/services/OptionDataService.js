import { getOptionData } from "../data/optionData";
class OptionDataService {
  options;
  constructor() {
    this.options = new getOptionData();
  }
  async getNotificationNatures() {
    return await this.options.Notification_Nature_Options;
  }
  async getTerminationReasons() {
    return await this.options.Termination_Reason_Options;
  }
}

export default new OptionDataService();
