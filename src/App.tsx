import "./styles.css";
import { Tooltip } from "./tooltip";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Tooltip contents="tips">
        <p>Hover me</p>
      </Tooltip>
    </div>
  );
}
