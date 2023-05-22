import { Route, Routes } from "react-router-dom";
import {login_route, home_route, signup_route, profile_route, films_route, serials_route, new_route, search_route, details_route, film_details, serial_details} from "./Routes";
import React from 'react'
import { Box } from "@mui/system";
import MainPage from "../MainPage/MainPage";
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
import ProfilePage from "../Profile/ProfilePage";
import FilmsPage from "../Pages/FilmsPage";
import SerialsPage from "../Pages/SerialsPage";
import NewFilmsPage from "../Pages/NewFilmsPage";
import SearchPage from "../Search/SearchPage";
import MovieDetails from "../DetailsMovie/MovieDetails";
import SerialDetails from "../DetailsMovie/SerialDetails";


function Router() {  
  return (
    <Box>
        <Routes>
            <Route path={home_route} element={<MainPage />}></Route>
            <Route path={login_route} element={<LoginPage />}></Route>
            <Route path={signup_route} element={<SignupPage />}></Route>
            <Route path={profile_route} element={<ProfilePage />}></Route>
            <Route path={films_route} element={<FilmsPage />}></Route>
            <Route path={serials_route} element={<SerialsPage />}></Route>
            <Route path={new_route} element={<NewFilmsPage />}></Route>
            <Route path={search_route} element={<SearchPage />}></Route>
            <Route path={film_details} element={<MovieDetails />}></Route>
            <Route path={serial_details} element={<SerialDetails />}></Route>
        </Routes>
    </Box>
  )
}

export default Router
