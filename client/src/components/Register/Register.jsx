import {Link, useNavigate} from "react-router-dom";

const Register = () =>{

    const  navigate = useNavigate();
    const handdleLogin = () => {
        navigate('/login');
    }

    return (
        <div className='login-page'>
            <div className='form'>
                <form className='login-form'>
                    <label>Name: </label>
                    <input type='text' placeholder='name'/>

                    <label>Age: </label>
                    <input type='text' placeholder='age'/>

                    <label>Email: </label>
                    <input type='text' placeholder='age'/>

                    <label>Username: </label>
                    <input type='text' placeholder='username'/>

                    <label>Plan:</label>
                    <select>
                        <option>regular</option>
                        <option>premium</option>
                    </select>

                    <label>Password: </label>
                    <input type='password' placeholder='password' />

                    <button onClick={handdleLogin}>Register</button>
                </form>
                <p className='message'>Are you already logged? <Link to='/login'>login</Link></p>
            </div>
        </div>
    );

}

export default Register;