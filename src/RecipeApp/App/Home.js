import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div>
      <h1>Home</h1>
      <p>Home feed for user: {user.username}</p>
    </div>
  );
}

export default Home;
