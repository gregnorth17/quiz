import { useState } from "react";
import "./question.css";

const Question = ({setOldAnswer, answersChecked, setQuestions, question, questionIndex, restart}) => {
	const [checked, setChecked] = useState({ apple: true, orange: false });

  // const changeRadio = (e) => {
  //   setChecked(() => {
  //     return {
  //       apple: false,
  //       orange: false,
  //       [e.target.value]: true
  //     };
  //   });
  // };

  // return (
  //   <>
  //     <button
  //       onClick={() => setChecked(() => ({ apple: false, orange: false }))}
  //     >
  //       uncheck
  //     </button>
  //     <label>
  //       <input
  //         type="radio"
  //         checked={checked.apple}
  //         value="apple"
  //         name="choice"
  //         onChange={changeRadio}
  //       />
  //       apple
  //     </label>

  //     <label>
  //       <input
  //         type="radio"
  //         checked={checked.orange}
  //         value="orange"
  //         name="choice"
  //         onChange={changeRadio}
  //       />
  //       orange
  //     </label>
  //   </>
	// )
	const replaceCommas = (str) => {
		return str.replace(/&quot;|&#039;|&eacute;/g, "'");
	}

	const handleChange = (event, questionIndex) => {
    const {name, value} = event.target;
		console.log(event.target);
		// const checked = event.target.checked ? value : null; 
		console.log(event.target);
		// setOldAnswer(checked);
    setQuestions(prevQuestionsArr => {
			return prevQuestionsArr.map(prevQuestionObj => {
				if(prevQuestionObj.id === questionIndex) {
					return {
						...prevQuestionObj,
						[name]: value
					}
				} else {
					return prevQuestionObj;
				}
			})
    })
  }

	try {
		const sortAnswers = Object.values(question.answers).sort().map((answer, answerIndex) => {

			const userAnswer = `userAnswer${questionIndex}`;
			const {correctAnswer} = question.answers;
			
			const correct = answersChecked && answer === correctAnswer  ? "correct" : "";
			const incorrect = answersChecked && answer !== correctAnswer && question[userAnswer] === answer ? "incorrect" : "";
			const addGrey = answersChecked && !correct && !incorrect ? "addGrey" : "";
			// const white = question[userAnswer] === answer ? "white" : "";
			// const selected = question[userAnswer] ? "selected" : "";
			// const unselected = question[userAnswer] === "" ? "unselected" : "";

			return (
				<>
					<input  type="radio"
									onChange={(event) => handleChange(event, questionIndex)}
									name={`userAnswer${questionIndex}`}
									value={answer}
									id={`${questionIndex}${answerIndex}`}
									// checked={false}
									required={true}
					/>
					<label className={`answer ${correct} ${incorrect} ${addGrey}`} htmlFor={`${questionIndex}${answerIndex}`}>{replaceCommas(answer)}</label>
					
				</>
			)
		})
	
		return (
			<div className="container">
				<h3 className="question">{replaceCommas(question.question)}</h3>
				<div className="answers">
					{sortAnswers}
				</div>
			</div>
		)

		} catch(error) {
			console.log(error);
		}

	}



export default Question;