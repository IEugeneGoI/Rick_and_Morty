import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Oval } from "react-loader-spinner";

import { dataload } from "./redux/characterSlice";
import { checkLoadingUpdate } from "./redux/characterSlice";
import MainPage from "./components/MainPage";
import CharacterInfo from "./components/CharacterInfo";
import ToTopButton from "./components/ToTopButton";

function App() {
    const { checkLoading } = useSelector((state) => state.characters);
    const { statusLoadingData } = useSelector((state) => state.characters);
    const dispatch = useDispatch();
    

    useEffect(
        () => {
            dispatch(dataload("https://rickandmortyapi.com/api/character"));
        }, // eslint-disable-next-line
        []
    );

    const handleScroll = () => {
        if (
            window.location.pathname === "/" &&
            window.innerHeight + window.scrollY >=
                document.getElementById("root").offsetHeight - 100 &&
            !checkLoading
        ) {
            dispatch(checkLoadingUpdate(true));
            dispatch(dataload());
        }
    };

    useEffect(
        () => {
            window.addEventListener("scroll", handleScroll);

            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }, // eslint-disable-next-line
        [checkLoading]
    );

    return (
        <>
            {statusLoadingData === 1 && (
                <Oval
                    height={200}
                    width={200}
                    color="#4fa94d"
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={10}
                    strokeWidthSecondary={10}
                    wrapperClass="spinner"
                />
            )}
            {statusLoadingData === 2 && (
                <Router>
                    <Routes>
                        <Route exact path="/" element={<MainPage />} />
                        <Route
                            path="/character/:chrid"
                            element={<CharacterInfo />}
                        />
                    </Routes>
                </Router>
            )}
            {statusLoadingData === 3 && "Error"}
            <ToTopButton />
        </>
    );
}

export default App;
