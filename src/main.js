import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import App from './App'

const container = document.getElementById('HostIIIF')
var data = {}
;[].forEach.call(container.attributes, function (attr) {
	if (/^data-/.test(attr.name)) {
		const jsonPayloadRegexp = /-json/
		let name = attr.name
		let val = attr.value
		if (jsonPayloadRegexp.test(name)) {
			name = name.replace(jsonPayloadRegexp, '')
			val = JSON.parse(val)
		}

		name = name.substr(5).replace(/-(.)/g, function ($0, $1) {
			return $1.toUpperCase()
		})

		data[name] = val
	}
})
const root = ReactDOMClient.createRoot(container)
root.render(<App {...data} />)
