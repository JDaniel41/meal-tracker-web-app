import { useState } from "react";

function NewRestarauntForm({ submitCallback }) {
    const [newName, setNewName] = useState("");
    const [newCount, setNewCount] = useState(0);

    function handleNameChange(event) {
        setNewName(event.target.value);
    }

    function handleCountChange(event) {
        setNewCount(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        submitCallback(newName, newCount);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row justify-center"
        >
            <label className="px-2">
                Restaurant Name:{" "}
                <input
                    type="text"
                    value={newName}
                    onChange={handleNameChange}
                />
            </label>
            <label className="px-2">
                Starting Count:{" "}
                <input
                    type="number"
                    value={newCount}
                    onChange={handleCountChange}
                />
            </label>
            <input type="submit" className="w-20 md:w-auto"></input>
        </form>
    );
}

export default NewRestarauntForm;
