import { Link, useNavigate } from "react-router-dom";

import * as authService from '../../../services/authService.js';

const Register = ({
    onRegister
}) => {
    const navigate = useNavigate();

    const onSubmitFormHandler = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let firstName = formData.get('firstName');
        let lastName = formData.get('lastName');
        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPassword = formData.get('repeatPassword');

        let user = {
            firstName,
            lastName,
            email,
            password,
        };

        if(password === repeatPassword) {
            try {
                let response = await authService.register(user);
                console.log('response:', response)

                localStorage.setItem('userId', response._id);
                localStorage.setItem('firstName', response.firstName)
                localStorage.setItem('email', response.email);
                localStorage.setItem('AUTH_TOKEN', response.AUTH_TOKEN);

                await onRegister(response.email);

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
