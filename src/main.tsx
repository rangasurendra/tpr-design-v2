import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

// Ensure there is a mount point.
const root =
  document.getElementById("root") ??
  (() => {
    const el = document.createElement("div")
    el.id = "root"
    document.body.appendChild(el)
    return el
  })()

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
