import * as Yup from "yup";
import { useEffect, useState } from "react";

const useFormValidationSchema = () => {
    const [validationSchema, setValidationSchema] = useState(null);

    useEffect(() => {
        const individualValidationSchema = Yup.object().shape({
            acc02acc01uin: Yup.number().required("Account UIN is required").min(1, "Account UIN is required"),
            acc02salutation: Yup.number().required(" is required").min(0, " is required"),
            acc02is_local_citizen: Yup.number().required("Local Citizen status is required").min(1, " is required"),
            acc02FirstName: Yup.string().required("First Name is required"),

            acc02LastName: Yup.string().required("Last Name is required"),
            acc02Mobile_no: Yup.number().required("Mobile Number is required").min(1, "Mobile Number is required"),

            acc02Email: Yup.string().email("Invalid Email").required("Email is required"),
            acc02dob_nep: Yup.date().required("Date of Birth (Nepali) is required"),
            aac02dob_eng: Yup.date().required("Date of Birth (English) is required"),

            acc02bra01uin: Yup.string().required("Bra01 UIN is required"),

        });

        setValidationSchema(individualValidationSchema);
    }, []);

    return validationSchema;
};

export default useFormValidationSchema;
