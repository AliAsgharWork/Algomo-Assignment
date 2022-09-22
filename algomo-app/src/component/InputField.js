import React, { Component } from "react";
import "./InputField.css";
import DisneyMarvelAPI from "../logic/DisneyMarvelAPI";

class InputField extends Component {
  state = {
    textInput: "",
    isAnonymous: true,
    marvelNames: [],
    marvelNamesTotalResults: 0,
    isClickedDropDown: false,
  };

  // componentDidMount() {
  //   DisneyMarvelAPI.getCharacterByNameStart("hulk").then((res) => {
  //     console.log(res["data"]["data"]["results"]);
  //     // this.setState({ notes: res.data });
  //   });

  //   // this.setState({ notes: notes });
  // }

  handleNameRetrival = (name) => {
    DisneyMarvelAPI.getCharacterByNameStart(name).then((res) => {
      this.setState({
        marvelNames: res["data"]["data"]["results"],
        marvelNamesTotalResults: res["data"]["data"]["total"],
      });
    });
  };

  handleOnChangeSearchbar = (event) => {
    var typed = event.target.value;

    //Setting state for the text that is inputted in the search bar
    this.setState({ textInput: typed });
    //Gets Marvel Names after 2 characters have been written
    if (typed.length > 1) {
      this.handleNameRetrival(typed);
      this.setState({ isClickedDropDown: false });
    }
    //Identifies if text is written inside or not which controls button able/disable status and clears Marvel Names
    if (typed.length > 0) {
      this.setState({ isAnonymous: false, marvelNames: [] });
    } else {
      this.setState({ isAnonymous: true });
    }
  };
  //When suggestion dropdown is selected , it will populate the searchbar with that option
  // it also is able to clear dropdown list if an option is selected
  onClickPopulate = (searchTerm) => {
    this.setState({ textInput: searchTerm, isClickedDropDown: true });
    console.log("search ", searchTerm);
  };

  render() {
    return (
      <div>
        <h4 className="text">Search</h4>
        <div className="flexthiscol">
          <div className="containersearchdrop">
            <input
              className={
                this.state.textInput === "" ||
                this.state.marvelNamesTotalResults === 0
                  ? "inputfield"
                  : "inputfieldonsearchresults"
              }
              placeholder="Search terms"
              value={this.state.textInput}
              size="35"
              onChange={(event) => this.handleOnChangeSearchbar(event)}
            ></input>

            <div className="dropdown">
              {this.state.marvelNames
                .filter((item) => {
                  const searchTerm = this.state.textInput.toLowerCase();
                  const fullName = item["name"].toLowerCase();
                  console.log(fullName, searchTerm);

                  return (
                    searchTerm &&
                    fullName.startsWith(searchTerm) &&
                    fullName !== searchTerm &&
                    !this.state.isClickedDropDown
                  );
                })
                .slice(0, 5) //Shows only first 5 results
                .map((item) => (
                  <div
                    onClick={() => this.onClickPopulate(item["name"])}
                    className="dropdown-row"
                    key={item["name"]}
                  >
                    {item["name"]}
                  </div>
                ))}
            </div>
          </div>

          <button
            className={
              !this.state.isAnonymous ? "submitbutton" : "disablesubmitbutton"
            }
            disabled={this.state.isAnonymous ? true : false}
            onClick={() => {
              console.log("button pressed");
            }}
          >
            SEARCH
          </button>
        </div>
      </div>
    );
  }
}
export default InputField;
