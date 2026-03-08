import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router'; 
import FaceExpression from "../../Expression/components/FaceExpression";
import Player from '../components/Player';
import { useSong } from '../hooks/useSong';
import { useAuth } from '../../auth/hooks/useAuth'; 
import './Home.scss';

const Home = () => {
    // 1. Pull the pure, simplified data from your hook
    const { song, songsList, handleSong, playSpecificSong } = useSong();
    
    const { user, handleLogout } = useAuth(); 
    const navigate = useNavigate();
    
    const [historyTab, setHistoryTab] = useState('today');
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    const activeMood = song?.mood || 'neutral';
    const moodColor = '#ff6b00'; 

    // Search Debouncer
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    // Filter the list based on search
    const filteredSongs = songsList?.filter((track) => {
        const lowerCaseQuery = debouncedQuery.toLowerCase();
        return track.title?.toLowerCase().includes(lowerCaseQuery) || track.artist?.toLowerCase().includes(lowerCaseQuery);
    }) || [];

    const onLogoutClick = async () => {
        await handleLogout();
        navigate('/'); 
    };

    return (
        <div className="dashboard-wrapper">
            <nav className="dashboard-nav">
                <Link to="/" className="dashboard-nav__logo">
                    Moodify<span className="dot">•</span>
                </Link>
                <div className="dashboard-nav__user">
                    <span className="username">{user?.username || 'User'}</span>
                    <button onClick={onLogoutClick} className="logout-btn">Logout</button>
                </div>
            </nav>

            <div className="dashboard-grid">
                
                {/* LEFT: Camera */}
                <aside className="col-left">
                    <div className="glass-card capture-card">
                        <div className="card-header text-center">
                            <span className="brand-subtitle">MOODIFY</span>
                            <h2>Expression Capture</h2>
                        </div>
                        <div className="capture-window">
                            <FaceExpression onClick={(expression) => { handleSong({ mood: expression }) }} />
                        </div>
                    </div>
                </aside>

                {/* CENTER: Analysis & Player */}
                <main className="col-center">
                    <div className="glass-card mood-analysis-card">
                        <div className="analysis-info">
                            <span className="label">CURRENT MOOD ANALYSIS</span>
                            <h1 className="mood-text" style={{ color: moodColor }}>{activeMood}</h1>
                            <div className="match-bar-container">
                                <div className="match-bar-fill" style={{ width: '98%', backgroundColor: moodColor, boxShadow: `0 0 10px ${moodColor}` }}></div>
                            </div>
                            <span className="match-percentage" style={{ color: moodColor }}>98% match</span>
                        </div>
                        <div className="analysis-emoji">
                            {activeMood.toLowerCase() === 'happy' ? '😄' : activeMood.toLowerCase() === 'sad' ? '😢' : '😐'}
                        </div>
                    </div>

                    <div className="glass-card mood-history-card">
                        <div className="history-header">
                            <div>
                                <span className="label">MOOD HISTORY</span>
                                <h3>Today's Timeline</h3>
                            </div>
                            <div className="live-indicator"><span className="dot"></span> LIVE</div>
                        </div>
                        <div className="history-tabs">
                            <button className={`tab-btn ${historyTab === 'today' ? 'active' : ''}`} onClick={() => setHistoryTab('today')}>TODAY</button>
                            <button className={`tab-btn ${historyTab === '7days' ? 'active' : ''}`} onClick={() => setHistoryTab('7days')}>7 DAYS</button>
                        </div>
                        <div className="history-list">
                            <div className="history-item">
                                <div className="history-indicator" style={{ backgroundColor: moodColor }}></div>
                                <span className="history-mood">Happy</span>
                                <span className="history-time">03:21 AM</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card player-wrapper-card">
                        {song ? <Player /> : <div className="empty-player">Detect a mood to start playing music</div>}
                    </div>
                </main>

                {/* RIGHT: List of Songs */}
                <aside className="col-right">
                    <div className="glass-card playlist-card">
                        <div className="card-header">
                            <h3>✨ AI Recommended for you</h3>
                        </div>
                        
                        <div className="search-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input 
                                type="text" 
                                placeholder="Search songs or artists..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} 
                            />
                        </div>

                        <div className="playlist-tracks">
                            {/* MAP OVER THE SONGS LIST */}
                            {filteredSongs.length > 0 ? (
                                filteredSongs.map((track, index) => (
                                    <div 
                                        key={track._id || track.id || index} 
                                        className={`track-item ${song?._id === track._id || song?.url === track.url ? 'active' : ''}`}
                                        onClick={() => playSpecificSong(track)}
                                    >
                                        <span className="track-number">{index + 1}</span>
                                        <img src={track.posterUrl} alt={track.title} className="track-item__poster" />
                                        <div className="track-item__info">
                                            <h4>{track.title}</h4>
                                            <p>{track.artist || 'Unknown Artist'}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-playlist">
                                    {songsList.length > 0 ? "No songs match your search." : "Waiting for mood detection..."}
                                </div>
                            )}
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
}

export default Home;