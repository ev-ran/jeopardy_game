import React from 'react'
import './Display.css'
import '../jeopardy/Jeopardy.css'

function Display(props) {

    let element = "";
    let answer_in_game = "";
    let result_for_question = "";
    let title_of_question = "";
    let question = "";
    let points_for_question = "";
    //=================================
    let category = "";
    let categoryID = "";

    if (props.stateJeop.dataM !== undefined) {

        category = props.stateJeop.dataM.map((data, i) => {

            return <p key={i}> <span className="text">Category: </span> "{data.category.title}"</p>
        })
        categoryID = props.stateJeop.dataM.map((data, i) => {
            return <p key={i}>{data.category.id}</p>
        })
    }
    // ==================================
    if (props.stateJeop.showAnswer) {
        answer_in_game = (
            "The answer is \" " + props.stateJeop.data.answer + "\""
        );
        result_for_question = props.stateJeop.result_for_question
    }

    if (props.stateJeop.data.category !== undefined) {

        title_of_question = props.stateJeop.data.category.title;
        question = props.stateJeop.data.question;
        points_for_question = props.stateJeop.data.value;

        element = (
            <div>
                [Answer for test: {props.stateJeop.data.answer}]
                <p> {answer_in_game}. {result_for_question} </p>
            </div>
        )
    }

    return (

        <div className="Display">

            <div className="categories">
                <button className="category_butt" onClick={props.getCategoryID_0butt}>  {category[0]} </button>
                <button className="category_butt" onClick={props.getCategoryID_1butt}>  {category[1]} </button>
                <button className="category_butt" onClick={props.getCategoryID_2butt}>  {category[2]} </button>
            </div>

            <div className="line"></div>
            <div className="info_container">

                <div className="info_1">
                    <p> Current Score:  </p>
                    <p> Answered Questions: </p>
                    <p> Category Title: </p>
                    <p>Point Value: </p>
                    <p>Question: </p>
                </div>
                <div className="info_2">
                    <p> {props.stateJeop.score} </p>
                    <p> {props.stateJeop.question_number}</p>
                    <p> {title_of_question}</p>
                    <p> {points_for_question}</p>
                    <p> {question}</p>
                </div>
            </div>
            {/* //============================ */}
            <div className="line"></div>
            <div className="info_container">
                <div className="info_4">
                    <br />
                    <label htmlFor="user_answer"><p>Your answer: </p></label>
                </div>

                <div className="info_3" >
                    <input
                        type="text"
                        name="user_answer"
                        value={props.stateJeop.user_answer}
                        onChange={props.handleUserAnswer}
                    />
                    <button className="butt" onClick={props.handleSubmitAnswer}>Submit answer</button>
                </div>
            </div>
            {/* //============================ */}
            <div className="line"></div>
            <div className="info_container">

                <div className="info_1"></div>
                <div className="info_2">

                    {element}

                </div>

            </div>

            {/* <button className="butt" onClick={props.getArrayOfNewQuestions_ByCategoryId}>Next question in Category</button> */}
            <button className="butt" onClick={props.getSeveralQuestions}>Change Categories</button>
            <button className="butt" onClick={props.handleNewGame} >Start New game</button>
        </div>
    )
}
export default Display;