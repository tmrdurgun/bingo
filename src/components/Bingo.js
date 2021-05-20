import { Component, useState } from "react";
import React from 'react';

import BingoHelper from '../utils/BingoHelper';
import logo from '../assets/image/TamerBingo-2.png';
import bg from '../assets/image/bg.jpeg';
import HelperFunctions from '../utils/HelperFunctions';

export default class Bingo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isBingo: false,
      totalBingo: 0,
      data: null,
      celebrate: false
    }

    this.bingoHelper = new BingoHelper();
    this.helperFunctions = new HelperFunctions();
      
  }

  async componentDidMount(){
    this.setState({data: await this.helperFunctions.chunk(this.initData())})
  }

  initData = () => {
    const titles = [
      "I'm fine, nothing is wrong.",
      "I was stuck in traffic.",
      "You look great in that.",
      "I only had one beer.",
      "My phone died.",
      "I had no way to contact you.",
      "I never got the message.",
      "I'll call you right back.",
      "It didn't cost that much.",
      "It was on sale.",
      "Oh, this old thing? I've had it for ages.",
      "I'm on the way.",
      "Thanks, it's just what I've always wanted.",
      "You've lost weight.",
      "You haven't changed a bit.",
      "I didn't touch it.",
      "I have no idea where it is.",
      "I'll try to make it.",
      "I have a headache.",
      "I would never lie to you.",
      "I love you.",
      "I don't tell anybody else.",
      "You deserve better than me.",
      "I don't really watch TV.",
      "It's so great to see you.",
    ]

    return titles.map((item, i) => {
      return {
        id: i,
        title: item,
        isSelected: false,
      }
    })
  }
  
  handleItemSelect = async (rowItem) => {

    let { data } = this.state;
    let newData = [];

    /* Toggle selected state */
    newData = data.map((row, i) => {
      row.map((rItem, rIndex) => {
        if(rItem.id === rowItem.id) {
          rItem.isSelected = !rItem.isSelected;
        }
        return rItem;
      })
      return row;
    })

    /* replace state data as updated data */
    this.setState((prevState) => ({
      data: newData
    }), async () => {
      /* Check for bingo pattern */
      const isBingo = await this.bingoHelper.isBingo(this.state.data);
  
      if(isBingo) {
        this.setState({
          isBingo,
          celebrate: true
        })
      }
    })
  }
    
  render() {
    const { isBingo, celebrate, data } = this.state;

    return (
      <div className="page-container">
          <div id="logo">
            <img src={logo} alt="" />
          </div>
        
        <h3>
          Welcome to Bingo App
        </h3>
  
        <p className="page-title">
          Topic: The 20 Most Popular Lies We Tell Every Day
        </p>
        
        {celebrate && <div className="celebrate" onClick={() => this.setState({celebrate: false})}>
            <iframe src="https://giphy.com/embed/3oz9ZE2Oo9zRC" frameBorder="0" className="giphy-embed" allowFullScreen={false}></iframe>
          </div>}

        <div className="card-container" style={{background: `url(${bg})`}}>
          {data && data.map((row, index) => {
            return row.map((rowItem, rowItemIndex) => <div className={`item ${rowItem.isSelected ? 'selected' : ''}`} onClick={() => this.handleItemSelect(rowItem)}><span>{rowItem.title}</span></div>)
          })}
        </div>
       
      </div>
    );
  }    
}