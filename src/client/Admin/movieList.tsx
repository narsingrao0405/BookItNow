import React from "react";
import { Table } from "antd";

const MovieList: React.FC = () => {
    const fakeMovieData = [
        {
            poster: "https://via.placeholder.com/150",
            name: "Movie 1",
            releaseDate: "2023-01-01",
            duration: "120 min",
            rating: "8.5",
            key: "1",
            language: "English",
            genre: "Action",


        },
        {
            poster: "https://via.placeholder.com/150",
            name: "Movie 2",
            releaseDate: "2023-02-01",
            duration: "90 min",
            rating: "7.5",
            key: "2",
            language: "Telugu",
            genre: "Drama",

        },
        {
            poster: "https://via.placeholder.com/150",
            name: "Movie 3",
            releaseDate: "2023-03-01",
            duration: "150 min",
            rating: "9.0",
            key: "3",
            language : "Hindi",
            genre: "Comedy",

        }
    ]
    const tableHeading = [
        {
            title: "Poster",


        },
        {
            title: "Movie Name",
            dataIndex: "name",
        },
        {
            title: "Release Date",
            dataIndex: "releaseDate",
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