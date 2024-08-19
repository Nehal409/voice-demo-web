import { useState } from "react";
import axios from "axios";
import React from "react";

const initialState = {
  phone: "",
  email: "",
};
export const Contact = (props) => {
  const [{ phone, email }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => setState({ ...initialState });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(phone, email);

    try {
      const response = await axios.post(
        "http://localhost:80/api/v1/voice-agent/calls",
        {
          phone,
          email,
        }
      );

      console.log("Response:", response.data);
      clearState();
      alert(
        "Appointment request submitted successfully. We will contact you shortly."
      );
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      alert(
        "Failed to submit the appointment request. Please try again later."
      );
    }
  };
  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Book an Appointment</h2>
                <p>
                  Please fill out the form below to book an appointment at
                  Ehsaan Tech Hospital. Our team will contact you shortly to
                  confirm the details.
                </p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="form-control"
                        placeholder="Phone"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>

                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Book Appointment
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info"></div>
          <div className="col-md-12">
            <div className="row"></div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>&copy; Ehsaan Technologies</p>
        </div>
      </div>
    </div>
  );
};
