import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react'

import {AuthContext} from '../../../contexts/AuthContext.js';
import * as authService from '../../../services/authService.js';

const Login = () => {
    const navigate = useNavigate();
    let { login } = useContext(AuthContext);

    const onSubmitFormHandler = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let email = formData.get('email');
        let password = formData.get('password');

        let userObj = {
            email,
            password,
        };

        try {
            let userResponse = await authService.login(userObj);

            await localStorage.setItem('userId', userResponse._id);
            await localStorage.setItem('firstName', userResponse.firstName);
            await localStorage.setItem('email', userResponse.email);
            await localStorage.setItem('AUTH_TOKEN', userResponse.AUTH_TOKEN);
            
            // onLogin(userResponse._id, userResponse.firstName, userResponse.email);
            login({
                userId: userResponse._id,
                firstName: userResponse.firstName,
                email: userResponse.email,
                AUTH_TOKEN: userResponse.AUTH_TOKEN
            })

            navigate('/');
        } catch (error) {
            console.error(error);
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
