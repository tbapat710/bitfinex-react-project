import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

const axios=require('axios')

const baseUrl = "https://api-pub.bitfinex.com/v2/";
const pathParams = "book/tBTCUSD/P0"
const queryParams = "len=100"
function App() {
useEffect(()=>{
axios.get(`${baseUrl}/${pathParams}?${queryParams}`)
    .then(response => {
        console.log(response);
    }, error => {
        console.log(error);
    })
},[])
  return (
    <div className="App">
      <h1>bitfinex</h1>
      {/* <button onClick={fetchData}>Get Trades Data</button> */}
    </div>
  );
}

export default App;
