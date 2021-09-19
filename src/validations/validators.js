import { extend } from "vee-validate/dist/vee-validate.full";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is mandatory",
});

extend("isValidDate", {
  validate(value) {
    if (value === undefined || value === "") return true;
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!value.match(regEx)) return false; // Invalid format
    var d = new Date(value);
    var dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === value;
  },
  message: "The date format should be YYYY-MM-dd",
});

extend("validReasonChange", {
  params: ["field", "reason"],
  validate(value, { field, reason }) {
    switch (field) {
      case "deploymentDepartment":
        if (reason === "1" || reason === "2") {
          return true;
        } else {
          return false;
        }
      case "deploymentBranch":
        if (reason === "1" || reason === "2") {
          return true;
        } else {
          return false;
        }
      case "jobPosition":
        if (reason === "1" || reason === "2" || reason === "3") {
          return true;
        } else {
          return false;
        }
    }
  },
  message: "This field is mandatory",
});
