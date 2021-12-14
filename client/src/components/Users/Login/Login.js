import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../../contexts/AuthContext.js';
import * as authService from '../../../services/authService.js';
import { useErrorContext } from '../../../contexts/ErrorContext.js';

const Login = () => {
    const { login } = useAuthContext();
    const { displayError } = useErrorContext();

    const navigate = useNavigate();

    const onSubmitFormHandler = async (e) => {
        e.preventDefault();

        let { email, password } = Object.fromEntries(new FormData(e.currentTarget));

        let userObj = {
            email,
            password,
        };

        try {
            let userResponse = await authService.login(userObj);

            let user = {
                userId: userResponse.userId,
                firstName: userResponse.firstName,
                lastName: userResponse.lastName,
                email: userResponse.email,
                gender: userResponse.gender,
                AUTH_TOKEN: userResponse.AUTH_TOKEN,
            };

            login(user);

            navigate('/');
        } catch (error) {
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
