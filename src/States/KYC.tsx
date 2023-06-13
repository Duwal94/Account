import React, { useState, useEffect } from "react";
interface IFormValues {
  CitizenShipFile?: null | File;
  PhotoFile?: null | File;
  kyc01salutation?: string;
  kyc01first_name?: string;
  kyc01middle_name?: string;
  kyc01last_name?: string;
  kyc01email?: string;
  kyc01mobile_no?: number;
  kyc01phone_no?: number;
  kyc01dob_nep?: string;
  kyc01dob_eng?: string;
  kyc01contact_medium?: number;
  kyc01contact_medium_id?: string;
  kyc01nationality?: string;
  kyc01bra01uin?: number;
  kyc03set03uin?: number;
  kyc03set04uin?: number;
  kyc03set05uin?: number;
  kyc03ward_no?: number;
  kyc03street?: string;
  kyc03house_no?: number;
  kyc03set03uin_temp?: number;
  kyc03set04uin_temp?: number;
  kyc03set05uin_temp?: number;
  kyc03ward_no_temp?: number;
  kyc03street_temp?: string;
  kyc03house_no_temp?: number;

  kyc02grandfather_name?: string;
  kyc02father_name?: string;
  kyc02mother_name?: string;
  kyc02grandfather_nationality?: string;
  kyc02father_nationality?: string;
  kyc02mother_nationality?: string;
  kyc02spouse_nationality?: string;
  kyc02spouse?: string;
  kyc04document_type?: number;
  kyc04identity_no?: string;

  kyc04issued_date_nep?: string;
  kyc04issued_date_eng?: string;

  kyc04passport_identity_no?: string;
  kyc04set04uin?: number;
  kyc04issued_office?: string;
  kyc04passport_issued_date_eng?: string;
  kyc04passport_issued_date_nep?: string;
  kyc04expiry_date_eng?: string;
  kyc04expiry_date_nep?: string;
  kyc04visa_issue_date_eng?: string;
  kyc04visa_expiry_date_eng?: string;
  kyc04visa_issue_date_nep?: string;
  kyc04visa_expiry_date_nep?: string;

  kyc04voter_identity_no?: string;
  kyc04voterid_issued_date_eng?: string;
  kyc04voterid_issued_date_nep?: string;
}
const Kyc: IFormValues = {
  CitizenShipFile: null,
  PhotoFile: null,
  kyc01salutation: "",
  kyc01first_name: "",
  kyc01middle_name: "",
  kyc01last_name: "",
  kyc01email: "",
  kyc01mobile_no: 0,
  kyc01phone_no: 0,
  kyc01dob_nep: "",
  kyc01dob_eng: "",
  kyc01contact_medium: 0,
  kyc01contact_medium_id: "",
  kyc01nationality: "Nepal",
  kyc01bra01uin: 0,
  kyc03set03uin: 0,
  kyc03set04uin: 0,
  kyc03set05uin: 0,
  kyc03ward_no: 0,
  kyc03street: "",
  kyc03house_no: 0,
  kyc03set03uin_temp: 0,
  kyc03set04uin_temp: 0,
  kyc03set05uin_temp: 0,
  kyc03ward_no_temp: 0,
  kyc03street_temp: "",
  kyc03house_no_temp: 0,
  kyc02grandfather_name: "",
  kyc02father_name: "",
  kyc02mother_name: "",
  kyc02grandfather_nationality: "",
  kyc02father_nationality: "",
  kyc02mother_nationality: "",
  kyc02spouse_nationality: "",
  kyc02spouse: "",
};

const Citizen: IFormValues = {
  kyc04document_type: 1,
  kyc04identity_no: "",
  kyc04set04uin: 0,
  kyc04issued_office: "",
  kyc04issued_date_nep: "",
  kyc04issued_date_eng: "",
};

const Passport: IFormValues = {
  kyc04document_type: 2,
  kyc04passport_identity_no: "",
  kyc04set04uin: 0,
  kyc04issued_office: "",
  kyc04passport_issued_date_eng: "",
  kyc04passport_issued_date_nep: "",
  kyc04expiry_date_eng: "",
  kyc04expiry_date_nep: "",
  kyc04visa_issue_date_eng: "",
  kyc04visa_expiry_date_eng: "",
  kyc04visa_issue_date_nep: "",
  kyc04visa_expiry_date_nep: "",
};

const VoterId: IFormValues = {
  kyc04document_type: 3,
  kyc04voter_identity_no: "",
  kyc04voterid_issued_date_eng: "",
  kyc04voterid_issued_date_nep: "",
};

const useFormValues = (
  eligibilityType: string
): [IFormValues, React.Dispatch<React.SetStateAction<IFormValues>>] => {
  const [formValues, setFormValues] = useState<IFormValues>(Kyc);

  useEffect(() => {
    let values: IFormValues;

    if (eligibilityType === "citizen") {
      values = { ...formValues, ...Citizen };
      delete values.kyc04passport_identity_no; // Remove the Passport properties
      delete values.kyc04passport_issued_date_eng;
      delete values.kyc04passport_issued_date_nep;
      delete values.kyc04expiry_date_eng;
      delete values.kyc04expiry_date_nep;
      delete values.kyc04visa_issue_date_eng;
      delete values.kyc04visa_expiry_date_eng;
      delete values.kyc04visa_issue_date_nep;
      delete values.kyc04visa_expiry_date_nep;
      delete values.kyc04voter_identity_no; // Remove the VoterId properties
      delete values.kyc04voterid_issued_date_eng;
      delete values.kyc04voterid_issued_date_nep;
    } else if (eligibilityType === "passport") {
      values = { ...formValues, ...Passport };
      delete values.kyc04identity_no; // Remove the Citizen properties
      delete values.kyc04issued_date_nep;
      delete values.kyc04issued_date_eng;
      delete values.kyc04voter_identity_no; // Remove the VoterId properties
      delete values.kyc04voterid_issued_date_eng;
      delete values.kyc04voterid_issued_date_nep;
    } else if (eligibilityType === "voter") {
      values = { ...formValues, ...VoterId };
      delete values.kyc04identity_no; // Remove the Citizen properties
      delete values.kyc04issued_date_nep;
      delete values.kyc04issued_date_eng;
      delete values.kyc04passport_identity_no; // Remove the Passport properties
      delete values.kyc04passport_issued_date_eng;
      delete values.kyc04passport_issued_date_nep;
      delete values.kyc04expiry_date_eng;
      delete values.kyc04expiry_date_nep;
      delete values.kyc04visa_issue_date_eng;
      delete values.kyc04visa_expiry_date_eng;
      delete values.kyc04visa_issue_date_nep;
      delete values.kyc04visa_expiry_date_nep;
      delete values.kyc04issued_office;
      delete values.kyc04set04uin;
    } else {
      values = { ...formValues };
    }

    setFormValues(values);
  }, [eligibilityType]);

  return [formValues, setFormValues];
};

export default useFormValues;
