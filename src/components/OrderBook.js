import { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import classes from './OrderBook.module.css'

const baseUrl = "https://api-pub.bitfinex.com/v2/";
const pathParams = "book/tBTCUSD/P0"
const queryParams = "len=100"
const axios=require('axios');

const OrderBook=()=>{
    const [order,setOrder]=useState([])
    useEffect(()=>{
    axios.get(`${baseUrl}/${pathParams}?${queryParams}`)
        .then(response => {
            // console.log(response.data);
            setOrder(response.data)
        }, error => {
            console.log(error);
        })
    },[order])
    
    // useEffect(()=>{
    //   getData()
    // },[])
    
    // const getData=async()=>{
    //   const response=await fetch(`https://api-pub.bitfinex.com/v2/book/tBTCUSD/P0?len=100`).then((resp)=>resp.json());
    //   console.log(response)
    //   console.log(response.data);
    // }
      return (
        <div className="App">
          <h1 className={classes.title}><span className={classes['bitfinex-text']}>BITFINEX</span></h1>
          <h3 className={classes.title}>Order Book: BTC/USD</h3>
          <div className={classes['table-wrapper']}>
          <Table aria-label="simple table" className={classes['table-container']}>  
            <TableHead className={classes['table-head']}>
              <TableRow>
            
                <TableCell align="right">Count</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Price</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody className={classes['table-body']}>
              {order.map((data) => {
                if(data[2]>0){
                
                  return(
                <TableRow >
                  
                  <TableCell align="right">{data[1]}</TableCell>
                  <TableCell align="right">{data[2]}</TableCell>
                  <TableCell align="right">{data[1]*data[2]}</TableCell>
                  <TableCell align="right">{data[0]}</TableCell>

                </TableRow>
                  )}
              })}
            </TableBody>
            </Table>

            <Table aria-label="simple table" className={classes['table-container']}>  
            <TableHead className={classes['table-head']}>
              <TableRow>
            
                <TableCell align="right">Count</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Price</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody className={classes['table-body']}>
              {order.map((data) => {
                // console.log(data)
                if(data[2]<=0){
                
                return(
                <TableRow >
                  
                  <TableCell align="right">{data[1]}</TableCell>
                  <TableCell align="right">{Math.abs(data[2])}</TableCell>
                  <TableCell align="right">{Math.abs(data[1]*data[2])}</TableCell>
                  <TableCell align="right">{data[0]}</TableCell>

                </TableRow>
                )}
              })}
            </TableBody>
            </Table>

            
            </div>
          </div>
      );
}
export default OrderBook;