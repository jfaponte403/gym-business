import AdminNav from "../AdminNav/AdminNav.jsx";
import './ActiveUser.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import moment from 'moment';

const ActiveUser = () => {
    const [dataActiveUsers, setDataActiveUsers] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3001/active-users')
            .then(response => {
                console.log(response.data);
                setDataActiveUsers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className="admin-page">
            <aside className="admin-page__nav">
                <AdminNav />
            </aside>
            <div className="admin-page__content">
                <h2 className="admin-page__title">Active Users</h2>
                <table className="admin-page__table">
                    <thead>
                    <tr>
                        <th className="admin-page__table-header">Name</th>
                        <th className="admin-page__table-header">Payment Date</th>
                        <th className="admin-page__table-header">Next Payment</th>
                        <th className="admin-page__table-header">Membership Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataActiveUsers.map(user => (
                        <tr key={user.name} className="admin-page__table-row">
                            <td className="admin-page__table-cell">{user.name}</td>
                            <td className="admin-page__table-cell">{moment(user.payment_date).format('YYYY-MM-DD')}</td>
                            <td className="admin-page__table-cell">{moment(user.next_payment).format('YYYY-MM-DD')}</td>
                            <td className="admin-page__table-cell">{user.membership_status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};


export default ActiveUser;