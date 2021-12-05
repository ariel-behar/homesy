import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../../contexts/AuthContext.js";
import ErrorContext from '../../../contexts/ErrorContext.js';
import * as authService from '../../../services/authService.js';

const Register = () => {
    const { login } = useAuth();
    const { displayError } = useContext(ErrorContext);
    const navigate = useNavigate();

    const onSubmitFormHandler = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let firstName = formData.get('firstName');
        let lastName = formData.get('lastName');
        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPassword = formData.get('repeatPassword');

        let userObj = {
            firstName,
            lastName,
            email,
            password,
        };

        if(password === repeatPassword) {
            try {
                let userResponse = await authService.register(userObj);
                console.log('userResponse:', userResponse)

                // localStorage.setItem('userId', userResponse.userId);
                // localStorage.setItem('firstName', userResponse.firstName)
                // localStorage.setItem('email', userResponse.email);
                // localStorage.setItem('AUTH_TOKEN', userResponse.AUTH_TOKEN);

                // login({
                //     userId: userResponse.userId,
                //     firstName: userResponse.firstName,
                //     email: userResponse.email,
                //     AUTH_TOKEN: userResponse.AUTH_TOKEN,
                // });

                // navigate('/');
            } catch (error) {
                console.log(await error)
                displayError(await error)
            }
        } else {
            let error = {
                message: 'Password and repeat password must match'
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
