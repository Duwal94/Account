import { useState, useEffect } from "react";

interface IFormValues {
  CitizenShipFile?: null | File;
  SignatureFile?: null | File;
  car06is_individual?: boolean;
  car06sys07uin?: number;
  car06name?: string;
  car06car03uin?: number;
  car06pan_or_vat?: string;
  car06discount_per?: number;
  car06has_account?: boolean;
  car06acc_no?: string;
  car06address?: string;
  car06authorized_person?: string;
  car06authorized_person_contact_no?: string;
  car06contact_person?: string;
  car06contact_person_contact_no?: string;
  car06reffered_by?: string;
  car06refferer_contact_no?: string;
  car06mobile_payment_type?: number;
  car06status?: boolean;
  car06deleted?: boolean;
  car06bra01uin?: number;
}

const individual: IFormValues = {
  CitizenShipFile: null,
  car06is_individual: true,
  car06sys07uin: 1,
  car06name: "",
  car06acc_no: "",
  car06address: "",
  car06reffered_by: "",
  car06refferer_contact_no: "",
  car06mobile_payment_type: 0,
  car06bra01uin: 0,
  car06has_account: true,
};
const business: IFormValues = {
  CitizenShipFile: null,
  SignatureFile: null,
  car06is_individual: false,
  car06sys07uin: 1,
  car06name: "",
  car06car03uin: 0,
  car06pan_or_vat: "",

  car06has_account: true,
  car06acc_no: "",
  car06address: "",
  car06authorized_person: "",
  car06authorized_person_contact_no: "",
  car06contact_person: "",
  car06contact_person_contact_no: "",
  car06reffered_by: "",
  car06refferer_contact_no: "",
  car06mobile_payment_type: 0,
  car06bra01uin: 0,
};

const useFormValues = (
  eligibilityType: boolean
): [IFormValues, React.Dispatch<React.SetStateAction<IFormValues>>] => {
  const [formValues, setFormValues] = useState<IFormValues>(
    eligibilityType ? individual : business
  );

  useEffect(() => {
    setFormValues(eligibilityType ? individual : business);
  }, [eligibilityType]);

  return [formValues, setFormValues];
};

export default useFormValues;
