import { Link, useNavigate } from "react-router-dom";

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
        <div>
            <h3>Register</h3>
            <form method="POST" onSubmit={onSubmitFormHandler}>
                <input type="text" name="firstName" placeholder="First Name" required />
                <input type="text" name="lastName" placeholder="Last Name" required />

                <input type="text" name="email" placeholder="Email" required />

                <input type="password" name="password" placeholder="Password" required />
                <input type="password" name="repeatPassword" placeholder="Repeat password" required />

                <p>Gender</p>
                <label htmlFor="male">Male</label>
                <input type="radio" name="gender" id="male" defaultValue="Male" required />

                <label htmlFor="female">Female</label>
                <input type="radio" name="gender" id="female" defaultValue="Female" required />

                <input type="submit" />
            </form>

            <p>
                Already have an account? <Link to="/login">Log in here</Link>
            </p>
        </div>
    );
};

export default Register;
