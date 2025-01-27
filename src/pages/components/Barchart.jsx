import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChartPage = () => {
  const ref = useRef();

  useEffect(() => {
    const timestamps = [
      '2025-01-18T23:25:00.000Z',
      '2025-01-18T23:20:00.000Z',
      '2025-01-18T23:15:00.000Z',
      '2025-01-18T23:10:00.000Z',
      '2025-01-18T23:05:00.000Z',
    ];

    const values = [
      4.656709822299232, 74.2454942185731, 89.57956553894077,
      17.683871823404065, 44.73004349496316,
    ];

    const width = 640;
    const height = 400;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 20;
    const marginLeft = 30;

    const x = d3
      .scaleBand()
      .range([marginLeft, width - marginRight])
      .domain([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]);

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - marginBottom, marginTop]);

    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height + marginTop + marginBottom)
      .append('g')
      .attr('transform', `translate(${marginLeft},${marginTop})`);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height - marginBottom})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));

    svg
      .append('rect')
      .attr('x', 'Sun Dec 31 2023 19:00:00 GMT-0500 (Eastern Standard Time)')
      .attr('y', '0')
      .attr('width', '1000')
      .attr('height', '100')
      .attr('fill', '#5f0f40');

    svg
      .append('rect')
      .attr('x', 'Sun Dec 31 2024 19:00:00 GMT-0500 (Eastern Standard Time)')
      .attr('y', '100')
      .attr('width', '500')
      .attr('height', '50')
      .attr('fill', 'blue');

    svg
      .append('rect')
      .attr('x', 'Sun Dec 31 2025 19:00:00 GMT-0500 (Eastern Standard Time)')
      .attr('y', '150')
      .attr('width', '300')
      .attr('height', '50')
      .attr('fill', 'green');

    // svg
    // .selectAll("mybar")
    // .data(values)
    // .join("rect")
    // .attr("x", (d) => x(d.Country))
    // .attr("y", (d) => y(d.Value))
    // .attr("width", x.bandwidth())
    // .attr("height", (d) => height - y(d.Value))
    // .attr("fill", "#5f0f40");
  }, [ref]);

  return <svg width={1000} height={1000} id='barchart' ref={ref} />;
};

export default function BarChart() {
  return (
    <div>
      <BarChartPage />
    </div>
  );
}
