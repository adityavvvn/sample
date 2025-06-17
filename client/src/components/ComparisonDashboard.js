import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const mockUserSkills = [
  { skill: 'React', level: 4 },
  { skill: 'Node.js', level: 3 },
  { skill: 'Python', level: 2 },
  { skill: 'TypeScript', level: 3 },
  { skill: 'AWS', level: 1 },
];

const mockJobRequirements = [
  { skill: 'React', required: 4 },
  { skill: 'Node.js', required: 4 },
  { skill: 'Python', required: 3 },
  { skill: 'TypeScript', required: 4 },
  { skill: 'AWS', required: 3 },
  { skill: 'Docker', required: 3 },
];

const ComparisonDashboard = ({ userSkills = mockUserSkills, jobRequirements = mockJobRequirements }) => {
  const ref = useRef();

  useEffect(() => {
    if (!userSkills || !jobRequirements) return;
    
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Combine data and calculate gaps
    const comparisonData = jobRequirements.map(req => {
      const userSkill = userSkills.find(us => us.skill === req.skill);
      const userLevel = userSkill ? userSkill.level : 0;
      const gap = Math.max(0, req.required - userLevel);
      return {
        skill: req.skill,
        required: req.required,
        current: userLevel,
        gap: gap,
        match: userLevel >= req.required ? 100 : Math.round((userLevel / req.required) * 100)
      };
    });

    // Scales
    const x = d3.scaleBand()
      .domain(comparisonData.map(d => d.skill))
      .range([0, width])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(comparisonData, d => Math.max(d.required, d.current)) + 1])
      .range([height, 0]);

    // Create SVG
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X-axis
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // Y-axis
    g.append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => `Lv ${d}`));

    // Bars for required level
    g.selectAll('.required-bar')
      .data(comparisonData)
      .enter()
      .append('rect')
      .attr('class', 'required-bar')
      .attr('x', d => x(d.skill))
      .attr('y', d => y(d.required))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.required))
      .attr('fill', '#ef4444')
      .attr('opacity', 0.7);

    // Bars for current level
    g.selectAll('.current-bar')
      .data(comparisonData)
      .enter()
      .append('rect')
      .attr('class', 'current-bar')
      .attr('x', d => x(d.skill))
      .attr('y', d => y(d.current))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.current))
      .attr('fill', '#10b981')
      .attr('opacity', 0.8);

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${margin.left},10)`);
    
    legend.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', '#ef4444')
      .attr('opacity', 0.7);
    legend.append('text')
      .attr('x', 20)
      .attr('y', 12)
      .text('Required Level')
      .attr('font-size', 12);

    legend.append('rect')
      .attr('x', 120)
      .attr('y', 0)
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', '#10b981')
      .attr('opacity', 0.8);
    legend.append('text')
      .attr('x', 140)
      .attr('y', 12)
      .text('Your Level')
      .attr('font-size', 12);

    // Match percentage
    const avgMatch = Math.round(comparisonData.reduce((sum, d) => sum + d.match, 0) / comparisonData.length);
    
    legend.append('text')
      .attr('x', 250)
      .attr('y', 12)
      .text(`Overall Match: ${avgMatch}%`)
      .attr('font-size', 12)
      .attr('font-weight', 'bold')
      .attr('fill', avgMatch >= 80 ? '#10b981' : avgMatch >= 60 ? '#f59e0b' : '#ef4444');

  }, [userSkills, jobRequirements]);

  // Calculate skill gaps
  const skillGaps = jobRequirements
    .map(req => {
      const userSkill = userSkills.find(us => us.skill === req.skill);
      const userLevel = userSkill ? userSkill.level : 0;
      return {
        skill: req.skill,
        gap: Math.max(0, req.required - userLevel),
        required: req.required,
        current: userLevel
      };
    })
    .filter(item => item.gap > 0)
    .sort((a, b) => b.gap - a.gap);

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Comparison</h3>
        <div className="w-full overflow-x-auto">
          <svg ref={ref} width={600} height={400} />
        </div>
      </div>

      {skillGaps.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Gaps to Address</h3>
          <div className="space-y-3">
            {skillGaps.slice(0, 5).map((gap) => (
              <div key={gap.skill} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{gap.skill}</h4>
                  <p className="text-sm text-gray-600">
                    Current: Level {gap.current} | Required: Level {gap.required}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-red-600">
                    Gap: {gap.gap} levels
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonDashboard; 