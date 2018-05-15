import * as d3 from "d3";
import D3blackbox from "../D3Blackbox";

const XAxis = D3blackbox(function() {
  let { axisScale } = this.props;
  if (typeof axisScale === "function") {
    const axis = d3
      .axisBottom()
      .scale(this.props.axisScale)
      .tickFormat(d3.timeFormat(this.props.tickFormat))
      .tickSize(this.props.tickSize)
      .tickPadding(this.props.tickPadding);

    d3.select(this.refs.anchor).call(axis);
  }
});

XAxis.defaultProps = {
  tickFormat: "%b-%y",
  width: 800,
  height: 400,
  margin: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10
  },
  tickSize: 8,
  tickPadding: 8,
  axisScale: null,
  domain: [
    d3.timeDay.offset(new Date(), -3),
    d3.timeHour.offset(new Date(), +3)
  ]
};
export default XAxis;
