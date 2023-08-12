import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useFormik} from 'formik';
import { basicSchema } from './schemas';
import {db, storage} from './config/firebase';
import {collection, addDoc} from 'firebase/firestore';
import {ref, uploadBytes} from 'firebase/storage';
import Nav from './Nav.js';
import './NewEmployee.css'
import {v4} from 'uuid';
const NewEmployee = () => {
    const employeeCollection = collection(db, "employees");
    const[fileTitle, setFileTitle] = useState('');
    const[file, setFile] = useState(null);

    //const[documents, setDocuments] = useState([]);
    const[documents] = useState([]);
    const[documentFiles] = useState([]);
    //To upload
    const[fname, setFname] = useState('');
    const[mname, setMname] = useState('');
    const[lname, setLname] = useState('');
    const[onboardingDate, setOnboardingDate] = useState('');
    const[startDate, setStartDate] = useState('');
    const[employeeStatus, setEmployeeStatus] = useState(true);
    const[designation, setDesignaton] = useState('');
    const[workAuth, setWorkAuth] = useState('');
    const[workAuthStartDate, setWorkAuthStartDate] = useState('');
    const[workAuthExpiryDate, setWorkAuthExpiryDate] = useState('');
    const[dateOfBirth, setDateOfBirth] = useState('');
    const[passportNumber, setPassportNumber] = useState('');
    const[passportExpiry, setPassportExpiry] = useState('');
    const[dlNumber, setDLNumber] = useState('');
    const[dlExpiry, setDLExpiry] = useState('');
    const[stateID, setStateID] = useState('');
    const[stateIDExpiry, setStateIDExpiry] = useState('');
    const[I94No, setI94No] = useState('');
    const[I94StartDate, setI94StartDate] = useState('');
    const[I94ExpiryDate, setI94ExpiryDate] = useState('');
    const[I9, setI9] = useState('');
    const[eVerify, setEVerify] = useState(false);
    const[totalAmendments, setTotalAmendments] = useState('');
    const[totalExtensions, setTotalExtensions] = useState('');
    const[personalEmailId, setPersonalEmailId] = useState('');
    const[payrollAddress, setPayrollAddress] = useState('');
    const[payrollState, setPayrollState] = useState('');
    const[physicalAddress, setPhysicalAddress] = useState('');
    const[physicalState, setPhysicalState] = useState('');
    const[universityName, setUniversityName] = useState('');
    const[contactNo, setContactNo] = useState('');
    
    
    const history = useHistory();

    //FORMIK STUFF


    //FORMIK STUFF

    const uploadFiles = (docID) =>{
        if(documentFiles.length == 0) return;
        for(let i = 0; i < documentFiles.length; i+=1){
            const fileRef = ref(storage, `documents/${docID}/${documents[(i*2)+1]}`);
            uploadBytes(fileRef, documentFiles[i]).then(() => {
                console.log('fileuploaded');
            })
        }
        

    }
/*
    useEffect(() => {
        console.log('using effect');
    },[file, fileTitle]); 
    */

    const addDocument = (e) => {
        e.preventDefault();
        documents.push(fileTitle, v4());
        documentFiles.push(file);
        setFileTitle('');
        setFile(null);
        console.log(documents);
        console.log(documentFiles);
        console.log("file title " + fileTitle);
        console.log("file " + file);
    }
    const onSubmit = async ( values, actions) => {
       // e.preventDefault();
        let docID = '';
        try{
            await addDoc(employeeCollection,{
                fname: values.fname, //required
                mname: values.mname,
                lname: values.lname, //required
                onboardingDate: values.onboardingDate, //required
                startDate: values.startDate,
                employeeStatus: values.employeeStatus, //required
                designation: values.designation,
                workAuth: values.workAuth,  //required
                workAuthStartDate: values.workAuthStartDate,
                workAuthExpiryDate: values.workAuthExpiryDate,
                dateOfBirth: values.dateOfBirth, //required
                passportNumber: values.passportNumber, //required
                passportExpiry: values.passportExpiry, //required
                dlNumber: values.dlNumber,
                dlExpiry: values.dlExpiry,
                stateID: values.stateID,
                stateIDExpiry: values.stateIDExpiry,
                I94No: values.I94No, //required
                I94StartDate: values.I94StartDate, //required
                I94ExpiryDate: values.I94ExpiryDate, //required
                I9: values.I9, //required
                eVerify: values.eVerify, //required
                totalAmendments: values.totalAmendments,
                totalExtensions: values.totalExtensions,
                personalEmailId: values.personalEmailId, //required
                payrollAddress: values.payrollAddress,
                physicalAddress: values.physicalAddress,
                physicalState: values.physicalState,
                universityName: values.universityName,
                contactNo: values.contactNo, //required
                documents: documents,
            }).then( ref => {
                docID = ref.id;
            });
            uploadFiles(docID);
            history.push("/dashboard");
        } catch(err){
            console.log(err);
        }
    }

    const formik = useFormik({
        _initialValues: {
            fname: "",
            mname: "",
            dateOfBirth: "",
            lname: "",
            onboardingDate: "",
            startDate: "",
            employeeStatus: false,
            designation: "",
            workAuth: "",
            workAuthStartDate: "",
            workAuthExpiryDate: "",
            dateOfBirth:"",
            passportNumber: "",
            passportExpiry:"",
            dlNumber:"",
            dlExpiry:"",
            stateID: "",
            stateIDExpiry: "",
            I94No:"",
            I94StartDate: "",
            I94ExpiryDate:"",
            I9:"",
            eVerify:false,
            totalAmendments:"",
            totalExtensions:"",
            personalEmailId:"",
            payrollAddress:"",
            physicalAddress:"",
            physicalState:"",
            universityName:"",
            contactNo:"",

        },
        get initialValues() {
            return this._initialValues;
        },
        set initialValues(value) {
            this._initialValues = value;
        },
        validationSchema: basicSchema,
        onSubmit,
    });

    console.log(formik.errors);

    return ( 
        
        <div className="newemployee">
            <Nav/>
            <h1>Add New Employee Form</h1>
            <form className="newemployeeform" style={{display:'flex', flexDirection:'column', marginLeft: '20vw', marginRight: '20vw'}}>
                <section>
                    <h1>Personal Info</h1>
                    <div>
                        <label>First Name</label>
                        <input
                            value={formik.values.fname}
                            id="fname"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.fname && formik.touched.fname? "input-error" : ""}
                        />
                        {formik.errors.fname && formik.touched.fname && <p className="errormsg">{formik.errors.fname}</p>}
                        <label>Middle Name</label>
                        <input
                            value={formik.values.mname}
                            id="mname"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.mname && formik.touched.mname? "input-error" : ""}
                        />
                        {formik.errors.mname && formik.touched.mname && <p className="errormsg">{formik.errors.mname}</p>}
                        <label>Last Name</label>
                        <input
                            value={formik.values.lname}
                            id="lname"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.lname && formik.touched.lname? "input-error" : ""}
                        />
                        {formik.errors.lname && formik.touched.lname && <p className="errormsg">{formik.errors.lname}</p>}
                        <label>Date of Birth</label>
                        <input
                            value={formik.values.dateOfBirth}
                            id="dateOfBirth"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.dateOfBirth && formik.touched.dateOfBirth? "input-error" : ""}
                        />
                        {formik.errors.dateOfBirth && formik.touched.dateOfBirth && <p className="errormsg">{formik.errors.dateOfBirth}</p>}
                        <label>Personal Mail ID</label>
                        <input
                            value={formik.values.personalEmailId}
                            id="personalEmailId"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.personalEmailId && formik.touched.personalEmailId? "input-error" : ""}
                        />
                        {formik.errors.personalEmailId && formik.touched.personalEmailId && <p className="errormsg">{formik.errors.personalEmailId}</p>}
                        <label>Contact No.</label>
                        <input
                            value={formik.values.contactNo}
                            id="contactNo"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.contactNo && formik.touched.contactNo? "input-error" : ""}
                        />
                        {formik.errors.contactNo && formik.touched.contactNo && <p className="errormsg">{formik.errors.contactNo}</p>}
                        <label>Physical Address</label>
                        <input
                            value={formik.values.physicalAddress}
                            id="physicalAddress"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.physicalAddress && formik.touched.physicalAddress? "input-error" : ""}
                        />
                        {formik.errors.physicalAddress && formik.touched.physicalAddress && <p className="errormsg">{formik.errors.physicalAddress}</p>}
                    </div>
                </section>

                <section>
                    <h1>Employment Info</h1>
                    <div>
                        <label>On-boarding Date</label>
                        <input
                            value={formik.values.onboardingDate}
                            id="onboardingDate"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.onboardingDate && formik.touched.onboardingDate? "input-error" : ""}
                        />
                        {formik.errors.onboardingDate && formik.touched.onboardingDate && <p className="errormsg">{formik.errors.onboardingDate}</p>}
                        <label>Start Date</label>
                        <input
                            value={formik.values.startDate}
                            id="startDate"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.startDate && formik.touched.startDate? "input-error" : ""}
                        />
                        {formik.errors.startDate && formik.touched.startDate && <p className="errormsg">{formik.errors.startDate}</p>}
                        <label>Employment Status Active</label>
                        <input
                            value={formik.values.employeeStatus}
                            id="employeeStatus"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="checkbox"
                            className={formik.errors.employeeStatus && formik.touched.employeeStatus? "input-error" : ""}
                        />
                        {formik.errors.employeeStatus && formik.touched.employeeStatus && <p className="errormsg">{formik.errors.employeeStatus}</p>}
                        <label>Designation</label>
                        <input
                            value={formik.values.designation}
                            id="designation"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.designation && formik.touched.designation? "input-error" : ""}
                        />
                        {formik.errors.designation && formik.touched.designation && <p className="errormsg">{formik.errors.designation}</p>}
                    </div>
                </section>
                <section>
                    <h1>Authorization</h1>
                    <div>
                        <label>Work Authorization Type</label>
                        <select
                            value={formik.values.workAuth}
                            id="workAuth"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={formik.errors.workAuth && formik.touched.workAuth? "input-error" : ""}
                        >
                            <option selected hidden value="">Choose here</option>
                            <option value="H1B">H1B</option>
                            <option value="OPT EAD">OPT EAD</option>
                            <option value="CPT">CPT</option>
                            <option value="H4 EAD">H4 EAD</option>
                            <option value="GC">GC</option>
                            <option value="USC">USC</option>
                            <option value="L1">L1</option>
                            <option value="L2">L2</option>
                            <option value="B1">B1</option>
                            <option value="B2">B2</option>
                            <option value="GC EAD">GC EAD</option>
                            <option value="Other">Other</option>
                        </select>
                        {formik.errors.workAuth && formik.touched.workAuth && <p className="errormsg">{formik.errors.workAuth}</p>}
                        <label>Work Authorization Start Date</label>
                        <input
                            value={formik.values.workAuthStartDate}
                            id="workAuthStartDate"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.workAuthStartDate && formik.touched.workAuthStartDate? "input-error" : ""}
                        />
                        {formik.errors.workAuthStartDate && formik.touched.workAuthStartDate && <p className="errormsg">{formik.errors.workAuthStartDate}</p>}
                        <label>Work Authorization Expiry Date</label>
                        <input
                            value={formik.values.workAuthExpiryDate}
                            id="workAuthExpiryDate"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.workAuthExpiryDate && formik.touched.workAuthExpiryDate? "input-error" : ""}
                        />
                        {formik.errors.workAuthExpiryDate && formik.touched.workAuthExpiryDate && <p className="errormsg">{formik.errors.workAuthExpiryDate}</p>}
                    </div>
                </section>
                <section>
                    <h1>Document Info</h1>
                    <div>
                        <label>Passport No</label>
                        <input
                            value={formik.values.passportNumber}
                            id="passportNumber"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.passportNumber && formik.touched.passportNumber? "input-error" : ""}
                        />
                        {formik.errors.passportNumber && formik.touched.passportNumber && <p className="errormsg">{formik.errors.passportNumber}</p>}
                        <label>Passport Expiry</label>
                        <input
                            value={formik.values.passportExpiry}
                            id="passportExpiry"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.passportExpiry && formik.touched.passportExpiry? "input-error" : ""}
                        />
                        {formik.errors.passportExpiry && formik.touched.passportExpiry && <p className="errormsg">{formik.errors.passportExpiry}</p>}
                        <label>DL No</label>
                        <input
                            value={formik.values.dlNumber}
                            id="dlNumber"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.employeeStatus && formik.touched.employeeStatus? "input-error" : ""}
                        />
                        {formik.errors.employeeStatus && formik.touched.employeeStatus && <p className="errormsg">{formik.errors.employeeStatus}</p>}
                        <label>DL Expiry</label>
                        <input
                            value={formik.values.dlExpiry}
                            id="dlExpiry"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.dlExpiry && formik.touched.dlExpiry? "input-error" : ""}
                        />
                        {formik.errors.dlExpiry && formik.touched.dlExpiry && <p className="errormsg">{formik.errors.dlExpiry}</p>}
                        <label>State ID</label>
                        <input
                            value={formik.values.stateID}
                            id="stateID"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.stateID && formik.touched.stateID? "input-error" : ""}
                        />
                        {formik.errors.stateID && formik.touched.stateID && <p className="errormsg">{formik.errors.stateID}</p>}
                        <label>State ID Expiry</label>
                        <input
                            value={formik.values.stateIDExpiry}
                            id="stateIDExpiry"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.stateIDExpiry && formik.touched.stateIDExpiry? "input-error" : ""}
                        />
                        {formik.errors.stateIDExpiry && formik.touched.stateIDExpiry && <p className="errormsg">{formik.errors.stateIDExpiry}</p>}
                        <label>I94 No</label>
                        <input
                            value={formik.values.I94No}
                            id="I94No"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.I94No && formik.touched.I94No? "input-error" : ""}
                        />
                        {formik.errors.I94No && formik.touched.I94No && <p className="errormsg">{formik.errors.I94No}</p>}
                        <label>I94 Start Date</label>
                        <input
                            value={formik.values.I94StartDate}
                            id="I94StartDate"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.I94StartDate && formik.touched.I94StartDate? "input-error" : ""}
                        />
                        {formik.errors.I94StartDate && formik.touched.I94StartDate && <p className="errormsg">{formik.errors.I94StartDate}</p>}
                        <label>I94 Expiry Date</label>
                        <input
                            value={formik.values.I94ExpiryDate}
                            id="I94ExpiryDate"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.I94ExpiryDate && formik.touched.I94ExpiryDate? "input-error" : ""}
                        />
                        {formik.errors.I94ExpiryDate && formik.touched.I94ExpiryDate && <p className="errormsg">{formik.errors.I94ExpiryDate}</p>}
                        <label>I9</label>
                        <input
                            value={formik.values.I9}
                            id="I9"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.I9 && formik.touched.I9? "input-error" : ""}
                        />
                        {formik.errors.I9 && formik.touched.I9 && <p className="errormsg">{formik.errors.I94ExpiryDate}</p>}

                    </div>
                </section>
                
                <section>
                    <h1>Other Info</h1>
                    <div>
                        <label>E-Verify</label>
                        <input
                            value={formik.values.eVerify}
                            id="eVerify"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="checkbox"
                            className={formik.errors.eVerify && formik.touched.eVerify? "input-error" : ""}
                        />
                        {formik.errors.eVerify && formik.touched.eVerify && <p className="errormsg">{formik.errors.eVerify}</p>}
                        <label>Total Amendments</label>
                        <input
                            value={formik.values.totalAmendments}
                            id="totalAmendments"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.totalAmendments && formik.touched.totalAmendments? "input-error" : ""}
                        />
                        {formik.errors.totalAmendments && formik.touched.totalAmendments && <p className="errormsg">{formik.errors.totalAmendments}</p>}
                        <label>Total Extensions</label>
                        <input
                            value={formik.values.totalExtensions}
                            id="totalExtensions"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.totalExtensions && formik.touched.totalExtensions? "input-error" : ""}
                        />
                        {formik.errors.totalExtensions && formik.touched.totalExtensions && <p className="errormsg">{formik.errors.totalExtensions}</p>}
                        <label>Payroll Address</label>
                        <input
                            value={formik.values.payrollAddress}
                            id="payrollAddress"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.payrollAddress && formik.touched.payrollAddress? "input-error" : ""}
                        />
                        {formik.errors.payrollAddress && formik.touched.payrollAddress && <p className="errormsg">{formik.errors.payrollAddress}</p>}
                        <label>Physical State</label>
                        <input
                            value={formik.values.physicalState}
                            id="physicalState"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.physicalState && formik.touched.physicalState? "input-error" : ""}
                        />
                        {formik.errors.physicalState && formik.touched.physicalState && <p className="errormsg">{formik.errors.physicalState}</p>}
                        <label>University Name</label>
                        <input
                            value={formik.values.universityName}
                            id="universityName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={formik.errors.universityName && formik.touched.universityName? "input-error" : ""}
                        />
                        {formik.errors.universityName && formik.touched.universityName && <p className="errormsg">{formik.errors.universityName}</p>}
                    </div>
                </section>
                <section>
                    <h1>Document Upload</h1>
                    <div>
                    <h4>Files</h4>
                {documentFiles.map((f) => (
                    <p>{f.name}</p>
                ))}
                <input
                    type="text"
                    placeholder='File Title'
                    value= {fileTitle}
                    onChange = {(e) => setFileTitle(e.target.value)}
                />
                <input
                    type="file"

                    onChange = {(e) => setFile(e.target.files[0])}
                />
                <button onClick={addDocument}>Add Document</button>
                <br />
                </div>
                </section>
                <button onClick={formik.handleSubmit}>Add Employee</button>
            </form>
            
        </div>
     );
}
 
export default NewEmployee;