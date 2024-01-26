import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';


const HighlightInput = ({ highlights, onAddHighlight, onDeleteHighlight, onHighlightChange }) => {
    const handleAddHighlight = (e) => {
        e.preventDefault();
        onAddHighlight();
    };

    const handleDeleteHighlight = (e, index) => {
        e.preventDefault();
        onDeleteHighlight(index);
    };

    return (
        <div className='rounded-md w-full h-[200px] relative flex flex-col gap-2'>
            {highlights.length > 0 ? (
                <ul className='rounded-md flex h-[180px] scrollbar-hide pb-12 p-2 overflow-auto flex-col gap-2'>
                    {highlights.map((highlight, index) => (
                        <li
                            key={index}
                            className='flex justify-between items-center'
                        >
                            <input
                                type="text"
                                value={highlight}
                                className='outline-none border-2 border-[black]/[0.15] p-1 rounded-md'
                                onChange={(e) => onHighlightChange(index, e.target.value)}
                            />
                            <button onClick={(e) => handleDeleteHighlight(e, index)}>
                                <AiOutlineDelete />
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-center py-5 text-2xl">Highlights</p>
            )}

            <div className='w-full flex justify-center absolute bottom-0 items-center'>
                <button
                    className='bg-blue-700 text-white flex gap-1 mx-2 w-full justify-center items-center rounded-md px-2 py-1'
                    onClick={(e) => handleAddHighlight(e)}>
                    <AiOutlinePlus /> <span>Add</span>
                </button>
            </div>
        </div>
    );
};




const ProductHighlights = ({ formdata, setFormdata }) => {

    const onAddHighlight = () => {
        setFormdata((prevData) => ({
            ...prevData,
            highlights: [...prevData.highlights, ''],
        }));
    };

    const onHighlightChange = (index, value) => {
        setFormdata((prevData) => {
            const updatedHighlights = [...prevData.highlights];
            updatedHighlights[index] = value;
            return {
                ...prevData,
                highlights: updatedHighlights,
            };
        });
    };

    const onDeleteHighlight = (index) => {
        setFormdata((prevData) => {
            const updatedHighlights = [...prevData.highlights];
            updatedHighlights.splice(index, 1);
            return {
                ...prevData,
                highlights: updatedHighlights,
            };
        });
    };

    return (
        <div>
            {/* Other form fields */}
            <HighlightInput
                highlights={formdata.highlights}
                onAddHighlight={onAddHighlight}
                onDeleteHighlight={onDeleteHighlight}
                onHighlightChange={onHighlightChange}
            />
        </div>
    );
};

export default ProductHighlights;
