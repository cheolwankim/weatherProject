import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main.js";
import Weather from "./pages/Weather.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/weather" element={<Weather />}></Route>
    </Routes>
  );
}

export default App;
