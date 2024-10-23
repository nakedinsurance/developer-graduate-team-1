import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="rounded overflow-hidden shadow-lg m-4 p-4">
            <div className="flex flex-col h-full">
                <div className="mb-2">
                    <h2 className="text-xl font-bold">{product.name}</h2>
                    <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <p className="text-gray-700 text-base mb-4">{product.description}</p>
                <div className="flex justify-between items-center mt-auto">
                    <div className="flex flex-col">
                        <span className="text-lg font-semibold">Price: ${product.price.toFixed(2)}</span>
                        <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Buy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
