import React, { useState, useEffect } from "react";

interface IFormValues {
  CitizenShipFile?: null | File;
  SignatureFile?: null | File;
  car02car01uin?: number;
  car02acc_holder_name?: string;
  car02acc_no?: string;
  car02mobile_no?: number;
  car02enum_cus_type?: number;
  car02enum_ser_type?: number;
  car02reason_for_block?: string;
  car02email?: string;
  car02card_no?: number;
  car02bra01uin?: number;
}

const debit: IFormValues = {
  car02car01uin: 1,
  car02acc_holder_name: "",
  car02acc_no: "",
  car02mobile_no: 0,
  car02bra01uin: 0,
  car02email: "",
};

const modileandInternet: IFormValues = {
  car02car01uin: 2,
  car02acc_holder_name: "",
  car02acc_no: "",
  car02mobile_no: 0,
  car02enum_ser_type: 0,
  car02enum_cus_type: 0,
  car02email: "",
  CitizenShipFile: null,
  SignatureFile: null,
};

const locker: IFormValues = {
  car02car01uin: 3,
  car02acc_holder_name: "",
  car02acc_no: "",
  car02mobile_no: 0,
  car02email: "",
};

const cardblock: IFormValues = {
  car02car01uin: 5,
  car02acc_holder_name: "",
  car02acc_no: "",
  car02mobile_no: 0,
  car02email: "",
  car02reason_for_block: "",
  car02card_no: 0,
};
const useFormValues = (
  eligibilityType: string
): [IFormValues, React.Dispatch<React.SetStateAction<IFormValues>>] => {
  const [formValues, setFormValues] = useState<IFormValues>({});

  useEffect(() => {
    let values: IFormValues;
    if (eligibilityType === "1") {
      values = debit;
    } else if (eligibilityType === "2" || eligibilityType === "4") {
      values = modileandInternet;
    } else if (eligibilityType === "3") {
      values = locker;
    } else if (eligibilityType === "5") {
      values = cardblock;
    } else {
      values = {};
    }

    setFormValues(values);
  }, [eligibilityType]);

  return [formValues, setFormValues];
};

export default useFormValues;
