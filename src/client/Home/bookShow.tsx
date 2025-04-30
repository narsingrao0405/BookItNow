import {useEffect, useState} from "react";
import React from "react";

import {useDispatch, useSelector} from "react-redux";
import { useParams, useNavigate} from "react-router-dom"
import { message, Row,Col, Card, Button } from "antd";
import StripeCheckout from "react-stripe-checkout";



import { HideLoader, ShowLoader } from "../redux/loaderSlice";
import { getShowById} from "../api/show"
import {makePayment, bookShow as bookShowApi} from "../api/booking"
import moment from "moment";




const bookShow = () => {
    //Redux States and Hooks
    const {user} = useSelector((state:any) => state.user); // Extracting the user data from redux state.
    const dispatch = useDispatch(); // Redux dispatch function to dispatch actions.
    const [show, setShow] = useState<{ _id: string; bookedSeats: number[]; totalSeats: number; ticketPrice: number; date?: string; time?: string; movie?: { title: string }; theatre?: { name: string; address: string } } | null>(null); // State for managing and holding the show data or details.
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]); //state for managing the selected seats.
    const params = useParams(); // Extracting the parameters from the URL using useParams hook.
    const navigate = useNavigate(); // Hook to programmatically navigate to different routes.

    const getData = async () => {
        dispatch(ShowLoader());
        try{
            const response = await getShowById(params.id);
            if(response?.success){
                setShow(response.data) // Setting the show statae with the data fetched from the API.
                console.log("Loggin Show Data::::::::::", response.data);

            }else{
                message.error(response?.message || "Something went wrong");
                console.log("Display Error in fetching data", response?.message);

            }
            dispatch(HideLoader());

        }catch(error:any){
            console.log("Error in fetching data", error);
            message.error("error in fetching data", error.message);
            dispatch(HideLoader());
        }
    };

    const getSeats = () => {
        let columns = 12; // Number of columns for seating arrangement.
        let totalSeats = show?.totalSeats;
        let rows = Math.ceil((totalSeats ?? 0) / columns); // Calculate the number of rows based on total seats and columns.

        return (
            <>
            <div className="d-flex flex-column align-items-center">
                <div className="w-100 max-width-600 mx-auto mb-25px">
                    <p className="text-center mb-10px">
                        Screen this side, You will be watching from this direction.

                    </p>
                    <div className="screen-div">
                        {}

                    </div>

                </div>
                <ul className="seat-ul justify-content-center"
                    style={{ marginLeft : "30%"}} >
                        {Array.from(Array(rows).keys()).map((row) =>
            // Mapping rows
            Array.from(Array(columns).keys()).map((column) => {
              let seatNumber = row * columns + column + 1; // Calculating seat number

              let seatClass = "seat-btn"; // Default class for seat button
              if (selectedSeats.includes(seatNumber)) {
                seatClass += " selected"; // Adding 'selected' class if seat is selected
              }
              if (show?.bookedSeats.includes(seatNumber)) {
                seatClass += " booked"; // Adding 'booked' class if seat is already booked
              }
              if (totalSeats !== undefined && seatNumber <= totalSeats) {
                // Rendering seat button if seat number is valid
                return (
                  <li key={seatNumber}>
                    {/* Key added for React list rendering optimization */}
                    <button
                      className={seatClass}
                      onClick={() => {
                        // Function to handle seat selection/deselection
                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter(
                              (curSeatNumber) => curSeatNumber !== seatNumber
                            )
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                    >
                      {seatNumber}
                    </button>
                  </li>
                );
              }
            })
          )}
                </ul>
                <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mb-25px mt-3">
                    <div className="flex-1">
                        Selected Seats: <span>{selectedSeats.join(", ")}</span>
                    </div>
                    <div className="flex-shrinnk-0 ms-3">
                        Total Price: <span>Rs. {selectedSeats.length * show.ticketPrice}</span>

                    </div>

                </div>

            </div>
            </>
        );

    };
    useEffect( () => {
        getData();

    }, []);

    const onToken = async (token:any) => {
        console.log("Token::::::::::", token);
        try{
            dispatch(ShowLoader());
            const ticketPrice = show?.ticketPrice ?? 0; // Provide a fallback value of 0
            const response = await makePayment (
                token,
                selectedSeats.length * (show?.ticketPrice ?? 0) * 100
            );
            if (response?.success){
                message.success(response.message);
                book(response.data);

            }else {
                message.error(response?.message || "Something went wrong");
                console.log("Error in payment", response?.message);

            }
            dispatch(HideLoader());

        }catch(error:any){
            console.log("Token Error ::::::::::", error);

        }
    };
    const book = async (transactionId: string) => {
        try{
            dispatch(ShowLoader());
            if (show) {
                const response = await bookShowApi({
                    show: show._id,
                    transactionId,
                    seats: selectedSeats,
                    user: user._id,
                });
                if (response?.success) {
                    message.success(response.message);
                    navigate("/home");
                } else {
                    message.error(response?.message || "Something went wrong");
                    console.log("Error in booking tickets", response?.message);
                }
                dispatch(HideLoader());
            } else {
                message.error("Show data is not available.");
            }
            dispatch(HideLoader());
        }catch(error:any){
            console.log("Error in booking tickets::::::::::", error);
            message.error("Error in booking tickets", error.message);
        }

    };

    return (
        <>
        {
            show && (
                <Row gutter={24}>
                    <Col span={24}>
                    <Card 
                        title= {
                            <div className="movie-title-details">
                                <h1> {show?.movie?.title}</h1>
                                <p>
                                    Theatre : {show?.theatre?.name}, {show?.theatre?.address}
                                </p>

                            </div>
                        }
                        extra = {
                            <div className="show-name py-3">
                                <h3>
                                    <span>Date & Time</span>
                                    {moment(show?.date).format("DD-MM-YYYY")} 
                                    {moment(show?.time, "HH:mm").format("hh:mm A")}
                                </h3>
                                <h3>
                                    <span>Ticket Price:</span> Rs. {show?.ticketPrice}/-
                                </h3>
                                <h3>
                                    <span>Total Seats:</span>{show?.totalSeats}
                                    <span>&nbsp; | &nbsp; Available Seats : </span>{" "}
                                    {show?.totalSeats - show?.bookedSeats.length}
                                </h3>

                            </div>
                        }
                        style = {{ width: "100%" }}
                    >
                        {getSeats()}
                                <StripeCheckout
                                    token={onToken}
                                    billingAddress
                                    amount={selectedSeats.length * (show?.ticketPrice ?? 0) * 100}
                                    stripeKey="your-stripe-key"
                                >
                                    <Button type="primary" shape="round" size="large" className="w-100" block>
                                        Pay Now
                                    </Button>
                                </StripeCheckout>

                    </Card>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default bookShow;