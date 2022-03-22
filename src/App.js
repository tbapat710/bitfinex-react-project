import OrderBook from './components/OrderBook';
import CandleCharts from './components/CandleCharts';
import CandleFuncCharts from './components/CandleFuncCharts'
import './App.css';

function App() {
    return(
        <>
        <CandleFuncCharts/>
        <OrderBook/>
        </>
    )
}

export default App;


    // "server": "json-server -p3001 --watch db.json",
    // "proxy" : "localhost:3000"
    //https://bitfinex-react-project.herokuapp.com/
   