import React from "react";

const CourseDetails = () => {
    const handleBuyCourse = () => {
        const token = localStorage.getItem("token");

        if (token) {
            console.log("Buying course...");
            return;
        }

        console.log("Please login first");
    };

    return (
        <div className="flex items-center">
            <button
                className="bg-yellow-300 p-6 mt-10"
                onClick={handleBuyCourse}
            >
                Buy Now
            </button>
        </div>
    );
};

export default CourseDetails;