import React, {useEffect, useState} from "react";
import {Button, Table} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch }  from "react-redux";
import moment from "moment";

// Removed local Movie interface to avoid conflict


import {ShowLoader, HideLoader} from "../redux/loaderSlice";
import MovieForm from "./movieForm";
import DeleteMovieModal  from "./DeleteMovieModal";
import {getAllMovies} from "../api/movie";

function movieList() {
    const fakeMovie = [
        {
            key: "1",
import {ShowLoader, HideLoader} from "../redux/loaderSlice";
import { Movie } from "./movieForm"; // Import the correct Movie interface
            description : "Movie 1 description",
            duration : 120,
            genre : "Action",
            language : "English",
            releaseDate : "2023-01-01",
            name : "Kalki 2891 AD"
        },
        {
            key: "2",
            poster : "poster2.jpg",
            description : "Movie 2 description",
            duration : 150,
            genre : "Drama",
            language : "Hindi",
            releaseDate : "2023-02-01",
            name : "RRR"
        },
        {
            key: "3",
            poster : "poster3.jpg",
            description : "Movie 3 description",
            duration : 90,
            genre : "Comedy",
            language : "English",
            releaseDate : "2023-03-01",
            name : "SSMB 28"
        }
    ];
    const tableHeadings = [
        {
            title: "poster",
            dataIndex : "poster",
            render : ( text : string, data : any) => {
                return (
                    <img 
                        height="100px"
                        style={{objectFit : "cover"}}
                        src = {data.poster}
                        width="100px"
                        alt = {data.name}
                    />

                );
            },
        },
        {
            title: "Movie Name",
            dataIndex : "name",
        },
        {
            title : "Description",
            dataIndex : "description",
        },
        {
            title : "Duration",
            dataIndex: "duration",
        },
        {
            title: "Genre",
            dataIndex: "genre",
        },
        {
            title : "Language",
            dataIndex : "language",
        },
        {
            title: "Release Date",
            dataIndex: "releaseDate",
            render : (text: any, data : any) => {
                return(
                    <div>
                    <Button 
                        onClick= {
                            () => {
                                setIsModalOpen(true);
                                setSelectedMovie(data);
                                setFormType("edit");
                            }
                        }
                    >
                        <EditOutlined />
                    </Button>
                    <Button
                        onClick= {
                            () => {
                                setIsDeleteModalOpen(true);
                                setSelectedMovie(data);
                                //setFormType("delete");
                            }
                        }
                        >
                    <DeleteOutlined />
                    </Button>
                    </div>
                );
            },
        },
        

    ];
    const [movies , setMovies ] = useState ([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [formType, setFormType] = useState<"add" | "edit">("add");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const dispatch = useDispatch();

    const getData = async () => {
        dispatch(ShowLoader());
        const response = await getAllMovies();
        const allMovies = (response as { data: any }).data;
        setMovies(
            allMovies.map(function (movie : any){
                return {
                    ...movie,
                    key : `${movie._id}`
                };
            })
        );
        
    }

    useEffect( () => {
        getData();
    }, [] );

    return (
        <div className="d-flex justify-content-end">
            <Button
                onClick={() => {
                    setIsModalOpen(true);
                    setFormType("add");
                }}>
                Add Movie
            </Button>

            <Table dataSource={movies} columns = {tableHeadings} pagination={false} />

            { isModalOpen && (
                <MovieForm
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    selectedMovie={selectedMovie}
                    formType={formType}
                    getData={getData}
                    setSelectedMovie={setSelectedMovie}              
                />

            )}
            { isDeleteModalOpen && (
                <DeleteMovieModal
                    isDeleteModalOpen = {isDeleteModalOpen}
                    setIsDeleteModalOpen = { setIsDeleteModalOpen}
                    selectedMovie = {selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    getData = {getData}
                />

            )}
        </div>
    );
    
}
export default movieList;