import { getSong } from "../services/service.api"
import { useContext } from "react"
import { songContext } from "../song.context"

export const useSong = ()=>{
    const context = useContext(songContext)

    const {loading,setLoading,song,setSong, songsList, setSongsList} = context

    async function handleSong({ mood }) {
        setLoading(true);
        try {
            // Fetch from your Express backend
            const data = await getSong({ mood });
            
            // Extract the array of songs safely
            let fetchedSongs = [];
            if (Array.isArray(data)) {
                fetchedSongs = data;
            } else if (data.songs && Array.isArray(data.songs)) {
                fetchedSongs = data.songs; // In case backend returns { songs: [...] }
            } else if (data.song && Array.isArray(data.song)) {
                fetchedSongs = data.song; // In case backend returns { song: [...] }
            }

            if (fetchedSongs.length > 0) {
                setSongsList(fetchedSongs); // Put all songs in the right-hand list
                setSong(fetchedSongs[0]);   // Auto-play the first one
            } else {
                setSongsList([]);
                setSong(null);
            }
        } catch (error) {
            console.error("Error fetching songs:", error);
        } finally {
            setLoading(false);
        }
    }

    // Function to run when a user clicks a song in the list
    const playSpecificSong = (clickedSong) => {
        setSong(clickedSong);
    };

    // Return exactly what the UI needs, nothing more.
    return { loading, song, songsList, handleSong, playSpecificSong };
}