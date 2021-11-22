import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div>
            <h3>Register</h3>
            <form method="POST" action="">
                <input type="text" name="username" placeholder="username" />
                <input type="text" name="password" placeholder="password" />
                <input type="text" name="repeatPassword" placeholder="repeat password" />
                <input type="submit" />
            </form>

            <p>Already have an account? <Link to="/login" >Log in here</Link></p>
        </div>
    );
};

export default Register;
