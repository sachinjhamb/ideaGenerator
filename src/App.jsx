import React, { useState, useEffect } from 'react';
import { leaders } from './data/ideas';
import { getCurrentWeek } from './utils/dateUtils';
import { fetchWeeklyIdeas, fetchTrendingHeadlines } from './services/ideaService';
import { logger } from './utils/logger';
import Header from './components/Header';
import LeaderCard from './components/LeaderCard';
import TrendingHeadlines from './components/TrendingHeadlines';

function App() {
    const [currentWeek, setCurrentWeek] = useState(0);
    const [displayWeek, setDisplayWeek] = useState(0);
    const [showPicker, setShowPicker] = useState(false);
    const [weeklyIdeas, setWeeklyIdeas] = useState(null);
    const [trendingHeadlines, setTrendingHeadlines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newsLoading, setNewsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userState, setUserState] = useState(() => {
        const saved = localStorage.getItem('leadership_pulse_state');
        return saved ? JSON.parse(saved) : {};
    });
    const [activeNote, setActiveNote] = useState(null);

    useEffect(() => {
        logger.init();
        const actualWeek = getCurrentWeek();
        setCurrentWeek(actualWeek);
        setDisplayWeek(actualWeek);

        const loadNews = async () => {
            setNewsLoading(true);
            const news = await fetchTrendingHeadlines();
            setTrendingHeadlines(news);
            setNewsLoading(false);
        };
        loadNews();
    }, []);

    useEffect(() => {
        const loadIdeas = async () => {
            if (displayWeek === 0) return;
            setLoading(true);
            setError(null);
            try {
                const data = await fetchWeeklyIdeas(displayWeek);
                setWeeklyIdeas(data);
            } catch (err) {
                setError('Failed to load leadership pulse. Using fallback data.');
            } finally {
                setLoading(false);
            }
        };
        loadIdeas();
    }, [displayWeek]);

    useEffect(() => {
        localStorage.setItem('leadership_pulse_state', JSON.stringify(userState));
    }, [userState]);

    const getStateKey = (week, leaderId, index) => `${week}-${leaderId}-${index}`;

    const toggleTodo = (week, leaderId, index) => {
        if (week > currentWeek) return;
        const key = getStateKey(week, leaderId, index);
        setUserState(prev => ({
            ...prev,
            [key]: { ...prev[key], completed: !prev[key]?.completed }
        }));
    };

    const cyclePriority = (e, week, leaderId, index, defaultPriority) => {
        e.stopPropagation();
        if (week > currentWeek) return;
        const key = getStateKey(week, leaderId, index);
        const currentPriority = userState[key]?.priority || defaultPriority;
        const priorities = ['High', 'Medium', 'Low'];
        const nextPriority = priorities[(priorities.indexOf(currentPriority) + 1) % priorities.length];
        setUserState(prev => ({
            ...prev,
            [key]: { ...prev[key], priority: nextPriority }
        }));
    };

    const updateNote = (week, leaderId, index, note) => {
        const key = getStateKey(week, leaderId, index);
        setUserState(prev => ({
            ...prev,
            [key]: { ...prev[key], note }
        }));
    };

    const getRolloverTasks = (leaderId, targetWeek) => {
        // Note: in a fully dynamic environment, this should ideally be handled on the server
        // or by keeping a cached version of previous data.
        // For this version, we will return an empty array or implement a simplified local check if possible.
        return [];
    };

    const isFuture = displayWeek > currentWeek;
    const year = new Date().getFullYear();

    return (
        <div className="app-container">
            <Header
                displayWeek={displayWeek}
                currentWeek={currentWeek}
                showPicker={showPicker}
                setShowPicker={setShowPicker}
                setDisplayWeek={setDisplayWeek}
                year={year}
            />

            {loading ? (
                <div className="loading-state" style={{ textAlign: 'center', padding: '100px' }}>
                    <div className="spinner" style={{ border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid var(--primary)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
                    <p style={{ color: 'var(--text-muted)' }}>Syncing Leadership Pulse...</p>
                </div>
            ) : error ? (
                <div className="error-alert" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '1rem', borderRadius: '12px', margin: '2rem auto', maxWidth: '600px', textAlign: 'center' }}>
                    {error}
                </div>
            ) : (
                <main className="leaders-grid">
                    {leaders.map(leader => {
                        const idea = isFuture ? null : (weeklyIdeas ? weeklyIdeas[leader.id] : null);
                        const rollovers = getRolloverTasks(leader.id, displayWeek);
                        const futureTasks = isFuture ? [
                            { text: "Upcoming Focus - To be defined", priority: "Medium" },
                            { text: "Future Initiative - To be defined", priority: "Low" }
                        ] : [];

                        const allTasks = [
                            ...rollovers,
                            ...(isFuture ? futureTasks.map((t, i) => ({ ...t, week: displayWeek, index: i }))
                                : (idea?.todos.map((t, i) => ({ ...t, week: displayWeek, index: i })) || []))
                        ].slice(0, 5);

                        return (
                            <LeaderCard
                                key={leader.id}
                                leader={leader}
                                idea={idea}
                                isFuture={isFuture}
                                allTasks={allTasks}
                                userState={userState}
                                toggleTodo={toggleTodo}
                                cyclePriority={cyclePriority}
                                activeNote={activeNote}
                                setActiveNote={setActiveNote}
                                updateNote={updateNote}
                            />
                        );
                    })}
                </main>
            )}

            <TrendingHeadlines headlines={trendingHeadlines} loading={newsLoading} />
        </div>
    );
}

export default App;
