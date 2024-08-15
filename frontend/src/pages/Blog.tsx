import { useParams } from "react-router-dom"
import { CompleteBlog } from "../components/CompleteBlog"
import { useBlog } from "../hooks"
import { AppBar } from "../components/AppBar"



export const Blog = () => {
    const {id} = useParams()
    const {loading, blog}= useBlog({
        id: Number(id)
    });

    if(loading || !blog){
        return <div>loading...</div>
    }
    
    
        return <div>
                    <AppBar/>
                    <CompleteBlog blog={blog}/>
                </div>

        

    
}