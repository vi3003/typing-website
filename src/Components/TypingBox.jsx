import React, { createRef, useEffect, useMemo, useRef, useState } from 'react';
import UpperMenu from './UpperMenu';
import Stats from './Stats';
import { useTestMode } from '../Context/TestModeContext';

var randomwords = require('random-words');

const TypingBox = () => {

    const inputRef = useRef(null);
    const {testTime} = useTestMode();
    const [testStart, setTestStart] = useState(false);
    const [testEnd, setTestEnd] = useState(false);
    const [correctChars, setCorrChars] = useState(0);
    const [incorrectChars, setIncorrChars] = useState(0);
    const [missedChars, setMissedChars] = useState(0);
    const [extraChars, setExtraChars] = useState(0);
    const [countDown, setCountDown] = useState(testTime);
    const [intervalId, setIntervalId] = useState(null);
    const [currwordIndex, setCurrwordIndex] = useState(0);
    const [correctWords, setCorrWords] = useState(0);
    const [currcharIndex, setCurrcharIndex] = useState(0);
    const [graphData, setGraphData] = useState([]);
    
    const [wordsArray, setwordsArray] = useState(()=>{
        return randomwords(500);
    });
    
    const wordsSpanRef = useMemo(()=>{
        return Array(wordsArray.length).fill(0).map(i=>createRef(null));
    }, [wordsArray]);// use memo optimzes the lod of the page so operation doesn't get stuck 

    const startTimer = ()=>{

        const intervalId = setInterval(timer, 1000);
        setIntervalId(intervalId);

        function timer() {
            setCountDown((latestCountDown)=>{
                setCorrChars((correctChars) => {
                    setGraphData((graphData)=>{
                        return [...graphData, [
                            testTime - latestCountDown + 1,
                            (correctChars/5)/((testTime - latestCountDown + 1)/60)
                        ]];
                    })
                    
                    return correctChars;
                })

                if(latestCountDown === 1){
                    setTestEnd(true);
                    clearInterval(intervalId);
                    return 0;
                }

                return latestCountDown-1;
            });
        }
    }

    const resetTest = () =>{
        clearInterval(intervalId);
        setCountDown(testTime);
        setCurrwordIndex(0);
        setCurrcharIndex(0);
        setTestStart(false);
        setTestEnd(false);
        setwordsArray(randomwords(500));
        focusInput();
        resetWordSpanRef();
    }

    const calculateWPM = () =>{
        return Math.round((correctChars/5)/(testTime/60));
    }

    const calculateAccuracy = () => {
        return Math.round((correctWords/currwordIndex)*100);
    }

    const resetWordSpanRef = () => {
        wordsSpanRef.map((i) => {
          Array.from(i.current.childNodes).map((j) => {
            j.className = '';
          });
        });
        wordsSpanRef[0].current.childNodes[0].className = 'current';
    };

    const handleUserInput = (e)=>{

        if (!testStart) {
            startTimer();
            setTestStart(true);
        }

        const allCurrChars = wordsSpanRef[currwordIndex].current.childNodes;

        if(e.keyCode === 32){
            // logic for space

            let correctSpan = wordsSpanRef[currwordIndex].current.querySelectorAll('.correct');

            // calculate correct words
            if(correctSpan.length === allCurrChars.length){
                setCorrWords(correctWords+1);
            }

            if(allCurrChars.length <= currcharIndex){
                // remove cursor from last space in the word
                allCurrChars[currcharIndex-1].classList.remove('current-right');
            }
            else{
                // remove cursor from between the word
                setMissedChars(missedChars + (allCurrChars.length - currcharIndex));
                allCurrChars[currcharIndex].classList.remove('current');
            }
            
            wordsSpanRef[currwordIndex+1].current.childNodes[0].className = 'current';
            setCurrwordIndex(currwordIndex+1);
            setCurrcharIndex(0);

            return;
        }

        if(e.keyCode === 8){
            // logic for backspace

            if(currcharIndex !== 0){
                if(currcharIndex === allCurrChars.length){
                    if(allCurrChars[currcharIndex - 1].className.includes('extra')){
                        allCurrChars[currcharIndex-1].remove();
                        allCurrChars[currcharIndex-2].className += ' current-right';
                    }
                    else{
                        allCurrChars[currcharIndex-1].className = 'current';
                    }
                    
                    setCurrcharIndex(currcharIndex-1);
                    return;
                }

                allCurrChars[currcharIndex].className = '';
                allCurrChars[currcharIndex-1].className = 'current';
                setCurrcharIndex(currcharIndex-1);
            }

            return;
        }

        if(currcharIndex === allCurrChars.length){
            let newSpan = document.createElement('span');
            newSpan.innerText = e.key;
            newSpan.className = 'incorrect extra current-right';
            allCurrChars[currcharIndex-1].classList.remove('current-right');
            wordsSpanRef[currwordIndex].current.append(newSpan);
            setCurrcharIndex(currcharIndex+1);
            setExtraChars(extraChars+1);
            return;
        }
        
        if(e.key === allCurrChars[currcharIndex].innerText){
            allCurrChars[currcharIndex].className='correct';
            setCorrChars(correctChars+1);
        }
        else{
            allCurrChars[currcharIndex].className='incorrect';
            setIncorrChars(incorrectChars+1);
        }

        if(currcharIndex+1 === allCurrChars.length){
            allCurrChars[currcharIndex].className += ' current-right';
        }
        else{
            allCurrChars[currcharIndex+1].className = 'current';
        }

         setCurrcharIndex(currcharIndex+1);
    };

    const focusInput = () =>{
        inputRef.current.focus();
    };

    useEffect(()=>{
        resetTest();
    },[testTime]);

    useEffect(() => {
        focusInput();
        wordsSpanRef[0].current.childNodes[0].className = 'current';
    },[]);

    return (
        <div>
          <UpperMenu countDown={countDown}/>
          {(testEnd)?(
            <Stats 
            wpm = {calculateWPM()}
            accuracy = {calculateAccuracy()}
            correctChars = {correctChars} 
            incorrectChars = {incorrectChars}
            missedChars ={missedChars}
            extraChars = {extraChars}
            graphData={graphData}
            />
          ) : (
            <div className="type-box" onClick={focusInput}>
                <div className='words'>
                    {wordsArray.map((word , index)=> (
                        <span className='word' ref={wordsSpanRef[index]}>
                            {word.split('').map(char=>(
                                <span>{char}</span>
                            ))}
                        </span>
                    ))}
                </div>
            </div>)}
            <input type='text'
                className='hidden-input'
                ref={inputRef}
                onKeyDown={handleUserInput}
            />
        </div>
        
    )
}

export default TypingBox;