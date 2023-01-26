import { useEffect, useRef, useState } from 'react';
import './App.css';
import Question from "./components/Question";

function App() {

	// restart game
	

	const [questions, setQuestions] = useState([])
	const [answersChecked, setAnswersChecked] = useState(false);
	const [score, setScore] = useState(0);
	const [start, setStart] = useState(false);
	const [restart, setRestart] = useState((false))
	// const [oldAnswer, setOldAnswer] = useState(undefined)


	useEffect(() => {
		// startQuiz();
	},[])

	const formRef = useRef();

	const startQuiz = async () => {
		const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
		const data = await response.json();
		
		const sortQuestions = data.results.map(({question, correct_answer: correctAnswer, incorrect_answers}, arrayIndex) => {		
				return {
					id: arrayIndex,
					question,
					answers: {
						correctAnswer,
						incorrectAnswer1: incorrect_answers[0],
						incorrectAnswer2: incorrect_answers[1],
						incorrectAnswer3: incorrect_answers[2],
					},
					[`userAnswer${arrayIndex}`]: ""
				}
			})
		setQuestions(sortQuestions);
		setStart(prevState => !prevState);
		// setAnswersChecked(false);
		setStart(true)
		setScore(0);
		setAnswersChecked(false)
		setRestart(true)
	}

	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	formRef.current.reset();
	// }

	const checkAnswers = () => {

		setAnswersChecked(true);

		questions.map((question, index) => {
			
			const { correctAnswer } = question.answers;
			const userAnswer = `userAnswer${index}`;

			question[userAnswer] === correctAnswer ? setScore(prevScore => prevScore + 1) : null;
		})
		
	}

	console.log(questions);
	
	const questionsHTML = questions.map((question, questionIndex) => {
		return (
			<>
				<Question restart={restart} id={questionIndex} setScore={setScore} checkAnswers={checkAnswers} answersChecked={answersChecked} questions={questions} setQuestions={setQuestions} question={question} questionIndex={questionIndex}  />
			</>
		)
	})

  return (
		<>
			{
				!start ?

				<div className="intro ">
					<h1 className="intro-title">Quizzical</h1>
					<p className="intro-text">Can you answer 5 random questions?</p>
					<button className="btn" onClick={startQuiz}>Start quiz</button>
				</div> 

				:

				<div className="App">
					<div className="questions">
						{questionsHTML}
					</div>
					<div>
						{ answersChecked && <span className="score">{`You scored ${score}/5 correct answers`}</span> }
						{ 
							answersChecked ?
							<button onClick={startQuiz} className="btn check">Play again</button>
							:
							<button onClick={checkAnswers} className="btn check">Check answers</button>
						}
					</div>
				</div>
			}
			
			
		</>
  )
}

export default App
