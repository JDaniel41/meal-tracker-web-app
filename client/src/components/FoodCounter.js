import { useState } from "react";

function FoodCounter({ name, startingNum, removeCallback, updateCallback }) {
    const [timesEaten, setTimesEaten] = useState(startingNum);

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
        <div>
            <h1>{name}</h1>
            <h2>{timesEaten}</h2>

            <div>
                <button onClick={incrementCount}>+1</button>
                <button onClick={() => removeCallback(name)}>Remove</button>
                <button onClick={decrementCount}>-1</button>
            </div>
        </div>
    );
}

export default FoodCounter;
