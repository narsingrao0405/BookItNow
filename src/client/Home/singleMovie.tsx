import React from "react";

import moment from "moment";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Input, Row, Col, message } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import {useEffect} from "react";

import { ShowLoader, HideLoader } from "../redux/loaderSlice";
import { getMovieById } from "../api/movie";
import { getALlTheatresByMovie } from "../api/theatre";

const siingleMovie = () => {
    const params = useParams();
    const [movie, setMovie] = useState();
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [theatres, setTheatres] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDate = (e: any) => {
        setDate(moment(e).format("YYYY-MM-DD"));
        navigate(`/movie/${params.id}?date=${e.target.value}`);

    }

    const getData = async () => {
        try{
            dispatch(ShowLoader());
            if (params.id) {
                const response = await getMovieById(params.id);
                if (response?.success){
                    setMovie(response.data);
                }else{
                    message.error(response?.message || "Something went wrong");
                }
                dispatch(HideLoader());

            } else {
                console.error("Movie ID is undefined");
                message.error("Movie ID is undefined");
                dispatch(HideLoader());
            }


        }catch(error:any){
            console.log("Unbale to fetch movie data", error);
            message.error("Unable to fetch movie data", error.message);
            dispatch(HideLoader());
        }
    }

    const getAllTheatres = async () => {
        console.log("Feathing theatres");
        try{
            dispatch(ShowLoader());
            const response = await getALlTheatresByMovie({movie: params.id, date});
            if(response?.success){
                setTheatres(response.data);
            }else{
                message.error(response?.message || "Something went wrong");
            }
            dispatch(HideLoader());

        }catch(error:any){
            console.log("Unable to fetch theatres", error);
            message.error("Unable to fetch theatres", error.message);
            dispatch(HideLoader());

        }
    };

    useEffect( () => {
        getData();
    }, [] );

    useEffect ( () => {
        getAllTheatres();
    } , [date])


    return(
        <>
            <div className="inner-container">
                {movie && (
                    <div className="d-flex single-movie-div">
                        <div className="flex-Shrink-0 me-3 single-movie-img">
                            <img width={150} alt="movie-poster" src={movie?.poster} />
                        </div>
                        <div className="w-100">
                            <h1 className="mt-0">{movie?.title}</h1>
                            <p className="movie-data" > 
                                Language : <span>{movie?.language}</span>
                            </p>
                            <p className="movie-data" > 
                                Genre : <span>{movie?.genre}</span>
                            </p>
                            <p className="movie-data" > 
                                Release Date : {" "}
                                <span>{moment(movie?.date).format("MMM DD YYYY")}</span>
                            </p>
                            <p className="movie-data" > 
                                Duration : <span>{movie?.duration} mins</span>
                            </p>

                            <hr />
                            <div className="d-flex flex-column-mob align-items mt-3  "> 
                                <label className="me-3 flex-shrink-0">
                                    Choose Date :
                                </label>
                                <Input
                                    type="date"
                                    className="max-wdith-300 mt-8px-mob"
                                    placeholder="Deafault Size"
                                    prefix={<CalendarOutlined />}
                                    onChange={handleDate}
                                    value={date}
                                />
                            </div>

                        </div>
                    </div>
                )}
                {theatres && theatres.length == 0 && (
                        <div className="pt-3">
                            <h2 className="blue-clr">
                                currently No theatres are available for this movie.
                            </h2>
                        </div>
                )}

                {theatres && theatres.length > 0 && (
                    <div className="theatre-wrapper mt-3 pt-3">
                        <h2>
                            Theatres
                        </h2>
                        {theatres.map((theatre:any) => {
                            return(
                                <div key={theatre._id}>
                                    <Row gutter={24}>
                                        <Col xs={{span:24}} lg={{span:8}}>
                                        <h3>{theatre.name}</h3>
                                        <p>{theatre.address}</p>
                                        </Col>
                                        <Col xs={{span:24}} lg={{span:16}}>
                                        <ul className="show-ul">
                                            {theatre.shows
                                                .sort(
                                                    (a:any, b:any) => moment(a.time, "HH:mm").valueOf() - moment(b.time, "HH:mm").valueOf()
                                                )
                                                .map((singleShow:any) => {
                                                    return(
                                                        <li
                                                            key={singleShow._id}
                                                            onClick={() =>{
                                                                navigate(`/book-show/${singleShow._id}`);

                                                            }}
                                                            >
                                                                {moment(singleShow.time, "HH:mm").format("hh:mm A")}

                                                        </li>
                                                    );
                                                })}

                                        </ul>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        
                        })}
                    </div>
                )}
            </div>

        </>
    );

};

export default siingleMovie;