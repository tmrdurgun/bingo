import { Component } from "react";
import React from 'react';

import BingoHelper from '../utils/BingoHelper';
import logo from '../assets/image/TamerBingo-2.png';
import bg from '../assets/image/bg.jpeg';
import HelperFunctions from '../utils/HelperFunctions';
import applause from '../assets/audio/applause.mp3';
import Particles from "react-tsparticles";

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

    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
      
  }

  async componentDidMount(){
    this.setState({data: await this.helperFunctions.chunk(this.initData())});
  }

  particlesInit(main) {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  }

  particlesLoaded(container) {
    console.log(container);
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

  resetData = async () => this.setState({data: await this.helperFunctions.chunk(this.initData())})
  
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
        this.setState((prevState) => ({
          isBingo: prevState.totalBingo < 2 ? isBingo : false,
          celebrate: prevState.totalBingo < 2 ? true : false,
          totalBingo: prevState.totalBingo += 1
        }))
      }
    })
  }

  handleCloseCelebrate = async () => {
    this.setState({celebrate: false}); 
    this.resetData();
  }
    
  render() {
    const { celebrate, data } = this.state;

    return (
      <div className="page-container">

      <div className="page-header">
         <div id="logo">
            <img src={logo} alt="" />
          </div>
        
          <h3 className="page-title">
            Welcome to Bingo App
          </h3>

          <p className="page-desc">
            Topic: The 20 Most Popular Lies We Tell Every Day
          </p>
      </div>
        
      {celebrate && <div className="celebrate" onClick={() => this.handleCloseCelebrate()}>

          <Particles
          id="tsparticles"
          init={this.particlesInit}
          loaded={this.particlesLoaded}
          options={{
            fpsLimit: 60,
            fullScreen: {
              enable: true
            },
            background: {
              color: "#232323",
              opacity: 0
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onClick: { enable: true, mode: "push" },
                onHover: {
                  enable: true,
                  mode: "repulse",
                  parallax: { enable: false, force: 60, smooth: 10 }
                },
                resize: true
              },
              modes: {
                bubble: { distance: 400, duration: 2, opacity: 0.8, size: 40, speed: 3 },
                grab: { distance: 400, links: { opacity: 1 } },
                push: { quantity: 4 },
                remove: { quantity: 2 },
                repulse: { distance: 200, duration: 0.4 }
              }
            },
            particles: {
              color: { value: "random" },
              links: {
                color: "random",
                distance: 150,
                enable: false,
                opacity: 0.4,
                width: 1
              },
              move: {
                attract: { enable: false, rotateX: 600, rotateY: 1200 },
                bounce: false,
                direction: "none",
                enable: true,
                out_mode: "out",
                random: false,
                speed: 3,
                straight: false
              },
              rotate: {
                animation: {
                  enable: true,
                  speed: 10,
                  sync: false
                }
              },
              number: { density: { enable: true, area: 800 }, value: 100 },
              opacity: {
                animation: { enable: true, minimumValue: 0.5, speed: 1, sync: false },
                random: false,
                value: 1
              },
              shape: {
                character: [
                  {
                    fill: true,
                    font: "Verdana",
                    value: [
                      "🤡", 
                      String.fromCodePoint(0x1F604), 
                      String.fromCodePoint(0x1F925), 
                      String.fromCodePoint(0x1F388), 
                      String.fromCodePoint(0x1F389),
                      String.fromCodePoint(0x1F44F),
                      String.fromCodePoint(0x2728),
                      String.fromCodePoint(0x2B50),
                      String.fromCodePoint(0x2B55)
                    ],
                    style: "",
                    weight: 400
                  }
                ],
                image: {
                  height: 100,
                  replace_color: true,
                  src: "images/github.svg",
                  width: 100
                },
                polygon: { nb_sides: 5 },
                stroke: { color: "random", width: 1 },
                type: "char"
              },
              size: {
                anim: { enable: true, minimumValue: 8, speed: 20, sync: false },
                random: { minimumValue: 8, enable: true },
                value: 32
              }
            },
            detectRetina: true
          }}
        />

        <audio autoPlay>
            <source src={applause} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
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