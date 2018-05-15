import React, { Component } from "react";
import * as d3 from "d3";
import D3blackbox from "../D3Blackbox";

const YAxis = D3blackbox(function() {
  let { axisScale } = this.props;
  if (typeof axisScale === "function") {
    const axis = d3
      .axisLeft()
      .scale(axisScale)
      .tickSize(this.props.tickSize);

    d3.select(this.refs.anchor).call(axis);
  }
});

YAxis.defaultProps = {
  domain: [],
  width: 800,
  height: 400,
  margin: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10
  },
  tickSize: 10,
  axisScale: null
};
export default YAxis;
