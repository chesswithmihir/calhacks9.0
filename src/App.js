import './App.css';
import Productivity from './Productivity.js';
import Navbar from './Navbar.js';
import Home from './Home.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [productivityView, setProductivityView] = useState(true);
  const [homeView, setHomeView] = useState(false);
  const [activities, setActivities] = useState([]);

  function changeToHome(preSet) {
    if (preSet) {
      setActivities(preSet);
    }
    else{
      axios({
        url: "http://127.0.0.1:5000/readExpected/",
        method: "POST"}).then((response) => {
        setActivities(response.data)
        console.log(response)
      });
    }
    setHomeView(true);
    setProductivityView(false);
  }

  useEffect(() => {
    axios({
      url: "http://127.0.0.1:5000/readExpected/",
      method: "POST"}).then((response) => {
      setActivities(response.data)
      if (response.data.length == 0) {
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
      <Navbar setHome = {changeToHome} setProductivity = {setProductivityView}/>
      {productivityView && <Productivity switchView={changeToHome} />}
      {homeView && <Home activities={activities}/>}
    </div>
  );
}

export default App;
