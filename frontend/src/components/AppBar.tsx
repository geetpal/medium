import { useNavigate } from "react-router-dom"
import { Avatar } from "./atoms/Avatar"
import { Button } from "./atoms/Button"



export const AppBar = () => {
    const navigate = useNavigate();
    return (
        <div className="px-16 py-4 bg-slate-200">
            <div className="flex  items-center justify-between">
                <div>
                    <div className="font-black text-2xl">SIRIUS</div>
                </div>
                <div>
                    <div className="flex items-center space-x-4">
                        <div>
                                <Button 
                                label="Create new" 
                                onClick={() => {navigate("/publish");}} 
                                className="rounded-full bg-orange-500 px-3 py-1.5 me-0 mb-0 hover:bg-orange-600 focus:outline-none focus:ring-offset-2 focus:ring-4 focus:ring-orange-300" />
                        </div>
                        <div>
                                <Avatar name="Geetpal" size="big"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            )
}