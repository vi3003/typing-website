import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import UserDataTable from "../Components/UserDataTable";
import Graph from "../Components/Graph";
import UserInfo from "../Components/UserInfo";
import Footer from "../Components/Footer";

const UserPage = () => {

    const [data, setData] = useState([]);
    const [user, loading] = useAuthState(auth);
    const [graphData, setGraphData] = useState([]);
    const navigate = useNavigate();
    const [dataLoad, setDataLoad] = useState(true);

    const fetchUserData = () => {
        const resultRef = db.collection('Results');
        const {uid} = auth.currentUser;
        let tempData = [];
        let tempGraphData = [];
        resultRef
        .where('userId', '==', uid)
        .orderBy('timeStamp','desc')
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                tempData.push({...doc.data()});
                tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(',')[0],doc.data().wpm]);
            });
            setData(tempData);
            setGraphData(tempGraphData.reverse());
            setDataLoad(false);
        })
    }

    useEffect(() => {
        if(!loading){
            fetchUserData();
        }
        if(!loading && !user){
            navigate('/');
        }
    },[loading]);

    if(loading || dataLoad){
        return(
            <div className="center-of-screen">
                <CircularProgress size={300}/>
            </div>
        )
    }

    return (
      <div className="canvas">
        <UserInfo totalTest={data.length}/>
        <div className="graph-user-page">
            <Graph graphData={ graphData } />
        </div>
        <UserDataTable data = {data}/>
        <Footer />
      </div>
    )
}; 

export default UserPage;