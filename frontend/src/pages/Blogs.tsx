import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";


export const Blogs = () => {

    const {loading, blogs} = useBlogs();

    
if(loading){
    return <div>
        <AppBar/>
            <div>
                loading..
            </div>
        </div>
}



    return  <div>
                <div>
                        <AppBar/>
                </div>
                <div className="flex  flex-col w-full items-center">
                    {blogs.map((blog, id)=> 
                        <BlogCard
                                key={id}
                                id={blog.id}
                                authorName={blog.author.name || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                                publishedDate="Dec 3, 2023" 
                        />
                        )}          
                </div>
            </div>
}