import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";


export interface Blog {
    "id": Number,
    "title": string,
    "content": string,
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id: Number }) => {

    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog>();


    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            setBlog(response.data);
            setLoading(false)
        })

    }, [id])

    return {
        loading,
        blog
    }

}



//useBlogs is a hook to fetch all the blogs
export const useBlogs = () => {

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            setBlogs(response.data);
            setLoading(false);
        })
    }, [])

    return {
        loading,
        blogs
    }
}