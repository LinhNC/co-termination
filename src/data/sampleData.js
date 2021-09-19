export function sampleData() {
  return {
    Termination_Zero_Config: {
      notificationNature: "",
      terminationReason: "",
      dateNotification: "",
    },
    Termination_With_Config: {
      notificationNature: "1",
      terminationReason: "R1",
      dateNotification: "2021-09-17",
    },
    Termination_Members: [
      {
        teamMemberId: "12345",
        name: "John Doe",
        licenceId: "LA12345",
        dateEvent: "2021-06-09",
        remarks: "",
      },
      {
        teamMemberId: "6789",
        name: "Petter Mark",
        licenceId: "LA6789",
        dateEvent: "",
        remarks: "",
      },
    ],
    Team_Members: [
      {
        teamMemberId: "12345",
        name: "John Doe",
        licenceId: "LA12345",
      },
      {
        teamMemberId: "6789",
        name: "Petter Mark",
        licenceId: "LA6789",
      },
      {
        teamMemberId: "1122",
        name: "Kim Jook",
        licenceId: "LA1122",
      },
      {
        teamMemberId: "999",
        name: "Tom White",
        licenceId: "LA999",
      },
      {
        teamMemberId: "4455",
        name: "Petter Check",
        licenceId: "SI123",
      },
      /*     {
        teamMemberId: "1022",
        name: "Kim Jook",
        licenceId: "LA1122",
      },
      {
        teamMemberId: "555",
        name: "David Cook",
        licenceId: "LA555",
      },
      {
        teamMemberId: "33344",
        name: "Lee Honey",
        licenceId: "SI33344",
      }, */
    ],
  };
}
