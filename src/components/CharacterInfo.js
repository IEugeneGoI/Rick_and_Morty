import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { characterData } from "../redux/characterSlice";

const CharacterInfo = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const characterId = parseInt(params.chrid);
    const { characterInfo } = useSelector((state) => state.characters);

    useEffect(
        () => {
            dispatch(characterData(characterId));
        }, // eslint-disable-next-line
        []
    );

    return (
        <Link to={"/"}>
            <div className="character-info">
                <div className="character-info__wrapper">
                    <div className="character-info__image">
                        <img alt="character" src={characterInfo.image} />
                    </div>
                    <div className="character-info__attributes">
                        <h4>Name:</h4>
                        <p> {characterInfo.name}</p>
                        <h4>Status:</h4>
                        <p> {characterInfo.status}</p>
                        <h4>Gender:</h4>
                        <p> {characterInfo.gender}</p>
                        <h4>Species:</h4>
                        <p> {characterInfo.species}</p>
                        <h4>Origin:</h4>
                        <p>
                            {characterInfo.origin
                                ? characterInfo.origin.name
                                : "N/A"}
                        </p>
                        <h4>Location:</h4>
                        <p>
                            {characterInfo.location
                                ? characterInfo.location.name
                                : "N/A"}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CharacterInfo;
