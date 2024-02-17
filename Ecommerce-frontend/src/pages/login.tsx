import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc"
import { auth } from '../firebase';
import { useLoginMutation } from '../redux/api/userAPI';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { MessageResponse } from '../types/api-types';

const Login = () => {

    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");

    const [login] = useLoginMutation();

    //LOGIN HANDLER FUNCTION
    const loginHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);

            //using login reducer to call backend function
            const res = await login({
                name: user.displayName!,
                email: user.email!,
                role: "user",
                photo: user.photoURL!,
                gender,
                dob: dob,
                _id: user.uid
            });

            if ("data" in res) {
                //already defined response will be of type  MessageResponse in userApi.ts file
                toast.success(res.data.message)
            }
            else {
                const error = res.error as FetchBaseQueryError;
                const message = (error.data as MessageResponse).message; //MessageResponse returns message and success
                toast.error(message);
            }

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