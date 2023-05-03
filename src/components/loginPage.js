import {React,useState} from "react"
import { auth } from '../Firebase';
import {toast} from "react-toastify"
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,

} from 'firebase/auth';
import {HiOutlineMail} from "react-icons/hi"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import {BiUser} from "react-icons/bi"

export default function App(props){
   
    const [login,setLogin] = useState(true);
    const [isAdmin,setIsAdmin] = useState(false);
    const [secretKey,setSecretKey] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showSecretKey, setShowSecretKey] = useState(false);

    const [signinData, setSigninData] = useState({
        email: "",
        password: "",
    })
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleCheckboxChange = (event) => {
        setIsAdmin(event.target.checked);
    }

    

    function handleFormChange(event) {
        if (login) {
            setSigninData(prev => {
                return {
                    ...prev,
                    [event.target.name]: event.target.value
                }
            })
        }
        else {
            setRegisterData(prev => {
                return {
                    ...prev,
                    [event.target.name]: event.target.value
                }
            })
        }

    }

    async function signinUser(){
        try
        {const userCredential = await signInWithEmailAndPassword(
            auth,
            signinData.email,
            signinData.password
        )

        if(userCredential.user){
            if(isAdmin){
                if(secretKey === "jelabiBugs"){
                    toast.success("You are successfully signed in as Admin!");
                    props.handleSignin(isAdmin);
                }
                else{
                    toast.error("Bad Admin Credential")
                    return;
                }
                
            }
            else{
                toast.success("You are successfully signed in!");
                props.handleSignin(isAdmin);
            }
        }
        else{
            toast.error("Bad User Credential")
        }}
        catch(error){
            let message = (error.message.split('/')[1]);
            if(message === 'wrong-password).'){
                toast.error('Incorrect Password. Try Again')
            }
            else if(message === 'user-not-found).'){
                toast.error("User Not Found")
            }
            else if(message === "network-request-failed)."){
                toast.error("Network Error")
            }
            else{
                toast.error("Something went wrong")
            }
        }
    }

    async function registerUser(){
        try{
    
            await createUserWithEmailAndPassword(
                auth,
                registerData.email,
                registerData.password
            );
    
            updateProfile(auth.currentUser, {
                displayName:registerData.name
            })
    
            toast.success("You are Successfully Registered as Admin!")
            toast.info("It is important to enter secret key to login as Admin")
            setLogin(true);
        }
        catch(error){
            console.log(error)
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="LoginPage">
            
            <div className = "container">
                <h1>Podify</h1>
                <h2>Discover Hidden Gems and Classic Favorites in Our Vast Podcast Library.</h2>
                <img className="podcast-img" src={require("./podcast.jpg")} alt="" />
            </div>

            <div className = "form-container">

                <div className="positions">
                    <span className={login? "active" : ""} onClick={() => {setLogin(true);registerData.email='';registerData.name='';registerData.password='';setSecretKey('')}}>SIGN IN</span>
                    <span className={!login? "active" : ""}  onClick={() => {setLogin(false);signinData.email='';signinData.password='';setSecretKey('')}}>SIGN UP</span>
                </div>           

                {login && <div className="inputs">
                    <div className="email">
                        <HiOutlineMail size={20} className="icon"/>
                        <input onChange= {handleFormChange} value={signinData.email} type="email" name = "email" placeholder="Email"/>
                    </div>
                    <div className="password">

                        <input onChange= {handleFormChange} value={signinData.password} type={showPassword? "text" : "password"}  name = "password" placeholder="Password"/>
                        {
                            !showPassword &&
                            <AiFillEye
                            size={20}
                            className={!showPassword && 'password-icon'}
                            onClick={() => setShowPassword(prev => !prev)}
                            />
                        }
                        {
                            showPassword &&
                            <AiFillEyeInvisible
                            size={20}
                            className={'password-icon'}
                            onClick={() => setShowPassword(prev => !prev)}
                        />}
                    </div>
                    
                    <div>
                    {isAdmin && <div className="password">

                        <input onChange= {(e) => setSecretKey(e.target.value)} value={secretKey} type={showSecretKey? "text" : "password"}  name = "password" placeholder="Secret Key"/>
                        {
                            !showSecretKey &&
                            <AiFillEye
                            size={20}
                            className={!showSecretKey && 'password-icon'}
                            onClick={() => setShowSecretKey(prev => !prev)}
                            />
                        }
                        {
                            showSecretKey &&
                            <AiFillEyeInvisible
                            size={20}
                            className={'password-icon'}
                            onClick={() => setShowSecretKey(prev => !prev)}
                        />}
                        </div>}


                    <div className = "inner-inp">
                    
                        <input className="checkbox" checked={isAdmin} onChange={handleCheckboxChange} type="checkbox" name="isAdmin" id="" />
                        <label htmlFor="isAdmin">Admin</label>
                        <span className="forgot-pass">Forgot Passowrd?</span>
                    </div>
                    </div>
                    <button onClick={signinUser}>SIGN IN</button>
                    </div> 
                }              



                {!login && <div className="inputs">
                    <div className="name">
                        <input onChange= {handleFormChange} value={registerData.name} type="name" name = "name" placeholder="Name"></input>
                        <BiUser size={20} className="icon"/>
                    </div>

                    <div className="email">
                        <HiOutlineMail size={20} className="icon"/>
                        <input onChange= {handleFormChange} value={registerData.email} type="email" name = "email" placeholder="Email"/>
                    </div>
                    <div className="password">

                        <div className="password">

                        <input onChange= {handleFormChange} value={registerData.password} type={showPassword? "text" : "password"} name = "password" placeholder="Password"/>
                        {
                            !showPassword &&
                            <AiFillEye
                            size={20}
                            className={!showPassword && 'password-icon'}
                            onClick={() => setShowPassword(prev => !prev)}
                            />
                        }
                        {
                            showPassword &&
                            <AiFillEyeInvisible
                            size={20}
                            className={'password-icon'}
                            onClick={() => setShowPassword(prev => !prev)}
                        />}
                    </div>
                        {
                            !showPassword &&
                            <AiFillEye
                            size={20}
                            className={!showPassword && 'password-icon'}
                            onClick={() => setShowPassword(prev => !prev)}
                            />
                        }
                        {
                            showPassword &&
                            <AiFillEyeInvisible
                            size={20}
                            className={'password-icon'}
                            onClick={() => setShowPassword(prev => !prev)}
                        />}
                    </div>
                    <button onClick={registerUser}>SIGN UP</button>
                </div> 
                }
            </div>
        </div>
    )
}