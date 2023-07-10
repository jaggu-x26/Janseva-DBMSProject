import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../styles/About.css';
import Navigation from './Navigation';

const date = new Date();
const year = date.getFullYear();
export default class About extends Component {
    render() {
        return (
            <>
                  {/*Navigation*/}
                  <Navigation/>

                  <div class="about-section">
                        <img src="https://i.ibb.co/zsGchyq/Jan-Seva-1.png" height="200px" />
                        <h1 class="brand" style={{"fontSize":"55px"}}>About Us</h1>
                        <p class="description">JanSeva is an innovative online platform that allows individuals to
                            connect with the sacred world of pilgrimage from the comfort of their
                            own home. This project is a unique opportunity for users to experience
                            the worship process virtually and offer prayers and offerings to some
                            of the most famous pilgrimage destinations in India. Users can
                            participate in the rituals and customs associated with their chosen
                            pilgrimage, and offer their devotions to the divine.
                        </p>
                    <p className="description">This project primarily focuses on disabled, elderly or anyone physically unable to reach the
                        pilgrimages as the primary users. The importance of this project lies in the ability to enable
                        everyone to reach pilgrimages and truly democratise the search for the divine and give devotees
                        an equal opportunity to worship and receive the blessings of the almighty.</p>
                    </div>

                    <h2 class="brand" style={{"text-align":"center","color":"white"}}>Project Team</h2>
                    <div class="row row-cols-1  row-cols-md-2 row-cols-lg-3 g-4">
                    <div class="col">
                        <div class="card h-100">
                        {/* <img src="..." class="card-img-top" alt="..."/> */}
                        <div class="card-body">
                            <h5 class="card-title">Darpan Deb</h5>
                            <p class="card-text">Overall Web Project Manager /
                            Strong hold on integration and Apis Creation</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Christ (Deemed to be University), Central Campus, Bengaluru</small>
                        </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100">
                        {/* <img src="..." class="card-img-top" alt="..."/> */}
                        <div class="card-body">
                            <h5 class="card-title">Jagriti Rai</h5>
                            <p class="card-text">Strong hold on responsible UI/UX design and module creation</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Christ (Deemed to be University), Central Campus, Bengaluru</small>
                        </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100">
                        {/* <img src="..." class="card-img-top" alt="..."/> */}
                        <div class="card-body">
                            <h5 class="card-title">Jubaraj Mukherjee</h5>
                            <p class="card-text">Strong hold on responsible database design and schema creation</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Christ (Deemed to be University), Central Campus, Bengaluru</small>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/*Footer*/}
                        <div className="container-fluid ">
                            <div className="row justify-content-center">
                                <div className="col-5 col-sm-4 col-md-3 col-lg-2">
                                    <h3 className="brand foot">JanSeva &copy; {year}</h3>
                                </div>
                            </div>
                        </div>
                    
                    
            </>
        )
    }
}
