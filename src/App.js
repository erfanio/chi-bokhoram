import React, { Component } from 'react';
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox';
import Button from 'react-toolbox/lib/button/Button';
import foods from './foods';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: {
        meat: false,
        chicken: false,
        veggie: false,
        seafood: false
      },
      food: undefined,
      error: false
    };
  }

  matchTypes = ({types}) => {
    for (let type of types) {
      if (this.state.types[type] === false) {
        return false;
      }
    }
    return true;
  }

  getRandomItem = (items) => {
    const index = Math.floor(Math.random() * items.length);
    return items[index];
  }

  handleClick = () => {
    const filteredFoods = foods.filter((item) => this.matchTypes(item));
    if (filteredFoods.length === 0) {
      this.setState({
        error: true,
        food: undefined
      });
      return;
    }

    const thisFood = this.getRandomItem(filteredFoods);
    this.setState({
      food: thisFood,
      error: false
    });
  }

  handleCheck = (typeState) => {
    this.setState({
      types: {
        ...this.state.types,
        ...typeState,
      }
    });
  }

  render() {
    const {types, food, error} = this.state;
    const {meat, chicken, veggie, seafood} = types;
    return (
      <div className="wrapper">
        <div className="main">
          <h1>Chi Doros Konam <span role="img">🍲</span></h1>
          <h2>Select type of food:</h2>
          <Checkbox
            checked={meat}
            label="Meat"
            onChange={(meat) => this.handleCheck({meat})}
          />
          <Checkbox
            checked={chicken}
            label="Chicken"
            onChange={(chicken) => this.handleCheck({chicken})}
          />
          <Checkbox
            checked={veggie}
            label="Veggie"
            onChange={(veggie) => this.handleCheck({veggie})}
          />
          <Checkbox
            checked={seafood}
            label="Seafood"
            onChange={(seafood) => this.handleCheck({seafood})}
          />
          <Button label="Begoo!" onClick={this.handleClick} primary raised />
          {error && (
            <h3>Koft Bokhor! or just select a type of food!</h3>
          )}
          {food && (
            <div>
              <h2>Ino Doros Kon:</h2>
              <div className="foo">
                {food.name}
                {food.recipe && (
                  <div>
                    <a href={food.recipe} target="_blank">Recipe</a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
