import * as Yup from "yup";
import { useEffect, useState } from "react";

const useFormValidationSchema = (eligibilityType) => {
    const [validationSchema, setValidationSchema] = useState(null);

    useEffect(() => {
        const debitValidationSchema = Yup.object().shape({

            car02acc_no: Yup.string().required("Account Number is required"),

            car02bra01uin: Yup.number().required("Branch is required").min(1, "Branch is required"),

        });



        const mobileandInternetValidationSchema = Yup.object().shape({

            car02acc_no: Yup.string().required("Account Number is required"),

            car02enum_ser_type: Yup.number().required("Service Type is required").min(1, "Service Type is required"),
            car02enum_cus_type: Yup.number().required("Customer Type is required").min(1, "Customer Type is required"),

            CitizenShipFile: Yup.mixed().required("Citizenship File is required"),
            SignatureFile: Yup.mixed().required("Signature File is required"),
        });


        const lockerValidationSchema = Yup.object().shape({

            car02acc_no: Yup.string().required("Account Number is required"),

        });
        const cardblockValidationSchema = Yup.object().shape({

            car02acc_no: Yup.string().required("Account Number is required"),


            car02reason_for_block: Yup.string().required("Reason for Block is required"),
            car02card_no: Yup.number().required("Card Number is required"),
        });
        const valid = Yup.object().shape({

            car02car01uin: Yup.number().required("Selection required").min(1, "Selection required"),

        });



        let schema;

        if (eligibilityType === "1") {
            schema = debitValidationSchema;
        } else if (eligibilityType === "2" || eligibilityType === "4") {
            schema = mobileandInternetValidationSchema;
        }
        else if (eligibilityType === "3") {
            schema = lockerValidationSchema;
        }
        else if (eligibilityType === "5") {
            schema = cardblockValidationSchema;
        } else {
            schema = valid;
        }


        setValidationSchema(schema);
    }, [eligibilityType]);

    return validationSchema;
};

export default useFormValidationSchema;