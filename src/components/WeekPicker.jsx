import React from 'react';

const WeekPicker = ({ displayWeek, currentWeek, showPicker, setShowPicker, setDisplayWeek }) => {
    if (!showPicker) return null;

    return (
        <div className="week-picker">
            <h3>Jump to a week</h3>
            <div className="picker-grid">
                {Array.from({ length: 52 }, (_, i) => i + 1).map(w => (
                    <div
                        key={w}
                        className={`picker-cell ${w === displayWeek ? 'active' : ''} ${w === currentWeek ? 'current' : ''}`}
                        onClick={() => {
                            setDisplayWeek(w);
                            setShowPicker(false);
                        }}
                    >
                        {w}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeekPicker;
