import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsPage from "./components/ItemsPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<ItemsPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
