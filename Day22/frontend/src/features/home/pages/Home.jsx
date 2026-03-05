import React from 'react'
import FaceExpression from "../../Expression/components/FaceExpression"
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'
import './Home.scss'

const Home = () => {

    const { handleSong } = useSong()

    return (
        <div className="home">
            <div className="home__header">
                <h1>MoodBeats</h1>
                <p>Detect your emotion and play music that matches your mood</p>
            </div>

            <div className="home__container">
                <div className="home__detection">
                    <FaceExpression
                        onClick={(expression) => { handleSong({ mood: expression }) }}
                    />
                </div>
                <div className="home__player">
                    <Player />
                </div>
            </div>
        </div>
    )
}

export default Home
