import * as Yup from "yup";
import { useEffect, useState } from "react";

const useFormValidationSchema = (eligibilityType) => {
    const [validationSchema, setValidationSchema] = useState(null);

    useEffect(() => {




        const citizenValidationSchema = Yup.object().shape({
            CitizenShipFile: Yup.mixed().nullable().required("Citizenship File is required"),
            PhotoFile: Yup.mixed().nullable().required("Photo File is required"),
            kyc04document_type: Yup.number().required("Document Type is required").min(1, ""),
            kyc04identity_no: Yup.string().required("Identity Number is required"),
            kyc04set04uin: Yup.number().required("Set04 UIN is required").min(1, "is required"),
            kyc04issued_office: Yup.string().required("Issued Office is required"),
            kyc04issued_date_nep: Yup.string().required("Issued Date (Nepali) is required"),
            kyc04issued_date_eng: Yup.string().required("Issued Date (English) is required"),
        });



        const passportValidationSchema = Yup.object().shape({
            CitizenShipFile: Yup.mixed().required("Citizenship File is required"),
            PhotoFile: Yup.mixed().required("Photo File is required"),
            kyc04document_type: Yup.number().required("Document Type is required"),
            kyc04passport_identity_no: Yup.string().required("Passport Identity Number is required"),
            kyc04set04uin: Yup.number().required("Set04 UIN is required").min(1, "is required"),
            kyc04issued_office: Yup.string().required("Issued Office is required"),
            kyc04passport_issued_date_eng: Yup.string().required("Passport Issued Date (English) is required"),
            kyc04passport_issued_date_nep: Yup.string().required("Passport Issued Date (Nepali) is required"),
            kyc04expiry_date_eng: Yup.string().required("Expiry Date (English) is required"),
            kyc04expiry_date_nep: Yup.string().required("Expiry Date (Nepali) is required"),
            kyc04visa_issue_date_eng: Yup.string().required("Visa Issue Date (English) is required"),
            kyc04visa_expiry_date_eng: Yup.string().required("Visa Expiry Date (English) is required"),
            kyc04visa_issue_date_nep: Yup.string().required("Visa Issue Date (Nepali) is required"),
            kyc04visa_expiry_date_nep: Yup.string().required("Visa Expiry Date (Nepali) is required"),
        });

        const voterIdValidationSchema = Yup.object().shape({
            CitizenShipFile: Yup.mixed().required("Citizenship File is required"),
            PhotoFile: Yup.mixed().required("Photo File is required"),

            kyc04voter_identity_no: Yup.string().required("Voter Identity Number is required"),
            kyc04voterid_issued_date_eng: Yup.string().required("Voter ID Issued Date (English) is required"),
            kyc04voterid_issued_date_nep: Yup.string().required("Voter ID Issued Date (Nepali) is required"),
        });

        console.log(eligibilityType);

        let schema;

        if (eligibilityType === "citizen") {
            schema = citizenValidationSchema;
        } else if (eligibilityType === "passport") {
            schema = passportValidationSchema;
        }
        else if (eligibilityType === "voter") {
            schema = voterIdValidationSchema;
        }



        setValidationSchema(schema);
    }, [eligibilityType]);

    return validationSchema;


};



const useStateValidationSchema = (formstates) => {
    const [stateValidationSchema, setStateValidationSchema] = useState(null);


    const valid = Yup.object().shape({});
    const noValidationSchema = Yup.object().shape({

        kyc01salutation: Yup.string().required("Salutation is required"),
        kyc01first_name: Yup.string().required("First Name is required"),

        kyc01last_name: Yup.string().required("Last Name is required"),
        kyc01email: Yup.string().email("Invalid Email").required("Email is required"),
        kyc01mobile_no: Yup.number().required("Mobile Number is required").min(1, "is required"),

        kyc01dob_nep: Yup.string().required("Date of Birth (Nepali) is required"),
        kyc01dob_eng: Yup.string().required("Date of Birth (English) is required"),



        kyc01bra01uin: Yup.number().required("Branch is required").min(1, "is required"),
        kyc02grandfather_name: Yup.string().required("Grandfather's Name is required"),
        kyc02father_name: Yup.string().required("Father's Name is required"),
        kyc02mother_name: Yup.string().required("Mother's Name is required"),
        kyc02grandfather_nationality: Yup.string().required("Grandfather's Nationality is required"),
        kyc02father_nationality: Yup.string().required("Father's Nationality is required"),
        kyc02mother_nationality: Yup.string().required("Mother's Nationality is required"),

    });
    const AddressValidationSchema = Yup.object().shape({



        kyc03set03uin: Yup.number().required("Set03 UIN is required").min(1, "is required"),
        kyc03set04uin: Yup.number().required("Set04 UIN is required").min(1, "is required"),
        kyc03set05uin: Yup.number().required("Set05 UIN is required").min(1, "is required"),
        kyc03ward_no: Yup.number().required("Ward Number is required").min(1, "is required"),
        kyc03street: Yup.string().required("Street is required"),
        kyc03house_no: Yup.number().required("House Number is required").min(1, "is required"),
        kyc03set03uin_temp: Yup.number().required("Temporary Set03 UIN is required").min(1, "is required"),
        kyc03set04uin_temp: Yup.number().required("Temporary Set04 UIN is required").min(1, "is required"),
        kyc03set05uin_temp: Yup.number().required("Temporary Set05 UIN is required").min(1, "is required"),
        kyc03ward_no_temp: Yup.number().required("Temporary Ward Number is required").min(1, "is required"),
        kyc03street_temp: Yup.string().required("Temporary Street is required"),
        kyc03house_no_temp: Yup.number().required("Temporary House Number is required").min(1, "is required"),

    });
    useEffect(() => {

        let schema;



        if (formstates === "no") {
            schema = noValidationSchema;
        } else if (formstates === "Address") {
            schema = AddressValidationSchema;
        }
        else if (formstates === "Account") {
            schema = valid;
        }
        else if (formstates === "terms") {
            schema = valid;
        }




        setStateValidationSchema(schema);
    }, [formstates]);

    return stateValidationSchema;



};


export { useFormValidationSchema, useStateValidationSchema };