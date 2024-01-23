import React from "react";
import { useSelector } from "react-redux";
import Character from "./Character";

const MainPage = () => {
    const characters = useSelector((state) => state.characters.data.results);

    const charactersRender = characters.map((character) => {
        return (
            <Character
                key={character.id}
                id={character.id}
                name={character.name}
                image={character.image}
            />
        );
    });

    return (
        <div className="container">
            <div className="character-list">{charactersRender}</div>
        </div>
    );
};

export default MainPage;
