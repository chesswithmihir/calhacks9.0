import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Logs(){

    const [tvd, setTVD] = useState(-1)
    const [totalScore, setTotalScore] = useState(0)

    useEffect(() =>{
        axios({
            url: 'http://127.0.0.1:5000/readTVD/',
            method: "POST"
        }) .then((response) => {
            console.log(response)
            setTVD(response.data.TVD)
          })

          axios({
            url: 'http://127.0.0.1:5000/findTotalScore/',
            method: "POST"
        }) .then((response) => {
            console.log(response)
            setTotalScore(response.data.total)
          })
    }, [])

    return(
        <div>
            <div class = "prompt">
                <h1>Here are some stats:</h1>
            </div>

            <div class = "stats">
                <h2>{tvd != -1 ? "Your TVD for today is " + tvd : "No stats have yet been entered today!"}</h2>
                <h2>{tvd != -1 ? "Your total points are " + totalScore : ""}</h2>
            </div>

        </div>
    );
}

export default Logs;