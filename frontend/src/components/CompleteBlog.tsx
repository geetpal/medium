import { Blog } from "../hooks"
import { Avatar } from "./atoms/Avatar"


export const CompleteBlog = ({blog} : {blog: Blog}) => {
     return <div className="pt-24 ">
                <div className="flex w-11/12 max-w-screen-lg mx-auto space-x-4">
                    <div className="w-9/12 space-y-4">
                        <div className="space-y-2">
                            <div className="text-4xl font-bold">{blog.title}</div>
                            <div className="text-sm text-slate-500">Posted on</div>
                        </div>
                        <div className="text-base">
                            {blog.content}
                        </div>
                    </div>
                    <div className="w-3/12 space-y-2"> 
                        <div className="text-sm">Author</div>
                        <div className="flex items-center space-x-2">
                            <div><Avatar name="Geetpal" size="small"/></div>
                            <div>
                                <div className="text-base font-bold">{blog.author.name}  </div>
                                <div className="text-base">Author Introduction</div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
}