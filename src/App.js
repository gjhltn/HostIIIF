import { Viewer } from "react-iiif-viewer"

function App() {
  return (
    <div className="App">
		<Viewer iiifUrl="/data/info.json" />
    </div>
  );
}

export default App;
