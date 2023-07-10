import React, { useState } from 'react';
import Navigation from './Navigation';
import '../styles/Feedback.css';
import { useNavigate, useParams } from 'react-router';


export default function Feedback() {

  const orderid = useParams().id;
  const custID = localStorage.getItem('ltk');
  const addFeedurl = `http://localhost:8000/addFeed`;
  const nav = useNavigate();
  const [auth, setAuth] = useState(
    {
      orderID : orderid,
      feedCont : '',
      custID : custID,
    })

    const handleChange = (e) => {
        const fieldName = e.target.name
        setAuth(existingValues => ({
          ...existingValues,
          [fieldName]: e.target.value,
  
        }))
        
      }

  const handlesubmit = () => {
    if(auth.feedCont.trim().length > 0) {
        fetch(addFeedurl,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify(auth)
        })
  
        .then((res) => res.json())
        .then((data) => {
            if(data.auth === true)
            {
                if(window.confirm('Feedback Submitted successfully! We really appreciate your time'))
                {
                    nav('/vieworders');
                }
            }
            else{
                alert('Feedback could not be submitted! Please try again later.');
            }
  
        })

    }
    else
    {
        alert('Looks like the feedback field is missing. Try again after entering a valid feedback')
    }
  }
  console.log(auth)
  return (
    <>
        <Navigation/>
        <div>
            <div class="contact-form-wrapper d-flex justify-content-center">
                <form action="#" class="contact-form">
                <h5 class="title">Feedback Form</h5>
                <p style={{'color':'black','textAlign':'center','marginTop':'3vh'}}>Feel free to contact us if you need any assistance, any help or another question.
                </p>
                <div>
                    <label for="id"> # Order ID</label>
                    <input type="text" class="form-control rounded border-white mb-3 form-input" id="id" name="orderID" value={orderid} required/>
                </div>
                <div>
                    <textarea id="message" class="form-control rounded border-white mb-3 form-text-area" name="feedCont" rows="5" cols="30" placeholder="Your Feedback" onChange={handleChange} value={auth.feedCont} required/>
                </div>
                <div class="submit-button-wrapper">
                    <button type="button" className='btn btn-success' onClick={handlesubmit}>Submit</button>
                </div>
                </form>
            </div>
            </div>
    </>
  )
}

