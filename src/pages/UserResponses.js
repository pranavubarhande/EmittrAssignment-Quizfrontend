import React, { useEffect, useState } from 'react';
import { RadioGroup, Radio } from 'react-radio-input';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getTestLeaderBoard, submitUserTest } from '../services/testService';
const UserResponses = () => {
    const params = useParams();
    const location = useLocation();
    const [answers, setAnswers] = useState({});
    const [leaderboard, setLeaderboard] = useState();
    const navigate = useNavigate();

    useEffect(() => {
      getTestLeaderBoard(location.state.test.subject).then(res =>{
        setLeaderboard(res);
      })
    }, [])
    const QuestionView = () => {
        return(
            JSON.parse(location.state.test.answers).map(question => {
                return (
                    <div style={{backgroundColor:'#eeeeee', width:'100%', marginBottom:'40px ', borderRadius:10, display:'flex', flexDirection:'row', padding:20, borderWidth:2, borderStyle:'solid'}} key={question.id}>
                        <h1 style={{marginRight:20}}>{question.id}.</h1>
                        <div>
                            <h1>{question.questionText}</h1>
                            <div 
                            style={{display:'flex', flexDirection:'column'}}
                            >
                            {question.options.map(option => {
                                return(
                                    <label style={{alignItems:'center', display:'flex', fontSize:24, backgroundColor:(question.correctOption === option)?"grey":'transparent', color:(question.correctOption === option)?"white":'black', padding:5, borderRadius:10}}>
                                        <input
                                            type="radio"
                                            name={option}
                                            value={option}
                                            
                                            checked={question.submittedOption === option}
                                            // onChange={() => handleAnswerChange(question.id, option)}
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
          <div style={{display:'flex', flexDirection:'column', width:'70%', marginRight:20, marginLeft:20,paddingBottom:'100px'}}>
            <h1 style={{alignSelf:'center'}}>Your Answers</h1>
            {<QuestionView />}

          </div>
          <div style={{display:'flex', flexDirection:'column', width:'30%' }}>
            <div style={{ display:'flex', flexDirection:'column', border:'1px solid black', borderRadius:20, padding:30, marginBottom:30}}>
                <h1 style={{alignSelf:'center'}}>Instructions</h1>
                <h5>-Highlighted are correct answers.</h5>
                <h5>-Blue ticked are submitted answers.</h5>
            </div>
            <div>
                
            </div>
            <div style={{ display:'flex', flexDirection:'column', border:'1px solid black', borderRadius:20, padding:30}}>
                <h1 style={{alignSelf:'center', textAlign:'center'}}>Leaderboard: {location.state.test.subject}</h1>
                <table id="leaderboard" style={{borderRadius:'20px', width:'100%', padding:'20px'}}>
                        <tr style={{ display:'flex', flexDirection:'row', justifyContent:'space-evenly', alignItems:'center'}}>
                        <th style={{width:'50%', textAlign:'center'}}>Userame</th>
                        <th style={{width:'50%', textAlign:'center'}}>Marks Scored</th>
                        </tr>
                        {
                            leaderboard && 
                            leaderboard.map(test => {
                                return(
                                    <tr style={{ display:'flex', flexDirection:'row', justifyContent:'space-evenly', marginBottom:20}}>
                                        <td style={{width:'50%', textAlign:'center'}}>{test.user.email}</td>
                                        <td style={{width:'50%', textAlign:'center'}}>{test.score}</td>
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
export default UserResponses;