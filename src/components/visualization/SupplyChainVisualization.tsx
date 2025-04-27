import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { SupplyChainNode, SupplyChainLink } from '../../stores/supplyChainStore';

interface SupplyChainVisualizationProps {
  nodes: SupplyChainNode[];
  links: SupplyChainLink[];
}

const SupplyChainVisualization: React.FC<SupplyChainVisualizationProps> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Function to get color based on node type
  const getNodeColor = (type: string): string => {
    switch (type) {
      case 'supplier': return '#3b82f6'; // primary-500
      case 'manufacturer': return '#14b8a6'; // secondary-500
      case 'distributor': return '#f59e0b'; // amber-500
      case 'retailer': return '#22c55e'; // success-500
      default: return '#9ca3af'; // gray-400
    }
  };
  
  useEffect(() => {
    if (!svgRef.current || nodes.length === 0 || links.length === 0) return;
    
    // Clear any existing visualization
    d3.select(svgRef.current).selectAll("*").remove();
    
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    
    // Create the visualization
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    
    // Create links
    const linkElements = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("x1", (d) => {
        const source = nodes.find(n => n.id === d.source);
        return source ? source.coordinates[0] : 0;
      })
      .attr("y1", (d) => {
        const source = nodes.find(n => n.id === d.source);
        return source ? source.coordinates[1] : 0;
      })
      .attr("x2", (d) => {
        const target = nodes.find(n => n.id === d.target);
        return target ? target.coordinates[0] : 0;
      })
      .attr("y2", (d) => {
        const target = nodes.find(n => n.id === d.target);
        return target ? target.coordinates[1] : 0;
      })
      .attr("stroke", "#9ca3af")
      .attr("stroke-width", (d) => Math.max(1, d.flow / 50))
      .attr("stroke-opacity", 0.6);
    
    // Create nodes
    const nodeGroups = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.coordinates[0]}, ${d.coordinates[1]})`);
    
    // Add circles for nodes
    nodeGroups.append("circle")
      .attr("r", (d) => Math.max(5, Math.min(15, d.currentInventory / 100)))
      .attr("fill", (d) => getNodeColor(d.type))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);
    
    // Add labels for nodes
    nodeGroups.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", -15)
      .attr("font-size", 10)
      .attr("fill", "#4b5563")
      .text((d) => d.name.length > 20 ? d.name.substring(0, 20) + "..." : d.name);
    
    // Add node type labels
    nodeGroups.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 20)
      .attr("font-size", 8)
      .attr("fill", "#6b7280")
      .text((d) => d.type.charAt(0).toUpperCase() + d.type.slice(1));
    
  }, [nodes, links]);
  
  return (
    <div className="w-full h-full relative">
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ minHeight: "300px" }}
      />
      <div className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm flex flex-col space-y-1 text-xs">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
          <span>Supplier</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-teal-500 mr-1"></span>
          <span>Manufacturer</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-amber-500 mr-1"></span>
          <span>Distributor</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
          <span>Retailer</span>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainVisualization;