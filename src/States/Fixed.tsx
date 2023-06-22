import { useState } from "react";

interface IFormValues {
  acc14fd_type?: number;
  acc14acc15uin?: number;
  acc14saving_account_no?: string;
  acc14nominee_account_no?: string;
  acc14instr_principal_account_no?: string;
  acc14fd_amount?: number;
  acc14payment_frequency?: number;
  acc14auto_renew?: number;
  acc02salutation?: number;
  acc02is_local_citizen?: number;
  acc02FirstName?: string;
  acc02MiddleName?: string;
  acc02LastName?: string;
  acc02Mobile_no?: number;
  acc02phone_no?: number;
  acc02Email?: string;
  acc02dob_nep?: string;
  aac02dob_eng?: string;
  acc02contact_medium?: number;
  acc02bra01uin?: number;
  acc02acc01uin?: number;
  acc02contact_medium_no?: string;
}

const fixed: IFormValues = {
  acc14fd_type: 0,
  acc14acc15uin: 0,
  acc14saving_account_no: "",
  acc14nominee_account_no: "",
  acc14instr_principal_account_no: "",
  acc14fd_amount: 0,
  acc14payment_frequency: 0,
  acc14auto_renew: 0,
  acc02salutation: -1,
  acc02is_local_citizen: 0,
  acc02FirstName: "",
  acc02MiddleName: "",
  acc02LastName: "",
  acc02Mobile_no: 0,
  acc02phone_no: 0,
  acc02Email: "",
  acc02dob_nep: "",
  aac02dob_eng: "",
  acc02contact_medium: 0,
  acc02bra01uin: 0,
  acc02acc01uin: 0,
  acc02contact_medium_no: "",
};

const useFormValues = (): [
  IFormValues,
  React.Dispatch<React.SetStateAction<IFormValues>>
] => {
  const [formValues, setFormValues] = useState<IFormValues>(fixed);

  return [formValues, setFormValues];
};

export default useFormValues;
