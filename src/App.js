import { Route, Routes } from "react-router-dom";
import Weather from "./pages/Weather.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Weather />}></Route>      
    </Routes>
  );
}

export default App;
