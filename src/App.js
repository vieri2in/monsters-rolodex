import "./App.css";
import { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchString: "",
    };
    // console.log("constructor");
  }
  componentDidMount() {
    // console.log("componentDidMount");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      // .then(users => {
      //   this.setState(() => {
      //     return {
      //       monsters: users
      //     };
      //   });
      // })
      .then((users) => {
        this.setState({
          monsters: users,
        });
      });
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
  };
  render() {
    // console.log("render");
    const { monsters, searchString } = this.state;
    const { onSearchChange } = this;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchString);
    });
    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          className="monsters-search-box"
          onChangeHandler={onSearchChange}
          placeholder="search monsters"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
