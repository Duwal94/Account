
import * as Yup from "yup";
import { useEffect, useState } from "react";

const useFormValidationSchema = (eligibilityType) => {
    const [validationSchema, setValidationSchema] = useState(null);

    useEffect(() => {
        const individualValidationSchema = Yup.object().shape({
            CitizenShipFile: Yup.mixed().required("Citizenship File is required"),
            car06sys07uin: Yup.number().required("Sys07 UIN is required").min(1, "Sys07 UIN is required"),

            car06acc_no: Yup.string().required("Account Number is required"),
            car06address: Yup.string().required("Address is required"),
            car06reffered_by: Yup.string().required("Referrer is required"),
            car06refferer_contact_no: Yup.string().required("Referrer Contact Number is required"),
            car06mobile_payment_type: Yup.number().required("Mobile Payment Type is required"),
            car06bra01uin: Yup.number().required("Branch is required").min(1, "Branch must be greater than 0"),
        });


        const businessValidationSchema = Yup.object().shape({
            CitizenShipFile: Yup.mixed().required("Citizenship File is required"),
            SignatureFile: Yup.mixed().required("Signature File is required"),
            car06sys07uin: Yup.number().required("Sys07 UIN is required").min(1, "Sys07 UIN is required"),

            car06car03uin: Yup.number().required("Car03 UIN is required").min(1, "Car03 UIN is required"),
            car06pan_or_vat: Yup.string().required("PAN or VAT is required"),
            car06acc_no: Yup.string().required("Account Number is required"),
            car06address: Yup.string().required("Address is required"),
            car06authorized_person: Yup.string().required("Authorized Person is required"),
            car06authorized_person_contact_no: Yup.string().required("Authorized Person Contact Number is required"),
            car06contact_person: Yup.string().required("Contact Person is required"),
            car06contact_person_contact_no: Yup.string().required("Contact Person Contact Number is required"),
            car06reffered_by: Yup.string().required("Referrer is required"),
            car06refferer_contact_no: Yup.string().required("Referrer Contact Number is required"),

            car06bra01uin: Yup.number().required("Branch is required").min(1, "Branch must be greater than 0"),
        });

        console.log(eligibilityType);

        let schema;

        if (eligibilityType === true) {
            schema = individualValidationSchema;
        } else {
            schema = businessValidationSchema;
        }

        setValidationSchema(schema);
    }, [eligibilityType]);

    return validationSchema;
};

export default useFormValidationSchema;