import * as Yup from "yup";
import { useEffect, useState } from "react";

const useFormValidationSchema = (eligibilityType) => {
    const [validationSchema, setValidationSchema] = useState(null);

    useEffect(() => {

        const valid = Yup.object().shape({

            car05sys06uin: Yup.number().required("Selection required").min(1, "Selection required"),

        });

        const ATMValidationSchema = Yup.object().shape({

            car05card_no: Yup.string().required("Card Number is required"),
            car05car04uin: Yup.number().required("Car04 UIN is required").min(1, "Car04 UIN must be greater than 0"),
            car05acc_holder_name: Yup.string().required("Account Holder Name is required"),
            car05acc_no: Yup.string().required("Account Number is required"),
            car05tran_date: Yup.string().required("Transaction Date is required"),
            car05dispute_amount: Yup.number()
                .required("Dispute Amount is required")
                .min(1, "Dispute Amount must be greater than 0"),
            car05txn_bank: Yup.string().required("Transaction Bank is required"),
            car05txn_location: Yup.string().required("Transaction Location is required"),
            car05contact_no: Yup.string().required("Contact Number is required"),
            car05email_id: Yup.string().email("Invalid Email").required("Email is required"),

        });


        const MobileValidationSchema = Yup.object().shape({
            car05registered_mobile_no: Yup.string()
                .required("Registered Mobile Number is required")
                .matches(/^[0-9]{10}$/, "Registered Mobile Number must be a valid 10-digit number"),
            car05acc_holder_name: Yup.string().required("Account Holder Name is required"),
            car05acc_no: Yup.string().required("Account Number is required"),
            car05tran_date: Yup.string().required("Transaction Date is required"),
            car05dispute_amount: Yup.number()
                .required("Dispute Amount is required")
                .min(1, "Dispute Amount must be greater than 0"),
            car05txn_bank: Yup.string().required("Transaction Bank is required"),
            car05txn_location: Yup.string().required("Transaction Location is required"),
            car05contact_no: Yup.string()
                .required("Contact Number is required")
                .matches(/^[0-9]{10}$/, "Contact Number must be a valid 10-digit number"),
            car05email_id: Yup.string().email("Invalid Email").required("Email is required"),

        });

        const ItouchValidationSchema = Yup.object().shape({
            car05itouch_user_name: Yup.string().required("iTouch User Name is required"),
            car05acc_holder_name: Yup.string().required("Account Holder Name is required"),
            car05acc_no: Yup.string().required("Account Number is required"),
            car05tran_date: Yup.string().required("Transaction Date is required"),
            car05dispute_amount: Yup.number()
                .required("Dispute Amount is required")
                .min(1, "Dispute Amount must be greater than 0"),
            car05txn_bank: Yup.string().required("Transaction Bank is required"),
            car05txn_location: Yup.string().required("Transaction Location is required"),
            car05contact_no: Yup.string().required("Contact Number is required"),
            car05email_id: Yup.string().email("Invalid Email").required("Email ID is required"),

        });

        let schema;

        if (eligibilityType === "1") {
            schema = ATMValidationSchema;
        } else if (eligibilityType === "2") {
            schema = MobileValidationSchema;
        }
        else if (eligibilityType === "3") {
            schema = ItouchValidationSchema;
        } else {
            schema = valid;
        }


        setValidationSchema(schema);
    }, [eligibilityType]);

    return validationSchema;
};

export default useFormValidationSchema;