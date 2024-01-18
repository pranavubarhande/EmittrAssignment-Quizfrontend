import React, { useEffect, useState } from 'react';
import { RadioGroup, Radio } from 'react-radio-input';
import Hindipic from "../images/hindipic.jpeg";
import Englishpic from "../images/englishpic.jpeg";
import { useNavigate } from 'react-router-dom';
import {getalltests} from '../services/testService'
import { useQuery } from 'react-query';
import { fetchData } from '../hooks/dashboardData';
import { FaArrowRight } from 'react-icons/fa';

const Dashboard = () => {
    const navigate = useNavigate();
    const [tests, settests] = useState();
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const { data, isLoading, isError, refetch } = useQuery(['myData', userId], () => fetchData(userId));

    useEffect(() => {
      refetch();
    }, []);
    

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error fetching data</p>;
    }
    const logout = () => {
        localStorage.removeItem('user_token')
        localStorage.removeItem('user');
        navigate('/sign-in')
    }
    const doesExist = (lang) => {
        console.log(data?.testhistory);
        
        if (data && Array.isArray(data.testhistory) && data.testhistory.length > 0) {
            return data.testhistory.some(test => test.subject === lang);
        }
    
        return false;
    };
    const handleGototest = (lang) => {
        if(doesExist(lang)){
            alert("You have already given this test!")
            return;
        }
        navigate(`take-test/${lang}`, {state:{tests:data.alltests, leaderboarddata:data.testleaderboard}})
    }
    
    return(
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: 'white', padding: '100px 5px'}}>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <button onClick={logout} style={{borderRadius:10, fontSize:24, marginRight:30}}>Logout</button>
            </div>
            <div style={{display:'flex', flexDirection: 'row', height: 300, width: '100%'}}>
                <div style={{width: '25%', margin: '10px 5px', backgroundColor: 'white', borderRadius: 10, boxShadow:'0 2px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: 10, justifyContent: 'center'}}>
                <div style={{flexDirection: 'column', display: 'flex', justifyContent: 'space-around'}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid white', borderRadius: 10, padding: 20}} >
                        <h3 style={{color:'black', textAlign:'center'}}>Total Tests Taken</h3>
                        <h3 style={{color:'black'}}>{(!isError && !isLoading) ? data.testsummary.totalTests:0}</h3>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid white', borderRadius: 10, padding: 20}}>
                        <h3 style={{color:'black', textAlign:'center'}}>Average Marks Scored</h3>
                        <h3 style={{color:'black'}}>{(!isError && !isLoading) ? data.testsummary.averageScore:0}</h3>
                    </div>
                </div>
                
                </div>
                <div style={{width: '75%', boxShadow:'0 2px 8px 0 rgba(0, 0, 0, 0.2)', margin: '10px 5px', backgroundColor: 'white', borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems:'center'}}>
                    <h1>Take Test Now</h1>
                    <div
                        style={{width: '100%', marginBottom: 20, border: '2px white'}}
                    >
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <div style={{display: 'flex', flexDirection:'column', alignItems:'center'}} onClick={() => {handleGototest("english")}}>
                                <img style={{width:150, height:150, borderRadius:200}} src={Englishpic} alt="Choose English" />
                                <h3>English</h3>
                                
                            </div>
                            <div style={{display: 'flex', flexDirection:'column', alignItems:'center'}} onClick={() => {handleGototest("hindi")}}>
                                <img style={{width:130, height:130, borderRadius:200}} src={Hindipic} alt="Choose hindi" />
                                <h3>Hindi</h3>
                            </div>

                        </div>
                        
                        
                    </div>
                </div>

            </div>
            <div style={{display:'flex', flexDirection: 'row', width: '100%', height: 500}}>
                
                <div style={{width: '100%', boxShadow:'0 2px 8px 0 rgba(0, 0, 0, 0.2)', margin: '30px', backgroundColor: 'white', borderRadius: 10, display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <h1>Your Test History</h1>
                    <table id="customers" style={{borderRadius:'20px', width:'100%', padding:'20px'}}>
                        <tr style={{ display:'flex', flexDirection:'row', fontSize:26, alignItems:'center'}}>
                        <th style={{width:'33%', textAlign:'center'}}>Subject Name</th>
                        <th style={{width:'33%', textAlign:'center'}}>Marks Scored</th>
                        <th style={{width:'33%', textAlign:'center'}}>Check Answers</th>
                        </tr>
                        {
                            !isError && !isLoading && 
                            data.testhistory.map(test => {
                                return(
                                    <tr style={{ display:'flex', flexDirection:'row', justifyContent:'space-evenly', marginBottom:20, fontSize:24}}>
                                        <td style={{width:'33%', textAlign:'center'}}>{test.subject.charAt(0).toUpperCase() + test.subject.slice(1)}</td>
                                        <td style={{width:'33%', textAlign:'center'}}>{test.score}</td>
                                        <td style={{width:'33%', textAlign:'center'}} onClick={() => {navigate('user-responses', {state:{test:test}})}}><FaArrowRight size={30} /></td>
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
export default Dashboard;