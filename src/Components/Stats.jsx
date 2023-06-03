import React, { useEffect } from "react";
import Graph from "./Graph";
import { auth, db } from "../firebaseConfig";
import { toast } from "react-toastify";

function Stats ({
    wpm, 
    accuracy, 
    correctChars, 
    incorrectChars, 
    missedChars, 
    extraChars,
    graphData
})  {

    let timeSet = new Set();
    const newGraph = graphData.filter(i=>{
        if(!timeSet.has(i[0])){
            timeSet.add(i[0]);
            return i;
        }
    });

    const pushDataToDB = () => {

        if(isNaN(accuracy)){
            toast.error('Invaild Test', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return;
        }
        const resultRef = db.collection('Results');
        const {uid} = auth.currentUser;
        resultRef.add({
            wpm: wpm,
            accuracy: accuracy,
            timeStamp: new Date(),
            Character: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
            userId: uid
        }).then((res)=>{
            toast.success('Saved to database!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
           }).catch((err)=>{
            toast.error('Not able to save result.', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
           })
         
    }

    useEffect(()=>{
        if(auth.currentUser){
            pushDataToDB();
        }
        else{
            toast.warning('Login to save result.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    })

    return (
        <div className="stat-box">
            <div className="left-stats">
                <div className="title">WPM</div>
                <div className="subtitle">{wpm}</div>
                <div className="title">Accuracy</div>
                <div className="subtitle">{accuracy}</div>
                <div className="title">Charactes</div>
                <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
            </div>
            <div className="right-stats">
                {/* graph will go here */}
                <Graph graphData = {newGraph}/>
            </div>
        </div>
    )
}

export default Stats;