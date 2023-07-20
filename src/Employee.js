import { useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {db, auth, storage} from './config/firebase';
import { getDoc, collection, deleteDoc, addDoc, doc, updateDoc } from 'firebase/firestore';
import Nav from './Nav.js';
import './Employee.css';
import {ref, getDownloadURL, } from 'firebase/storage';
import {useHistory} from 'react-router-dom';
import {v4} from 'uuid';
import {uploadBytes} from 'firebase/storage';

const Employee = () => {
    const {id} = useParams();
    const employeeRef = doc(db, "employees", id)
    const [employee, setEmployee] = useState(null);
    const[pending, setPending] = useState(true);

    const [sectionToDisplay, setSectionToDisplay] = useState("personal");
    
    const getEmployee = async () => {
        try{
            const employeeData = await getDoc(employeeRef);
            setEmployee(employeeData.data());

            //loadDocuments(employeeData);

            setPending(false);
        } catch (err){
            console.log(err.message);
        }
    }



    useEffect(() => {
        getEmployee();
;
    },[]);

    if(pending){
        return (<p>Loading...</p>);
    }

    return (  
        <div className="employeeinfodiv" style={{display:"flex", flexDirection: "column"}}>
        <Nav/>
        <h1>{employee.fname} {employee.lname} <span style={{fontSize:"20px", color:"gray"}}>Employee Profile</span></h1>
        <div className="sectionmenu">
            <button onClick={()=>{setSectionToDisplay("personal")}} style={{backgroundColor: (sectionToDisplay == "personal") ? "rgb(47, 47, 161)" : "rgb(248, 248, 248)", color: (sectionToDisplay == "personal") ? "white" : "black"}}>
                Personal
            </button>
            <button onClick={()=>{setSectionToDisplay("employment")}} style={{backgroundColor: (sectionToDisplay == "employment") ? "rgb(47, 47, 161)" : "rgb(248, 248, 248)", color: (sectionToDisplay == "employment") ? "white" : "black"}}>
                Employment
            </button>
            <button onClick={()=>{setSectionToDisplay("authorization")}} style={{backgroundColor: (sectionToDisplay == "authorization") ? "rgb(47, 47, 161)" : "rgb(248, 248, 248)", color: (sectionToDisplay == "authorization") ? "white" : "black"}}>
                Authorization
            </button>
            <button onClick={()=>{setSectionToDisplay("documentinfo")}} style={{backgroundColor: (sectionToDisplay == "documentinfo") ? "rgb(47, 47, 161)" : "rgb(248, 248, 248)", color: (sectionToDisplay == "documentinfo") ? "white" : "black"}}>
                Document Info
            </button>
            <button onClick={()=>{setSectionToDisplay("other")}} style={{backgroundColor: (sectionToDisplay == "other") ? "rgb(47, 47, 161)" : "rgb(248, 248, 248)", color: (sectionToDisplay == "other") ? "white" : "black"}}>
                Other
            </button>
            <button onClick={()=>{setSectionToDisplay("documents")}} style={{backgroundColor: (sectionToDisplay == "documents") ? "rgb(47, 47, 161)" : "rgb(248, 248, 248)", color: (sectionToDisplay == "documents") ? "white" : "black"}}>
                Documents
            </button>
            <button onClick={()=>{setSectionToDisplay("actions")}} style={{backgroundColor: (sectionToDisplay == "actions") ? "rgb(47, 47, 161)" : "rgb(248, 248, 248)", color: (sectionToDisplay == "actions") ? "white" : "black"}}>
                Actions
            </button>
        </div>
        {sectionToDisplay === "personal" && (
            <PersonalInfoSection employee={employee} id={id} getEmployee={getEmployee}/>
        )}
        {sectionToDisplay === "employment" && (
            <EmploymentInfoSection employee={employee} id={id} getEmployee={getEmployee}/>
        )}
        {sectionToDisplay === "authorization" && (
            <AuthorizationInfoSection employee={employee} id={id} getEmployee={getEmployee}/>
        )}
        {sectionToDisplay === "documentinfo" && (
            <DocumentInfoSection employee={employee} id={id} getEmployee={getEmployee}/>
        )}
        {sectionToDisplay === "other" && (
            <OtherInfoSection employee={employee} id={id} getEmployee={getEmployee}/>
        )}
        {sectionToDisplay === "documents" && (
            <DocumentsSection employee={employee} id={id} getEmployee={getEmployee}/>
        )}
        {sectionToDisplay === "actions" && (
            <ActionsSection employee={employee} id={id} getEmployee={getEmployee}/>
        )}

        </div>
        );
}
const PersonalInfoSection = ({employee, id, getEmployee}) => {
    const[fname, setFname] = useState(employee.fname);
    const[mname, setMname] = useState(employee.mname);
    const[lname, setLname] = useState(employee.lname);
    const[dateOfBirth, setDateOfBirth] = useState(employee.dateOfBirth);
    const[personalEmailId, setPersonalEmailId] = useState(employee.personalEmailId);
    const[contactNo, setContactNo] = useState(employee.contactNo);
    const[physicalAddress, setPhysicalAddress] = useState(employee.physicalAddress);
    
    const [editing, setEditing] = useState(false);
    

    const editEmployee = () => {
        setEditing(true);
    }

    const stopEditingEmployee = () => {
        setEditing(false);
    }

    const pushEdits = async (e) => {

        e.preventDefault();
        
        const docRef = doc(db, 'employees', id);
        try{

        await updateDoc(docRef, {
            fname: fname,
            mname: mname,
            lname: lname, 
            dateOfBirth: dateOfBirth,
            personalEmailId: personalEmailId,
            contactNo: contactNo,
            physicalAddress: physicalAddress,

            
            
            //documents: documents,
        }).then( ref => {
            //alert(employee.fname);
            
            console.log("employee updated");
            stopEditingEmployee();
            getEmployee();
        });
        } catch(err){
            console.log(err);
        }
    }
    if(editing){
        return (
            <section>
                    <h1>Personal <button onClick={()=>{stopEditingEmployee()}}>Cancel Editing</button></h1>
                        <div>
                        <label>First Name:</label>
                        <input 
                            type="text"

                            value = {fname}
                            onChange = {(e) => setFname(e.target.value)}
                        /><br></br><br></br>
                        <label>Middle Name:</label>
                        <input 
                            type="text"

                            value = {mname}
                            onChange = {(e) => setMname(e.target.value)}
                        /><br></br><br></br>
                        <label>Last Name:</label>
                        <input 
                            type="text"

                            value = {lname}
                            onChange = {(e) => setLname(e.target.value)}
                        /><br></br><br></br>
                        <label>Date of Birth:</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"
                            value = {dateOfBirth}
                            onChange = {(e) => setDateOfBirth(e.target.value)}
                        /><br></br><br></br>
                        <label>Personal Mail ID:</label>
                        <input 
                            type="text"

                            value = {personalEmailId}
                            onChange = {(e) => setPersonalEmailId(e.target.value)}
                        /><br></br><br></br>
                        <label>Contact No:</label>
                        <input 
                            type="text"

                            value = {contactNo}
                            onChange = {(e) => setContactNo(e.target.value)}
                        /> <br></br><br></br>
                        <label>Physical Address:</label>
                        <input 
                            type="text"

                            value = {physicalAddress}
                            onChange = {(e) => setPhysicalAddress(e.target.value)}
                        />
                        </div><br></br><br></br>
                        <button onClick={pushEdits}>Push Edits</button>
                </section>
        );
    }
    return (
        <section>
            <h1>Personal <button onClick={()=>{editEmployee()}}>Edit</button></h1>
            <div>
                <h4>First Name: {employee.fname}</h4>
                <h4>Middle Name: {employee.mname}</h4>
                <h4>Last Name: {employee.lname}</h4>
                <h4>Date of Birth: {employee.dateOfBirth}</h4>
                <h4>Personal Email ID: {employee.personalEmailId}</h4>
                <h4>Contact No: {employee.contactNo}</h4>
                <h4>Physical Address: {employee.physicalAddress}</h4>
            </div>
        </section>
    );
}

const EmploymentInfoSection = ({employee, id, getEmployee}) => {
    const[onboardingDate, setOnboardingDate] = useState(employee.onboardingDate);
    const[startDate, setStartDate] = useState(employee.startDate);
    const[employeeStatus, setEmployeeStatus] = useState(employee.employeeStatus);
    const[designation, setDesignaton] = useState(employee.designation);

    const [editing, setEditing] = useState(false);
    

    const editEmployee = () => {
        setEditing(true);
    }

    const stopEditingEmployee = () => {
        setEditing(false);
    }

    const pushEdits = async (e) => {

        e.preventDefault();
        
        const docRef = doc(db, 'employees', id);
        try{

        await updateDoc(docRef, {
            onboardingDate: onboardingDate,
            startDate: startDate,
            employeeStatus: employeeStatus, 
            designation: designation

            
            
            //documents: documents,
        }).then( ref => {
            //alert(employee.fname);
            
            console.log("employee updated");
            stopEditingEmployee();
            getEmployee();
        });
        } catch(err){
            console.log(err);
        }
    }

    if(editing){
        return (
            <section>
                    <h1>Employment <button onClick={()=>{stopEditingEmployee()}}>Cancel Editing</button></h1>
                        <div>
                        <label>Onboarding Date:</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"
                            value = {onboardingDate}
                            onChange = {(e) => setOnboardingDate(e.target.value)}
                        /><br></br><br></br>
                        <label>Start Date:</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"
                            value = {startDate}
                            onChange = {(e) => setStartDate(e.target.value)}
                        /><br></br><br></br>

                        <label>Employee Status Active:</label>
                        <input 
                            type="checkbox"
                            className="checkbox"
                            checked = {employeeStatus}
                            onChange = {(e) => setEmployeeStatus(e.target.checked)}
                        /><br></br><br></br>

                        <label>Designation:</label>
                        <input 
                            type="text"

                            value = {designation}
                            onChange = {(e) => setDesignaton(e.target.value)}
                        /><br></br><br></br>
                        </div>
                        
                    <button onClick={pushEdits}>Push Edits</button>
                </section>
        );
    }
    return (
        <section>
            <h1>Employment <button onClick={()=>{editEmployee()}}>Edit</button></h1>
            <div>
                <h4>Onboarding Date: {employee.onboardingDate}</h4>
                <h4>Start Date: {employee.startDate}</h4>
                <h4>Employee Status: {employee.employeeStatus ? 'active' : 'innactive'}</h4>
                <h4>Designation: {employee.designation}</h4>
            </div>
        </section>
    );
}
const AuthorizationInfoSection = ({employee, id, getEmployee}) => {
    const[workAuth, setWorkAuth] = useState(employee.workAuth);
    const[workAuthStartDate, setWorkAuthStartDate] = useState(employee.workAuthStartDate);
    const[workAuthExpiryDate, setWorkAuthExpiryDate] = useState(employee.workAuthExpiryDate);

    const [editing, setEditing] = useState(false);
    

    const editEmployee = () => {
        setEditing(true);
    }

    const stopEditingEmployee = () => {
        setEditing(false);
    }

    const pushEdits = async (e) => {

        e.preventDefault();
        
        const docRef = doc(db, 'employees', id);
        try{

        await updateDoc(docRef, {
            workAuth: workAuth,
            workAuthExpiryDate: workAuthExpiryDate,
            workAuthStartDate: workAuthStartDate, 

            
            
            //documents: documents,
        }).then( ref => {
            //alert(employee.fname);
            
            console.log("employee updated");
            stopEditingEmployee();
            getEmployee();
        });
        } catch(err){
            console.log(err);
        }
    }
    if(editing){
        return(
            <section>
                    <h1>Authorization <button onClick={()=>{stopEditingEmployee()}}>Cancel Editing</button></h1>
                        <div>
                        <label>Work Auth Type:</label>
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
                        </select><br></br><br></br>

                        <label>Work Auth Start Date:</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"

                            value = {workAuthStartDate}
                            onChange = {(e) => setWorkAuthStartDate(e.target.value)}
                        /><br></br><br></br>

                        <label>Work Auth Expiry Date:</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"

                            value = {workAuthExpiryDate}
                            onChange = {(e) => setWorkAuthExpiryDate(e.target.value)}
                        /><br></br><br></br>
                        </div>
                        <button onClick={pushEdits}>Push Edits</button>
                </section>
        );
    }
    return (
        <section>
            <h1>Authorization <button onClick={()=>{editEmployee()}}>Edit</button></h1>
            <div>
                <h4>Work Auth Type: {employee.workAuth}</h4>
                <h4>Work Auth Start Date: {employee.workAuthStartDate}</h4>
                <h4>Work Auth Expiry Date: {employee.workAuthExpiryDate}</h4>
            </div>
        </section>
    );
}

const DocumentInfoSection = ({employee, id, getEmployee}) => {
    const[passportNumber, setPassportNumber] = useState(employee.passportNumber);
    const[passportExpiry, setPassportExpiry] = useState(employee.passportExpiry);
    const[dlNumber, setDLNumber] = useState(employee.dlNumber);
    const[dlExpiry, setDLExpiry] = useState(employee.dlExpiry);
    const[stateID, setStateID] = useState(employee.stateID);
    const[stateIDExpiry, setStateIDExpiry] = useState(employee.stateIDExpiry);
    const[I94No, setI94No] = useState(employee.I94No);
    const[I94StartDate, setI94StartDate] = useState(employee.I94StartDate);
    const[I94ExpiryDate, setI94ExpiryDate] = useState(employee.I94ExpiryDate);
    const[I9, setI9] = useState(employee.I9);

    const [editing, setEditing] = useState(false);
    

    const editEmployee = () => {
        setEditing(true);
    }

    const stopEditingEmployee = () => {
        setEditing(false);
    }

    const pushEdits = async (e) => {

        e.preventDefault();
        
        const docRef = doc(db, 'employees', id);
        try{

        await updateDoc(docRef, {
            passportNumber:passportNumber,
            passportExpiry:passportExpiry,
            dlNumber:dlNumber,
            dlExpiry:dlExpiry,
            stateID:stateID,
            stateIDExpiry:stateIDExpiry,
            I94No:I94No,
            I94StartDate:I94StartDate,
            I94ExpiryDate:I94ExpiryDate,
            I9:I9,

            
            //documents: documents,
        }).then( ref => {
            //alert(employee.fname);
            
            console.log("employee updated");
            stopEditingEmployee();
            getEmployee();
        });
        } catch(err){
            console.log(err);
        }
    }
    if(editing){
        return(
            <section>
                    <h1>Document Info<button onClick={()=>{stopEditingEmployee()}}>Cancel Editing</button></h1>
                        <div>
                        <label>Passport No:</label>
                        <input 
                            type="text"

                            value = {passportNumber}
                            onChange = {(e) => setPassportNumber(e.target.value)}
                        /><br></br><br></br>

                        <label>Passport Expiry:</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"

                            value = {passportExpiry}
                            onChange = {(e) => setPassportExpiry(e.target.value)}
                        /><br></br><br></br>

                        <label>DL No:</label>
                        <input 
                            type="text"

                            value = {dlNumber}
                            onChange = {(e) => setDLNumber(e.target.value)}
                        /><br></br><br></br>

                        <label>DL Expiry:</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"

                            value = {dlExpiry}
                            onChange = {(e) => setDLExpiry(e.target.value)}
                        /><br></br><br></br>

                        <label>State ID:</label>
                        <input 
                            type="text"

                            value = {stateID}
                            onChange = {(e) => setStateID(e.target.value)}
                        /><br></br><br></br>

                        <label>State Id Expiry:</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"

                            value = {stateIDExpiry}
                            onChange = {(e) => setStateIDExpiry(e.target.value)}
                        /><br></br><br></br>

                        <label>I94 No:</label>
                        <input 
                            type="text"

                            value = {I94No}
                            onChange = {(e) => setI94No(e.target.value)}
                        /><br></br><br></br>

                        <label>I94 Start Date:</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"

                            value = {I94StartDate}
                            onChange = {(e) => setI94StartDate(e.target.value)}
                        /><br></br><br></br>

                        <label>I94 Expiry Date:</label>
                        <input 
                            type="text"
                            placeholder="DD/MM/YYYY"

                            value = {I94ExpiryDate}
                            onChange = {(e) => setI94ExpiryDate(e.target.value)}
                        /><br></br><br></br>

                        <label>I9:</label>
                        <input 
                            type="text"

                            value = {I9}
                            onChange = {(e) => setI9(e.target.value)}
                        /><br></br><br></br>
                        </div>
                        <button onClick={pushEdits}>Push Edits</button>
                </section>
        );
    }
    return (
        <section>
            <h1>Document Info <button onClick={()=>{editEmployee()}}>Edit</button></h1>
            <div>
                <h4>Passport No: {employee.passportNumber}</h4>
                <h4>Passport Expiry: {employee.passportExpiry}</h4>
                <h4>DL No: {employee.dlNumber}</h4>
                <h4>DL Expiry: {employee.dlExpiry}</h4>
                <h4>State ID: {employee.stateID}</h4>
                <h4>State ID Expiry: {employee.stateIDExpiry}</h4>
                <h4>I94 No: {employee.I94No}</h4>
                <h4>I94 Start Date: {employee.I94StartDate}</h4>
                <h4>I94 Expiry Date: {employee.I94ExpiryDate}</h4>
                <h4>I9: {employee.I9}</h4>
            </div>
        </section>
    );
}
const OtherInfoSection = ({employee, id, getEmployee}) => {
    const[eVerify, setEVerify] = useState(employee.eVerify);
    const[totalAmendments, setTotalAmendments] = useState(employee.totalAmendments);
    const[totalExtensions, setTotalExtensions] = useState(employee.totalExtensions);
    const[personalEmailId, setPersonalEmailId] = useState(employee.personalEmailId);
    const[payrollAddress, setPayrollAddress] = useState(employee.payrollAddress);
    const[payrollState, setPayrollState] = useState(employee.payrollState);
    const[physicalState, setPhysicalState] = useState(employee.physicalState);
    const[universityName, setUniversityName] = useState(employee.universityName);

    const [editing, setEditing] = useState(false);

    const editEmployee = () => {
        setEditing(true);
    }

    const stopEditingEmployee = () => {
        setEditing(false);
    }

    const pushEdits = async (e) => {
        e.preventDefault();
        const docRef = doc(db, 'employees', id);
        try{
        await updateDoc(docRef, {
            eVerify:eVerify,
            totalAmendments:totalAmendments,
            totalExtensions:totalExtensions,
            personalEmailId:personalEmailId,
            payrollAddress:payrollAddress,
            payrollState:payrollState,
            physicalState:physicalState,
            universityName:universityName,
            //documents: documents,
        }).then( ref => {
            //alert(employee.fname);
            console.log("employee updated");
            stopEditingEmployee();
            getEmployee();
        });
        } catch(err){
            console.log(err);
        }
        //history.push("/employee/" + id);
    }
    if(editing){
        return(
            <section>
                    <h1>Other Info <button onClick={()=>{stopEditingEmployee()}}>Cancel Editing</button></h1>
                        <div>
                        <label>E-Verify</label>
                        <input 
                            type="checkbox"
                            className="checkbox"
                            checked = {eVerify}
                            onChange = {(e) => setEVerify(e.target.checked)}
                        /><br></br><br></br>

                        <label>Total Amendments</label>
                        <input 
                            type="text"

                            value = {totalAmendments}
                            onChange = {(e) => setTotalAmendments(e.target.value)}
                        /><br></br><br></br>

                        <label>TotalExtensions</label>
                        <input 
                            type="text"

                            value = {totalExtensions}
                            onChange = {(e) => setTotalExtensions(e.target.value)}
                        /><br></br><br></br>


                        <label>Payroll Address</label>
                        <input 
                            type="text"

                            value = {payrollAddress}
                            onChange = {(e) => setPayrollAddress(e.target.value)}
                        /><br></br><br></br>

                        <label>Payroll State</label>
                        <input 
                            type="text"

                            value = {payrollState}
                            onChange = {(e) => setPayrollState(e.target.value)}
                        /><br></br><br></br>



                        <label>Physical State</label>
                        <input 
                            type="text"

                            value = {physicalState}
                            onChange = {(e) => setPhysicalState(e.target.value)}
                        /><br></br><br></br>
                        <label>University Name</label>
                        <input 
                            type="text"

                            value = {universityName}
                            onChange = {(e) => setUniversityName(e.target.value)}
                        /><br></br><br></br>
                        </div>
                        <button onClick={pushEdits}>Push Edits</button>
                </section>
        );
    }
    return (
        <section>
            <h1>Other Info <button onClick={()=>{editEmployee()}}>Edit</button></h1>
            <div>
                    <h4>E-Verify: {employee.eVerify ? 'yes' : 'no'}</h4>
                    <h4>Total Amendments: {employee.totalAmendments}</h4>
                    <h4>Total Extensions: {employee.totalExtensions}</h4>

                    <h4>Payroll Address: {employee.payrollAddress}</h4>
                    <h4>Payroll State: {employee.payrollState}</h4>

                    <h4>Physical State: {employee.physicalState}</h4>
                    <h4>University Name: {employee.universityName}</h4>
            </div>
        </section>
    );
}

const DocumentsSection = ({employee, id, getEmployee}) => {
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const[documents] = useState(employee.documents);
    const[fileTitle, setFileTitle] = useState('');
    const[file, setFile] = useState(null);
    const[documentFiles, setDocumentFiles] = useState(null);
    const [documentList, setDocumentList] = useState([]);
    const docRef = doc(db, 'employees', id);
    
    useEffect(()=>{
        setDocumentFiles(fillDocumentFiles(documents.length));
        console.warn('ui updating');
        loadDocuments(employee);

    },[]);

    const fillDocumentFiles = (num) => {
        let arr = [];
        for(let i = 0; i < num/2; i++){
            arr.push("");
        }
        return arr;
    }
    const addDocument = (e) => {
        e.preventDefault();
        documents.push(fileTitle, v4());
        documentFiles.push(file);
        setFileTitle('');
        setFile(null);
    }
    const loadDocuments = async (employee) => {
        console.warn(employee.documents);
        let documents = employee.documents;
        setDocumentList([]);
        for(let i = 0; i < documents.length; i += 2){
            try{
            const fileRef = ref(storage, `documents/${id}/${documents[(i+1)]}`);
            
            getDownloadURL(fileRef).then(result => {
                    setDocumentList(old => [...old, [documents[i],result]]);
                
            });
            } catch (err){
                console.log(err);
            }
        }
    }
    const uploadFiles = async (docID) =>{
        try{
            //alert(documentFiles.length);
            if(documentFiles.length ==0 ){
                return;
            }
        if(documentFiles.length > 0 && documentFiles[documentFiles.length-1] == ""){
            await updateDoc(docRef, {

                documents: documents,
            }).then(async (ref) => {

                await getDoc(docRef).then((dd) => {
                    console.log(dd.data());
                    loadDocuments(dd.data());
                });


                setDocumentFiles(fillDocumentFiles(documents.length));
                stopEditingEmployee();  
                getEmployee();
                return;
                //alert('setting');
            });
        };
        for(let i = 0; i < documentFiles.length; i+=1){
            const fileRef = ref(storage, `documents/${docID}/${documents[(i*2)+1]}`);
            if(documentFiles[i] != ""){
            console.warn('file uploading');
            await uploadBytes(fileRef, documentFiles[i]).then( async () => {
                try{
                if(i == (documentFiles.length - 1)){
                console.warn('fileuploaded');
                await updateDoc(docRef, {

                    documents: documents,
                }).then(async (ref) => {
    
                    await getDoc(docRef).then((dd) => {
                        console.log(dd.data());
                        loadDocuments(dd.data());
                    });
                    setFile(null);
                    setFileTitle('');
    
                    setDocumentFiles(fillDocumentFiles(documents.length));
                    stopEditingEmployee();  
                    getEmployee();

                    //alert('setting');
                });
            }
            } catch(err){
                console.log(err);
            }
            })
            }
        } 
        } catch(err){
            console.log(err);
        }
        return 'uploadeddocs';

    } 
    const pushEdits = async (e) => {
        e.preventDefault();
        
        
        try{
        await uploadFiles(id).then( msg=> {
            //alert(employee.documents);

            
        });
        } catch(err){
            console.log(err);
        }
        //history.push("/employee/" + id);
    }

    const deleteDocument = (name) => {
        let num = null;
        for(let i = 0; i < documents.length; i+=1){
            if(documents[i] == name){
                num = i;
            }
        }
        documents.splice(num,2);
        //loadDocuments();
        alert(name + " deleted");

    }
    const deletingDocs = () => {
        setEditing(false);
        setDeleting(true);
        
    }
    const editEmployee = () => {
        setDeleting(false);
        setEditing(true);
    }

    const stopEditingEmployee = () => {
        setEditing(false);
    }
    const stopDeletingDocs = () => {
        setDeleting(false);
    }

    if(deleting){
        return(<section>
            <h1>Documents <button onClick={()=> {stopDeletingDocs()}}>Cancel Removing</button></h1>
                    <div>
                    {documentList.map((document, index) => (
                        <div>
                            <a href={document[1]}>{document[0]}</a> <button onClick={()=>{deleteDocument(document[0])}}>Delete</button>
                        </div>
                    ))}
                    </div>
                    
                    <button onClick={pushEdits}>Push Edits</button>
            </section>

        );
    }
    if(editing){
        return(<section>
        <h1>Documents <button onClick={()=> {stopEditingEmployee()}}>Cancel Adding</button></h1>
                <div>
                {documentList.map((document, index) => (
                    <div>
                        <a href={document[1]}>{document[0]}</a>
                    </div>
                ))}
                </div>
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
                <button onClick={pushEdits}>Push Edits</button>
        </section>
        )
    }

    return (
        <section>
            <h1>Documents <button onClick={()=> {editEmployee()}}>Add</button><button onClick={()=> {deletingDocs()}}>Remove</button></h1>
                    <div>
                    {documentList.map((document) => (
                        <div>
                            <a href={document[1]}>{document[0]}</a>          
                        </div>
                    ))}
                    </div>
        </section>
    );
}

const ActionsSection = ({employee, id, getEmployee}) => {
    const[fname, setFname] = useState(employee.fname);
    const[mname, setMname] = useState(employee.mname);
    const[lname, setLname] = useState(employee.lname);
    const[onboardingDate, setOnboardingDate] = useState(employee.onboardingDate);
    const[startDate, setStartDate] = useState(employee.startDate);
    const[employeeStatus, setEmployeeStatus] = useState(employee.employeeStatus);
    const[designation, setDesignaton] = useState(employee.designation);
    const[workAuth, setWorkAuth] = useState(employee.workAuth);
    const[workAuthStartDate, setWorkAuthStartDate] = useState(employee.workAuthStartDate);
    const[workAuthExpiryDate, setWorkAuthExpiryDate] = useState(employee.workAuthExpiryDate);
    const[dateOfBirth, setDateOfBirth] = useState(employee.dateOfBirth);
    const[passportNumber, setPassportNumber] = useState(employee.passportNumber);
    const[passportExpiry, setPassportExpiry] = useState(employee.passportExpiry);
    const[dlNumber, setDLNumber] = useState(employee.dlNumber);
    const[dlExpiry, setDLExpiry] = useState(employee.dlExpiry);
    const[stateID, setStateID] = useState(employee.stateID);
    const[stateIDExpiry, setStateIDExpiry] = useState(employee.stateIDExpiry);
    const[I94No, setI94No] = useState(employee.I94No);
    const[I94StartDate, setI94StartDate] = useState(employee.I94StartDate);
    const[I94ExpiryDate, setI94ExpiryDate] = useState(employee.I94ExpiryDate);
    const[I9, setI9] = useState(employee.I9);
    const[eVerify, setEVerify] = useState(employee.eVerify);
    const[totalAmendments, setTotalAmendments] = useState(employee.totalAmendments);
    const[totalExtensions, setTotalExtensions] = useState(employee.totalExtensions);
    const[personalEmailId, setPersonalEmailId] = useState(employee.personalEmailId);
    const[payrollAddress, setPayrollAddress] = useState(employee.payrollAddress);
    const[payrollState, setPayrollState] = useState(employee.payrollState);
    const[physicalAddress, setPhysicalAddress] = useState(employee.physicalAddress);
    const[physicalState, setPhysicalState] = useState(employee.physicalState);
    const[universityName, setUniversityName] = useState(employee.universityName);
    const[contactNo, setContactNo] = useState(employee.contactNo);

    const history = useHistory();
    const [editing, setEditing] = useState(false);
    const deleteEmployee = async (id) => {
        const employeeDoc = doc(db,"employees", id);
        await deleteDoc(employeeDoc);
        //getEmployeeList();
        history.push("/employeedeleted");
        
    }
    const editEmployee = () => {
        setEditing(true);
    }

    const stopEditingEmployee = () => {
        setEditing(false);
    }

    const pushEdits = async (e) => {
        e.preventDefault();
        const docRef = doc(db, 'employees', id);
        try{
        await updateDoc(docRef, {
            fname: fname,
            mname:mname,
            lname: lname, 
            onboardingDate: onboardingDate,
            startDate: startDate,
            employeeStatus: employeeStatus,
            designation: designation,
            workAuth: workAuth, 
            workAuthStartDate: workAuthStartDate,
            workAuthExpiryDate: workAuthExpiryDate,
            dateOfBirth: dateOfBirth,
            passportNumber: passportNumber,
            passportExpiry: passportExpiry,
            dlNumber: dlNumber,
            dlExpiry: dlExpiry,
            stateID: stateID,
            stateIDExpiry: stateIDExpiry,
            I94No: I94No,
            I94StartDate: I94StartDate,
            I94ExpiryDate: I94ExpiryDate,
            I9: I9,
            eVerify: eVerify,
            totalAmendments: totalAmendments,
            totalExtensions: totalExtensions,
            personalEmailId: personalEmailId,
            payrollAddress: payrollAddress,
            physicalAddress: physicalAddress,
            physicalState: physicalState,
            universityName: universityName,
            contactNo: contactNo, 
            //documents: documents,
        }).then( ref => {
            //alert(employee.fname);
            console.log("employee updated");
            stopEditingEmployee();
            getEmployee();
        });
        } catch(err){
            console.log(err);
        }
        //history.push("/employee/" + id);
    }

    if(editing){
        return (
            <section>
            <h1>Actions</h1>
                    <div>
                        <button onClick={() => {stopEditingEmployee()}}>Cancel Editing</button>
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

                <button onClick={ pushEdits}>Push Edits</button>
            </form>
                    </div>
            </section>
        );
    }

    return (
        <section>
            <h1>Actions</h1>
                    <div>
                    <button onClick={() => {editEmployee()}}>Edit Employee</button>
                    <button onClick={() => {deleteEmployee(id)}} style={{backgroundColor: "red"}}>Delete Employee</button>
                    </div>
        </section>
    );
}
export default Employee;