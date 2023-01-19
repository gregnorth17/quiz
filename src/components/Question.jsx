import "./question.css";

const Question = ({answersChecked, setQuestions, question, questionIndex}) => {
	
	const replaceCommas = (str) => {
		return str.replace(/&quot;|&#039;|&eacute;/g, "'");
	}

	const handleChange = (event, questionIndex) => {
    const {name, value} = event.target;

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

			return (
				<>
					<input  type="radio"
									onChange={(event) => handleChange(event, questionIndex)}
									name={`userAnswer${questionIndex}`}
									value={answer}
									id={`${questionIndex}${answerIndex}`}
									className="input"				
					/>
					<label className={`answer ${correct} ${incorrect}`} htmlFor={`${questionIndex}${answerIndex}`}>{replaceCommas(answer)}</label>
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