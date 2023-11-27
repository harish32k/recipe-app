import "./App.css";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import Login from "./Login";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Login" />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/account" element={<h1>Account</h1>} />
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
