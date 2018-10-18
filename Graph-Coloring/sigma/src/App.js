import React, { Component } from "react";
import { Graph } from "react-d3-graph";
import axios from "axios";
import async from "async";
import fetch from "node-fetch";
import _ from "lodash";
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        nodes: [
          { id: "1" },
          {
            id: "2",
            color: "#186A3B",
            fontColor: "orange"
          },
          { id: "3" }
        ],
        links: [{ source: "1", target: "2" }, { source: "2", target: "3" }]
      },
      myConfig: {
        nodeHighlightBehavior: true,
        node: {
          color: "lightgreen",
          size: 1000,
          highlightStrokeColor: "blue"
        },
        link: {
          highlightColor: "lightblue"
        }
      },
      node1: null,
      node2: null,
      flag: 0,
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onClickNode = function(nodeId) {
    window.alert(`Clicked node ${nodeId}`);
  };

  onClickLink = (source, target) => {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  onClickAddNode = () => {
    if (this.state.data.nodes && this.state.data.nodes.length) {
      const newNode = `${this.state.data.nodes.length + 1}`;
      this.state.data.nodes.push({ id: newNode });
      this.setState({
        data: this.state.data,
        flag: 0
      });
    } else {
      const data = {
        nodes: [{ id: "1" }],
        links: []
      };

      this.setState({ data, flag: 0 });
    }
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  join = () => {
    const maxIndex = this.state.data.nodes.length - 1;
    const minIndex = 0;
    let nLinks = Math.floor(Math.random() * (5 - minIndex + 1) + minIndex);
    while (this.state.node1 && this.state.node2 && nLinks) {
      this.state.data.links.push({
        source: this.state.node1,
        target: this.state.node2
      });
      nLinks--;
    }
    //  console.log(document.getElementById("myForm").node1.value);
    document.getElementById("myForm").reset();
    //  console.log(document.getElementById("myForm").node1.value);
    //console.log(this.state.data.links);
    this.setState({
      data: this.state.data,
      flag: 0
    });
  };

  onSubmit1 = event => {
    axios
      .post("/users", {
        val: this.state.data,
        flag: 1
      })
      .then(response => {
        console.log("Data submitted successfully", response);
        this.setState({ message: response.data, flag: 1 });
      })
      .catch(error => {
        console.log("got errr while posting data", error);
      });
  };

  onSubmit2 = event => {
    axios
      .post("/users", {
        val: this.state.data,
        flag: 2
      })
      .then(response => {
        console.log("Data submitted successfully", response);
        this.setState({ message: response.data, flag: 1 });
      })
      .catch(error => {
        console.log("got errr while posting data", error);
      });
  };

  onSubmit3 = event => {
    axios
      .post("/users", {
        val: this.state.data,
        flag: 3
      })
      .then(response => {
        console.log("Data submitted successfully", response);
        this.setState({ message: response.data, flag: 1 });
      })
      .catch(error => {
        console.log("got errr while posting data", error);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.flag === 1) {
      setTimeout(() => {
        axios
          .get("/users")
          .then(data => {
            if (this.state.flag === 1) {
              this.setState({
                data: data.data,
                flag: 1
              });
            }
            console.log("Data Received successfully", data);
          })
          .catch(error => {
            console.log(error);
          });
      }, 2000);
    }
  }

  reset = () => {
    this.setState({
      data: {
        nodes: [{ id: "1" }, { id: "2", color: "#186A3B" }, { id: "3" }],
        links: [{ source: "1", target: "2" }, { source: "2", target: "3" }]
      },
      myConfig: {
        nodeHighlightBehavior: true,
        node: {
          color: "lightgreen",
          size: 1000,
          highlightStrokeColor: "blue"
        },
        link: {
          highlightColor: "lightblue"
        }
      },
      node1: null,
      node2: null,
      flag: 0,
      message: ""
    });
  };

  render() {
    return (
      <div className="App">
        <h1 className="deepshadow"> Graph Coloring Problem </h1>
        <form className="form-style-7" id="myForm">
          <ul>
            <li>
              <label>Node1</label>
              <input
                type="text"
                name="node1"
                value={this.state.node1}
                onChange={this.handleChange}
              />
              <span>Enter First Node</span>
            </li>
            <li>
              <label>Node2</label>
              <input
                type="text"
                name="node2"
                value={this.state.node2}
                onChange={this.handleChange}
              />
              <span>Enter Second Node</span>
            </li>
            <li />
          </ul>
        </form>
        <button onClick={this.onClickAddNode}>+</button>
        <button value="join" onClick={this.join}>
          Connect
        </button>
        <button className="button1" onClick={this.reset}>
          Reset
        </button>
        <br /> <br />
        <button onClick={this.onSubmit1}>Welsh Powell</button>
        <button onClick={this.onSubmit2}>Backtracking</button>
        <button onClick={this.onSubmit3}>Heuristic</button>
        <Graph
          id="graph-id"
          data={this.state.data}
          config={this.state.myConfig}
          onClickNode={this.onClickNode}
          onClickLink={this.onClickLink}
        />
      </div>
    );
  }
}
export default App;
