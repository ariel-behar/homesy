import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../../contexts/AuthContext.js";
import { useErrorContext } from '../../../contexts/ErrorContext.js';
import * as authService from '../../../services/authService.js';

const Register = () => {
    const { login } = useAuthContext();
    const { displayError } = useErrorContext();
    const navigate = useNavigate();

    const onSubmitFormHandler = async (e) => {
        e.preventDefault();

        let { firstName , lastName, email, password, repeatPassword} = Object.fromEntries(new FormData(e.currentTarget));

        let userObj = {
            firstName,
            lastName,
            email,
            password,
        };

        if(password === repeatPassword) {
            try {
                let userResponse = await authService.register(userObj);

                localStorage.setItem('userId', userResponse.userId);
                localStorage.setItem('firstName', userResponse.firstName)
                localStorage.setItem('email', userResponse.email);
                localStorage.setItem('AUTH_TOKEN', userResponse.AUTH_TOKEN);

                login({
                    userId: userResponse.userId,
                    firstName: userResponse.firstName,
                    email: userResponse.email,
                    AUTH_TOKEN: userResponse.AUTH_TOKEN,
                });

                navigate('/');
            } catch (error) {
                displayError(await error)
            }
        } else {
            let error = {
                message: 'Password and Repeat Password must match'
            }
            displayError(error);
        }
    }

    return (
        <div>
            <h3>Register</h3>
            <form method="POST" onSubmit={onSubmitFormHandler}>
                <input type="text" name="firstName" placeholder="First Name" required />
                <input type="text" name="lastName" placeholder="Last Name" required />

                <input type="text" name="email" placeholder="Email" required />

                <input type="password" name="password" placeholder="Password" required />
                <input type="password" name="repeatPassword" placeholder="Repeat password" required />
                <input type="submit" />
            </form>

            <p>
                Already have an account? <Link to="/login">Log in here</Link>
            </p>
        </div>
    );
};

export default Register;
