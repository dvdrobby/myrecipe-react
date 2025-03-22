import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Browse from "./pages/Browse";
import SearchDetail from "./pages/SearchDetail";
import CategoryDetail from "./pages/CategoryDetail";
import RecipeDetail from "./pages/RecipeDetail";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path='/search' element={<SearchDetail />} />
        <Route path='/category/:slug' element={<CategoryDetail />} />
        <Route path='/recipe/:slug' element={<RecipeDetail />} />
      </Routes>
    </Router>
  )
}

export default App
