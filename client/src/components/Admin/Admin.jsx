import AdminNav from "../AdminNav/AdminNav.jsx";
import './Admin.css';

const Admin = () => {
    return (
        <div className='admin-page'>
            <aside className='admin-sidebar'>
                <AdminNav />
            </aside>
            <div className='admin-content'></div>
        </div>

    );
}

export default Admin;