import {useState} from 'react';

function NewRestarauntForm({submitCallback}){
    const [newName, setNewName] = useState("");
    const [newCount, setNewCount] = useState(0);

    function handleNameChange(event){
        setNewName(event.target.value)
    }

    function handleCountChange(event){
        setNewCount(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault();
        submitCallback(newName, newCount);
    }

    return <form onSubmit={handleSubmit}>
        <label>Restaurant Name: <input type='text' value={newName} onChange={handleNameChange}/></label>
        <label>Starting Count: <input type='number' value={newCount} onChange={handleCountChange}/></label>
        <input type='submit'></input>
    </form>
}

export default NewRestarauntForm;