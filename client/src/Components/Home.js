import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Navigation from "./Navigation";

const now = new Date();
const year = now.getFullYear();
const PilgrimageUrl = "http://localhost:8000/pilgrimage";
const url = "http://localhost:8000/userinfo";

export default function Home() {
  // const [pilgrimages , setPilg]=useState('');
  const [input, setInput] = useState("");
  const [pilgrimages, setPilg] = useState("");
  
  const fetchData = (value) => {
    fetch(PilgrimageUrl, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        const searchdata = data.filter((item) => {
          return (
            item && item.pilgName && item.pilgName.toLowerCase().includes(value)
          );
        });
        setPilg(searchdata);
      });
  };

  const handleChange = (value) => {
    console.log(value);
    if(value!='')
    {
      setInput(value);
      fetchData(value);
    }
    else{

    }
    
  };
  const renderPilgs = (data) => {
    if (data) {
      return data.map((item) => {
        return (
          <Link
            to={`/pilgrimage/${item.pilgID}`}
            key={item.pilgID}
            value={item.pilgID}
            className="options"
          >
            {item.pilgName} | {item.pilgLoc}
          </Link>
        );
      });
    }
  };


  
  return (
    <>
      {/*Navigation*/}
        <Navigation/>
      {/*Search Bar */}

      <div className="container-fluid ">
        <div className="row justify-content-center">
          <div className="col-8 col-sm-7 col-md-4 col-lg-3">
            <img src="https://i.ibb.co/zsGchyq/Jan-Seva-1.png" height="300px" />
          </div>
        </div>
        <div className="row justify-content-center ">
          <h3
            className="brand col-12"
            style={{ fontSize: "40px", textAlign: "center" }}
          >
            Virtualising Pilgrimages
          </h3>
          <div className="col-10 col-sm-6  col-lg-5 d-flex flex-column">
            <input
              type="text"
              onChange={(e) => handleChange(e.target.value)}
              className="form-control rounded search"
              placeholder="Search your holy divine"
            />
            <br />
            <div className="searchdata">{renderPilgs(pilgrimages)}</div>
          </div>
        </div>
      </div>

      {/* <!-- SERVICES --> */}
      
    <section id="services" class="services sections-bg">
      <div class="container" data-aos="fade-up">

        <div class="section-header">
          <h2>Our Services</h2>
          <p>Aperiam dolorum et et wuia molestias qui eveniet numquam nihil porro incidunt dolores placeat sunt id nobis omnis tiledo stran delop</p>
        </div>

        <div class="row gy-4" data-aos="fade-up" data-aos-delay="100">

          <div class="col-lg-4 col-md-6">
            <div class="service-item  position-relative">
              <div class="icon">
                <i class="bi bi-activity"></i>
              </div>
              <h3>Connect to Divine</h3>
              <p>Provident nihil minus qui consequatur non omnis maiores. Eos accusantium minus dolores iure perferendis tempore et consequatur.</p>
              <a href="#" class="readmore stretched-link">Read more <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="service-item position-relative">
              <div class="icon">
                <i class="bi bi-broadcast"></i>
              </div>
              <h3>Community Inclusivity</h3>
              <p>Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non ut nesciunt dolorem.</p>
              <a href="#" class="readmore stretched-link">Read more <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="service-item position-relative">
              <div class="icon">
              <i class="bi bi-truck"></i>
              </div>
              <h3>Graces Delivered</h3>
              <p>Ut excepturi voluptatem nisi sed. Quidem fuga consequatur. Minus ea aut. Vel qui id voluptas adipisci eos earum corrupti.</p>
              <a href="#" class="readmore stretched-link">Read more <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="service-item position-relative">
              <div class="icon">
              <i class="bi bi-bank2"></i>
              </div>
              <h3>Pilgrimage Destinations</h3>
              <p>Non et temporibus minus omnis sed dolor esse consequatur. Cupiditate sed error ea fuga sit provident adipisci neque.</p>
              <a href="#" class="readmore stretched-link">Read more <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="service-item position-relative">
              <div class="icon">
                <i class="bi bi-calendar4-week"></i>
              </div>
              <h3>Book Anytime</h3>
              <p>Cumque et suscipit saepe. Est maiores autem enim facilis ut aut ipsam corporis aut. Sed animi at autem alias eius labore.</p>
              <a href="#" class="readmore stretched-link">Read more <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="service-item position-relative">
              <div class="icon">
                <i class="bi bi-chat-square-text"></i>
              </div>
              <h3>Quick Feedback</h3>
              <p>Hic molestias ea quibusdam eos. Fugiat enim doloremque aut neque non et debitis iure. Corrupti recusandae ducimus enim.</p>
              <a href="#" class="readmore stretched-link">Read more <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

        </div>

      </div>
  
    </section>
    {/* <!-- FAQ --> */}
    <section id="faq" class="faq">
      <div class="container" data-aos="fade-up">

        <div class="row gy-4">

          <div class="col-lg-4">
            <div class="content px-xl-5">
              <h3 style={{'color':'white'}}>Frequently Asked <strong>Questions</strong></h3>
              <p style={{'fontWeight':'bolder'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
              </p>
            </div>
          </div>

          <div class="col-lg-8">

            <div class="accordion accordion-flush" id="faqlist" data-aos="fade-up" data-aos-delay="100">

              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-1">
                    <span class="num">1.</span>
                    What is Janseva?
                  </button>
                </h3>
                <div id="faq-content-1" class="accordion-collapse collapse" data-bs-parent="#faqlist">
                  <div class="accordion-body">
                    Janseva is an attempt to make the process of visiting pilgrimages virtual. It is primarily focused to cater the physically disabled and old aged individuals.
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-2">
                    <span class="num">2.</span>
                    Can only physically disabled and old people use Janseva?
                  </button>
                </h3>
                <div id="faq-content-2" class="accordion-collapse collapse" data-bs-parent="#faqlist">
                  <div class="accordion-body">
                    As suggested by the name Janseva, this application can be utilised by anyone who seek the visiting experience of pilgrimage virtual.
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-3">
                    <span class="num">3.</span>
                    How is Janseva different from others?
                  </button>
                </h3>
                <div id="faq-content-3" class="accordion-collapse collapse" data-bs-parent="#faqlist">
                  <div class="accordion-body">
                    Janseva caters to all type of pilgrimages and has over huge networking for easy and efficient services.
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-4">
                    <span class="num">4.</span>
                    How to book a package in Janseva?
                  </button>
                </h3>
                <div id="faq-content-4" class="accordion-collapse collapse" data-bs-parent="#faqlist">
                  <div class="accordion-body">
                    Booking a package in Janseva is quite simple. Register yourself with us and search the pilgrimage of your desire and add package and book it.
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-5">
                    <span class="num">5.</span>
                    Tempus quam pellentesque nec nam aliquam sem et tortor consequat?
                  </button>
                </h3>
                <div id="faq-content-5" class="accordion-collapse collapse" data-bs-parent="#faqlist">
                  <div class="accordion-body">
                    Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>

      {/*Footer*/}
      <div className="container-fluid  ">
        <div className="row justify-content-center">
          <div className="col-5 col-sm-4 col-md-3 col-lg-2">
            <h3 className="brand foot">JanSeva &copy; {year}</h3>
          </div>
        </div>
      </div>
    </>
  );
}
