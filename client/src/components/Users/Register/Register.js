import { Link, useNavigate } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styles from './Register.module.css';

import { useAuthContext } from "../../../contexts/AuthContext.js";
import { useErrorContext } from '../../../contexts/ErrorContext.js';
import { setLocalStorage } from "../../../utils/localStorageUtil.js";
import * as authService from '../../../services/authService.js';

const Register = () => {
    const { login } = useAuthContext();
    const { displayError } = useErrorContext();
    const navigate = useNavigate();

    const onSubmitFormHandler = async (e) => {
        e.preventDefault();

        let { firstName , lastName, email, password, repeatPassword, gender} = Object.fromEntries(new FormData(e.currentTarget));

        let userObj = {
            firstName,
            lastName,
            email,
            password,
            gender,
        };

        if(password === repeatPassword) {
            try {
                let userResponse = await authService.register(userObj);

                let user = {
                    userId: userResponse.userId,
                    firstName: userResponse.firstName,
                    lastName: userResponse.lastName,
                    email: userResponse.email,
                    gender: userResponse.gender,
                    AUTH_TOKEN: userResponse.AUTH_TOKEN,
                };

                setLocalStorage(user);

                login(user);

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
        <section className={styles.registerPageSection}>
            <h3>Register</h3>

            <Form method="POST" onSubmit={onSubmitFormHandler}>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" placeholder="First Name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" placeholder="Last Name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" name="email" placeholder="Email address" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="repeatPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="repeatPassword" placeholder="Repeat password" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="gender">
                    <Form.Label className="d-block">Gender</Form.Label>
                    <Form.Check inline label="Male" name="gender" type="radio" defaultValue="Male" id="male" />
                    <Form.Check inline label="Female" name="gender" type="radio" defaultValue="Female" id="female" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <p>
                Already have an account? <Link to="/login">Log in here</Link>
            </p>
        </section>
    );
};

export default Register;
