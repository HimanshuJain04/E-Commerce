import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

function ProductHighlights() {
    const [highlights, setHighlights] = useState([]);
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [currentHighlight, setCurrentHighlight] = useState('');

    const handlePlusClick = (event) => {
        event.preventDefault();
        setIsInputVisible(true);
    };

    const handleInputChange = (event) => {
        setCurrentHighlight(event.target.value);
    };

    const handleDeleteHighlight = (index) => {
        setHighlights(highlights.filter((h, i) => i !== index));
    };

    const handleSubmit = (e) => {
        if (e.key === 'Enter') {
            setHighlights([...highlights, currentHighlight]);
            setIsInputVisible(false);
            setCurrentHighlight('');
        }
    };

    return (
        <div>
            <button onClick={handlePlusClick}>
                <FaPlus /> Add Highlight
            </button>

            {isInputVisible && (
                <div>
                    <input
                        type="text"
                        value={currentHighlight}
                        onChange={handleInputChange}
                        onKeyDown={handleSubmit}
                    />
                    <button onClick={() => handleDeleteHighlight(highlights.length - 1)}>
                        <FaTrash />
                    </button>
                </div>
            )}

            {highlights.map((highlight, index) => (
                <div key={index}>
                    {highlight}
                    <button onClick={() => handleDeleteHighlight(index)}>
                        <FaTrash />
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ProductHighlights;