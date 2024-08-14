import { useState } from "react"
import { Button } from "./atoms/Button"
import { InputField } from "./atoms/Input"
import { Link } from "react-router-dom"
import { SignupInput } from "@geetpalsingh/medium3-common"
import axios from "axios"
import { BACKEND_URL } from "../config"

import { useNavigate } from "react-router-dom"


export const SignupComponent = () => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        password:"",
        name:""
    })

    
    const navigate = useNavigate();
    const SendNewUserCredentials = async () => {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
        
            const jwt = response.data;
            localStorage.setItem("token", jwt.token)
            navigate("/blogs");
            }
        catch(e){
            return console.log(e + "Error during signup request")
        }

    }


    return <div className="flex flex-col justify-center items-center p-24 w-full h-screen space-y-4">
        <div className="flex flex-col justify-center items-center space-y-2">
            <div className="font-bold text-4xl">Create an account</div>
            <div className="flex space-x-1 text-slate-400">
                <div>Already have an account?</div>
                <Link to={"/signin"}>
                    <div className="underline">Login</div>
                </Link>
                
            </div>
        </div>
                <div className="flex flex-col w-7/12 items-center space-y-4 ">

                    <InputField 
                                isRequired = {false}
                                label="Name" 
                                placeholder="Enter your name" 
                                onChange={(e)=> {
                                            setPostInputs({
                                                ...postInputs,
                                                name: e.target.value
                                            })
                    }}/>
                    <InputField 
                                isRequired = {true}
                                label="Email" 
                                placeholder="abc@xyz.com" 
                                type="email" 
                                onChange={(e)=> {
                                    setPostInputs({
                                        ...postInputs,
                                        email: e.target.value
                                    });
                    }}/>
                    <InputField 
                                isRequired={true}
                                label="Password" 
                                type="password" 
                                onChange={(e)=> {
                                    setPostInputs({
                                        ...postInputs,
                                        password: e.target.value
                                    })
            }}/>
                    <Button label="Sign up" onClick={SendNewUserCredentials} className="w-full"/>
                </div> 
            </div>
}