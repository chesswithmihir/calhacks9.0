import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Logs.css'

function Logs(){

    const [tvd, setTVD] = useState(-1)
    const [totalScore, setTotalScore] = useState(0)
    const [expected, setExpected] = useState({})

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

          axios({
            url: "http://127.0.0.1:5000/readExpected/",
            method: "POST"}).then((response) => {
                setExpected(response.data)
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

            <div class = "expected">
                <h3>These are your goals for today:</h3>
                {Object.keys(expected).map(exp => <h4>{exp} - {expected[exp]}</h4>)}
            </div>

            <div class = "about">
                <p>How to interpret these stats:<br/>
                    TVD (Total Variation Distance): TVD is a metric for comparing the proportion of time you've allocated for each activity
                    with the proportion of time you had planned to spend on each activity. <br/> A TVD score close to 0 means you've met your goal;
                    the proportion of time spent on each activity resembles that of your goals!  
                    <br/> <br/>
                    Points: Points are a fun rewards based system for meeting your goals! The lower your TVD score, the more points you get that day!
                </p>
            </div>

        </div>
    );
}

export default Logs;