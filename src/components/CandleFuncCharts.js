import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import classes from './CandleFuncCharts.module.css'

  const optionsData={
    chart: {
      type: 'candlestick',
      height: 350,
      background: '#172d3e',
      zoom: {
        enabled: true}
    },
    title: {
      text: 'BTC/USD Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime',
      labels: {
          style:{
              colors:'#fff'
          }
      }
    },
    yaxis: {
        labels: {
            style:{
                colors:'#fff'
            }
        },
      min:undefined,
      max:undefined,
      tooltip: {
        enabled: true
      }
    }
    
  }

  const axios = require('axios')
  const baseUrl = "https://api-pub.bitfinex.com/v2/";
  
  const queryParams = "limit=50"

const CandleFuncCharts=()=>{

    
    const [options,setOptions]=useState(optionsData);
    const [value,setValue]=useState([])
    const [series,setSeries]=useState([]);
    const [duration,setDuration]=useState('1m')

    const pathParams = `candles/trade:${duration}:tBTCUSD/hist`

    useEffect(()=>{
        axios.get(`${baseUrl}/${pathParams}?${queryParams}`)
    .then(response => {
        
        setValue(response.data)
    }, error => {
        console.log(error);
    })
    },[value])

    useEffect(()=>{
        let OHLC=value.map((val)=>{
            return {
                x:new Date(val[0]),
                y: [val[1],val[2],val[3],val[4]]
            }
        })
        const updatedSeriesData=[{
            data:OHLC
        }]
        setSeries(updatedSeriesData)
        
    },[value])

    


    
    return(
        <div id="chart">
            <h1 className={classes.title}><span className={classes['bitfinex-text']}>BITFINEX</span></h1>
            <h3 className={classes.title}>Chart: BTC/USD</h3>
            <ReactApexChart options={options} series={series} type="candlestick" height={350} />
            <button onClick={()=>setDuration('1D')}>1D</button>
            <button onClick={()=>setDuration('30m')}>30m</button>
            <button onClick={()=>setDuration('1h')}>1h</button>
            <button onClick={()=>setDuration('12h')}>12h</button>
            <button onClick={()=>setDuration('1W')}>1W</button>
        </div>
        )
    }   

export default CandleFuncCharts;