import AdminNav from "../AdminNav/AdminNav.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

const Coaches = () => {
    const [dataUserAndAdvice, setDataUserAndAdvice] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3001/user-and-advice')
            .then(response => {
                console.log(response.data);
                setDataUserAndAdvice(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return(
        <div className="admin-page">
            <aside className="admin-page__nav">
                <AdminNav />
            </aside>
            <div className="admin-page__content">
                <h2 className="admin-page__title">Active Users</h2>
                <table className="admin-page__table">
                    <thead>
                    <tr>
                        <th className="admin-page__table-header">Member</th>
                        <th className="admin-page__table-header">Coach</th>
                        <th className="admin-page__table-header">Description</th>
                        <th className="admin-page__table-header">Advisory</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataUserAndAdvice.map((user, index) => (
                        <tr key={index} className="admin-page__table-row">
                            <td className="admin-page__table-cell">{user.member}</td>
                            <td className="admin-page__table-cell">{user.coach}</td>
                            <td className="admin-page__table-cell">{user.description}</td>
                            <td className="admin-page__table-cell">{user.advisory}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Coaches;