import { Link, useNavigate } from 'react-router-dom';

import * as authService from '../../../services/authService.js';

const Login = ({
    onLogin
}) => {
    const navigate = useNavigate();

    const onSubmitFormHandler = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let email = formData.get('email');
        let password = formData.get('password');

        let user = {
            
            email,
            password,
        };

        try {
            let response = await authService.login(user);

            localStorage.setItem('userId', response._id);
            localStorage.setItem('firstName', response.firstName);
            localStorage.setItem('email', response.email);
            localStorage.setItem('AUTH_TOKEN', response.AUTH_TOKEN);

            onLogin(response.email);

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
