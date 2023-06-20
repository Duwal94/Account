
import * as Yup from "yup";
import { useEffect, useState } from "react";

const useFormValidationSchema = (eligibilityType) => {
    const [validationSchema, setValidationSchema] = useState(null);

    useEffect(() => {
        const individualValidationSchema = Yup.object().shape({
            eli01first_name: Yup.string().required("First Name is required"),

            eli01last_name: Yup.string().required("Last Name is required"),
            eli01mobile_no: Yup.string().required("Mobile Number is required"),
            eli01email: Yup.string().email("Invalid Email").required("Email is required"),
            eli01bra01uin: Yup.number().min(1, "Branch is required").required("Branch is required"),
            eli01ploan_type: Yup.string().required("Ploan Type is required"),
            eli01eli02uin: Yup.string().required("Income Type is required"),
            eli01requested_loan_amount: Yup.number().min(1, "Requested Loan Amount must be greater than 0").required("Requested Loan Amount is required"),
            eli01value_of_property: Yup.number().min(1, "Value of Property must be greater than 0").required("Value of Property is required"),
            eli01monthly_income: Yup.string().required("Monthly Income is required"),
            eli01loan_period_month: Yup.number().min(1, "Loan Period (Month) must be greater than 0").required("Loan Period (Month) is required"),
            eli01loan_period_year: Yup.number().min(1, "Loan Period (Year) must be greater than 0").required("Loan Period (Year) is required"),
            eli01address: Yup.string().required("Address is required"),
        });
        const businessValidationSchema = Yup.object().shape({
            eli01first_name: Yup.string().required("First Name is required"),

            eli01last_name: Yup.string().required("Last Name is required"),
            eli01mobile_no: Yup.string().required("Mobile Number is required"),
            eli01email: Yup.string().email("Invalid Email").required("Email is required"),
            eli01bra01uin: Yup.number().min(1, "Branch is required").required("Branch is required"),
            eli01loan_period_month: Yup.number().min(1, "Loan Period (Month) must be greater than 0").required("Loan Period (Month) is required"),
            eli01loan_period_year: Yup.number().min(1, "Loan Period (Year) must be greater than 0").required("Loan Period (Year) is required"),
            eli01requested_loan_amount: Yup.number().min(1, "Requested Loan Amount must be greater than 0").required("Requested Loan Amount is required"),
            eli01value_of_property: Yup.number().min(1, "Value of Property must be greater than 0").required("Value of Property is required"),
            eli01experience: Yup.string().required("Experience is required"),
            eli01nature_of_business: Yup.string().required("Nature of Business is required"),
            eli01company_name: Yup.string().required("Company Name is required"),
            eli01address: Yup.string().required("Address is required"),
        });


        let schema;

        if (eligibilityType === "individual") {
            schema = individualValidationSchema;
        } else {
            schema = businessValidationSchema;
        }

        setValidationSchema(schema);
    }, [eligibilityType]);

    return validationSchema;
};

export default useFormValidationSchema;