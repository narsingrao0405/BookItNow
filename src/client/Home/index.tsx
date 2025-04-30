import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { message, Row, Col, Input } from 'antd';


import { ShowLoader, HideLoader } from "../redux/loaderSlice"
import { getAllMovies } from '../api/movie';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

function Home() {
  const [movies, setMovies] = useState<{ _id: string; title: string; description: string; duration: number; poster: string }[]>([]);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoader());
      const response = await getAllMovies();
      if (response?.success) {
        const allMovies = response.data;
        setMovies(
          allMovies.map((movie: any) => ({
            ...movie,
            key: `movie-${movie._id}`,
            title: movie.title,
            description: movie.description,
            duration: movie.duration,
          })
          ))

      } else {
        message.error(response?.message || "Something went wrong");
        console.log("Unable to fetch movies", response?.message);
      }


    } catch (error: any) {
      console.log("Error in fetching movies::::::", error);
      message.error("Error in fetching movies", error.message);
    } finally {
      dispatch(HideLoader());
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }


  return (
    <>
      <div>
        <Row className='justofy-content-center w-100' >
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Input placeholder='Type to Search for Movies'
              onChange={handleSearch}
              prefix={<SearchOutlined />}
            />
            <br />
            <br />
            <br />
            <br />
          </Col>
        </Row>

        <Row className="justify-content-center"
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {movies
            .filter((movie: any) =>
              movie.title.toLowerCase().includes(searchText.toLowerCase())

            )
            .map((movie) => (
              <Col
                className="mb-5"
                key={movie._id}
                xs={24} sm={24} md={12} lg={10} >
                <div className="text-center">
                  <img
                    src={movie.poster}
                    className="cursor-pointer"
                    alt={movie.title}
                    width={200}
                    style={{ borderRadius: "10px" }}
                    onClick={() => {
                      navigate(`/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                      );


                    }}
                  />

                </div>
                <h3
                  onClick={() => {
                    navigate(
                      `/movie/${movie._id}?date=$(moment().format("YYYY-MM-DD")`
                    )
                  }
                  }>
                  {movie.title}
                </h3>


              </Col>
            ))}
        </Row>
      </div>
    </>
  )
}

export default Home
