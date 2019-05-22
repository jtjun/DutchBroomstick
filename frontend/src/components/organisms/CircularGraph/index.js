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
    return (
      <circle
        r={props.r} cx={center.x} cy={center.y}
        stroke="#bfbfbf" strokeWidth="0.5" fill="white" />
    )
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
        stroke="#595959" strokeWidth="1" />
      <polygon points={points}
        stroke="#595959" strokeWidth="1" fill="#595959" />
    </g>)
}

Edge.propTypes = {
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
    nodeCount: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
}


const CircularGraph = ({nodeCount, edges, width, height}) => {
    return (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width} height={height}
          viewBox="-1 -1 101 101">
        {[...Array(nodeCount).keys()].map(
            key => <Node key={key} idx={key} nodeCount={nodeCount} r={7} />
        )}
        {edges.map(
            ({from, to}, index) =>
                <Edge key={index} from={from} to={to} nodeCount={nodeCount} r={7} />
        )}
      </svg>
    )
}

CircularGraph.propTypes = {
    nodeCount: PropTypes.number.isRequired,
    edges: PropTypes.arrayOf(PropTypes.shape({
        from: PropTypes.number.isRequired,
        to: PropTypes.number.isRequired,
    })),
}

export default CircularGraph
