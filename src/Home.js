import React from 'react';
import './Productivity.css';
import useState from 'react';

function Home(props){

    const {activities} = props;
    const [actualValues, setActualValues] = useState({});

    const saveValues = () => {
        let temp = actualValues;
        for (const i in activities){
            temp[document.getElementById(i).value] = document.getElementById(i + "1").value;
        }
        setActualValues(temp);
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
                            {activities?.map(activity => <input id = {activity} value={activity} readonly = "readonly" />)}
                        </form>
                    </div>
                </div>

                <div class = "right">
                    <div class = "formLabels">
                        <h2> Hours</h2>
                    </div>
                    <div class = "form">
                        <form class = "formLayout">
                            {activities?.map(activity => <input id = {activity + "1"} type="text" />)}
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