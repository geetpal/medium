import { AppBar } from "../components/AppBar"
import { PublishComponent } from "../components/PublishComponent"

export const Publish =() => {
    return (
            <div>
                <AppBar/>
                <div className="flex flex-col items-center px-20 py-12 h-screen">
                        <PublishComponent />
                </div>
                
            </div>
    )
}