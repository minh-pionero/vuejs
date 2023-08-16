export const useFormRules = () => {
  
  return {
    ruleRequired: (v: any, fieldName?: string, errorMessage?: string) => {
      let message = "Required";

      if (errorMessage) {
        message = errorMessage;
      } else if (fieldName) {
        message = `${`${fieldName} is required`}`;
      }

      return !!v || message;
    },
  }
}

