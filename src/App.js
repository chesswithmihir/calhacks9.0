import './App.css';
import Productivity from './Productivity.js';
import Navbar from './Navbar.js';
import Home from './Home.js';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [productivityView, setProductivityView] = useState(true);
  const [homeView, setHomeView] = useState(false);
  const [activities, setActivities] = useState([]);

  function changeToHome() {
    axios({
      url: "http://127.0.0.1:5000/readExpected/",
      method: "POST"}).then((response) => {
      setActivities(response)
      console.log(response)
    });
    setHomeView(true);
    setProductivityView(false);
  }


  return (
    <div className="App">
      <Navbar setHome = {changeToHome} setProductivity = {setProductivityView}/>
      {productivityView && <Productivity />}
      {homeView && <Home activities={activities.data}/>}
    </div>
  );
}

export default App;
