import React from "react";
import { Table, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { getAllMovies } from "../api/movie";




const MovieList: React.FC = () => {
    const [isModelOPen, setIsModelOPen] = React.useState(false);
    const [selectedMovie, setSelectedMovie] = React.useState<{ _id: string } | null>(null);
    const [formType, setFormType] = React.useState("add");
    const [isDeleteModelOpen, setIsDeleteModelOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [movies, setMovies] = React.useState([]);

    const getMovieData = async () => {
        dispatch({ type: "SET_LOADING", payload: true });
        try{
            const response = await getAllMovies({});
            const allMovies = (response as { data: any }).data;
            console.log("Get All Movies Response:::::::", allMovies);
            setMovies (allMovies.map((movie: any) => ({
                key: movie._id,
                name: movie.name,
                poster: movie.poster,
                releaseDate: movie.releaseDate,
                duration: movie.duration,
                rating: movie.rating,
                genre : movie.genre,
                
            })));
            dispatch({ type: "SET_MOVIE_LIST", payload: allMovies });
        }catch(error:any){
            console.error("Error fetching all Movies:", {message: error.message, response: error.response?.data, status: error?.response?.status});
            dispatch({ type: "SET_ERROR", payload: error.message });
        }finally{
            dispatch({ type: "SET_LOADING", payload: false });
        }
    }

    
    //const movies = await getAllMovies();
    const tableHeading = [
        {
            title: "Poster",
            dataIndex: "poster",
            render: (text: string, data: { poster: string }) => <img src={data.poster} alt="Movie Poster" style={{ width: "50px", height: "50px", objectFit: "cover" }} />,


        },
        {
            title: "Movie Name",
            dataIndex: "name",
        },
        {
            title: "Release Date",
            dataIndex: "releaseDate",
            render : (text: string, data: { releaseDate: string }) => <span>{data.releaseDate}</span>,
        },
        {
            title: "Duration",
            dataIndex: "duration",

        },
        {
            title: "Rating",
            dataIndex: "rating",
        },
        {
            title: "Language",
            dataIndex: "language",
        },
        {
            title: "Genre",
            dataIndex: "genre",
        },
        {
            title: "Action",
            render : (text:string, data : { _id: string }) => (
                <div>
                    <Button
                        onClick={() =>{
                            setIsModelOPen(true)
                            setSelectedMovie(data)
                            setFormType("edit")
                            }}
                    > <EditOutlined /> </Button>
                    <Button
                        onClick={() => {
                            setIsDeleteModelOpen(true)
                            setSelectedMovie(data)

                        }}> <DeleteOutlined /> </Button>
                </div>
            )
        }
    ]
    return (
        <>
            <div>
                <Table dataSource={fakeMovieData} columns={tableHeading} pagination={false} rowKey="key" bordered>

                </Table>
            </div>
        </>
    );
};

export default MovieList;