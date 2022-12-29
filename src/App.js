import { Viewer } from "react-iiif-viewer"
import './App.css';

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
