import React from 'react';

function Card({company, city, address}) {
    return (
        <div className="card">
            <h2>{company}</h2>
            <h4>{city}</h4>
            <p>{address}</p>
        </div>
    );
}

export default Card;