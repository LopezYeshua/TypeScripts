import React from 'react'
import * as d3 from 'd3'
import { useD3 } from '../hooks/useD3'

const LineChart = ({dataset1}) => {

    const svg = d3.select("svg"),
                margin = 200,
                width = svg.attr("width") - margin,
                height = svg.attr("height") - margin

    const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]),
    yScale = d3.scaleLinear().domain([0,200]).range([height, 0])

    // Title
    svg.append('text')
        .attr('x', width/2 + 100)
        .attr('y', 100)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 20)
        .text('Line Chart')

    // X Label
    svg.append('text')
        .attr('x', width/2 + 100)
        .attr('y', height - 15 + 150)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 12)
        .text('Independent')

    // Y label
    svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(60' + height + ')rotate(-90)')
        .style('font-family', 'Helvetica')
        .style('font-size', 12)
        .text('Dependant');

    // Add Axis
    svg.append("g")
        .attr("tranform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))

    svg.append("g")
        .call(d3.axisLeft(yScale))

    // Scatter dots
    svg.append('g')
        .selectAll("dot")
        .data(dataset1)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d[0])})
        .attr("cy", function (d) { return yScale(d[1])})
        .attr("tranform", "translate(" + 100 + "," + 100 + ")")
        .style("fill", "#CC0000")

    const line = d3.line()
                    .x(function(d) {return xScale(d[0])})
                    .y(function(d) {return yScale(d[1])})
                    .curve(d3.curveMonotoneX)

    svg.append("path")
        .datum(dataset1)
        .attr("class", "line")
        .attr("tranform", "translate(", 100 + "," + 100 + ")")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "#CC0000")
        .style("stroke-width", "2")

    return (
        <svg style={{
            width: "100%",
            height: "400px"
        }}>
            
        </svg>
    )
}
export default LineChart