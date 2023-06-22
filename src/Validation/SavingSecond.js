import * as Yup from "yup";
import { useEffect, useState } from "react";





const useStateValidationSchema = (formstates) => {
    const [stateValidationSchema, setStateValidationSchema] = useState(null);


    const valid = Yup.object().shape({

        id: Yup.string().required(),
        acc02acc01uin: Yup.number().required().min(1, "required"),
        acc02salutation: Yup.number().required().min(0, "required"),
        acc02is_local_citizen: Yup.number().required().min(1, "required"),
        acc02FirstName: Yup.string().required(),

        acc02LastName: Yup.string().required(),
        acc02Mobile_no: Yup.number().required(),

        acc02Email: Yup.string().email().required(),
        acc02dob_nep: Yup.string().nullable().required(),
        aac02dob_eng: Yup.string().nullable().required(),

        acc02bra01uin: Yup.number().required().min(1, "required"),

    });
    const noValidationSchema = Yup.object().shape({



        acc03Gender: Yup.number().required().min(1, "required"),
        acc03MaritalStatus: Yup.number().required().min(1, "required"),
        acc03Nationality: Yup.string().required(),
        acc03Education: Yup.number().required().min(1, "required"),
        acc03Link_to_financial_institute: Yup.boolean().required(),
        acc03Link_to_criminal_activity: Yup.boolean().required(),
        acc03has_bo: Yup.boolean().required(),
        acc03is_us_citizen: Yup.boolean().required(),
        acc04citizenship_no: Yup.string().required(),
        acc04set04uin: Yup.number().required().min(1, "required"),
        acc04issued_office: Yup.string().required(),
        acc04Pan: Yup.string().required(),
        acc04issued_date_nep: Yup.string().required(),
        acc04issued_date_eng: Yup.string().required(),
        acc05passport_no: Yup.string().required(),
        acc05issued_office: Yup.string().required(),
        acc05issued_date_nep: Yup.string().required(),
        acc05issued_date_eng: Yup.string().required(),
        acc05expiry_date_nep: Yup.string().required(),
        acc05expiry_date_eng: Yup.string().required(),



    });
    const AddressValidationSchema = Yup.object().shape({



        acc06set05uin: Yup.number().required().min(1, "required"),
        acc06set04uin: Yup.number().required().min(1, "required"),
        acc06house_no: Yup.number().required().min(1, "required"),
        acc06street: Yup.string().required(),
        acc06ward_no: Yup.number().required().min(1, "required"),
        acc06resident_phone_no: Yup.number().required().integer().min(1, "required").test('len', 'Invalid Number', val => val && val.toString().length === 10),
        acc06office_no: Yup.number().required().integer().min(1, "required").test('len', 'Invalid Number', val => val && val.toString().length === 10),
        acc06mobile_no: Yup.number().required().integer().min(1, "required").test('len', 'Invalid Number', val => val && val.toString().length === 10),
        accacc06same_as_permanent: Yup.boolean().required(),
        acc06is_parmanent: Yup.boolean().required(),
        acc06set05uin2: Yup.number().required().min(1, "required"),
        acc06set04uin2: Yup.number().required().min(1, "required"),
        acc06house_no2: Yup.number().required().min(1, "required"),
        acc06street2: Yup.string().required(),
        acc06ward_no2: Yup.number().required().min(1, "required"),
        acc06resident_phone_no2: Yup.number().required().integer().min(1, "required").test('len', 'Invalid Number', val => val && val.toString().length === 10),
        acc06office_no2: Yup.number().required().integer().min(1, "required").test('len', 'Invalid Number', val => val && val.toString().length === 10),
        acc06mobile_no2: Yup.number().required().integer().min(1, "required").test('len', 'Invalid Number', val => val && val.toString().length === 10),
        accacc06same_as_permanent2: Yup.boolean().required(),
        acc06is_parmanent2: Yup.boolean().required(),
    });
    useEffect(() => {

        let schema;



        if (formstates === "no") {
            schema = valid;
        } else if (formstates === "generald") {
            schema = noValidationSchema;
        }
        else if (formstates === "addr_details") {
            schema = AddressValidationSchema;
        }
        else if (formstates === "terms") {
            schema = valid;
        }




        setStateValidationSchema(schema);
    }, [formstates]);

    return stateValidationSchema;



};


export { useStateValidationSchema };