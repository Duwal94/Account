import * as Yup from "yup";
import { useEffect, useState } from "react";

const useFormValidationSchema = () => {
    const [validationSchema, setValidationSchema] = useState(null);

    useEffect(() => {
        const individualValidationSchema = Yup.object().shape({
            acc14fd_type: Yup.number().required(),
            acc14acc15uin: Yup.number().required().min(1, "required"),
            acc14saving_account_no: Yup.string().required(),

            acc14fd_amount: Yup.number().required(),
            acc14payment_frequency: Yup.number().required(),
            acc14auto_renew: Yup.number().required(),
            acc02salutation: Yup.number().required().min(0, "required"),
            acc02is_local_citizen: Yup.number().required().min(1, "required"),
            acc02FirstName: Yup.string().required(),

            acc02LastName: Yup.string().required(),
            acc02Mobile_no: Yup.number().required().min(10, "fill a valid number"),

            acc02Email: Yup.string().email().required(),
            acc02dob_nep: Yup.string().required(),
            aac02dob_eng: Yup.string().required(),
            acc02contact_medium: Yup.number().required(),
            acc02bra01uin: Yup.number().required().min(1, "required"),
            acc02acc01uin: Yup.number().required().min(1, "required"),

        });

        setValidationSchema(individualValidationSchema);
    }, []);

    return validationSchema;
};

export default useFormValidationSchema;
