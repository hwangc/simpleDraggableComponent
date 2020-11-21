import React, { Component } from 'react'
import './App.css';

function TopContainer(props) {
  const dest = "top"
  return (
    <div className="container top" onDrop={(evt) => props.drop(evt, dest)} onDragOver={(evt) => props.dragOver(evt)} >
      <div className="header">Top container</div>
      <div className="main" >
        { props.box && <div id="top" draggable className="box" onDragStart={(evt) => props.dragStart(evt)}>Box</div> }
      </div>
    </div>
  )
}

function BottomContainer(props) {
  const dest = "bottom"
  return (
    <div className="container bottom" onDrop={(evt) => props.drop(evt, dest)} onDragOver={(evt) => props.dragOver(evt)} >
      <span className="header">Bottom container</span>
      <div className="main">
        { props.box && <div id="bottom" draggable className="box" onDragStart={(evt) => props.dragStart(evt)}>Box</div> }
      </div>
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isBoxOnTop: true 
    }
    this.onDrop = this.onDrop.bind(this)
  }

  onDrop(evt, dest) {
    const startContainer = evt.dataTransfer.getData("text");
    const dropContainer = dest
    if (startContainer === dropContainer)
      return
    this.setState((state) => ({
      isBoxOnTop: (startContainer === 'top') ? false: true
    }))
  }

  onDragStart(evt) {
    evt.dataTransfer.setData("text", evt.target.id);
  }

  onDragOver(evt) {
    evt.preventDefault()
  }
  
  render() {
    return (
      <div className="App">
        <TopContainer box={this.state.isBoxOnTop} dragOver={this.onDragOver} dragStart={this.onDragStart} drop={this.onDrop}/>
        <div className="divider"></div>
        <BottomContainer box={!this.state.isBoxOnTop} dragOver={this.onDragOver} dragStart={this.onDragStart} drop={this.onDrop}/>
      </div>
    );
  }
}

export default App;
