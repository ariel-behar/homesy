import { Link, useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styles from './Login.module.css'

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
        <section className={styles.loginPageSection}>
            <h3>Login</h3>

            <Form method="POST" action="" onSubmit={onSubmitFormHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" name="email" placeholder="Email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <p>
                You don't have an account yet? <Link to="/register">Register here</Link>
            </p>
        </section>
    );
};

export default Login;
