import { useSelector } from "react-redux";
import SampleMealPost from "./Components/SamplePost";
import * as mealClient from "../Clients/mealClient.js";
import { useEffect, useState } from "react";
import MealListFromJson from "./Components/MealListFromJson";

function Home() {
  const user = useSelector((state) => state.userReducer.user);

  const [mealData, setMealData] = useState(null);

  const getMeals = async () => {
    try {
      const data = await mealClient.fetchRandomTenMeals();
      setMealData(data);
    } catch (error) {
      console.log(error.message);
    }
    // const data = await mealClient.fetchRandomTenMeals();
    // setMealData(data);
  };

  useEffect(() => {
    getMeals();
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <p>Home feed for user: {user.username}</p>
      <MealListFromJson mealData={mealData} />
      {/* <pre>{JSON.stringify(mealData, null, 2)}</pre> */}
    </div>
  );
}

export default Home;
