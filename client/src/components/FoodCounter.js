import { useState } from "react";

function FoodCounter({ name, startingNum, removeCallback, updateCallback }) {
    const [timesEaten, setTimesEaten] = useState(Number(startingNum));

    function incrementCount() {
        setTimesEaten((oldCount) => oldCount + 1);
        updateCallback(name, timesEaten + 1);
    }

    function decrementCount() {
        if (timesEaten > 0) {
            setTimesEaten((oldCount) => oldCount - 1);
            updateCallback(name, timesEaten - 1);
        }
    }

    return (
        <div className="w-64 p-10">
            <div className="flex flex-col justify-center bg-white rounded-lg shadow-2xl">
                <h1 className="font-bold text-center text-3xl pt-5">{name}</h1>
                <h2 className="text-center text-2xl pt-5">{timesEaten}</h2>

                <div className="w-auto flex justify-around p-5">
                    <button onClick={decrementCount}>-1</button>
                    <button onClick={() => removeCallback(name)}>Remove</button>
                    <button onClick={incrementCount}>+1</button>
                </div>
            </div>
        </div>
    );
}

export default FoodCounter;
