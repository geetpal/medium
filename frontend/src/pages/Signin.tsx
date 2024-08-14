import { Quote } from "../components/QuoteComponent"
import { SigninComponent } from "../components/SigninComponent"

export const Signin = () => {
    return <div className="columns-1 lg:columns-2">
                <SigninComponent/>
                <Quote/>
            </div>
}