import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useFormik} from 'formik';
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

   /* const BasicForm = () => {
        const formik = useFormik({
            initialValues:{
                fname: "",
                mname: "",
                dateOfBirth: "",
                lname: "",
            }
        });
    }
*/
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        let docID = '';
        try{
            await addDoc(employeeCollection,{
                fname: fname, //required
                mname:mname,
                lname: lname, //required
                onboardingDate: onboardingDate, //required
                startDate: startDate,
                employeeStatus: employeeStatus, //required
                designation: designation,
                workAuth: workAuth,  //required
                workAuthStartDate: workAuthStartDate,
                workAuthExpiryDate: workAuthExpiryDate,
                dateOfBirth: dateOfBirth, //required
                passportNumber: passportNumber, //required
                passportExpiry: passportExpiry, //required
                dlNumber: dlNumber,
                dlExpiry: dlExpiry,
                stateID: stateID,
                stateIDExpiry: stateIDExpiry,
                I94No: I94No, //required
                I94StartDate: I94StartDate, //required
                I94ExpiryDate: I94ExpiryDate, //required
                I9: I9, //required
                eVerify: eVerify, //required
                totalAmendments: totalAmendments,
                totalExtensions: totalExtensions,
                personalEmailId: personalEmailId, //required
                payrollAddress: payrollAddress,
                physicalAddress: physicalAddress,
                physicalState: physicalState,
                universityName: universityName,
                contactNo: contactNo, //required
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

    return ( 
        
        <div className="newemployee">
            <Nav/>
            <h1>Add New Employee Form</h1>
            <form className="newemployeeform" style={{display:'flex', flexDirection:'column', marginLeft: '20vw', marginRight: '20vw'}}>
                <h1>Personal Info</h1>
                <div>
                    <label>First Name</label>
                    <input
                        value={formik.values.fname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                    />
                    <label>Middle Name</label>
                    <input
                        value={formik.values.mname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                    />
                    <label>Last Name</label>
                    <input
                        value={formik.values.lname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                    />
                    <label>Date of Birth</label>
                    <input
                        value={formik.values.dateOfBirth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                    />
                </div>
            </form>
            <form className="newemployeeform" style={{display:'flex', flexDirection:'column', marginLeft: '20vw', marginRight: '20vw'}}>
                <section>
                    <h1>Personal Info</h1>
                        <div>
                        <label>First Name</label>
                        <input 
                            type="text"

                            value = {fname}
                            onChange = {(e) => setFname(e.target.value)}
                        />
                        <label>Middle Name</label>
                        <input 
                            type="text"

                            value = {mname}
                            onChange = {(e) => setMname(e.target.value)}
                        />
                        <label>Last Name</label>
                        <input 
                            type="text"

                            value = {lname}
                            onChange = {(e) => setLname(e.target.value)}
                        />
                        <label>Date of Birth</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"
                            value = {dateOfBirth}
                            onChange = {(e) => setDateOfBirth(e.target.value)}
                        />
                        <label>Personal Mail ID</label>
                        <input 
                            type="text"

                            value = {personalEmailId}
                            onChange = {(e) => setPersonalEmailId(e.target.value)}
                        />
                        <label>Contact No.</label>
                        <input 
                            type="text"

                            value = {contactNo}
                            onChange = {(e) => setContactNo(e.target.value)}
                        />
                        <label>Physical Address</label>
                        <input 
                            type="text"

                            value = {physicalAddress}
                            onChange = {(e) => setPhysicalAddress(e.target.value)}
                        />
                        </div>
                </section>
                <section>
                    <h1>Employment Info</h1>
                        <div>
                        <label>On-boarding Date</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"
                            value = {onboardingDate}
                            onChange = {(e) => setOnboardingDate(e.target.value)}
                        />
                        <label>Start Date</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"
                            value = {startDate}
                            onChange = {(e) => setStartDate(e.target.value)}
                        />

                        <label>Employee Status Active</label>
                        <input 
                            type="checkbox"
                            className="checkbox"
                            checked = {employeeStatus}
                            onChange = {(e) => setEmployeeStatus(e.target.checked)}
                        />

                        <label>Designation</label>
                        <input 
                            type="text"

                            value = {designation}
                            onChange = {(e) => setDesignaton(e.target.value)}
                        />
                        </div>
                </section>
                
                <section>
                    <h1>Authorization</h1>
                        <div>
                        <label>Work Authorization Type</label>
                        <select
                        name={workAuth}
                        value = {workAuth}
                        onChange = {(e) => setWorkAuth(e.target.value)}
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

                        <label>Work Authorization Start Date</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"

                            value = {workAuthStartDate}
                            onChange = {(e) => setWorkAuthStartDate(e.target.value)}
                        />

                        <label>Work Authorization Expiry Date</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"

                            value = {workAuthExpiryDate}
                            onChange = {(e) => setWorkAuthExpiryDate(e.target.value)}
                        />
                        </div>
                </section>
                
                <section>
                    <h1>Document Info</h1>
                        <div>
                        <label>Passport No</label>
                        <input 
                            type="text"

                            value = {passportNumber}
                            onChange = {(e) => setPassportNumber(e.target.value)}
                        />

                        <label>Passport Expiry</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"

                            value = {passportExpiry}
                            onChange = {(e) => setPassportExpiry(e.target.value)}
                        />

                        <label>DL No</label>
                        <input 
                            type="text"

                            value = {dlNumber}
                            onChange = {(e) => setDLNumber(e.target.value)}
                        />

                        <label>DL Expiry</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"

                            value = {dlExpiry}
                            onChange = {(e) => setDLExpiry(e.target.value)}
                        />

                        <label>State ID</label>
                        <input 
                            type="text"

                            value = {stateID}
                            onChange = {(e) => setStateID(e.target.value)}
                        />

                        <label>State Id Expiry</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"

                            value = {stateIDExpiry}
                            onChange = {(e) => setStateIDExpiry(e.target.value)}
                        />
                        <label>I94 No</label>
                        <input 
                            type="text"

                            value = {I94No}
                            onChange = {(e) => setI94No(e.target.value)}
                        />

                        <label>I94 Start Date</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"

                            value = {I94StartDate}
                            onChange = {(e) => setI94StartDate(e.target.value)}
                        />

                        <label>I94 Expiry Date</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"

                            value = {I94ExpiryDate}
                            onChange = {(e) => setI94ExpiryDate(e.target.value)}
                        />

                        <label>I9</label>
                        <input 
                            type="text"

                            value = {I9}
                            onChange = {(e) => setI9(e.target.value)}
                        />
                        </div>
                </section>
                <section>
                    <h1>Other Info</h1>
                        <div>
                        <label>E-Verify</label>
                        <input 
                            type="checkbox"
                            className="checkbox"
                            checked = {eVerify}
                            onChange = {(e) => setEVerify(e.target.checked)}
                        />

                        <label>Total Amendments</label>
                        <input 
                            type="text"

                            value = {totalAmendments}
                            onChange = {(e) => setTotalAmendments(e.target.value)}
                        />

                        <label>TotalExtensions</label>
                        <input 
                            type="text"

                            value = {totalExtensions}
                            onChange = {(e) => setTotalExtensions(e.target.value)}
                        />


                        <label>Payroll Address</label>
                        <input 
                            type="text"

                            value = {payrollAddress}
                            onChange = {(e) => setPayrollAddress(e.target.value)}
                        />

                        <label>Payroll State</label>
                        <input 
                            type="text"

                            value = {payrollState}
                            onChange = {(e) => setPayrollState(e.target.value)}
                        />



                        <label>Physical State</label>
                        <input 
                            type="text"

                            value = {physicalState}
                            onChange = {(e) => setPhysicalState(e.target.value)}
                        />
                        <label>University Name</label>
                        <input 
                            type="text"

                            value = {universityName}
                            onChange = {(e) => setUniversityName(e.target.value)}
                        />
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

                

                



                <button onClick={handleSubmit}>Add Employee</button>
            </form>
        </div>
     );
}
 
export default NewEmployee;