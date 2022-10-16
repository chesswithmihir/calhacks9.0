import React from 'react';
import './Productivity.css';
import { useState } from 'react';
import axios from "axios";

function Productivity(){

    const [currRow, setCurrRow] = useState(1);
    const [rowNameInputs, setRowNameInputs] = useState(
        [<input id = {0} type = "text"/>]
    );
    const [rowHourInputs, setRowHourInputs] = useState(
        [<input id = {1} type = "text"/>]
    );



    const [activities, setActivities] = useState({});



    const saveValues = () => {
        console.log(rowHourInputs)
        console.log(rowNameInputs)
        let temp = {...activities}
        for (let i = 0; i < currRow; i++) {
            console.log(document.getElementById(i*2).value)
            console.log(document.getElementById(i*2+1).value)
            temp[document.getElementById(i*2).value] = document.getElementById(i*2+1).value
        }
        setActivities(temp);
        console.log(temp);
        console.log("JSON " + JSON.stringify(temp));
        axios({
            url: 'http://127.0.0.1:5000/addExpected/' + JSON.stringify(temp).toString(),
            method: "POST"
        }) .then((response) => {
            console.log(response)
          })
        console.log("HI")
    }

    const addInput = () => {
        setCurrRow(currRow+1);
        console.log(currRow);
        setRowNameInputs(oldInputs => [...oldInputs, <input id = {currRow*2} type = "text"/>])
        setRowHourInputs(oldInputs => [...oldInputs, <input id = {currRow*2+1} type = "text"/>])
    }


    return(
        <div>
            <div class = "prompt">
                <h1>Please Enter in your productivity goals:</h1>
            </div>

            <div class = "table">
                <div class = "left">
                    <div class = "formLabels">
                        <h2> Name of Activity</h2>
                    </div>
                    <div class = "form">
                        <form class = "formLayout">
                            {Object.values(rowNameInputs)}
                        </form>
                    </div>
                </div>

                <div class = "right">
                    <div class = "formLabels">
                        <h2> Hours</h2>
                    </div>
                    <div class = "form">
                        <form class = "formLayout">
                            {Object.values(rowHourInputs)}
                        </form>
                    </div>
                </div>
            </div>

            <div class = "add">
                <button onClick = {addInput}> Add </button>
            </div>
            <div class = "save">
                <button onClick = {saveValues}> Save </button>
            </div>
        </div>
    );
}

export default Productivity;
