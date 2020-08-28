import React from 'react';
//import our service
import JeopardyService from "../../jeopardyService";
import Display from "../display/Display"
import "./Jeopardy.css"

class Jeopardy extends React.Component {
    //set our initial state and set up our service as this.client on this component
    constructor(props) {
        super(props);
        this.client = new JeopardyService();
        this.state = {
            data: {},
            dataM: [], //new
            idd0: 0, //new
            idd1: 0, //new
            idd2: 0, //new
            idd_choosen_cat: 0,
            dataByCat: [], //new array of questions choosen by category
            score: 0,
            question_number: 0,
            user_answer: "",
            answer: "",
            showAnswer: false,
            result_for_question: "",
            question_answered: false,
            game_just_starts: true,
        }
    }

    getCategoryID_0butt = () => {

        if (this.state.game_just_starts === true || this.state.question_answered === true) {

            let id_clicked = this.state.idd0

            this.setState({
                idd_choosen_cat: id_clicked,

            }, () => {
                this.getArrayOfNewQuestions_ByCategoryId();
            })
        }
    }

    getCategoryID_1butt = () => {

        if (this.state.game_just_starts === true || this.state.question_answered === true) {
            let id_clicked = this.state.idd1

            this.setState({
                idd_choosen_cat: id_clicked,

            }, () => {
                this.getArrayOfNewQuestions_ByCategoryId();
            })
        }
    }

    getCategoryID_2butt = () => {

        if (this.state.game_just_starts === true || this.state.question_answered === true) {

            let id_clicked = this.state.idd2

            this.setState({
                idd_choosen_cat: id_clicked,

            }, () => {
                this.getArrayOfNewQuestions_ByCategoryId();
            })
        }
    }

    //get a new random question from the API and add it to the data object in state
    getArrayOfNewQuestions_ByCategoryId = () => {

        if (this.state.question_answered === true || (this.state.question_answered === false && this.state.game_just_starts === true)) {

            let arr;
            // let categoryID = 1972
            let categoryID = this.state.idd_choosen_cat;

            return this.client.getCategoryQuestions(categoryID).then(result => {

                this.setState(() => {

                    return { dataByCat: result.data }
                })

                let arrLength = this.state.dataByCat.length

                console.log("number of question in this category:  " + arrLength)

                let num = Math.floor(Math.random() * arrLength);

                console.log("number of choosen question:  " + num);

                const question = result.data.map((obj, i) => {
                    return (obj)
                })

                this.setState((prevState, props) => {

                    return {
                        data: question[num],
                        user_answer: "",
                        answer: "",
                        showAnswer: false,

                    }
                })
            });
        }
    }


    getSeveralQuestions = () => {

        if (this.state.game_just_starts === true || this.state.question_answered === true) {

            return this.client.getQuestionArray().then((result) => {

                const idd = result.data.map((obj, i) => {

                    // return <p key={i}> {obj.category.id}</p>
                    return (obj.category.id)
                })

                this.setState(() => {

                    return {
                        dataM: result.data,
                        idd0: idd[0], // ID of category gor the first member of array
                        idd1: idd[1], // ID of category gor the second member of array
                        idd2: idd[2], // ID of category gor the third member of array
                        data: {},

                        idd_choosen_cat: 0,
                        dataByCat: [],
                        user_answer: "",
                        answer: "",
                        showAnswer: false,
                        result_for_question: ""
                    }
                })
            })
        }
    }


    //get random question
    getNewQuestion() {
        return this.client.getQuestion().then(result => {
            this.setState({
                data: result.data[0],
                user_answer: "",
                answer: "",
                showAnswer: false,
                result_for_question: ""
            })
            console.log()
        })
    }

    //when the component mounts
    componentDidMount() {
        // this.getNewQuestion();
        this.getSeveralQuestions();
    }

    handleNewGame = () => {
        this.getSeveralQuestions();
        this.setState({
            score: 0,
            question_number: 0
        })
    }

    handleUserAnswer = (event) => {
        const userAnswerNew = event.target.value;
        this.setState({ user_answer: userAnswerNew })

    }

