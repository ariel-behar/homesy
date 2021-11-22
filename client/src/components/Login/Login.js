import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <h3>Login</h3>
            <form method="POST" action="">
                <input type="text" name="username" placeholder="username" />
                <input type="text" name="password" placeholder="password" />
                <input type="submit" />
            </form>

            <p>
                You don't have an account yet? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;
