import React from 'react'
import * as d3 from 'd3'
import { useD3 } from '../hooks/useD3'
import '../../static/css/graph.css'

const BarChart = ({ data }) => {
    const ref = useD3(
        (svg) => {
        const height = 500
        const width = 1000
        const margin = { top: 20, right: 30, bottom: 30, left: 40 }




        const x = d3
            .scaleBand()
            .domain(data?.map((d) => d.interval))
            .rangeRound([margin.left, width - margin.right])
            .padding(0.1)

        const y1 = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.wpm)])
            .rangeRound([height - margin.bottom, margin.top])

        const xAxis = (g) =>
            g
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(
                d3
                    .axisBottom(x)
                    .tickValues(
                        d3
                            .ticks(...d3.extent(x.domain()), width / 40)
                            .filter((v) => x(v) !== undefined)
                    )
                    .tickSizeOuter(0)
                )
                .call((g) => {
                    g
                        .append("text")
                        .attr("x", width - margin.right)
                        .attr("y", margin.bottom + 10)
                        .attr("fill", "steelBlue")
                        .style("font-size", "15px")
                        .style("text-anchor", "middle")
                        .text("Games")
                })
                .style("color", "steelblue")


        const y1Axis = (g) =>
            g
                .attr("transform", `translate(${margin.left}, 0)`)
                .style("color", "steelblue")
                .call(d3.axisLeft(y1).ticks(null, "s"))
                .call((g) => g.select(".domain").remove())
                .call((g) =>
                    g
                        .append("text")
                        .attr("x", -margin.left)
                        .attr("y", 13)
                        .attr("fill", "currentColor")
                        .attr("text-anchor", "start")
                        .style("font-size", "15px")
                        .text("WPM")
                )


        svg.select(".x-axis").call(xAxis)
        svg.select(".y-axis").call(y1Axis)

        svg
            .select(".plot-area")
            .attr("fill", "steelBlue")
            .selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .attr("x", (d) => x(d.interval))
            .attr("width", x.bandwidth())
            .attr("y", (d) => y1(d.wpm))
            .attr("height", (d) => y1(0) - y1(d.wpm))

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', height + margin.bottom)
            .attr('text-anchor', 'middle')
            .attr("fill", "steelBlue")
            .style('font-family', 'rubik')
            .style('font-size', "20px")
            .text('WPM vs. # of Games')

    }, [data?.length])

    return (
    <svg
        ref={ref}
        style={{
            minHeight: "600px",
            minWidth: "1000px",
            marginRight: "0px",
            marginLeft: "0px"
        }}>
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
    </svg>
    )
}
export default BarChart