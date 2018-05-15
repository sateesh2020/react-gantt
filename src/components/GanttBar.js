import React, { Component } from "react";

class PreMileStone extends Component {
  render() {
    let { x, y, color } = this.props;
    return (
      <g
        width="20"
        height="20"
        className="pre-milestone"
        transform={`translate(${x}, ${y})`}
      >
        <rect
          x="18"
          y="-8"
          width="12"
          height="12"
          fill={color}
          transform="rotate(45)"
        />
      </g>
    );
  }
}
PreMileStone.defaultProps = {
  color: "#00607c"
};
class MileStone extends Component {
  render() {
    let { x, y, color } = this.props;
    return (
      <g
        width="30"
        height="30"
        className="pre-milestone"
        transform={`translate(${x}, ${y}) matrix(0.30 0 0 0.30 16 5)`}
      >
        <polygon style={{ fill: color }} points="52,23.5 10,40 10,22 10,4 " />
        <path
          style={{ fill: "black" }}
          d="M9,0C8.448,0,8,0.447,8,1v3v55c0,0.553,0.448,1,1,1s1-0.447,1-1V4V1C10,0.447,9.552,0,9,0z"
        />
      </g>
    );
  }
}
MileStone.defaultProps = {
  color: "#00b268"
};

const getVersionType = version => {
  let simplifiedVersion = 0;
  let versionType = "MINOR";
  try {
    simplifiedVersion = version % 1;
  } catch (error) {
    console.log(error);
  }
  if (simplifiedVersion > 0) {
    versionType = "MINOR";
  } else {
    versionType = "MAJOR";
  }
  return versionType;
};

class GanttBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { task, barHeight, fillColor } = this.props;
    let mileStoneDimension = Math.round(barHeight * 0.6);
    let versionType = getVersionType(task.versionNumber);
    return (
      <g
        className="bar-wrapper"
        fill="#094CAF"
        transform={task.translate}
        height={barHeight}
        width={task.elementWidth}
      >
        <rect
          x="0"
          y="0"
          className="bar-filled"
          height={barHeight}
          width={task.fillWidth}
          fill={task.color || fillColor}
        />
        <rect
          x={task.fillWidth}
          y="0"
          className="bar-empty"
          height={barHeight}
          width={task.unFilledWidth}
          fill="#99999a"
        />
        <text x={task.textX} y="1.2rem" className="bar-value" fill="#FFF">
          {task.percentageCompleted + "%"}
        </text>
        {versionType === "MAJOR" && (
          <MileStone
            x={task.elementWidth - mileStoneDimension}
            y={-mileStoneDimension}
          />
        )}
        {versionType === "MINOR" && (
          <PreMileStone
            x={task.elementWidth - mileStoneDimension}
            y={-mileStoneDimension}
          />
        )}
      </g>
    );
  }
}
GanttBar.defaultProps = {
  fillColor: "#00a0df"
};
export default GanttBar;
