import React, { useEffect, useState } from 'react'
import Navigation from './Navigation';
import { Link } from 'react-router-dom';

const userID = localStorage.getItem('ltk')
const userURl = `http://localhost:8000/userprofile/${userID}`;





export default function Userprofile() {
    const [user,setUser] = useState('');

    var name = user.length > 0 ? user[0].custName : "";
    var userID = user.length > 0 ? user[0].custID : "";
    var email = user.length > 0 ? user[0].custEmail : "";
    var Age = user.length > 0 ? user[0].custAge : "";
    var Gender = user.length > 0 ? user[0].custGender : "";
    var phone = user.length > 0 ? user[0].custContact : "";

    
    useEffect(() =>
        {
            fetch(userURl,{method:'GET'} )
            .then((res) => res.json())
            .then((data) => {
                setUser(data)
                console.log('>>>>',user);
            })
        }, [])


        const handleGender = (gender) => {
            if(gender == 'F')
            {
                return (
                    <img src="https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png"
                        class="rounded-circle img-fluid" style={{"width": "100px"}} />

                )
            }
            else{
                return (
                    <img src="https://www.svgrepo.com/show/382103/male-avatar-boy-face-man-user-2.svg"
                        class="rounded-circle img-fluid" style={{"width": "100px"}} />

                )

            }
        };
    
  return (
    <>
    <Navigation/>
    <div className="container" >
        <section className="vh-200" style={{"backgroundColor": "#eee;"}}>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            
            <div className="col-md-12 col-xl-4">
            
                <div className="card" style={{"borderRadius": "15px"}}>
                <div className="card-body text-center">
                <h3>User Profile</h3>
                    <div className="mt-3 mb-4">
                        {handleGender(Gender)}
                    </div>
                    <p className="text-muted mb-4">ID : {userID}</p>
                    <h4 className="mb-2"> {name}</h4>
                    <div className="mb-4 pb-2">
                    <p className="text-muted mb-4">Age : {Age} </p>
                    <label for='email' style={{'float':'left'}}>Email </label>                   
                    <input type="email"  id='email' value ={email} className='form-control'/>
                    <label for='phone' className='mt-3' style={{'float':'left'}}>Contact No  </label> 
                    <input type="number"  id='phone' value ={phone} className='form-control'/>

                    </div>
                    <Link to='/vieworders' type="button" class="btn btn-primary btn-rounded btn-lg">
                    View Orders
                    </Link>
                    <div class="d-flex justify-content-between text-center mt-5 mb-2">
                    <div>
                        <p class="mb-2 h5">8471</p>
                        <p class="text-muted mb-0">Wallets Balance</p>
                    </div>
                    <div class="px-3">
                        <p class="mb-2 h5">8512</p>
                        <p class="text-muted mb-0">Income amounts</p>
                    </div>
                    <div>
                        <p class="mb-2 h5">4751</p>
                        <p class="text-muted mb-0">Total Transactions</p>
                    </div>
                    </div>
                </div>
                </div>

            </div>
            </div>
        </div>
</section>
</div>


    </>
  )
}
