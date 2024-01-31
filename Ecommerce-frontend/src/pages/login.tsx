import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import  { useState } from 'react'
import toast from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc"
import { auth } from '../firebase';

const Login = () => {

    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");

    //LOGIN HANDLER FUNCTION
    const loginHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);

        } catch (error) {
            //imported in app.js so that it can be used anywhere in project
            toast.error("Sign-in Failed")
        }
    }

    return (
        <div className='login'>
            <main>
                <h1 className='heading'>Login</h1>
                <div>
                    <label>Gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}>
                        <option value="">Choose Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div>
                    <label>Date of birth</label>
                    <input type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)} />
                </div>
                <div>
                    <p>Already signed in once</p>
                    <button onClick={loginHandler}>
                        <FcGoogle /> <span>Sign in with Google</span>
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Login