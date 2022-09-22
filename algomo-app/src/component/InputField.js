import React, { Component } from "react";
import "./InputField.css";
import DisneyMarvelAPI from "../logic/DisneyMarvelAPI";

class InputField extends Component {
  // const [textInput, setTextInput] = useState("");
  // const [isAnonymous, setIsAnoymous] = useState(true);

  state = {
    textInput: "",
    isAnonymous: true,
    marvelNames: [],
    marvelNamesTotalResults: 0,
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

  handleButtonDisableStatus = (event) => {
    var typed = event.target.value;

    // DisneyMarvelAPI.getCharacterByNameStart(typed).then((res) => {
    //   this.setState({ marvelNames: res["data"]["data"]["results"] });
    // });
    // console.log(typed);
    // console.log(this.state.marvelNamesTotalResults + "total");

    this.setState({ textInput: typed }); //setTextInput(typed);
    // event.currentTarget.disabled = true;
    if (typed.length > 1) {
      this.handleNameRetrival(typed);
    }
    if (typed.length > 0) {
      this.setState({ isAnonymous: false, marvelNames: [] }); //setIsAnoymous(false);
    } else {
      this.setState({ isAnonymous: true }); //setIsAnoymous(true);
    }
    console.log("Input typed " + typed + " " + typed.length);

    console.log(typeof this.state.marvelNames);
    for (let i = 0; i < this.state.marvelNames.length; i++) {
      console.log("marvelname " + i + " " + this.state.marvelNames[i]["name"]);
    }
  };

  onClickPopulate = (searchTerm) => {
    this.setState({ textInput: searchTerm });
    console.log("search ", searchTerm);
  };

  render() {
    return (
      <div>
        <h4 className="text">Search{/*this.state.textInput*/}</h4>
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
              onChange={(event) => this.handleButtonDisableStatus(event)}
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
                    fullName !== searchTerm
                  );
                })
                .slice(0, 5)
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

          {/* disbaled color #fcf0bd */}
          <button
            className={
              !this.state.isAnonymous ? "submitbutton" : "disablesubmitbutton"
            }
            disabled={this.state.isAnonymous ? true : false}
          >
            SEARCH
          </button>
        </div>
      </div>
    );
  }
}
export default InputField;
