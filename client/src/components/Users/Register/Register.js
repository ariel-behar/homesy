import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import {AuthContext} from "../../../contexts/AuthContext.js";
import * as authService from '../../../services/authService.js';

const Register = () => {
    let { login } = useContext(AuthContext)
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

                localStorage.setItem('userId', userResponse._id);
                localStorage.setItem('firstName', userResponse.firstName)
                localStorage.setItem('email', userResponse.email);
                localStorage.setItem('AUTH_TOKEN', userResponse.AUTH_TOKEN);

                login({
                    userId: userResponse._id,
                    firstName: userResponse.firstName,
                    email: userResponse.email,
                    AUTH_TOKEN: userResponse.AUTH_TOKEN,
                });

                navigate('/');
            } catch (error) {
                console.error(error)
            }
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
