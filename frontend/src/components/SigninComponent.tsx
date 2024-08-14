import { useState } from "react"
import { Button } from "./atoms/Button"
import { InputField } from "./atoms/Input"
import { Link } from "react-router-dom"
import { SigninInput } from "@geetpalsingh/medium3-common"
import { BACKEND_URL } from "../config"

import axios from "axios"
import { useNavigate } from "react-router-dom"

export const SigninComponent = () => {

    const [signinInputs, setsigninInputs] = useState<SigninInput>({
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    const  sendLoginCredentials = async() => {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signinInputs);
                const jwt = response.data;
                localStorage.setItem("token", jwt.token)
                navigate("/blogs");
            } catch (e){
                console.log(e + "Error during signin request")
                return;
            }
    }



    return <div className="flex flex-col justify-center items-center p-24 w-full h-screen space-y-4">
                <div className="flex flex-col justify-center items-center space-y-2">
                    <div className="font-bold text-4xl">Login</div>
                    <div className="flex space-x-1 text-slate-400">
                        <div>Don't have an account?</div>
                        <Link to={"/signup"}>
                            <div className="underline">Sign up</div>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col w-7/12 items-center space-y-4 ">
                    <InputField 
                                isRequired={false}
                                label="Username" 
                                placeholder="Enter your username" 
                    />
                    <InputField 
                                isRequired={true}
                                label="Email" 
                                placeholder="abc@xyz.com" 
                                type="email"
                                onChange={(e)=> {
                                    setsigninInputs({
                                        ...signinInputs,
                                        email: e.target.value
                                    })
                                }}
                                />
                    <InputField 
                                isRequired={true}
                                label="Password" 
                                type="password" 
                                onChange={(e)=> {
                                    setsigninInputs({
                                        ...signinInputs,
                                        password: e.target.value
                                    })
                                }}
                                
                    />
                    <Button 
                                label="Sign in"             
                                className="w-full"
                                onClick={sendLoginCredentials}
                    />
                </div> 
            </div>
}