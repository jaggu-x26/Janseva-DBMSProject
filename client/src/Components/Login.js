import React,{Component, useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import '../styles/Login.css';


const loginUrl = "http://localhost:8000/login";

function validateEmailAndPassword(email, password) {
    // Email regex pattern to match a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check if email and password are empty
    if (!email || !password) {
      return false;
    }
    
    // Check if email is valid
    if (!emailRegex.test(email)) {
      return false;
    }
    
    // If both email and password are valid, return true
    return true;
  }
  
export default function Login()
{
    const nav = useNavigate();
    const [auth, setAuth] = useState({
        password:'',
        email:'',
        message:''
      });

    const handleSubmit = () => {
        if(validateEmailAndPassword(auth.email,auth.password))
        {
            fetch(loginUrl,{
                method:'POST',
                headers:{
                    'accept':'application/json',
                    'Content-type':'application/json'
                },
                body:JSON.stringify(auth)
            })
    
            .then((res) => res.json())
            .then((data) => {
                if(data.auth ===  false){
                    // this.setState({message:data.token});
                    setAuth(existingValues => ({...existingValues,
                        message:data.token,
                    }))
                }else{
                    setAuth(existingValues => ({...existingValues,
                        message:data.token,
                    }))
                    localStorage.setItem('ltk',data.token)
                    alert("Login success");
                    nav('/home');
                    // this.props.history.push('/')
                }
            })
        }
        else
        {
            alert("Login failure due to invalid credentials. Try again!");
        }
        
    }
   
    const handleChange = (e) => {
        const fieldName = e.target.name
        setAuth(existingValues => ({
          ...existingValues,
          // update the current field
          [fieldName]: e.target.value,

        }))
        
      }
     
        return(
            <>
             {/*Navigation*/}
             <nav class="navbar navbar-expand-lg ">
                    <div class="container-fluid">
                        <Link class="navbar-brand brand" to='/home'>Janseva</Link>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="bi bi-list" style={{color:"white"}}></i>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarScroll">
                        <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{scrollHeight: "100px"}}>
                            <li class="nav-item">
                            <Link class="nav-link brand" to="/about">About Us</Link>
                            </li>
                        </ul>
                        </div>
                    </div>
                  </nav>
            
            <div className="container login-back rounded">
                
                <br/>
                <div className="panel panel-success">
                    <div className="panel-heading login-head">
                        Login
                    </div>
                    <div className="panel-body">
                        <h3 style={{color:'red'}}>{auth.message}</h3>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input className="form-control" name="email"
                                        value={auth.email} onChange={handleChange} type="text"/>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input className="form-control" name="password"
                                        value={auth.password} onChange={handleChange} type="password"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-5">

                            <button className="btn btn-warning" style={{'padding':'0.5rem 4rem 0.5rem 4rem'}} onClick={handleSubmit}>
                                Login
                            </button>
                            &nbsp;
                            <Link to="/register" className="btn btn-primary py-2 px-5" >New User? Register</Link>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }


