import React from "react";
import { Viewer } from "react-iiif-viewer";

const App = (props) => {
  const { debug, iiifUrl = "data/info.json" } = props;
  return (
    <div className="App" style={{ position: "relative" }}>
      <Viewer height="100vh" width="100vw" iiifUrl={iiifUrl} />
      {debug && debug !== "false" && (
        <div
          style={{
            color: "white",
            position: "absolute",
            top: "2rem",
            left: "2rem",
            zIndex: "99999999",
          }}
        >
          {JSON.stringify(props)}
        </div>
      )}
    </div>
  );
};

export default App;
