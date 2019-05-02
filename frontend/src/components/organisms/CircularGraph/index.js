import React from 'react'
import PropTypes from 'prop-types'
import Victor from 'victor'

/* angle as radian */
const getAngle = (idx, count) => 2 * Math.PI / count * idx;

/* angle as radian, 캔버스 크기가 100*100일 때 */
const getNodeCenter = (angle, r) => {
    return Victor(50 - r, 0)
        .rotate(angle)
        .add(Victor(50, 50))
}


const Node = (props) => {
    let angle = getAngle(props.idx, props.nodeCount);
    let center = getNodeCenter(angle, props.r);
    return <circle r={props.r} cx={center.x} cy={center.y} />
}

Node.propTypes = {
    idx: PropTypes.number.isRequired,
    nodeCount: PropTypes.number.isRequired,
    r: PropTypes.number,
}


const Edge = (props) => {
    const nodeFrom = getNodeCenter(getAngle(props.from, props.nodeCount), props.r);
    const nodeTo = getNodeCenter(getAngle(props.to, props.nodeCount), props.r);

    const diff = nodeTo.clone().subtract(nodeFrom).normalize().multiplyScalar(props.r);
    nodeFrom.add(diff);
    nodeTo.subtract(diff);

    const triangle = [ [0, 0], [-0.939, 0.342], [-0.939, -0.342] ];
    let points = triangle.map(
        vec => Victor.fromArray(vec).multiplyScalar(props.r * 0.5)
            .rotate(diff.angle()).add(nodeTo)
    ).map(vec => `${vec.x} ${vec.y}`).join(', ')

    return (<g>
      <line
        x1={nodeFrom.x} y1={nodeFrom.y}
        x2={nodeTo.x} y2={nodeTo.y}
        stroke="red" />
      <polygon points={points}
        stroke="red"
        fill="red" />
    </g>)
}

Edge.propTypes = {
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
    nodeCount: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
}


const CircularGraph = (props) => {
    const nodeCount = 7;

    return (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width={props.width}
          height={props.height}
          viewBox="0 0 100 100">
        {[...Array(nodeCount).keys()].map(
            key => <Node key={key} idx={key} nodeCount={nodeCount} r={7} />
        )}
        <Edge from={1} to={3} nodeCount={nodeCount} r={7} />
      </svg>
    )
}

export default CircularGraph
