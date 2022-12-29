import { Viewer } from "react-iiif-viewer"
//

function App() {
  return (
    <div className="App">
		<Viewer 
          height="100vh"
          width="100vw"
          iiifUrl="/data/info.json" />
    </div>
  );
}

export default App;
