import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// Example input data
const mockData = [
  {
    skill: 'React',
    proficiency: [
      { date: '2022-01-01', level: 2 },
      { date: '2022-06-01', level: 3 },
      { date: '2023-01-01', level: 4 },
      { date: '2023-06-01', level: 5 },
    ],
    color: '#3b82f6',
  },
  {
    skill: 'Node.js',
    proficiency: [
      { date: '2022-01-01', level: 1 },
      { date: '2022-06-01', level: 2 },
      { date: '2023-01-01', level: 3 },
      { date: '2023-06-01', level: 4 },
    ],
    color: '#10b981',
  },
  {
    skill: 'Python',
    proficiency: [
      { date: '2022-01-01', level: 1 },
      { date: '2022-06-01', level: 1 },
      { date: '2023-01-01', level: 2 },
      { date: '2023-06-01', level: 3 },
    ],
    color: '#8b5cf6',
  },
];

const SkillGraph = ({ data = mockData, width = 600, height = 320 }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove(); // Clear previous

    const margin = { top: 40, right: 40, bottom: 40, left: 48 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Flatten all dates
    const allPoints = data.flatMap(d => d.proficiency);
    const xDomain = d3.extent(allPoints, d => new Date(d.date));
    const yDomain = [0, d3.max(allPoints, d => d.level) + 1];

    // Scales
    const x = d3.scaleTime().domain(xDomain).range([0, innerWidth]);
    const y = d3.scaleLinear().domain(yDomain).range([innerHeight, 0]);

    // Axes
    const xAxis = d3.axisBottom(x).ticks(4).tickFormat(d3.timeFormat('%b %Y'));
    const yAxis = d3.axisLeft(y).ticks(5).tickFormat(d => `Lv ${d}`);

    // Draw axes
    svg.append('g')
      .attr('transform', `translate(${margin.left},${innerHeight + margin.top})`)
      .call(xAxis)
      .selectAll('text')
      .attr('font-size', 12);

    svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(yAxis)
      .selectAll('text')
      .attr('font-size', 12);

    // Draw lines
    data.forEach(skill => {
      const line = d3.line()
        .x(d => x(new Date(d.date)))
        .y(d => y(d.level))
        .curve(d3.curveMonotoneX);

      svg.append('path')
        .datum(skill.proficiency)
        .attr('fill', 'none')
        .attr('stroke', skill.color)
        .attr('stroke-width', 3)
        .attr('d', line)
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Draw points
      svg.selectAll(`.dot-${skill.skill}`)
        .data(skill.proficiency)
        .enter()
        .append('circle')
        .attr('class', `dot-${skill.skill}`)
        .attr('cx', d => x(new Date(d.date)) + margin.left)
        .attr('cy', d => y(d.level) + margin.top)
        .attr('r', 5)
        .attr('fill', skill.color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);
    });

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${margin.left},10)`);
    data.forEach((skill, i) => {
      legend.append('circle')
        .attr('cx', i * 120)
        .attr('cy', 0)
        .attr('r', 6)
        .attr('fill', skill.color);
      legend.append('text')
        .attr('x', i * 120 + 12)
        .attr('y', 4)
        .attr('font-size', 14)
        .attr('fill', '#222')
        .text(skill.skill);
    });
  }, [data, width, height]);

  return (
    <div className="w-full overflow-x-auto">
      <svg ref={ref} width={width} height={height} />
    </div>
  );
};

export default SkillGraph; 