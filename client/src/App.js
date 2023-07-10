import React from "react";
import Home from "./Components/Home";
import Landing from "./Components/Landing";
import About from "./Components/About";
import Pilgrimages from "./Components/Pilgrimages";
import Packages from "./Components/Packages";
import Placeorder from "./Components/Placeorder";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Userprofile from "./Components/Userprofile";
import ViewOrders from "./Components/ViewOrders";
import Admin from "./Components/Admin";
import UpdateOrder from "./Components/UpdateOrder";
import TrackOrder from "./Components/TrackOrder";
import Feedback from "./Components/Feedback";
import { BrowserRouter, Route, Routes } from "react-router-dom";


class App extends React.Component {

    render() {
        return(
            <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Landing/>}/>
                <Route path='/register' element={<Register />}/>
                <Route path='/login' element={<Login />}/>
                <Route path="/home" element={<Home/>} />
                <Route path="/userprofile" element={<Userprofile/>} />
                <Route path="/vieworders" element={<ViewOrders/>} />
                <Route path="/updateorders" element={<UpdateOrder/>} />
                <Route path ="/admin" element={<Admin/>} />
                <Route path='/trackorder/:id' element={<TrackOrder/>} />
                <Route path='/addFeedback/:id' element={<Feedback/>} />
                <Route path="/about" element={<About/>}/>
                <Route path="/pilgrimage" element={<Pilgrimages/>}/>
                <Route path="/pilgrimage/:id" element={<Packages/>}/>
                <Route path="/placeorder" element={<Placeorder/>}/>
            </Routes>
            </BrowserRouter>
        )
}
}
export default App