import { VictoryChart,VictoryCandlestick,VictoryAxis,VictoryTheme,VictoryZoomContainer,VictoryScatter,VictoryCursorContainer } from "victory";
import { useEffect,useState } from "react";
const CandleCharts=()=>{


  const axios = require('axios')
  const baseUrl = "https://api-pub.bitfinex.com/v2/";
  
  const queryParams = "limit=150"    

    const [value,setValue]=useState([])
    const [series,setSeries]=useState([]);
    const [duration,setDuration]=useState('12h')
    const [zoom,setZoom]=useState()
    const [cursor,setCursor]=useState()

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
                x: new Date(val[0]),
                open: Math.floor(val[1]),
                high: Math.floor(val[3]),
                low: Math.floor(val[4]),
                close: Math.floor(val[2])
            }
        })

        setSeries(OHLC)





        
    },[value])

  return(
    <VictoryChart
  theme={VictoryTheme.material}
  domainPadding={{ x: 25 }}
  scale={{ x: "time" }}
  width={1200}
  height={600}
  containerComponent={
    <VictoryZoomContainer responsive={false}
      zoomDimension="x"
      zoomDomain={zoom}
      onZoomDomainChange={()=>setZoom(this)}
    />
  }
>

<VictoryAxis tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`}/>
<VictoryAxis dependentAxis/>
<VictoryCandlestick
  candleColors={{ positive: "#008000", negative: "#c43a31" }}
  data={series}
  candleRatio={0.8}
  candleHeight={10}
  candleWidth={8}

animate={{
  duration: 2000,
  onLoad: { duration: 1000 }
}}
/>
</VictoryChart>
  )
}

export default CandleCharts;