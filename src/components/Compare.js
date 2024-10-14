import React from 'react';
import {useEffect,useState} from "react"
import queryService from "../services/queryService"
import '../styles/Compare.css';

const Compare = () => {

  const [data, setData] = useState([]);

    const fetchdata = async ()=>{
        const res = await queryService.fetchAllData();
        setData(res.data);
    }
    useEffect(()=>{
        fetchdata();
    },[]);
  return (<div>
    <section className="location-comparison">
      <h2>Compare Air Quality Between Locations</h2>
      <div className="locations">
        <div className="location-picker">
          <h3>Location 1</h3>
          <select>
            <option value="">Select Location</option>
            <option value="location1">West Building</option>
            <option value="location2">Gettysburg Hotel</option>
            <option value="location3">Gettysburger</option>
          </select>
        </div>
        <div className="location-picker">
          <h3>Location 2</h3>
          <select>
            <option value="">Select Location</option>
            <option value="location1">West Building</option>
            <option value="location2">Gettysburg Hotel</option>
            <option value="location3">Gettysburger</option>
          </select>
        </div>
      </div>
      <button className="compare-btn">Compare</button>

      <div className="graph-placeholder">
        <p>Graph showing comparison will be displayed here.</p>
      </div>
    </section>



<div>
        This is home page
        {data.length > 0 && (
            <ul>
                {data.map((item, index) => ( 
                    <li key={index}>
                        <p>Measurement of data point is {item._measurement}</p>
                        <p>Field value is {item._field}</p>
                        <span>value is {item._value}</span>
                    </li>
                ))}
            </ul>
        )}
    </div>
  </div>);
};

export default Compare;
