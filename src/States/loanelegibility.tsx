import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface IFormValues {
  eli01id: string;
  eli01first_name?: string;
  eli01middle_name?: string;
  eli01last_name?: string;
  eli01mobile_no?: string;
  eli01email?: string;
  eli01bra01uin?: number;
  eli01iscompleted?: boolean;
  eli01eligibility_type?: number;
  eli01company_name?: string;
  eli01nature_of_business?: number;
  eli01ploan_type?: string;
  eli01eli00uin?: number;
  eli01eli02uin?: string;
  eli01requested_loan_amount?: number;
  eli01value_of_property?: number;
  eli01is_micro_loan?: boolean;
  eli01monthly_income?: string;
  eli01loan_period_month?: number;
  eli01loan_period_year?: number;
  eli01emi?: number;
  eli01status?: boolean;
  eli01is_eligible?: boolean;
  eli01deleted?: boolean;
  eli01address?: string;
  eli01experience?: number;
  eli01monthly_interest?: number;
  eli01interest_rate_per_year?: number;
  eli01loan_subcat?: number;
  eli01share_margin?: number;
  eli01referrer?: number;
}

const individual: IFormValues = {
  eli01id: uuidv4(),
  eli01first_name: "",
  eli01middle_name: "",
  eli01last_name: "",
  eli01mobile_no: "",
  eli01email: "",
  eli01bra01uin: 0,
  eli01iscompleted: true,
  eli01eligibility_type: 2,
  eli01ploan_type: "",
  eli01eli00uin: 1,
  eli01eli02uin: "",
  eli01requested_loan_amount: 0,
  eli01value_of_property: 0,
  eli01is_micro_loan: true,
  eli01monthly_income: "",
  eli01loan_period_month: 0,
  eli01loan_period_year: 0,
  eli01emi: 0,
  eli01status: true,
  eli01is_eligible: true,
  eli01deleted: true,
  eli01address: "",

  // ...other form fields
};

const business: IFormValues = {
  eli01id: uuidv4(),
  eli01first_name: "",
  eli01middle_name: "",
  eli01last_name: "",
  eli01mobile_no: "",
  eli01email: "",
  eli01bra01uin: 0,
  eli01iscompleted: true,
  eli01eligibility_type: 1,
  eli01company_name: "",
  eli01nature_of_business: 0,
  eli01eli00uin: 1,
  eli01eli02uin: "",
  eli01requested_loan_amount: 0,
  eli01value_of_property: 0,
  eli01is_micro_loan: true,
  eli01loan_period_month: 0,
  eli01loan_period_year: 0,
  eli01status: true,
  eli01is_eligible: true,
  eli01deleted: true,
  eli01address: "",
  eli01experience: 0,

  // ...other form fields
};

const useFormValues = (
  eligibilityType: string
): [IFormValues, React.Dispatch<React.SetStateAction<IFormValues>>] => {
  const [formValues, setFormValues] = useState<IFormValues>(individual);

  useEffect(() => {
    let values: IFormValues;
    if (eligibilityType === "1") {
      values = business;
    } else {
      values = individual;
    }

    setFormValues(values);
  }, [eligibilityType]);

  return [formValues, setFormValues];
};

export default useFormValues;
