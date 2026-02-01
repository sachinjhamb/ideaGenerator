import React from 'react';
import WeekPicker from './WeekPicker';
import { getWeekDates } from '../utils/dateUtils';

const Header = ({ displayWeek, currentWeek, showPicker, setShowPicker, setDisplayWeek, year }) => {
    return (
        <header className="header">
            <div className="title-section">
                <h1>Leadership Pulse</h1>
                <div className="date-range">{getWeekDates(displayWeek, year)}</div>
            </div>

            <div className="nav-container">
                <button className="nav-btn" onClick={() => setDisplayWeek(prev => Math.max(1, prev - 1))}>←</button>
                <div className="week-trigger" onClick={() => setShowPicker(!showPicker)}>
                    Week {displayWeek} {displayWeek === currentWeek && "(Current)"}
                    <span className="chevron"> {showPicker ? '▲' : '▼'}</span>
                </div>
                <button className="nav-btn" onClick={() => setDisplayWeek(prev => prev + 1)}>→</button>
            </div>

            <WeekPicker
                displayWeek={displayWeek}
                currentWeek={currentWeek}
                showPicker={showPicker}
                setShowPicker={setShowPicker}
                setDisplayWeek={setDisplayWeek}
            />
        </header>
    );
};

export default Header;
