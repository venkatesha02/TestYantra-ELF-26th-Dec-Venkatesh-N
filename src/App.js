import React from 'react';
import RecipeList from './component/recipeList/RecipeList'
import RecipeDetails from './component/recipeDetails/RecipeDetails'
import Headre from './Header'

class App extends React.Component {
  state = {
    show: false,
    id: null,
    recipes: [
      {
        id: 1,
        name: 'Jamun',
        image: 'https://5.imimg.com/data5/IX/BL/GLADMIN-48173418/dry-jamoon-500x500.png',
        ingridiants: ['MTR mix, ', 'Sugur, ']
      },
      {
        id: 2,
        name: 'Gobi',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMXw5cPhDp9Q-hXCOswCofrTosAvqOS7nhsectoVKyjjHzKNpc&s',
        ingridiants: ['Onian, ', 'Cornflower, ']
      },
      {
        id: 3,
        name: 'Pani Poori',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7THLiDvCIiGsMUQcGlRI9Pc6F43-1oMOiI7aO7OXWZTBbO2lDhQ&s',
        ingridiants: ['Onian, ', 'Tomoto, ']
      },
      {
        id: 4,
        name: 'Noodels',
        image: 'https://www.recipetineats.com/wp-content/uploads/2019/11/Lo-Mein_5.jpg',
        ingridiants: ['1 Noodels, ', '1 Cup Water, ', 'Salt, ']
      }
    ]
  }

  render() {
    return (
      <div>
        <Headre />
        <div className='row'>
          <div className='col-md-4'>
            <RecipeList list={this.state.recipes} action={this.click} />
          </div>
          <div className='col-md-4'>
            {this.state.show ? <RecipeDetails details={this.state.id} /> : ""}
          </div>
        </div>
      </div>)
  }

  click = (click) => {
    console.log(click)
    this.setState({
      show: true,
      id: click

    })
  }
}

export default App;