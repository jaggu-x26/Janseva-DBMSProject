import React, { useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import Navigation from './Navigation';

import '../styles/Packages.css';

const now = new Date();
const year = now.getFullYear(); 


export default function Packages(props) {
    const nav = useNavigate();
    const id = useParams()
    let PilgrimageUrl='http://localhost:8000/pilgrimage/'+id.id;
    let PackageURL = 'http://localhost:8000/package/'+id.id 
    const [pilgrimages,setPilgrimages] = useState("")
    const [packages, setPackage] = useState("")
    const ltk = localStorage.getItem('ltk') ? localStorage.getItem('ltk') : null;

    useEffect(() =>
     {
        fetch(PilgrimageUrl,{method:'GET'} )
        .then((res) => res.json())
        .then((data) => {
            setPilgrimages(data)
        })

        fetch(PackageURL,{method:'GET'} )
        .then((res) => res.json())
        .then((data) => {
            setPackage(data)
        })
    }, [])

    const renderPilgrims = (data) => {
        localStorage.setItem('pilgID',id.id);
        console.log(localStorage.getItem('pilgID'));
        if(data){
        return data.map((item) => {
            return(
                <>
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                            <img src={`https://i.ibb.co/${item.img2}`}  className="d-block  w-100 img-fluid" alt="..." height="100px"  />
                            </div>
                            <div className="carousel-item">
                            <img src={`https://i.ibb.co/${item.img1}`}  className="d-block w-100 img-fluid" alt="..." height="200px" />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                        </div>
                         <div className="card mb-3" style={{"maxWidth": "100%", "maxHeight":"100%"}} key={item.pilgID}>
                            <div className="row g-0">
                                <div className="col-md-12">
                                <div className="card-body">
                                    <h5 className="card-title">{item.pilgName}</h5>
                                    <p className="card-text">{item.pilgName} dolor sit amet consectetur adipisicing elit. Assumenda non reprehenderit atque optio tempore, sunt eligendi delectus, similique incidunt quibusdam enim repellendus libero unde. Neque.</p>
                                    <p className="card-footer card-text" style={{"position":"relative",}}><small className="text-muted"> <i class="bi bi-geo-fill"></i> {item.pilgLoc}, {item.pilgCity} , {item.pilgPin}</small></p>
                                </div>
                                </div>
                            </div>
                       </div> 
                </>
            )
        })
    }
}

function handlechange(packid){
    localStorage.setItem('packID',packid);
    if(ltk!=null)
    {
        nav('/placeorder');
    }
    else
    {
        alert('Please login to place order');
    }
     
}

const renderpackages = (data) =>{
    if(data){
        return data.map((item) => {
            return(
                <>
                        
                        <div class="col" key={item.packID}>
                            <div class="card h-100 card-link" key={item.packID}>
                            <div class="card-body packages">
                                <h5 class="card-title">{item.packName}</h5>
                                <p class="card-text"><b>Package Details</b> : {item.packContent}  </p>
                                <h6 className='price'>Rs {item.packCost}</h6>
                                <p className='terms'>*exclusive of other charges</p>
                                <button class="btn btn-outline-primary mt-auto button1"  value = {item.packID} onClick={(e)=>handlechange(e.target.value)}>Add Package</button>
                                
                              </div>
                            </div>
                        </div>

                </>
            )
        })
    }
}


return (
    <>
            {/*Navigation*/}
            <Navigation/>
                {/* Plgrimage details */}
                <div className='container-fluid my-5'>
                    <div className='row justify-content-center'>
                        <div className='col-12 col-md-9 pilgInfo'>
                            <h1 className='brand' style={{"fontSize":"45px"}}>Pilgrimage Informantion</h1>
                            {renderPilgrims(pilgrimages)}
                        </div>
                    </div>
                </div>
                <div className='container my-5'>
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">     
                    {renderpackages(packages)}
                    </div>
                </div>
                 {/*Footer*/}
                    <div className="container-fluid ">
                                <div className="row justify-content-center">
                                    <div className="col-5  col-md-3 col-lg-2">
                                        <h3 className="brand foot">JanSeva &copy; {year}</h3>
                                    </div>
                                </div>
                        </div>
            </>
  )
}


