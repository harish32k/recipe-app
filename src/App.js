import "./App.css";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import RecipeApp from "./RecipeApp/App/";
import CurrentUser from "./RecipeApp/App/CurrentUser";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <CurrentUser>
        <HashRouter>
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="app" />} />
              <Route path="/app/*" element={<RecipeApp />} />
            </Routes>
          </div>
        </HashRouter>
      </CurrentUser>
    </Provider>
  );
}

export default App;
