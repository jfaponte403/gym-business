import {useNavigate} from "react-router-dom";
import './Home.css';
const Home = () => {
    const navigate = useNavigate();

    return(
        <div className='homepage'>
            <h1 className='homepage-title'>Body Blaze Gym</h1>
            <button className='homepage-button' onClick={() => navigate('/login')}>Login</button>
            <button className='homepage-button' onClick={() => navigate('/register')}>Get started</button>
        </div>
    );
}

export default Home;