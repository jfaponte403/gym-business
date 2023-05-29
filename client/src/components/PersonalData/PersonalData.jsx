import UserNav from "../UserNav/UserNav.jsx";
import axios from 'axios';
import {useContext, useEffect, useState} from "react";
import {Context} from "../Context/Context.jsx";
import moment from 'moment';
import './PersonalData.css';
const PersonalData = ()=>{

    const { codeUser } = useContext(Context);
    const [personalData, setPersonalData] = useState([]);

    useEffect(()=>{
        axios.post('http://localhost:3001/personal-data', {
            memberCode: codeUser
        })
            .then((response) => {
                console.log(response.data[0][0]);
                setPersonalData(response.data[0][0])
            })
            .catch((error) => {
                console.log(error);
            });

    },[]);

    return (
        <div className="personal-data">
            <aside className="personal-data__nav">
                <UserNav />
            </aside>
            <div className="personal-data__content">
                <h2 className="personal-data__title">Personal Data</h2>
                <table className="personal-data__table">
                    <tbody>
                    <tr className="personal-data__row">
                        <td className="personal-data__label">Name:</td>
                        <td className="personal-data__value">{personalData.name}</td>
                    </tr>
                    <tr className="personal-data__row">
                        <td className="personal-data__label">Plan:</td>
                        <td className="personal-data__value">{personalData.plan}</td>
                    </tr>
                    <tr className="personal-data__row">
                        <td className="personal-data__label">Start Date:</td>
                        <td className="personal-data__value">{moment(personalData.start_date).format('YYYY-MM-DD')}</td>
                    </tr>
                    <tr className="personal-data__row">
                        <td className="personal-data__label">Username:</td>
                        <td className="personal-data__value">{personalData.username}</td>
                    </tr>
                    <tr className="personal-data__row">
                        <td className="personal-data__label">Training Plan:</td>
                        <td className="personal-data__value">{personalData.training_plan}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default PersonalData;