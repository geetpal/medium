import { Link } from "react-router-dom"
import { Avatar } from "./atoms/Avatar"

interface BlogCardProps {
    id: Number,
    authorName: string
    title: string,
    content: string,
    publishedDate: string
}


export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) =>{
    return  <Link to={`/blog/${id}`} className="w-5/12">
                <div className="border-b-2 py-4 space-y-4">
                    <div className="flex items-center space-x-2">
                        <div><Avatar name={authorName} size="small"/></div>
                        <div className="text-sm align-baseline">{authorName}</div>
                        <div className="text-xs align-baseline text-slate-500">{publishedDate}</div>
                    </div>
                    <div className="space-y-2">
                        <div className="font-bold text-xl">{title}</div>
                        <div className="text-base">{content.length>100 ? content.slice(0,100)+ "...": content}</div>
                    </div>
                    <div className="text-xs text-slate-500">{`${Math.ceil(content.length/100)} min read`}</div>
                    
                </div>
            </Link>
}