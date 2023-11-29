import React from "react";
import BuilderEngine from "../BuilderEngine";

import { useCallback } from "react";
import { useAppSelector } from "redux/store/hooks";
import { useReactFlow } from "reactflow";
import { getNodeById } from "./Flow";

interface ContextMenuProps {
  id: string;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export default function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}: ContextMenuProps) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  const nodes = useAppSelector((state) => state.builder.nodes);
  const node_name = getNodeById(id, nodes).data.config.name;

  const duplicateNode = useCallback(() => {
    const app = BuilderEngine.Instance;
    const node = JSON.parse(JSON.stringify(getNode(id)));
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50,
    };
    const name = app.EnsureUniqueName(node_name, nodes);
    const newid = app.getUniqueNodeID(nodes);
    node.data.config.name = name;
    addNodes({ ...node, id: newid, position });
  }, [id, getNode, addNodes]);

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  return (
    <div
      style={{ top, left, right, bottom }}
      className="context-menu"
      {...props}
    >
      <p style={{ margin: "0.5em" }}>
        <small>{node_name}</small>
      </p>
      <button onClick={duplicateNode}>duplicate</button>
      <button onClick={deleteNode}>delete</button>
    </div>
  );
}