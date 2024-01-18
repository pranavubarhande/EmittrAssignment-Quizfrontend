import React, { useEffect, useState } from 'react';
import { RadioGroup, Radio } from 'react-radio-input';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getTestLeaderBoard, submitUserTest } from '../services/testService';
const TakeTest = () => {
    const params = useParams();
    const location = useLocation();
    const [answers, setAnswers] = useState({});
    const [leaderboard, setLeaderboard] = useState();
    const navigate = useNavigate();

    useEffect(() => {
      getTestLeaderBoard(params.language).then(res =>{
        setLeaderboard(res);
      })
    }, [])
    
    
    const handleAnswerChange = (questionId, selectedAnswer) => {
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [questionId]: selectedAnswer,
        }));
      };
    
      const handleSubmit = () => {
        const allQuestionsAnswered = location.state.tests[params.language].every((question) => answers[question.id]);
        
        if (allQuestionsAnswered) {
            let score = 0;

          const resultArray = location.state.tests[params.language].map((question) => ({
            id: question.id,
            questionText: question.question,
            options: question.options,
            correctOption: question.correctAnswer,
            submittedOption: answers[question.id],
          }));
          resultArray.map(q => {
            if(q.correctOption == q.submittedOption){
                score++;
            }
          })
          
          const data = {
            userId: JSON.parse(localStorage.getItem('user')).id,
            subject: params.language,
            answers: JSON.stringify(resultArray),
            score: score
          }
          submitUserTest(data).then(res => {
            alert(`Your Score In ${params.language} is ${score}`);
            navigate('/');
          })
        } else {
          alert('Please answer all questions before submitting.');
        }
      };
    const QuestionView = () => {
        return(
            location.state.tests[params.language].map(question => {
                return (
                    <div style={{backgroundColor:'#eeeeee', width:'100%', marginBottom:'40px ', borderRadius:10, display:'flex', flexDirection:'row', padding:20, borderWidth:2, borderStyle:'solid', borderColor:answers[question.id]?'black':'red'}} key={question.id}>
                        <h1 style={{marginRight:20}}>{question.id}.</h1>
                        <div>
                            <h1>{question.question}</h1>
                            <div 
                            style={{display:'flex', flexDirection:'column'}}
                            >
                            {question.options.map(option => {
                                return(
                                    <label style={{alignItems:'center', display:'flex', fontSize:24}}>
                                        <input
                                            type="radio"
                                            name={option}
                                            value={option}
                                            checked={answers[question.id] === option}
                                            onChange={() => handleAnswerChange(question.id, option)}
                                            style={{marginRight:10, width:20, height:20}}
                                        />
                                        {option}
                                    </label>
                                )
                            })}
                            </div>
                            
                        </div>
                    </div>
                )
            })
        )
    }
    return(
        <div style={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%', backgroundColor: 'white', padding: '0px 5px'}}>
          {/* Test section, consisting of questions list and submit option */}
          <div style={{display:'flex', flexDirection:'column', width:'70%', marginRight:20, marginLeft:20,paddingBottom:'100px'}}>
            <h1 style={{alignSelf:'center'}}>Answer the following questions</h1>
            <button onClick={handleSubmit} style={{marginBottom:20, fontSize:20, border:'1px solid black', borderRadius:20}}>Submit Answers</button>
            {<QuestionView />}
            <button onClick={handleSubmit} style={{marginBottom:20, fontSize:20, border:'1px solid black', borderRadius:20}}>Submit Answers</button>

          </div>
          {/* Instructions for the user */}
          <div style={{display:'flex', flexDirection:'column', width:'30%' }}>
            <div style={{ display:'flex', flexDirection:'column', border:'1px solid black', borderRadius:20, padding:30, marginBottom:30}}>
                <h1 style={{alignSelf:'center'}}>Instructions</h1>
                <h5>-This quiz has multiple choice pattern.</h5>
                <h5>-There would be 1 mark for each quiz.</h5>
                <h5>-There are total 50 questions.</h5>
                <h5>-Please submit only after filling all the answers.</h5>
            </div>
            <div>
                
            </div>
            {/* Leader board of particular subject test */}
            <div style={{ display:'flex', flexDirection:'column', border:'1px solid black', borderRadius:20, padding:30}}>
                <h1 style={{alignSelf:'center'}}>Leaderboard: {params.language}</h1>
                <table id="leaderboard" style={{borderRadius:'20px', width:'100%', padding:'20px'}}>
                        <tr style={{ display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                        <th>Userame</th>
                        <th>Marks Scored</th>
                        </tr>
                        {
                            leaderboard && 
                            leaderboard.map(test => {
                                return(
                                    <tr style={{ display:'flex', flexDirection:'row', justifyContent:'space-evenly', marginBottom:20}}>
                                        <td>{test.user.email}</td>
                                        <td>{test.score}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
            </div>
          </div>

        </div>
    )
}
export default TakeTest;