export function getOptionData() {
  return {
    Notification_Nature_Options: [{ value: "1", label: "Licence Expiry" }],

    Termination_Reason_Options: [
      {
        value: "R1",
        label:
          "Dismissal - Poor performance/attendance/attitude/relationship with peers or supervisors",
      },
      { value: "R2", label: "Other" },
    ],
  };
}
