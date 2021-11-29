import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const onSubmitFormHandler = e => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let username = formData.get('username');
        let password = formData.get('password');
        let repeatPassword = formData.get('repeatPassword');

        let user = {
            username,
            password,
        };

        try {
            fetch('http://localhost:3030/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
                .then(res => res.json())
                .then(resResult => {
                    console.log(resResult)

                    navigate('/');
                });
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <h3>Login</h3>
            <form method="POST" action="" onSubmit={onSubmitFormHandler}>
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
