import UserNav from "../UserNav/UserNav.jsx";
import './Progress.css';
import {useContext, useEffect, useState} from "react";
import {Context} from "../Context/Context.jsx";
import axios from "axios";
import moment from 'moment';

const Progress = ()=>{

    const { codeUser } = useContext(Context);
    const [progressData, setProgressData] = useState([]);

    useEffect(()=>{
        axios.post('http://localhost:3001/progress', {
            memberCode: codeUser
        })
            .then((response) => {
                console.log(response.data[0]);
                setProgressData(response.data[0])
            })
            .catch((error) => {
                console.log(error);
            });

    },[]);

    return (
        <div className="progress">
            <aside className="progress__nav">
                <UserNav />
            </aside>
            <div className="progress__content">
                <h2 className="progress__title">Progress</h2>
                <table className="progress__table">
                    <thead>
                    <tr>
                        <th className="progress__table-header">Name</th>
                        <th className="progress__table-header">Starting Weight</th>
                        <th className="progress__table-header">Starting Height</th>
                        <th className="progress__table-header">Current Weight</th>
                        <th className="progress__table-header">Current Height</th>
                        <th className="progress__table-header">Measurement Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {progressData.map((progressData, index) => (
                        <tr key={index} className="progress__table-row">
                            <td className="progress__table-cell">{progressData.name}</td>
                            <td className="progress__table-cell">{progressData.starting_weight}</td>
                            <td className="progress__table-cell">{progressData.starting_height}</td>
                            <td className="progress__table-cell">{progressData.current_weight}</td>
                            <td className="progress__table-cell">{progressData.current_height}</td>
                            <td className="progress__table-cell">{moment(progressData.measurement_date).format('YYYY-MM-DD')}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}
export default Progress;