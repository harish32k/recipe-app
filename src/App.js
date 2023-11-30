import "./App.css";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import MainPage from "./RecipeApp/MainPage.js";
import RecipeApp from "./RecipeApp/App/";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="main" />} />
            <Route path="/main/*" element={<MainPage />} />
            <Route path="/app/*" element={<RecipeApp />} />
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
