import React from 'react'
import { Viewer } from "react-iiif-viewer"

const App = ({
	iiifUrl="data/info.json"
})	=> 
    <div className="App">
		<Viewer 
          height="100vh"
          width="100vw"
          iiifUrl={iiifUrl} />
    </div>

export default App;
