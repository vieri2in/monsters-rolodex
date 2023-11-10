import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [{ name: 'jos' }, { name: 'app' }],
      searchString: ''
    };
    console.log("constructor");
  }
  componentDidMount() {
    console.log("componentDidMount");
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      // .then(users => {
      //   this.setState(() => {
      //     return {
      //       monsters: users
      //     }; 
      //   });
      // })
      .then(users => {
        this.setState({
          monsters: users
        },
          () => {
            console.log(this.state);
          });
      })
    //   .then(res => res.json())
    //   .then(users => {
    //     return {
    //       monsters: users
    //     }
    //   },
    //   () => {
    //     console.log(this.state);
    //   })
  }
  onSearchChange = (event) => {
    const searchString = event.target.value.toLowerCase();
    this.setState(() => {
      return { searchString };
    });
  }
  render() {
    console.log("render");
    const { monsters, searchString } = this.state;
    const { onSearchChange } = this;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchString);
    });
    return (
      <div className="App">
        <input
          className='search-box'
          type='search'
          placeholder='search monsters'
          onChange={onSearchChange}
        />
        {
          filteredMonsters.map((m) => {
            return <div key={m.name}>
              <h1>
                {m.name}
              </h1>
            </div>
          })
        }
      </div>
    );
  }
}

export default App;
