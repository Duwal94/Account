import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { API_URL } from "../Utilities/Constants";
import { useLocation } from "react-router-dom";

interface IFormValues {
  id: string;
  acc02acc01uin?: number;
  acc02salutation?: string;
  acc02is_local_citizen?: string;
  acc02FirstName?: string;
  acc02MiddleName?: string;
  acc02LastName?: string;
  acc02Mobile_no?: number;
  acc02phone_no?: number;
  acc02Email?: string;
  acc02dob_nep?: string;
  aac02dob_eng?: string;
  acc02contact_medium?: number;
  acc02bra01uin?: string;
  acc02contact_medium_no?: string;
  acc03Gender?: number;
  acc03MaritalStatus?: number;
  acc03Nationality?: string;
  acc03Education?: number;
  acc03Link_to_financial_institute?: boolean;
  acc03Link_to_criminal_activity?: boolean;
  acc03has_bo?: boolean;
  acc03is_us_citizen?: boolean;
  acc04citizenship_no?: string;
  acc04set04uin?: number;
  acc04issued_office?: string;
  acc04Pan?: string;
  acc04issued_date_nep?: string;
  acc04issued_date_eng?: string;
  acc05passport_no?: string;
  acc05issued_office?: string;
  acc05issued_date_nep?: string;
  acc05issued_date_eng?: string;
  acc05expiry_date_nep?: string;
  acc05expiry_date_eng?: string;
  acc06set05uin?: number;
  acc06set04uin?: number;
  acc06house_no?: number;
  acc06street?: string;
  acc06ward_no?: number;
  acc06resident_phone_no?: number;
  acc06office_no?: number;
  acc06mobile_no?: number;
  accacc06same_as_permanent?: boolean;
  acc06is_parmanent?: boolean;
  acc06set05uin2?: number;
  acc06set04uin2?: number;
  acc06house_no2?: number;
  acc06street2?: string;
  acc06ward_no2?: number;
  acc06resident_phone_no2?: number;
  acc06office_no2?: number;
  acc06mobile_no2?: number;
  accacc06same_as_permanent2?: boolean;
  acc06is_parmanent2?: boolean;
}
const savingSecond: IFormValues = {
  id: "",
  acc02acc01uin: 0,
  acc02salutation: "",
  acc02is_local_citizen: "",
  acc02FirstName: "",
  acc02MiddleName: "",
  acc02LastName: "",
  acc02Mobile_no: 0,
  acc02phone_no: 0,
  acc02Email: "",
  acc02dob_nep: "",
  aac02dob_eng: "",
  acc02contact_medium: 0,
  acc02bra01uin: "",
  acc02contact_medium_no: "",
  acc03Gender: 0,
  acc03MaritalStatus: 0,
  acc03Nationality: "",
  acc03Education: 0,
  acc03Link_to_financial_institute: true,
  acc03Link_to_criminal_activity: true,
  acc03has_bo: true,
  acc03is_us_citizen: true,
  acc04citizenship_no: "",
  acc04set04uin: 0,
  acc04issued_office: "",
  acc04Pan: "",
  acc04issued_date_nep: "",
  acc04issued_date_eng: "",
  acc05passport_no: "",
  acc05issued_office: "",
  acc05issued_date_nep: "",
  acc05issued_date_eng: "",
  acc05expiry_date_nep: "",
  acc05expiry_date_eng: "",
  acc06set05uin: 0,
  acc06set04uin: 0,
  acc06house_no: 0,
  acc06street: "",
  acc06ward_no: 0,
  acc06resident_phone_no: 0,
  acc06office_no: 0,
  acc06mobile_no: 0,
  accacc06same_as_permanent: true,
  acc06is_parmanent: true,
  acc06set05uin2: 0,
  acc06set04uin2: 0,
  acc06house_no2: 0,
  acc06street2: "",
  acc06ward_no2: 0,
  acc06resident_phone_no2: 0,
  acc06office_no2: 0,
  acc06mobile_no2: 0,
  accacc06same_as_permanent2: true,
  acc06is_parmanent2: true,
};
const useFormValues = (): [
  IFormValues,
  React.Dispatch<React.SetStateAction<IFormValues>>
] => {
  const [formValues, setFormValues] = useState<IFormValues>(savingSecond);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id") || "";
  const [getUserApi, setGetUserApi] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/AccountInfo/SavingAccountInfoUpdate?id=${id}`
        );
        const data = await response.json();
        setGetUserApi(data);
      } catch (error) {
        // Handle the error appropriately (e.g., display an error message)
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (getUserApi) {
      const savingSecond: IFormValues = {
        id: id,
        acc02acc01uin: parseInt(getUserApi.acc02acc01uin) || 0,
        acc02salutation: getUserApi.acc02salutation,
        acc02is_local_citizen: getUserApi.acc02is_local_citizen,
        acc02FirstName: getUserApi.acc02FirstName || "string1",
        acc02MiddleName: getUserApi.acc02MiddleName || "string2",
        acc02LastName: getUserApi.acc02LastName || "string3",
        acc02Mobile_no: getUserApi.acc02Mobile_no || 0,
        acc02phone_no: getUserApi.acc02phone_no || 0,
        acc02Email: getUserApi.acc02Email || "string4",
        acc02dob_nep: getUserApi.acc02dob_nep
          ? getUserApi.acc02dob_nep.substring(0, 10)
          : undefined,
        aac02dob_eng: getUserApi.aac02dob_eng
          ? getUserApi.aac02dob_eng.substring(0, 10)
          : undefined,
        acc02contact_medium: getUserApi.acc02contact_medium || 0,
        acc02bra01uin: getUserApi.acc02bra01uin || "string5",
        acc02contact_medium_no: getUserApi.acc02contact_medium_no || "string6",
        acc03Gender: 0,
        acc03MaritalStatus: 0,
        acc03Nationality: "",
        acc03Education: 0,
        acc03Link_to_financial_institute: true,
        acc03Link_to_criminal_activity: true,
        acc03has_bo: true,
        acc03is_us_citizen: true,
        acc04citizenship_no: "",
        acc04set04uin: 0,
        acc04issued_office: "",
        acc04Pan: "",
        acc04issued_date_nep: "",
        acc04issued_date_eng: "",
        acc05passport_no: "",
        acc05issued_office: "",
        acc05issued_date_nep: "",
        acc05issued_date_eng: "",
        acc05expiry_date_nep: "",
        acc05expiry_date_eng: "",
        acc06set05uin: 0,
        acc06set04uin: 0,
        acc06house_no: 0,
        acc06street: "",
        acc06ward_no: 0,
        acc06resident_phone_no: 0,
        acc06office_no: 0,
        acc06mobile_no: 0,
        accacc06same_as_permanent: true,
        acc06is_parmanent: true,
        acc06set05uin2: 0,
        acc06set04uin2: 0,
        acc06house_no2: 0,
        acc06street2: "",
        acc06ward_no2: 0,
        acc06resident_phone_no2: 0,
        acc06office_no2: 0,
        acc06mobile_no2: 0,
        accacc06same_as_permanent2: true,
        acc06is_parmanent2: true,
      };

      setFormValues(savingSecond);
    }
  }, [getUserApi]);

  return [formValues, setFormValues];
};

export default useFormValues;
