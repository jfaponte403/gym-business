import {Link, useNavigate} from "react-router-dom";
import {useState, useContext} from "react";
import axios from 'axios';
import {Context} from "../Context/Context.jsx";
import './Login.css';
const Login = () => {
    const navigate = useNavigate();
    const { setCodeUser, setTypeUser, typeUser } = useContext(Context);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/logins', {
            username: username,
            password: password
        })
            .then((response) => {
                setCodeUser(response.data.results[0][0].code);
                setTypeUser(response.data.results[0][0].user_type);
                if (typeUser === 1) {
                    navigate("/admin");
                }
                if (typeUser === 2) {
                    navigate("/user");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className='login-page'>
            <div className='login-form-container'>
                <form className='login-form'>
                    <label className='login-label'>Username:</label>
                    <input
                        className='login-input'
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label className='login-label'>Password:</label>
                    <input
                        className='login-input'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className='login-button' onClick={handleLogin}>Login</button>
                </form>
                <p className='login-message'>Not registered? <Link to='/register'>Create an account</Link></p>
            </div>
        </div>

    );
}

export default Login;

