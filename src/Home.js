import React from 'react';
import { useState } from 'react';

function Home(){

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

        </div>
    );
}

export default Home;