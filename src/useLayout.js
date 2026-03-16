import dagre from 'dagre'

const NODE_W = 200
const NODE_H = 80

export default function getLayoutedElements(nodes, edges) {
    const graph = new dagre.graphlib.Graph()
    graph.setDefaultEdgeLabel(() => ({}))
    graph.setGraph({ rankdir: 'LR', ranksep: 80, nodesep: 40 })

    nodes.forEach((n) => graph.setNode(n.id, { width: NODE_W, height: NODE_H }))
    edges.forEach((e) => graph.setEdge(e.source, e.target))

    dagre.layout(graph)

    const layoutedNodes = nodes.map((n) => {
        const pos = graph.node(n.id)
        return {
            ...n,
            position: {
                x: pos.x - NODE_W / 2,
                y: pos.y - NODE_H / 2,
            },
        }
    })

    return { nodes: layoutedNodes, edges }
}