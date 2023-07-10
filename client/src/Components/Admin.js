import React from 'react';
import '../styles/Admin.css';
import { Link } from 'react-router-dom';


export default function Admin() {
  return (
    <>
        <div class="container ">
            <div class="row ">
            <div class="col-md-6 offset-md-3">
                <div class="card my-3">
                <form class="card-body cardbody-color p-lg-5">
                <h2 class="text-center text-dark mt-5">Admin Panel</h2>
                <div class="text-center mb-1 text-dark">Janseva Orders Update Entry</div>
                    <div class="text-center">
                    <img src="https://www.svgrepo.com/show/223051/admin.svg" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                        width="200px" alt="profile"/>
                    </div>

                    <div class="mb-3">
                    <input type="text" class="form-control" id="Username" aria-describedby="emailHelp"
                        placeholder="User Name" value="admin"/>
                    </div>
                    <div class="mb-3">
                    <input type="password" class="form-control" id="password" placeholder="password" value="admin"/>
                    </div>
                    <div class="text-center"><Link type="submit" to="/updateorders"class="btn btn-primary px-5 mb-5 w-100">Login</Link></div>
                </form>
                </div>

            </div>
            </div>
        </div>
    </>
  )
}
