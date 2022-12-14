import React from 'react';
import './Productivity.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home(props){

    const {activities} = props;
    const [actualValues, setActualValues] = useState({'': ''});


    const saveValues = () => {
        let temp = actualValues;
        for (const i of activities){
            console.log(i)
            temp[document.getElementById(i).value] = document.getElementById(i + "1").value;
        }
        setActualValues(temp);
        axios({
            url: 'http://127.0.0.1:5000/addActual/' + JSON.stringify(temp).toString(),
            method: "POST"
        }) .then((response) => {
            console.log(response)
          })
    }

    useEffect(() => {
        axios({
            url: 'http://127.0.0.1:5000/readActual/',
            method: "POST"
        }) .then((response) => {
            console.log()
            setActualValues(response.data)
          })
    }, [])

    const modifyHours = (e, activity) => {
        let temp = actualValues
        temp[activity] = e.target.value
        console.log(temp)
        setActualValues(temp)
        console.log(actualValues)
    }

    return(
        <div>
            <div class = "prompt">
                <h1>Please Enter in Productivity for Today:</h1>
            </div>

            <div class = "table">
                <div class = "left">
                    <div class = "formLabels">
                        <h2> Name of Activity</h2>
                    </div>
                    <div class = "form">
                        <form class = "formLayout">
                            {activities?.map(activity => <input id = {activity} value={activity} readOnly = "readonly" />)}
                        </form>
                    </div>
                </div>

                <div class = "right">
                    <div class = "formLabels">
                        <h2> Hours</h2>
                    </div>
                    <div class = "form">
                        <form class = "formLayout">
                            {activities?.map(activity => <input id = {activity + "1"} defaultValue={actualValues[activity]} type="text" />)}
                        </form>
                    </div>
                </div>
            </div>
            <div class = "save">
                <button onClick = {saveValues}> Save </button>
            </div>
        </div>
    );
}

export default Home;