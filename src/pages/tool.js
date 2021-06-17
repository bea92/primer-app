import * as React from "react"
import { Link } from "gatsby"
import * as D3 from "d3"
import { useD3, userD3 } from "d3blackbox"

import Layout from "../components/layout"


const getRandomData = () =>
  D3.range(20).map(() => ({ x: Math.random(), y: Math.random()}))

const Axis = ({x, y, scale, axisType}) => {
  const fnName = axisType === "left" ? "axisLeft" : "axisBottom"
  const ref = useD3(el => D3.select(el).call(D3[fnName](scale)))
  return <g transform={`translate(${x}, ${y})`} ref={ref} />
}

export default () => {
  const data = getRandomData()
  const width = 1280
  const height = 720
  const xScale = D3.scaleLinear()
  .domain([0, 1])
  .range([45, width])
  const yScale = D3.scaleLinear()
  .domain([0, 1])
  .range([height -45, 5])

  return (
    <Layout>

      <svg width={width} height={height}>
        {data.map(d => (
          <circle cx={xScale(d.x)} cy={yScale(d.y)} r={5} />
        ))}
        <Axis x={40} y={5} scale={yScale} axisType="left" />
        <Axis x={0} y={height -40} scale={xScale} axisType="bottom" />
      </svg>

    </Layout>
  )
}
