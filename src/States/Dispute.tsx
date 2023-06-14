import React, { useState, useEffect } from "react";

interface IFormValues {
  car05sys06uin?: number;
  car05registered_mobile_no?: string;
  car05itouch_user_name?: string;
  car05card_no?: string;
  car05trace_no?: string;
  car05car04uin?: number;
  car05acc_holder_name?: string;
  car05acc_no?: string;
  car05tran_date?: string;
  car05dispute_amount?: number;
  car05txn_bank?: string;
  car05txn_location?: string;
  car05contact_no?: string;
  car05email_id?: string;
  car05txn_unscuccesfull?: string;
  car05charged_double?: string;
  car05txn_cancelled?: string;
  car05txn_diiferent?: string;
  car05txn_unauthorized?: string;
  car05txn_other?: string;
  car05txn_other_remarks?: string;
}
const ATM: IFormValues = {
  car05sys06uin: 1,
  car05card_no: "",
  car05car04uin: 0,
  car05acc_holder_name: "",
  car05acc_no: "",
  car05tran_date: "",
  car05dispute_amount: 0,
  car05txn_bank: "",
  car05txn_location: "",
  car05contact_no: "",
  car05email_id: "",
  car05txn_unscuccesfull: "true",
  car05charged_double: "true",
  car05txn_cancelled: "false",
  car05txn_diiferent: "true",
  car05txn_unauthorized: "false",
  car05txn_other: "false",
  car05txn_other_remarks: "false",
};

const Mobile: IFormValues = {
  car05sys06uin: 2,
  car05registered_mobile_no: "",

  car05acc_holder_name: "",
  car05acc_no: "",
  car05tran_date: "",
  car05dispute_amount: 0,
  car05txn_bank: "",
  car05txn_location: "",
  car05contact_no: "",
  car05email_id: "",
  car05txn_unscuccesfull: "false",
  car05charged_double: "false",
  car05txn_cancelled: "false",
  car05txn_diiferent: "false",
  car05txn_unauthorized: "false",
  car05txn_other: "false",
  car05txn_other_remarks: "false",
};

const Itouch: IFormValues = {
  car05sys06uin: 3,
  car05itouch_user_name: "",
  car05acc_holder_name: "",
  car05acc_no: "",
  car05tran_date: "",
  car05dispute_amount: 0,
  car05txn_bank: "",
  car05txn_location: "",
  car05contact_no: "",
  car05email_id: "",
  car05txn_unscuccesfull: "false",
  car05charged_double: "false",
  car05txn_cancelled: "false",
  car05txn_diiferent: "false",
  car05txn_unauthorized: "false",
  car05txn_other: "false",
  car05txn_other_remarks: "false",
};

const useFormValues = (
  eligibilityType: string
): [IFormValues, React.Dispatch<React.SetStateAction<IFormValues>>] => {
  const [formValues, setFormValues] = useState<IFormValues>({});

  useEffect(() => {
    let values: IFormValues;
    if (eligibilityType === "1") {
      values = ATM;
    } else if (eligibilityType === "2") {
      values = Mobile;
    } else if (eligibilityType === "3") {
      values = Itouch;
    } else {
      values = {};
    }

    setFormValues(values);
  }, [eligibilityType]);

  return [formValues, setFormValues];
};

export default useFormValues;
