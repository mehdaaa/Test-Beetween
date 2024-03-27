import './App.css';
import {useEffect, useState} from "react";
import Card from "./Card";

function App() {

  const [jobs, setJobs] = useState([]);


  async function getJobs(){
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
          "http://localhost:3001/getJobs",
          requestOptions
      );
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateJobs(){

    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
          "http://localhost:3001/updateJobs",
          requestOptions
      );
      setTimeout(() => {
        getJobs();
      }, 1000)

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {

    getJobs();

  }, []);

  return (
    <div className="App">
      <button onClick={() => updateJobs()}>Actualiser</button>
      {jobs.length ? jobs.map((job) => (
          <Card key={job._id} company={job.company} city={job.city} address={job.address}/>
      )) : null }

      {/*<table>
        <thead>
          <tr>
            <th>Company</th>
            <th>City</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
        {jobs.length ? jobs.map((job) => (
              <tr key={job._id}>
                <th>{job.company}</th>
                <th>{job.city}</th>
                <th>{job.address}</th>
              </tr>
          )) : null }
        </tbody>
      </table>*/}
    </div>
  );
}

export default App;
