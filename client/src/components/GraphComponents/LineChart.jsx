import React from 'react'
import * as d3 from 'd3'

const LineChart = ({ data }) => {

    const margin = { top: 50, right: 50, bottom: 50, left: 50 }
        , height = 100
        , width = 200

    // the numbr of datapoints
    const n = data.interval


    const xScale = d3.scaleLinear().domain([0, n - 1]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 1]).rangeRound([height, 0]);


    let line = d3.line()
        .x(function (d, i) { return xScale(i) })
        .y(function (d) { return yScale(d.y) })
        .curve(d3.curveMonotoneX)

    const svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0" + height + ")")
        .call(d3.axisBottom(xScale))

    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale))

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("stroke", "steelBlue")
        .attr("d", line)

    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function (d, i) { return xScale(i) })
        .attr("cy", function (d) { return yScale(d.wpm) })


    // Title
    svg.append('text')
        .attr('x', width / 2 + 100)
        .attr('y', 100)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 20)
        .text('Line Chart')

    // X Label
    // svg.append('text')
    //     .attr('x', width / 2 + 100)
    //     .attr('y', height - 15 + 150)
    //     .attr('text-anchor', 'middle')
    //     .style('font-family', 'Helvetica')
    //     .style('font-size', 12)
    //     .text('Independent')

    // // Y label
    // svg.append('text')
    //     .attr('text-anchor', 'middle')
    //     .attr('transform', 'translate(60' + height + ')rotate(-90)')
    //     .style('font-family', 'Helvetica')
    //     .style('font-size', 12)
    //     .text('Dependant');

    // // Add Axis
    // svg.append("g")
    // .attr("class", "axis")
    //     .attr("tranform", "translate(0," + height + ")")
    //     .call(xaxis)

    // svg.append("g")
    //     .attr("class", "axis")
    //     .call(yaxis)

    // // Scatter dots
    // svg.append('g')
    //     .selectAll("dot")
    //     .data(dataset1)
    //     .enter()
    //     .append("circle")
    //     .attr("cx", function (d) { return xScale(d[0]) })
    //     .attr("cy", function (d) { return yScale(d[1]) })
    //     .attr("tranform", "translate(" + 100 + "," + 100 + ")")
    //     .style("fill", "#CC0000")

    // const line = d3.line()
    //     .x(function (d) { return xScale(d[0]) })
    //     .y(function (d) { return yScale(d[1]) })
    //     .curve(d3.curveMonotoneX)

    // svg.append("path")
    //     .datum(dataset1)
    //     .attr("class", "line")
    //     .attr("tranform", "translate(", 100 + "," + 100 + ")")
    //     .attr("d", line)
    //     .style("fill", "none")
    //     .style("stroke", "#CC0000")
    //     .style("stroke-width", "2")

    return (<svg
            style={{
                minHeight: "600px",
                minWidth: "300px",
                marginRight: "0px",
                marginLeft: "0px"
            }}>
        </svg>
    )
}
export default LineChart