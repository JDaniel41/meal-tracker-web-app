import logo from "./logo.svg";
import "./App.css";
import FoodCounter from "./components/FoodCounter";
import { useState, useEffect } from "react";
import NewRestarauntForm from "./components/NewRestarauntForm";
import axios from "axios";

function App() {
    const [restaurants, setRestaurants] = useState([]);

    function addNewRestaraunt(newName, newCount) {
        let newRestaurant = {
            name: newName,
            count: newCount,
        };

        axios
            .post("/api", newRestaurant)
            .then((res) => {
                setRestaurants(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function deleteRestaraunt(businessName) {
        console.log("DELETE CALLED!");

        axios
            .delete("/api/" + businessName)
            .then((res) => {
                console.log(res);
                setRestaurants(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function updateCounterInApi(placeName, newCount) {
        console.log(placeName);
        console.log(newCount);
        axios
            .put(`/api/${placeName}/${newCount}`)
            .then((res) => {
                setRestaurants(res.data);
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        axios.get("/api").then((res) => {
            setRestaurants(res.data);
        });
    }, []);

    return (
        <div>
            <NewRestarauntForm submitCallback={addNewRestaraunt} />
            {restaurants.map((place) => (
                <FoodCounter
                    name={place.name}
                    startingNum={place.count}
                    removeCallback={deleteRestaraunt}
                    updateCallback={updateCounterInApi}
                />
            ))}
        </div>
    );
}

export default App;
