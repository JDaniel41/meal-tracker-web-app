import { useState } from "react";

function RoomCodeEntry({ updateRoomCodeCallback }) {
    const [roomCode, setRoomCode] = useState(0);

    function handleSubmit(event) {
        event.preventDefault();
        updateRoomCodeCallback(roomCode);
        console.log(roomCode);
    }

    function handleRoomCodeChange(event) {
        setRoomCode(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Room Code:{" "}
                <input
                    type="number"
                    value={roomCode}
                    onChange={handleRoomCodeChange}
                />
            </label>
            <input type="submit"></input>
        </form>
    );
}

export default RoomCodeEntry;
