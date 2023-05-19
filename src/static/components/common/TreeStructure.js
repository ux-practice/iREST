import React, {Component} from 'react'
import * as d3 from 'd3'
import './style.css'
import {manipulateData} from '../../../server/helpers/util'
import fakerObj from '../../../server/constants/fakerModel'
import clipboard from '../../assets/images/iRest_files/clipboard.svg'

const treeDummy = {
  name: 'Faker Object',
  parent: 'null',
  children: [],
}

treeDummy.children = manipulateData(fakerObj)
const treeData = [treeDummy]

const margin = {top: 20, right: 120, bottom: 20, left: 120}
const width = 1100 - margin.right - margin.left
const height = 1000 - margin.top - margin.bottom
const treeWidth = 360

let i = 0
const duration = 700
let root = null

let tree = null
let diagonal = null
let svg = null

/* eslint-disable */
export default class TreeStructure extends Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  componentDidMount() {
    this.drawTree()
  }

  drawTree = () => {
    tree = d3.layout.tree().size([height, width])

    diagonal = d3.svg.diagonal().projection(function(d) {
      return [d.y, d.x]
    })

    svg = d3
      .select(this.myRef.current)
      .append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    root = treeData[0]
    root.x0 = height / 2
    root.y0 = 0

    root.children.forEach(this.collapse)

    this.update(root)
  }

  update = source => {
    // Compute the new tree layout.
    const nodes = tree.nodes(root).reverse()
    const links = tree.links(nodes)

    // Normalize for fixed-depth.
    nodes.forEach(function(d) {
      d.y = d.depth * treeWidth
    })

    // Update the nodes…
    const node = svg.selectAll('g.node').data(nodes, function(d) {
      return d.id || (d.id = ++i)
    })

    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', function(d) {
        return 'translate(' + source.y0 + ',' + source.x0 + ')'
      })
      .on('click', this.click)

    nodeEnter
      .append('circle')
      .attr('r', 1e-6)
      .style('fill', function(d) {
        return d._children ? 'lightsteelblue' : '#fff'
      })

    nodeEnter
      .append('text')
      .attr('x', function(d) {
        return d.children || d._children ? -13 : 13
      })
      .attr('dy', function(d) {
        return d.children || d._children ? -8 : '.35em'
      })
      .attr('text-anchor', function(d) {
        return d.children || d._children ? 'end' : 'start'
      })
      .text(function(d) {
        return d.name
      })
      .style('fill-opacity', 1e-6)

    nodeEnter
      .append('svg:image')
      .attr('xlink:href', clipboard)
      .attr('x', function(d) {
        if (d.name.length === 20 || d.name.length === 24) {
          return d.name.length * 6 + 35
        }
        return d.name.length * 6 + 25
      })
      .attr('y', -7)
      .attr('width', 15)
      .attr('height', 15)
      .attr('display', function(d) {
        return d.children || d._children ? 'none' : 'block'
      })
      .on('click', function(d) {
        navigator.clipboard.writeText(d.name)
      })

    // Transition nodes to their new position.
    const nodeUpdate = node
      .transition()
      .duration(duration)
      .attr('transform', function(d) {
        return 'translate(' + d.y + ',' + d.x + ')'
      })

    nodeUpdate
      .select('circle')
      .attr('r', 10)
      .style('fill', function(d) {
        return d._children ? 'lightsteelblue' : '#fff'
      })

    nodeUpdate.select('text').style('fill-opacity', 1)

    // Transition exiting nodes to the parent's new position.
    const nodeExit = node
      .exit()
      .transition()
      .duration(duration)
      .attr('transform', function(d) {
        return 'translate(' + source.y + ',' + source.x + ')'
      })
      .remove()

    nodeExit.select('circle').attr('r', 1e-6)

    nodeExit.select('text').style('fill-opacity', 1e-6)

    // Update the links…
    const link = svg.selectAll('path.link').data(links, function(d) {
      return d.target.id
    })

    // Enter any new links at the parent's previous position.
    link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .attr('d', function(d) {
        const o = {x: source.x0, y: source.y0}
        return diagonal({source: o, target: o})
      })

    // Transition links to their new position.
    link
      .transition()
      .duration(duration)
      .attr('d', diagonal)

    // Transition exiting nodes to the parent's new position.
    link
      .exit()
      .transition()
      .duration(duration)
      .attr('d', function(d) {
        const o = {x: source.x, y: source.y}
        return diagonal({source: o, target: o})
      })
      .remove()

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
      d.x0 = d.x
      d.y0 = d.y
    })
  }

  click = d => {
    if (d.name === 'Faker Object' || !d._children) {
      return
    }
    if (d.children) {
      d._children = d.children
      d.children = null
    } else {
      d.children = d._children
      d._children = null
    }

    this.update(d)

    root.children.forEach(this.collapse)
  }

  collapse = d => {
    if (d.children) {
      d._children = d.children
      d._children.forEach(this.collapse)
      d.children = null
    }
  }

  render() {
    return <div ref={this.myRef} />
  }
}