    handleScore = (event) => {
        console.log("Hi from handleScore!!!")
        if (this.state.user_answer === this.state.data.answer) {
            console.log("Correct answer!!!")
        }
        console.log(this.state.data.category.title)
    }

    handleSubmitAnswer = (event) => {
        if (this.state.user_answer !== '') {

            this.setState((prevState, props) => {

                return {
                    question_number: prevState.question_number + 1,
                    question_answered: true,
                    showAnswer: true,
                    game_just_starts: false,
                }
            })


            if (this.state.user_answer.trim().toLowerCase() === this.state.data.answer.trim().toLowerCase()) {
                console.log("your answer is right!!")

                this.setState((prevState, props) => {
                    // console.log("1--:::  " + prevState.score);
                    // console.log("2--:::  " + this.state.data.value);
                    return {
                        score: prevState.score + this.state.data.value,
                        result_for_question: "Your answer is right!"
                    }
                })

            } else {
                console.log("your answer is wrong!!!")


                this.setState((prevState, props) => {

                    return {
                        score: prevState.score - this.state.data.value,
                        result_for_question: "Your answer is wrong..."
                    }
                })
            }
        }
    }

    //display the results on the screen
    render() {
        // let element = "";
        // let answer_in_game = "";
        // let result_for_question = "";
        // // let result_for_question = this.state.result_for_question;

        // if (this.state.showAnswer) {
        //     answer_in_game = (
        //         "The answer is \" " + this.state.data.answer + "\""

        //     );

        //     result_for_question = this.state.result_for_question
        // }


        // if (this.state.data.category !== undefined) {
        //     element = (
        //         <div>
        //             Question#: {this.state.question_number}         Score: {this.state.score}
        //             <br />
        //             Title: {this.state.data.category.title}
        //             <br />
        //             Question: {this.state.data.question}
        //             <br />
        //             Point Value: {this.state.data.value}
        //             <br />
        //             <label htmlFor="user_answer">Your answer?</label>

        //             <input
        //                 type="text"
        //                 name="user_answer"
        //                 value={this.state.user_answer}
        //                 onChange={this.handleUserAnswer}
        //             />


        //             <button className="butt" onClick={this.handleSubmitAnswer}>Show answer</button>
        //             <br />
        //             {answer_in_game}
        //             <br />
        //             {result_for_question}
        //             <br />
        //             [Answer for test: {this.state.data.answer}]

        //             <div id="answer_is_right">
        //                 Is your answer correct?
        //             <br />
        //                 <button className="butt" onClick={this.handleCorrectAnswer} >correct</button>
        //                 <button className="butt" onClick={this.handleWrongAnswer} >wrong</button>
        //             </div>
        //             <button className="butt" onClick={this.nextQuestion} >Next question</button>
        //             <button className="butt" onClick={this.handleNewGame} >Start New game</button>


        //         </div>
        //     )
        // }


        // let arr = this.state.data.category
        // console.log("***" + arr)
        //=====================================
        // let category = "";
        // let categoryID = "";

        // if (this.state.dataM !== undefined) {

        //     category = this.state.dataM.map((data, i) => {

        //         return <p key={i}>{data.category.title}</p>

        //     })

        //     categoryID = this.state.dataM.map((data, i) => {
        //         return <p key={i}>{data.category.id}</p>
        //     })

        // }

        //=================================

        return (

            <div>
                <Display

                    stateJeop={this.state}

                    handleUserAnswer={this.handleUserAnswer}
                    handleSubmitAnswer={this.handleSubmitAnswer}
                    handleNewGame={this.handleNewGame}

                    getCategoryID_0butt={this.getCategoryID_0butt}
                    getCategoryID_1butt={this.getCategoryID_1butt}
                    getCategoryID_2butt={this.getCategoryID_2butt}
                    getSeveralQuestions={this.getSeveralQuestions}
                    getArrayOfNewQuestions_ByCategoryId={this.getArrayOfNewQuestions_ByCategoryId}

                />
               
            </div >

        );

    }
}
export default Jeopardy;