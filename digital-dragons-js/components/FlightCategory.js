import React from 'react';

const FlightCategory = ({ title, price, selectedCategory, handleCategoryChange }) => {
  return (
        <div className="flight-category text-center">
            <h3 className="">{title}</h3>
            <p className="">{price}$</p>
            <button
                className={`${
                selectedCategory === title ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                } mt-2 px-4 py-1 rounded text-center`}
                onClick={() => handleCategoryChange(title)}
            >
                {selectedCategory === title ? 'Seleccionado' : 'Seleccionar'}
            </button>
        </div>

  );
};

export default FlightCategory;
