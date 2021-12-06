import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react'

import { useAuth } from '../../../contexts/AuthContext.js';
import * as authService from '../../../services/authService.js';
import ErrorContext from '../../../contexts/ErrorContext.js';

const Login = () => {
    const { login } = useAuth();
    const { displayError } = useContext(ErrorContext);

    const navigate = useNavigate();

    const onSubmitFormHandler = async (e) => {
        e.preventDefault();

        let { email, password} = Object.fromEntries(new FormData(e.currentTarget));

        let userObj = {
            email,
            password,
        };

        try {
            let userResponse = await authService.login(userObj);

            localStorage.setItem('userId', userResponse.userId);
            localStorage.setItem('firstName', userResponse.firstName);
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
            console.log(await error)
            displayError(await error);
        }
    };

    return (
        <div>
            <h3>Login</h3>
            <form method="POST" action="" onSubmit={onSubmitFormHandler}>
                <input type="text" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <input type="submit" />
            </form>

            <p>
                You don't have an account yet? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;
