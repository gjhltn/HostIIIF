import { Viewer } from "react-iiif-viewer"

function App() {
  return (
    <div className="App">
		<Viewer iiifUrl="https://data.getty.edu/museum/api/iiif/635494/info.json" />
    </div>
  );
}

export default App;
