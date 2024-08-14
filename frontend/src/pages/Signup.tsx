import { Quote } from "../components/QuoteComponent"
import { SignupComponent } from "../components/SignupComponent"

export const Signup = () => {
    return <div className="columns-1 lg:columns-2">
        <SignupComponent />
                <Quote/>
    </div>
}