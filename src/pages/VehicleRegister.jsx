import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { generatePath, useNavigate } from 'react-router-dom';




export default function VehicleRegister() {

  const [vid, setVid] = useState("");
  const [vehicle_type, setVehicleType] = useState("");
  const [license_plate, setLicensePlate] = useState("");
  const [license_type, setLisence_type] = useState("")
  const [name, setName] = useState("");
  const [contact_number, setContactNumber] = useState("");

  const navigate = useNavigate();




  const userData = {
    vid,
    vehicle_type,
    license_plate,
    license_type,
    name,
    contact_number,
  }



  function submitForm(e) {
    e.preventDefault();
    if (vehicle_type.length === 0 || license_plate.length === 0 || name.length === 0 || contact_number.length === 0) {
      swal(" Fields Cannot empty !", "Please enter all data !", "error");
    } else {
      console.log(userData);
      axios.post("https://vehicleregistration-be.onrender.com/api/vehicle", userData)
        .then(function (response) {
          console.log(response);
          setVehicleType("");
          setLicensePlate("");
          setLisence_type("");
          setName("");
          setContactNumber("");
          swal({ text: "Successfully Added", icon: "success", button: "Okay!" }).then((res) => {
            navigate(`/vehicledetails/${response.data.vid}`, { replace: true });
          })

          console.log(response.data)
        }).catch(err =>{
          // alert(err.data.msg)
          alert(err.response.data.msg);
          // alert(err.response.data.msg);
        
        })

    }

  }

  return (
    <div>
      <Header />
      <section class="h-100 bg-dark" >
        <div className="container py-5 h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4">
                <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                    <img src="https://images.unsplash.com/photo-1552519507-88aa2dfa9fdb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTV8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80"
                      alt="Sample photo" className="img-fluid"
                      style={{ derTopLeftBorRadius: ".25rem", borderBottomLeftRadius: ".25rem" }} />
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase" style={{ marginTop: "120px", marginLeft: "50px" }}>Vehicle registration form</h3>
                      <br />
                      <div >
                        <div className="col-md-6 mb-4">
                          <div className="form-outline" onSubmit={submitForm}>
                            <input type="text" id="form3Example1m" className="form-control form-control-lg" placeholder='Car/Bike' value={vehicle_type} onChange={(e) => setVehicleType(e.target.value)} />
                            <label className="form-label" htmlFor="form3Example1m">Vehicle Type</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="form3Example1n" className="form-control form-control-lg" placeholder='TN 33 AQ 1967' value={license_plate} onChange={(e) => setLicensePlate(e.target.value)} />
                            <label className="form-label" htmlFor="form3Example1n">Chase Number</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="form3Example1n" className="form-control form-control-lg" placeholder='Modern or old' value={ license_type } onChange={(e) =>setLisence_type(e.target.value)} />
                            <label className="form-label" htmlFor="form3Example1n">License Type</label>
                          </div>
                        </div>
                      </div>

                      <div >
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="form3Example1m1" className="form-control form-control-lg" placeholder='VENNILA D' value={name} onChange={(e) => setName(e.target.value)} />
                            <label className="form-label" htmlFor="form3Example1m1">Name</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="form3Example1n1" className="form-control form-control-lg" placeholder='9445718189' value={contact_number} onChange={(e) => setContactNumber(e.target.value)} />
                            <label className="form-label" htmlFor="form3Example1n1">Contact Number</label>
                          </div>
                          <br />
                          <br />
                        </div>

                        <Button variant="primary" type="submit" onClick={submitForm} style={{ height: "40px", width: "40%", }}>
                          Submit
                        </Button>


                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  )
}