import React, { Component } from 'react'

class TestFetch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentCharacter: {},
            currentNumber: 1,
        }

    }
    componentDidMount() {
        this.myTestFetch();
    }

    myTestFetch() {
        fetch("https://swapi.dev/api/people/" + this.state.currentNumber)
            .then(responseObject => responseObject.json()) //turn the JSON string into a JS object
            .then(characterJSON => {
                console.log(characterJSON);
                this.setState({ currentCharacter: characterJSON })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    clickHandler = () => {
        this.setState((prevState, props) => {
            return { currentNumber: prevState.currentNumber + 1 } // add "1" 
        }, this.myTestFetch)  // run myTestFetch() with new address
    }

    render() {

        return (

            <div className="TestFetch">
                {/* Hi from TestFetch!!! */}
              Name: {this.state.currentCharacter.name}
                <br />
              Birth_year: {this.state.currentCharacter.birth_year}
                <br />
              Gender: {this.state.currentCharacter.gender}
                <br />
               Hair_color: {this.state.currentCharacter.hair_color}
                <button onClick={this.clickHandler}>Next Character</button>

            </div>
        )
    }

}
export default TestFetch;