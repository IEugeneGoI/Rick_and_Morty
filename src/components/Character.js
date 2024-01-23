import React from "react";
import { Link } from "react-router-dom";

const Character = ({ id, name, image }) => {
    return (
        <div className="character-card">
            <Link to={`/character/${id}`}>
                <div className="character-card__wrapper">
                    <img src={image} alt="character" />
                    <p>{name}</p>
                </div>
            </Link>
        </div>
    );
};

export default Character;
