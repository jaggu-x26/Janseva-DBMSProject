import React from "react";
import { Outlet, Link } from "react-router-dom";
import '../styles/Landing.css';
const now = new Date();
const year = now.getFullYear();
class Landing extends React.Component {

    render() {
        return(
            <>
                {/*-----Navigation*------*/}
                <nav class="navbar sticky-top navbar-light ">
                <div class="container-fluid">
                    <Link to="/home" class="navbar-brand brand" >JanSeva</Link>
                    <div class="topnav-right">
                        <Link class= " navbar-brand brand" to="/about">About Us</Link>
                    </div>
                </div>
                </nav>
                {/* Main Page */}
                <div class="container-fluid back">
                    <div class="row">
                        <div class="col-12 col-sm-12 col-md-4">
                            <img class = "img-fluid brand-img" src="https://i.ibb.co/zsGchyq/Jan-Seva-1.png" />
                        </div>
                        <div class="col-12 col-sm-12 col-md-8">
                            <h1 class ="brand" style = {{fontSize:"60px",paddingLeft:"2rem",marginTop:"9rem"}}>
                                Janseva : Virtualising Pilgrimages
                            </h1>
                            <p class ="description">The JanSeva project enables users to worship and receive the worship offerings all from the
comfort of their homes, thereby providing the users with a complete solution. The project is
intended to be a one-stop solution for all pilgrimage related wishes and desires. Not only
restricted to a type of pilgrimage, JanSeva is meant for all types of users as suggested by the
project title which means “People’s service”.</p>
                        </div>
                    <div className="row justify-content-center ">
                        <div className="col-auto">
                            <Link type="button" className="btn text-dark regbtn" to='/register'>Register</Link>
                        </div>
                        <div className="col-auto">
                            <Link type="button" className="btn  text-light lgnbtn" to='/login'>Login</Link>
                        </div>
                    </div>
                    </div>
                </div>
                {/*Footer*/}
                <div className="container-fluid back foot">
                    <div className="row justify-content-center">
                        <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                            <h3 className="brand ">JanSeva &copy; {year}</h3>
                        </div>
                    </div>
                </div>
            </>
        )
    }

   
}

export default Landing