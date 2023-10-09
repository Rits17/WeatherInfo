import { render,screen } from "@testing-library/react"
import Register from "./Register"
describe("Register Renders Correctly",()=>{
    test("renders correctly",()=>{
        render(<Register />);
        const emailElement=screen.getByLabelText('Email');
        expect(emailElement).toBeInTheDocument();
        const passwordElement=screen.getByLabelText('Password');
        expect(passwordElement).toBeInTheDocument();
        const confirmPasswordElement=screen.getByLabelText('Confirm Password');
        expect(confirmPasswordElement).toBeInTheDocument();

    })
})