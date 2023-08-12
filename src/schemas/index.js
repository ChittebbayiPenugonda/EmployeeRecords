import * as yup from 'yup';

export const basicSchema = yup.object().shape({
    fname: yup.string().matches(/^[aA-zZ\s]+$/, {message : "Name can only contain Alphabetical Characters"}).required("Required"),
    mname: yup.string().matches(/^[aA-zZ\s]+$/, {message : "Name can only contain Alphabetical Characters"}),
    lname: yup.string().matches(/^[aA-zZ\s]+$/, {message : "Name can only contain Alphabetical Characters"}).required("Required"),
    onboardingDate: yup.string().matches(/^(?:(((Jan?|Ma(r(ch)?|y)|Jul?|Aug?|Oct?|Dec?)\ 31)|((Jan?|Ma(r?|y)|Apr?|Ju((l?)|(n?))|Aug?|Oct?|(Sep|Nov|Dec)?)\ (0?[1-9]|([12]\d)|30))|(Feb?\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\,\ ((1[6-9]|[2-9]\d)\d{2}))/, {message: "Invalid Date. Follow MMM DD, YYYY format (ex. Apr 12, 2005)"}).required("Required"),
    startDate: yup.string().matches(/^(?:(((Jan?|Ma(r(ch)?|y)|Jul?|Aug?|Oct?|Dec?)\ 31)|((Jan?|Ma(r?|y)|Apr?|Ju((l?)|(n?))|Aug?|Oct?|(Sep|Nov|Dec)?)\ (0?[1-9]|([12]\d)|30))|(Feb?\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\,\ ((1[6-9]|[2-9]\d)\d{2}))/, {message: "Invalid Date. Follow MMM DD, YYYY format (ex. Apr 12, 2005)"}).required("Required"),
    //employeeStatus: values.employeeStatus, //required
    designation: yup.string().matches(/^[aA-zZ\s]+$/, {message : "Designation can only contain Alphabetical Characters"}).required("Required"),
    workAuth: yup.string().required("Required"),
    workAuthStartDate: yup.string().matches(/^(?:(((Jan?|Ma(r(ch)?|y)|Jul?|Aug?|Oct?|Dec?)\ 31)|((Jan?|Ma(r?|y)|Apr?|Ju((l?)|(n?))|Aug?|Oct?|(Sep|Nov|Dec)?)\ (0?[1-9]|([12]\d)|30))|(Feb?\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\,\ ((1[6-9]|[2-9]\d)\d{2}))/, {message: "Invalid Date. Follow MMM DD, YYYY format (ex. Apr 12, 2005)"}).required("Required"),
    workAuthExpiryDate: yup.string().matches(/^(?:(((Jan?|Ma(r(ch)?|y)|Jul?|Aug?|Oct?|Dec?)\ 31)|((Jan?|Ma(r?|y)|Apr?|Ju((l?)|(n?))|Aug?|Oct?|(Sep|Nov|Dec)?)\ (0?[1-9]|([12]\d)|30))|(Feb?\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\,\ ((1[6-9]|[2-9]\d)\d{2}))/, {message: "Invalid Date. Follow MMM DD, YYYY format (ex. Apr 12, 2005)"}).required("Required"),
    dateOfBirth: yup.string().matches(/^(?:(((Jan?|Ma(r(ch)?|y)|Jul?|Aug?|Oct?|Dec?)\ 31)|((Jan?|Ma(r?|y)|Apr?|Ju((l?)|(n?))|Aug?|Oct?|(Sep|Nov|Dec)?)\ (0?[1-9]|([12]\d)|30))|(Feb?\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\,\ ((1[6-9]|[2-9]\d)\d{2}))/, {message: "Invalid Date. Follow MMM DD, YYYY format (ex. Apr 12, 2005)"}).required("Required"),
    passportNumber: yup.string().required("Required"),
    passportExpiry: yup.string().matches(/^(?:(((Jan?|Ma(r(ch)?|y)|Jul?|Aug?|Oct?|Dec?)\ 31)|((Jan?|Ma(r?|y)|Apr?|Ju((l?)|(n?))|Aug?|Oct?|(Sep|Nov|Dec)?)\ (0?[1-9]|([12]\d)|30))|(Feb?\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\,\ ((1[6-9]|[2-9]\d)\d{2}))/, {message: "Invalid Date. Follow MMM DD, YYYY format (ex. Apr 12, 2005)"}).required("Required"),
    dlNumber: yup.string().required("Required"),
    dlExpiry: yup.string().matches(/^(?:(((Jan?|Ma(r(ch)?|y)|Jul?|Aug?|Oct?|Dec?)\ 31)|((Jan?|Ma(r?|y)|Apr?|Ju((l?)|(n?))|Aug?|Oct?|(Sep|Nov|Dec)?)\ (0?[1-9]|([12]\d)|30))|(Feb?\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\,\ ((1[6-9]|[2-9]\d)\d{2}))/, {message: "Invalid Date. Follow MMM DD, YYYY format (ex. Apr 12, 2005)"}).required("Required"),
    stateID: yup.string().required("Required"),
    stateIDExpiry: yup.string().matches(/^(?:(((Jan?|Ma(r(ch)?|y)|Jul?|Aug?|Oct?|Dec?)\ 31)|((Jan?|Ma(r?|y)|Apr?|Ju((l?)|(n?))|Aug?|Oct?|(Sep|Nov|Dec)?)\ (0?[1-9]|([12]\d)|30))|(Feb?\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\,\ ((1[6-9]|[2-9]\d)\d{2}))/, {message: "Invalid Date. Follow MMM DD, YYYY format (ex. Apr 12, 2005)"}).required("Required"),
    I94No: yup.string().required("Required"), //required
    I94StartDate: yup.string().matches(/^(?:(((Jan?|Ma(r(ch)?|y)|Jul?|Aug?|Oct?|Dec?)\ 31)|((Jan?|Ma(r?|y)|Apr?|Ju((l?)|(n?))|Aug?|Oct?|(Sep|Nov|Dec)?)\ (0?[1-9]|([12]\d)|30))|(Feb?\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\,\ ((1[6-9]|[2-9]\d)\d{2}))/, {message: "Invalid Date. Follow MMM DD, YYYY format (ex. Apr 12, 2005)"}).required("Required"), //required
    I94ExpiryDate: yup.string().matches(/^(?:(((Jan?|Ma(r(ch)?|y)|Jul?|Aug?|Oct?|Dec?)\ 31)|((Jan?|Ma(r?|y)|Apr?|Ju((l?)|(n?))|Aug?|Oct?|(Sep|Nov|Dec)?)\ (0?[1-9]|([12]\d)|30))|(Feb?\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\,\ ((1[6-9]|[2-9]\d)\d{2}))/, {message: "Invalid Date. Follow MMM DD, YYYY format (ex. Apr 12, 2005)"}).required("Required"),
    I9: yup.string().required(), //required
    //eVerify: values.eVerify, //required
    totalAmendments: yup.string().matches(/^[0-9]*$/, {message : "Numeric Characters Only"}),
    totalExtensions: yup.string().matches(/^[0-9]*$/, {message : "Numeric Characters Only"}),
    personalEmailId: yup.string().email("Follow Email format (ex. example@somemail.com)").required("Required"), //required
    /*payrollAddress: values.payrollAddress,
    physicalAddress: values.physicalAddress,
    physicalState: values.physicalState,
    universityName: values.universityName,*/
    contactNo: yup.string().matches(/^[0-9]*$/, {message : "Numeric Characters Only, no dashes or spaces"}).min(10, "Phone numbers need 10 digits").max(10, "Phone numbers need 10 digits").required("Required"), //required

    
});

/*
^(?:(((Jan(uary)?|Ma(r(ch)?|y)|Jul(y)?|Aug(ust)?|Oct(ober)?|Dec(ember)?)\ 31)|((Jan(uary)?|Ma(r(ch)?|y)|Apr(il)?|Ju((ly?)|(ne?))|Aug(ust)?|Oct(ober)?|(Sept|Nov|Dec)(ember)?)\ (0?[1-9]|([12]\d)|30))|(Feb(ruary)?\ (0?[1-9]|1\d|2[0-8]|(29(?=,\ ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))))\,\ ((1[6-9]|[2-9]\d)\d{2}))/
*/