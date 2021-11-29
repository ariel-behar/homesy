import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const onSubmitFormHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let username = formData.get('username');
        let password = formData.get('password');
        let repeatPassword = formData.get('repeatPassword');

        let user = {
            username, 
            password
        }

        if(password === repeatPassword) {
            try {
                fetch('http://localhost:3030/users/register', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",   
                    },                                     
                    body: JSON.stringify(user),
                })
                .then(res => res)
                .then(resResult => {
                    console.log(resResult)
                    if(resResult.status == "200"){
                        navigate('/')
                    } else {
                        console.log('An error occurred while attempting to register')
                    }
                })

            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div>
            <h3>Register</h3>
            <form method="POST" onSubmit={onSubmitFormHandler}>
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
