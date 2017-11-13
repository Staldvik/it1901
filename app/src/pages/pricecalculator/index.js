import React, { Component } from 'react';
import database from '../../database'
import './style.css';

/**
 * Component used to render the Price Calculator page
 */
export default class PriceCalculator extends Component {

  constructor(props) {
    super(props);
    let sceneCost = new Map();
    let sceneCapacity = new Map();

    this.state = {
      artistCost: 0, //payment to artist for playing 
      sceneCost: "", //all costs related to rigging and paying staff
      otherCost: 0, //other costs with the concert
      sceneCapacity: "",
      ticketSales: "", // number of tickets sold
      profitMargin: 0, 


      sceneOptions: [],
      selectedScene:"",
      sceneCost: sceneCost,
      sceneCapacity: sceneCapacity,
    }

    //bind functions to the component
    this.handleChange = this.handleChange.bind(this);
    this.calculatePrice = this.calculatePrice.bind(this);
    this.styleResult = this.styleResult.bind(this);
    this.calculateCapacitySold = this.calculateCapacitySold.bind(this);
    this.calculateTotalCost = this.calculateTotalCost.bind(this);
  }

  /**
   * Fetches scenes from the database
   */
  componentWillMount(){
    let prevSceneOptions = this.state.sceneOptions;
    let prevSceneCost = this.state.sceneCost;
    let prevSceneCapacity = this.state.sceneCapacity;
    
      //get scenes from database
      database.ref(this.props.state.festival).child('scenes').on('child_added', snap => {
          var vals = snap.val();
          console.log(snap.key)
          
          prevSceneCapacity.set(snap.key, vals.capacity) //map to get name of scene from key
          prevSceneCost.set(snap.key, vals.cost) //map to get name of scene from key
          
          prevSceneOptions.push(
            <option value={snap.key} key={snap.key}> {vals.name} </option>
          )
          this.setState({
            sceneOptions: prevSceneOptions,
            selectedScene: prevSceneOptions[0].key, //sets the dropdown automatically to the first element, in case you don't select before submitting
            sceneCapacity: prevSceneCapacity,
            sceneCost: prevSceneCost,
           
          })
      })

  }

    /**
     * Keeps state synced with fields
     * @param {event} e 
     */
    handleChange(e) {
   
        this.setState({
          [e.target.name]: e.target.value,
        })
      console.log(e.target.name + " set to " + e.target.value)
  
    }

    /**
     * Calculates percentage of sold capacity
     */
    calculateCapacitySold(){
      let sceneCapacity = parseInt(this.state.sceneCapacity.get(this.state.selectedScene))
      let ticketSales = parseInt(this.state.ticketSales)
      if(ticketSales > sceneCapacity){
        return "Ticket sales must be within scene capacity";
      }
      return Math.floor((ticketSales/sceneCapacity)*100) + " % of capacity"
    }

    /**
     * Calculates the total cost of the concert
     */
    calculateTotalCost(){
      let artistCost = parseInt(this.state.artistCost)
      let sceneCost = parseInt(this.state.sceneCost.get(this.state.selectedScene))
      let otherCost = parseInt(this.state.otherCost)
      let totalCost = artistCost + sceneCost + otherCost;
      return totalCost
    }

    /**
     * Calculates ticket price
     */
    calculatePrice(){
      let sceneCapacity = parseInt(this.state.sceneCapacity.get(this.state.selectedScene))
      let ticketSales = parseInt(this.state.ticketSales)
      let profitMargin = parseInt(this.state.profitMargin)
      
      if(ticketSales > sceneCapacity){
        return "Ticket sales must be within scene capacity";
      }

      let totalCost = this.calculateTotalCost();
      let ticketPrice = Math.floor((totalCost + profitMargin) / ticketSales)
      return ticketPrice +" NOK"
      
    }

    /**
     * Styles the result based on valid ratio between ticket sales and scene capacity
     */
    styleResult(){
      let sceneCapacity = parseInt(this.state.sceneCapacity.get(this.state.selectedScene))
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



    
  /**
   * Renders the page
   */
  render() {
    let ticketPrice = this.calculatePrice();
    let divStyle = this.styleResult();
    let capacitySold = this.calculateCapacitySold(); 

    return (
      <div className="App">
        
        
        <form id="ticketPriceCalculator">
        <select name="selectedScene" value={this.state.selectedScene} onChange={this.handleChange}>
              {this.state.sceneOptions}
            </select>
            <div style={divStyle}>Capacity: {this.state.sceneCapacity.get(this.state.selectedScene)}</div>
            <div style={divStyle}>Scene Cost: {this.state.sceneCost.get(this.state.selectedScene)}</div>

          <section> 
            <label form="ticketPriceCalculator"> Profit Margin </label>
            <input name="profitMargin" type="number" value={this.state.profitMargin} onChange={this.handleChange}/><br></br>
          </section> 
          
          
          <section>  
            <label form="ticketPriceCalculator"> Artist Cost </label>
            <input name="artistCost" type="number" value={this.state.artistCost} onChange={this.handleChange}/> <br></br>
            <label form="ticketPriceCalculator"> Other Cost </label>
            <input name="otherCost" type="number" value={this.state.otherCost} onChange={this.handleChange}/> <br></br>
          </section>
          
          <section>
           <label form="ticketPriceCalculator"> Ticket Sales</label>
            <input name="ticketSales" type="number" value={this.state.ticketSales} onChange={this.handleChange}/><br></br>
            <input name="ticketSales" type="range" min="0" max={this.state.sceneCapacity.get(this.state.selectedScene)} step={this.state.sceneCapacity.get(this.state.selectedScene)/10} value={this.state.ticketSales} onChange={this.handleChange}/>
            <div style={divStyle}>{capacitySold}</div>
          </section>
            <br></br>
            <h4>Ticket Price Estimate</h4>
            <div style={divStyle}>{ticketPrice}</div>
           
        </form>
      </div>
    );
  }
}