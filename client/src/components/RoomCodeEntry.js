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
        <form onSubmit={handleSubmit} className="flex justify-center">
            <label className="p-5">
                Room Code:{" "}
                <input
                    type="text"
                    value={roomCode}
                    onChange={handleRoomCodeChange}
                    className="w-20 px-5 text-center"
                />
            </label>
            <input type="submit"></input>
        </form>
    );
}

export default RoomCodeEntry;
