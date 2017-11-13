import React, { Component } from 'react';


import './style.css';

export default class PriceCalculator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bandCost: "", //payment to band for playing 
      sceneCost: "", //all costs related to rigging and paying staff
      otherCost: 0, //other costs with the concert
      sceneCapacity: "",
      ticketSales: "", // number of tickets sold
      profitMargin: 0, 
    }

    //bind functions to the component
    this.handleChange = this.handleChange.bind(this);
    this.calculatePrice = this.calculatePrice.bind(this);
    this.styleResult = this.styleResult.bind(this);
    this.calculateCapacitySold = this.calculateCapacitySold.bind(this);
    this.calculateTotalCost = this.calculateTotalCost.bind(this);
  }


    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value,
      })
  
    }

    calculateCapacitySold(){
      let sceneCapacity = parseInt(this.state.sceneCapacity)
      let ticketSales = parseInt(this.state.ticketSales)
      if(ticketSales > sceneCapacity){
        return "Ticket sales must be within scene capacity";
      }
      return Math.floor((ticketSales/sceneCapacity)*100) + " % of capacity"
    }

    calculateTotalCost(){
      let bandCost = parseInt(this.state.bandCost)
      let sceneCost = parseInt(this.state.sceneCost)
      let otherCost = parseInt(this.state.otherCost)
      let totalCost = bandCost + sceneCost + otherCost;
      return totalCost
    }

    calculatePrice(){
      let sceneCapacity = parseInt(this.state.sceneCapacity)
      let ticketSales = parseInt(this.state.ticketSales)
      let profitMargin = parseInt(this.state.profitMargin)
      
      if(ticketSales > sceneCapacity){
        return "Ticket sales must be within scene capacity";
      }

      let totalCost = this.calculateTotalCost();
      let ticketPrice = Math.floor((totalCost + profitMargin) / ticketSales)
      return ticketPrice +" NOK"
      
    }

    styleResult(){
      let sceneCapacity = parseInt(this.state.sceneCapacity)
      let ticketSales = parseInt(this.state.ticketSales)
      
      const validStyle = {
        color: 'green',
        fontWeight: 'bold', //have to write camelCase when setting CSS in this way
      }
      const errorStyle = {
        color: 'red',
      }
      if(ticketSales > sceneCapacity){
        return errorStyle;
      }
      return validStyle
    }



      

  render() {
    let ticketPrice = this.calculatePrice();
    let divStyle = this.styleResult();
    let capacitySold = this.calculateCapacitySold(); 

    return (
      <div className="App">
        
        
        <h1>
          Ticket Price Estimation:
        </h1>
        
        <form id="ticketPriceCalculator">
          <section>
            <h4>Costs:</h4>
            <label form="ticketPriceCalculator">Scene Cost </label>
            <input name="sceneCost" type="number" value={this.state.sceneCost} onChange={this.handleChange}/> <br></br>
            <label form="ticketPriceCalculator">Band Cost </label>
            <input name="bandCost" type="number" value={this.state.bandCost} onChange={this.handleChange}/> <br></br>
            <label form="ticketPriceCalculator">Other Cost </label>
            <input name="otherCost" type="number" value={this.state.otherCost} onChange={this.handleChange}/> <br></br>
          </section>
          
          <section>
            <h4>Income:</h4>
            Scene capacity: <input name="sceneCapacity" type="number" value={this.state.sceneCapacity} onChange={this.handleChange}/><br></br>
            Ticket Sales: <input name="ticketSales" type="number" value={this.state.ticketSales} onChange={this.handleChange}/><br></br>
            <input name="ticketSales" type="range" min="0" max={this.state.sceneCapacity} step={this.state.sceneCapacity/10} value={this.state.ticketSales} onChange={this.handleChange}/>
            <div style={divStyle}>{capacitySold}</div>
          </section>
          
          <section> 
            <h4>Variables:</h4>
            Profit Margin: <input name="profitMargin" type="number" value={this.state.profitMargin} onChange={this.handleChange}/><br></br>
          </section> 

            <br></br>
            <br></br>
            <h2>Ticket Price Estimate</h2>
            <div style={divStyle}>{ticketPrice}</div>
           
        </form>
      </div>
    );
  }
}