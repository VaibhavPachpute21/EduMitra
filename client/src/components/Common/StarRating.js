import React from 'react';

const StarRating = ({ grade }) => {
    const fullStars = Math.floor(grade / 2);
    const hasHalfStar = grade % 2 !== 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<i key={i} class="bi bi-star-fill text-warning"></i>);
    }
    if (hasHalfStar) {
        stars.push(<i key="half" className="bi bi-star-half text-warning" ></i>);
    }
    while (stars.length < 5) {
        stars.push(<i key={stars.length} className="bi bi-star text-warning" ></i>);
    }

    return (
        <div>
            {stars.map((star, index) => (
                <span key={index}>{star}</span>
            ))}
        </div>
    );
};

export default StarRating;
