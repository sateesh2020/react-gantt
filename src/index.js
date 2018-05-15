import React, { Component } from "react";
import * as d3 from "d3";

import { XAxis, YAxis } from "./components/Axis";

import GanttBar from "./components/GanttBar";
import "./App.css";

const FIT_TIME_DOMAIN_MODE = "fit";
const FIXED_TIME_DOMAIN_MODE = "fixed";

const keyFunction = function(d) {
  return d.startDate + d.taskName + d.endDate;
};

const getTimeDomain = function(tasks, timeDomainMode) {
  let domain = [];
  let timeDomainStart = null;
  let timeDomainEnd = null;
  if (timeDomainMode === FIT_TIME_DOMAIN_MODE) {
    if (tasks === undefined || tasks.length < 1) {
      timeDomainStart = d3.timeDay.offset(new Date(), -3);
      timeDomainEnd = d3.timeHour.offset(new Date(), +3);
      domain = [timeDomainStart, timeDomainEnd];
      return domain;
    }
    tasks.sort(function(a, b) {
      return a.endDate - b.endDate;
    });
    timeDomainEnd = tasks[tasks.length - 1].endDate;
    tasks.sort(function(a, b) {
      return a.startDate - b.startDate;
    });
    timeDomainStart = tasks[0].startDate;
    domain = [timeDomainStart, timeDomainEnd];
    return domain;
  }
};
const getBandDomain = function(tasks) {
  let taskNames = tasks.map(task => {
    return task.taskName;
  });
  let axisBand = [...new Set(taskNames)];
  return axisBand;
};

class Gantt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      XScale: null,
      YScale: null
    };
    this.initScales = this.initScales.bind(this);
    this.getXScale = this.getXScale.bind(this);
    this.getYScale = this.getYScale.bind(this);
    this.buildDomTree = this.buildDomTree.bind(this);
  }
  componentDidMount() {
    this.initScales();
  }
  componentDidUpdate() {}
  initScales() {
    let XScale = this.getXScale();
    let YScale = this.getYScale();
    this.setState({
      XScale,
      YScale
    });
  }
  getXScale() {
    let { width, timeDomainMode, chartData } = this.props;
    let domain = getTimeDomain(chartData, timeDomainMode);
    return d3
      .scaleTime()
      .domain(domain)
      .range([0, width])
      .clamp(true);
  }

  getYScale() {
    let { width, timeDomainMode, chartData, height, margins } = this.props;
    let domain = getBandDomain(chartData);
    return d3
      .scaleBand()
      .domain(domain)
      .rangeRound([0, height - margins.top - margins.bottom], 0.1);
  }
  buildDomTree() {
    let { chartData } = this.props;
    let { XScale, YScale } = this.state;
    if (!XScale || !YScale) {
      XScale = this.getXScale();
      YScale = this.getYScale();
    }
    let domTree = chartData.map(task => {
      let elementWidth = XScale(task.endDate) - XScale(task.startDate);
      let translate =
        "translate(" +
        XScale(task.startDate) +
        "," +
        (YScale(task.taskName) + 20) +
        ")";
      let fillWidth = elementWidth * (task.percentageCompleted / 100);
      let unFilledWidth = elementWidth - fillWidth;
      let textX = elementWidth / 2 - 10;
      task.elementWidth = elementWidth;
      task.translate = translate;
      task.fillWidth = fillWidth;
      task.unFilledWidth = unFilledWidth;
      task.textX = textX;
      return task;
    });
    return domTree;
  }
  render() {
    let {
      margins,
      width,
      height,
      timeDomainMode,
      tasks,
      barHeight
    } = this.props;
    let { XScale, YScale } = this.state;
    let domTree = this.buildDomTree();
    return (
      <svg
        width={width + margins.left + margins.right}
        height={height + margins.top + margins.bottom}
        className="chart"
      >
        <g
          width={width + margins.left + margins.right}
          height={height + margins.top + margins.bottom}
          className="gantt-chart"
          transform={`translate(${margins.left}, ${margins.top})`}
        >
          <XAxis
            width={width}
            x="0"
            margins={margins}
            axisScale={XScale}
            y={height - margins.top - margins.bottom}
          />
          <YAxis
            x="0"
            y="0"
            axisScale={YScale}
            height={height}
            margins={margins}
          />
          {domTree.map((domEleConf, i) => {
            return (
              <GanttBar
                task={domEleConf}
                barHeight={barHeight}
                key={domEleConf.id || i}
              />
            );
          })}
        </g>
      </svg>
    );
  }
}
Gantt.defaultProps = {
  margins: {
    top: 20,
    right: 40,
    bottom: 20,
    left: 150
  },
  width: 960,
  height: 400,
  barHeight: 30,
  timeDomainMode: "fit",
  tickFormat: "%B-%y",
  chartData: []
};
export default Gantt;
