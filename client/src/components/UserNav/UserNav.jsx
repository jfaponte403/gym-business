import {Link} from "react-router-dom";
import './UserNav.css';
const UserNav = ()=>{
    return (
        <div className="user-nav">
            <p className="user-nav__picture">picture user</p>
            <Link to="/personal-data" className="user-nav__link">Personal Data</Link><br />
            <Link to="/training-plan" className="user-nav__link">About your training</Link><br />
            <Link to="/progress" className="user-nav__link">Your progress</Link><br />
            <Link to="/home" className="user-nav__link">Home</Link><br />
        </div>
    );
}
export default UserNav;