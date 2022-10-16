import './App.css';
import Productivity from './Productivity.js';
import Navbar from './Navbar.js';
import Home from './Home.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Log from './Logs.js';

function App() {
  const [productivityView, setProductivityView] = useState(true);
  const [homeView, setHomeView] = useState(false);
  const[logView, setLogView] = useState(false);
  const [activities, setActivities] = useState([]);

  function change() {
    axios({
      url: "http://127.0.0.1:5000/readExpected/",
      method: "POST"}).then((response) => {
      setActivities(Object.keys(response.data))
      console.log(response)
    });

    if(activities.length > 0){
      setProductivityView(false)
      setLogView(false)
      setHomeView(true)
    }
    else{
      setProductivityView(true)
      setHomeView(false)
      setLogView(false)
    }
  }

  function changeToHome(preSet) {
    if (preSet) {
      setActivities(preSet);
    }
    else{
      axios({
        url: "http://127.0.0.1:5000/readExpected/",
        method: "POST"}).then((response) => {
        setActivities(Object.keys(response.data))
        console.log(response)
      });
    }
    setHomeView(true);
    setProductivityView(false);
    setLogView(false);
  }

  function changeToLogs() {
    setHomeView(false);
    setProductivityView(false);
    setLogView(true)
  }

  useEffect(() => {
    axios({
      url: "http://127.0.0.1:5000/readExpected/",
      method: "POST"}).then((response) => {
      console.log(response)
      setActivities(Object.keys(response.data))
      if (Object.keys(response.data).length == 0) {
        setProductivityView(true);
        setHomeView(false)
      }
      else {
        setProductivityView(false);
        setHomeView(true);
      }
      console.log(response)
    });
  }, []);

  return (
    <div className="App">
      <Navbar setHome = {changeToHome} change = {change} setLogs = {changeToLogs}/>
      {productivityView && <Productivity switchView={changeToHome} />}
      {homeView && <Home activities={activities}/>}
      {logView && <Log />}
    </div>
  );
}

export default App;
