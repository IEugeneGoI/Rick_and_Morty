import React, { useState, useEffect } from "react";

import arrowTop from './../assets/img/arrow-top.svg'

const ToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className={`to-top-button ${isVisible ? "visible" : ""}`}
            onClick={scrollToTop}
        >
            <img src={arrowTop} alt="arrow-top"/>
        </div>
    );
};

export default ToTopButton;
