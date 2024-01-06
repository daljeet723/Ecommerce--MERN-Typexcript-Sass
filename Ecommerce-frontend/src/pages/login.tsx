import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc"

const Login = () => {

    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("")
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
                    <button>
                        <FcGoogle /> <span>Sign in with Google</span>
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Login