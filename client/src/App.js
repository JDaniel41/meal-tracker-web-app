import "./App.css";
import FoodCounter from "./components/FoodCounter";
import { useState, useEffect } from "react";
import NewRestarauntForm from "./components/NewRestarauntForm";
import axios from "axios";
import RoomCodeEntry from "./components/RoomCodeEntry";

function App() {
    const [restaurants, setRestaurants] = useState(null);
    const [roomCode, setRoomCode] = useState(null);

    function addNewRestaraunt(newName, newCount) {
        let newRestaurant = {
            name: newName,
            count: newCount,
        };

        axios
            .post(`/api/${roomCode}`, newRestaurant)
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
            .delete(`/api/${roomCode}/` + businessName)
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
            .put(`/api/${roomCode}/${placeName}/${newCount}`)
            .then((res) => {
                setRestaurants(res.data);
            })
            .catch((error) => console.log(error));
    }

    function renderRestarauntSection() {
        console.log(restaurants);
        if (!restaurants) {
            return <div></div>;
        }
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

    function roomCodeUpdated(code) {
        setRoomCode(code);
        axios.get(`/api/${code}`).then((res) => {
            setRestaurants(res.data);
        });
    }

    /*
    useEffect(() => {
        axios.get(`/api/${roomCode}`).then((res) => {
            setRestaurants(res.data);
        });
    }, []);*/

    return (
        <div>
            <RoomCodeEntry updateRoomCodeCallback={roomCodeUpdated} />
            {renderRestarauntSection()}
        </div>
    );
}

export default App;
