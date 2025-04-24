import React, {useState} from "react";
import { Table, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { getAllMovies } from "../api/movie";
import MovieForm from "./movieForm";




const MovieList: React.FC = () => {
    const [isModelOPen, setIsModelOPen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<{ _id: string } | null>(null);
    const [formType, setFormType] = useState("add");
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    
    const fakeMovieData = [
        {
            key: "1",
            poster: "https://via.placeholder.com/50",
            name: "Movie 1",
            releaseDate: "2023-01-01",
            duration: "120 min",
            rating: "8.5",
        },
        {
            key: "2",
            poster: "https://via.placeholder.com/50",
            name: "Movie 2",
            releaseDate: "2023-02-01",
            duration: "150 min",
            rating: "7.5",
        },
        {
            key: "3",
            poster: "https://via.placeholder.com/50",
            name: "Movie 3",
            releaseDate: "2023-03-01",
            duration: "90 min",
            rating: "9.0",
        },
    ]
    const [movies, setMovies] = useState<Array<{
        key: string;
        poster: string;
        name: string;
        releaseDate: string;
        duration: string;
        rating: string;
        language?: string;
        genre?: string;
    }>>(fakeMovieData);

    const getMovieData = async () => {
        dispatch({ type: "SET_LOADING", payload: true });
        try{
            const response = await getAllMovies({});
            const allMovies = (response as { data: any }).data;
            console.log("Get All Movies Response:::::::", allMovies);
            setMovies(allMovies.map((movie: any) => ({
                ...movie,
                key: movie._id,
            })));
            dispatch({ type: "SET_MOVIE_LIST", payload: allMovies });
        }catch(error:any){
            console.error("Error fetching all Movies:", {message: error.message, response: error.response?.data, status: error?.response?.status});
            //dispatch({ type: "SET_ERROR", payload: error.message });
        }finally{
            //dispatch({ type: "SET_LOADING", payload: false });
        }
    }
    React.useEffect(() => {
        // Add any necessary logic here or leave it empty if not needed
    }, []);

    
    //const movies = await getAllMovies();
    const tableHeading = [
        {
            title: "Poster",
            dataIndex: "poster",
            render: (text: string, data: { poster: string }) => <img src={data.poster} alt="Movie Poster" style={{ width: "50px", height: "50px", objectFit: "cover" }} />,

            //render : (text: string, record: { releaseDate: string }) => <span>{record.releaseDate}</span>,
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
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Movie List</h1>
                <Button
                    type="primary"
                    onClick={() => {
                        setIsModelOPen(true);
                        setFormType("add");
                    }}
                >
                    Add Movie
                </Button>
            </div>
            <Table
                columns={tableHeading}
                dataSource={movies}
                pagination={false}
                className="mt-4"
            />
            {
                
                    isModelOPen && (
                        <MovieForm
                            isModelOPen={isModelOPen}
                            setIsModelOPen={setIsModelOPen}
                            formType={formType}
                            selectedMovie={selectedMovie}
                            serSelectedMovie={setSelectedMovie}
                            getMovieData={getMovieData}
                        />
                    )
                }
                {
                    isDeleteModelOpen && (
                        <DeleteMovie
                            isDeleteModelOpen={isDeleteModelOpen}
                            setIsDeleteModelOpen={setIsDeleteModelOpen}
                            selectedMovie={selectedMovie}
                            getMovieData={getMovieData}
                        />

                    )
                
            }
            
        </>
    );
};

export default MovieList;