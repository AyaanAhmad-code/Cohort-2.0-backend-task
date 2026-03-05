import { useState } from "react";
import { createContext } from "react";

export const songContext = createContext()

export const SongContextProvider = ({children}) =>{
    const [ song, setSong ] = useState({
        "url": "https://ik.imagekit.io/aqckbmvqu/cohort-2/moodify/songs/Main_Hoon_-_PagalNew_Oh6_KZxPH.mp3",
        "posterUrl": "https://ik.imagekit.io/aqckbmvqu/cohort-2/moodify/posters/Main_Hoon_-_PagalNew_-JfYE8Rqv.jpeg",
        "title": "Main Hoon - PagalNew",
        "mood": "happy",
    })

    const [loading, setLoading] = useState(false)

    return (
        <songContext.Provider value={{loading,setLoading,song, setSong}}>
            {children}
        </songContext.Provider>
    )
}