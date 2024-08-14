import { useState } from "react"
import { Button } from "./atoms/Button"
import { CreatePostInput } from "@geetpalsingh/medium3-common"
import { BACKEND_URL } from "../config"

import axios from "axios"
import { useNavigate } from "react-router-dom"

export const PublishComponent = () => {

    const [postInput,setPostInput] = useState<CreatePostInput>({
        title: "",
        content: ""
    })

    const navigate = useNavigate();
const PublishBlog =async () => {
    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,postInput, {
                                                headers: {
                                                    Authorization: localStorage.getItem("token")
                                                }})

    navigate(`/blog/${response.data.id}`);
}


    return (
        
            <div className=" space-y-4 w-8/12 h-3/6">

                <div >
                        <input  type="text"
                                placeholder="Title" 
                                id="large-input" 
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-3xl font-bold focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e)=> {
                                    setPostInput({
                                        ...postInput,
                                        title: e.target.value
                                    })
                                }}
                        />
                </div>
                <div className="h-full ">
                    <textarea 
                    id="message" 
                    className="p-2.5 w-full h-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " 
                    placeholder="Tell your story..."
                    onChange={(e)=> {
                        setPostInput({
                            ...postInput,
                            content: e.target.value
                        })
                    }}
                    >
                    </textarea>
                </div>
                <div>
                    <Button label="Publish" type="submit" onClick={PublishBlog} 
                    className="bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"/>
                </div>
            </div>

    )
}