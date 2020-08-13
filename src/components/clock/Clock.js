import React from 'react'

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        }
    }
    tick() {
        this.setState({
            date: new Date()
        })
    }
    componentDidMount() {
        this.timerId = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {

        return (
            <div className='Clock'>
                
                <h2>Live, today...  </h2>
                <h4>
                    {this.state.date.toDateString() } . . .   
                     { this.state.date.toLocaleTimeString()}
                     </h4>
               
            </div>
        );
    }
}

export default Clock;