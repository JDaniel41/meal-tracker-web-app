import logo from './logo.svg';
import './App.css';
import FoodCounter from './components/FoodCounter';
import { useState } from 'react';
import NewRestarauntForm from './components/NewRestarauntForm';

function App() {
  const [restaurants, setRestaurants] = useState([]);

  function addNewRestaraunt(newName, newCount){
    let newRestaurant = {
      name: newName, 
      count: newCount
    }
    
    setRestaurants([...restaurants, newRestaurant]);
  }

  return (
    <div>
      <NewRestarauntForm submitCallback={addNewRestaraunt}/>
      {restaurants.map((place) => <FoodCounter name={place.name} startingNum={0}/>)}
    </div>
  );
}

export default App;
