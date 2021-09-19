<template>
  <v-menu
    ref="menu-deploymentStartDate"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateModelUse"
        persistent-hint
        append-icon="mdi-calendar"
        v-bind="attrs"
        v-on="on"
        outlined
        dense
        hide-details="auto"
        :error-messages="getErrorMessage()"
      ></v-text-field>
    </template>

    <v-date-picker v-model="dateModelUse" no-title></v-date-picker>
  </v-menu>
</template>
<script>
import { defineComponent } from "@vue/composition-api";
import useVuelidate from "@vuelidate/core";
import { requiredIf, helpers } from "@vuelidate/validators";
import { isValidDate } from "@/common/validators";
export default defineComponent({
  props: {
    dateModel: {
      required: true,
    },
    isValRequired: {
      type: String,
      default: "true",
    },
  },
  computed: {},
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      dateModelUse: this.dateModel,
    };
  },
  validations() {
    return {
      dateModelUse: {
        required: requiredIf(this.isValRequired === "true"),
        isDate: helpers.withMessage(
          "The date format is not correct (YYYY-MM-dd)",
          isValidDate
        ),
      },
    };
  },
  methods: {
    getErrorMessage() {
      return this.v$.dateModelUse.$errors.find((e) => e)?.$message ?? "";
    },
    async validateSection() {
      //this.v$.dateModel.$touch();
      await this.v$.dateModelUse.$validate();
      if (this.v$.dateModelUse.$error) {
        return false;
      }
      return true;
    },
    async resetValidateSection() {
      this.v$.$reset();
    },
  },
});
</script>
