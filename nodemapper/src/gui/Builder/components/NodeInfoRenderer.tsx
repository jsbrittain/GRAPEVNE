import React from "react";
import NodeInfo from "./NodeInfo";
import { useAppSelector } from "redux/store/hooks";

const NodeInfoRenderer = (props) => {
  const nodeinfo = useAppSelector((state) => state.builder.nodeinfo);
  if (nodeinfo) {
    return (
      <div
        style={{
          display: "flex",
          width: "33%",
          height: "100%",
          flexFlow: "column",
        }}
      >
        <div
          style={{
            borderStyle: "solid",
            borderWidth: "1px 0px 1px 0px",
            borderColor: "#666666",
            backgroundColor: "#333333",
            color: "#dddddd",
            flex: "0 0 auto",
          }}
        >
          Node Info
        </div>
        <div style={{ flex: "1 1 auto" }}>
          <NodeInfo />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default NodeInfoRenderer;