import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../Home/Home.jsx";
import Login from "../Login/Login.jsx";
import User from "../User/User.jsx";
import TrainingPlan from "../TrainingPlan/TrainingPlan.jsx";
import Progress from "../Progress/Progress.jsx";
import PersonalData from "../PersonalData/PersonalData.jsx";
import Register from "../Register/Register.jsx";
import {ContextProvider} from "../Context/Context.jsx";
import Admin from "../Admin/Admin.jsx";
import ActiveUser from "../ActiveUsers/ActiveUser.jsx";
import Payments from "../Payments/Payments.jsx";
import Coaches from "../Coaches/Coaches.jsx";

const Main = () => {
    return(
        <ContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/home' element={<Home />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/user' element={<User />}/>
                    <Route path='/training-plan' element={<TrainingPlan />}/>
                    <Route path='/progress' element={<Progress />}/>
                    <Route path='/personal-data' element={<PersonalData />}/>
                    <Route path='/register' element={<Register />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/active-users' element={<ActiveUser />} />
                    <Route path='/payments' element={<Payments />} />
                    <Route path='/coaches' element={<Coaches />} />
                </Routes>
            </BrowserRouter>
        </ContextProvider>
    );
}

export default Main;