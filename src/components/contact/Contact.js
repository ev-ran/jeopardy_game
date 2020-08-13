

import React from 'react';

class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: { firstName: '', lastName: '', },
            submitted: false,
        }
    }

    //===EVENT HANDLER==  TO UPDATE THE STATE
    //to update the state. Use public class method - to serve all inputs. So no 'this.'
    handleChange = (event) => {
        // Cope the current state to variable. We4 should use spread operator - to make a real copy of state
        // Copy, that create new object in memory
        //   https://scotch.io/bar-talk/copying-objects-in-javascript#toc-using-spread-elements-
        const formDataNew = {...this.state.formData};
        // what should change? In our case event has name [event.target.name] - (firstName or secondName) 
        // and event has value [event.target.value] - (WHAT has been printed in the field)
        //whatever change in form - will be take into consideration
        formDataNew[event.target.name] = event.target.value;

        //What we want to update  - in new point of state? we should to update the Form data

        this.setState({ formData: formDataNew });
    }

    //===EVENT HANDLER==  TO PUSH BUTTON 'SUBMIT FORM
    handleSubmit = (event) => {
        //to prevent default actions for Submit button:
        event.preventDefault();

        this.setState({ submitted: true });
    }

    //===EVENT HANDLER==  TO PUSH BUTTON 'RESET FORM'
    resetForm = (event) => {
        this.setState({
            formData: {firstName: '', lastName: ''},
            submitted: false,
        })
    }



    render() {
        //conditional rendering [ if - some condition - do this, other condition - do that]
        if (this.state.submitted) {
            return (
                <div className="Contact">
                    <p>Thank you, {this.state.formData.firstName}, for submitting the form! </p>
                    <button onClick={this.resetForm}>Reset Form</button>
                </div>
            )
        }

        return (

            <div className="Contact">
                <form onSubmit={this.handleSubmit}>

                    <div>
                        <label htmlFor="firstName">FirstName</label>
                        <input type="text"
                            name="firstName"
                            // all changes we put into state, so:
                            value={this.state.formData.firstName}
                            //add event LIstener - 'onChange' the value of field. handleChange - without ()!!! [NOT this.handleChange()]
                            onChange={this.handleChange}
                           
                        />
                    </div >

                    <div>
                        <label htmlFor="lastName">LastName</label>
                        <input type="text"
                            name="lastName"
                            value={this.state.formData.lastName
                            }
                            onChange={this.handleChange}
                        />

                    </div>

                    <button>Submit Form</button>

                </form>

                {/* //just put the values of state - for fun*. It updates as we tipe/} */}
                <br />
                <div>{this.state.formData.firstName} </div>
              
                <div>{this.state.formData.lastName}</div>

            </div>

        );

    }
}


export default Contact