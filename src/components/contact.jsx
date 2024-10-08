import { useState } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  phone: "",
  email: "",
};

export const Contact = (props) => {
  const [{ phone, email }, setState] = useState(initialState);
  const [loading, setLoading] = useState(false); // State to handle button loading

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(phone, email);
    setLoading(true);

    try {
      const response = await axios.post(
        "https://9iotkb25bf.execute-api.us-east-2.amazonaws.com/api/v1/voice-agent/calls/hospital",
        {
          phone,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);
      toast.success(
        "Request submitted successfully. We will contact you shortly."
      );
      clearState();
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      toast.error("Request failed. Please try again later.");
    } finally {
      setLoading(false);
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
                  Please fill out the form below to book an appointment with
                  Ehsaan Voice AI.
                  <br /> Our AI voice agent will contact you shortly to confirm
                  the details.
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
                        value={phone}
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>

                <div id="success"></div>
                <button
                  type="submit"
                  className="btn btn-custom btn-lg"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Book Appointment"}
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
          <p>
            {" "}
            &copy;{" "}
            <a
              href="https://ehsaantech.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "gray"}}
              onMouseOver={(e) => {
                e.target.style.color = "blue";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "gray";
              }}
            >
              Ehsaan Technologies
            </a>
          </p>
        </div>
      </div>
      <ToastContainer
        progressClassName="toastProgress"
        bodyClassName="toastBody"
      />
    </div>
  );
};
