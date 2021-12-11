import React, { useEffect, useState } from "react";
import { Row,Col,Button } from 'react-bootstrap';
import { message } from 'antd';
import Select from 'react-select';
import './index.css';

const SelectPlayer =({playerData,updateErr,setteamcreate,teamcreate})=>{
    //Hooks
    const [errMsg, seterrMsg]=useState('');
    const playerList = playerData.length > 0 && playerData.map((e)=> { return {value:e.playername, label:e.playername}});
    const [playerDetails,setplayerDetails]=useState(
        {
            firstPlayer:null,
            secondPlayer:null,
            thirdPlayer:null,
            fourthPlayer:null,
            fifthPlayer:null
        });
    const [positionDetails,setpositionDetails]=useState(
        {
            firstPosition:null,
            secondPosition:null,
            thirdPosition:null,
            fourthPosition:null,
            fifthPosition:null
        });
    const [isduplicate,setisduplicate]=useState(
        {
                duplicatefirstPosition:false,
                duplicatesecondPosition:false,
                duplicatethirdPosition:false,
                duplicatefourthPosition:false,
                duplicatefifthPosition:false
        });
    const [isErrorobj, setisErrorobj]=useState({
        firstPositionErr:false,
        secondPositionErr:false,
        thirdPositionErr:false,
        fourthPositionErr:false,
        fifthPositionErr:false,
        firstPlayerErr:false,
        secondPlayerErr:false,
        thirdPlayerErr:false,
        fourthPlayerErr:false,
        fifthPlayerErr:false
    })
    const arr =[];
    if(playerDetails.firstPlayer !== null){
        arr.push(playerDetails.firstPlayer.value)
    }
    if(playerDetails.secondPlayer !== null){
        arr.push(playerDetails.secondPlayer.value)
    }
    if(playerDetails.thirdPlayer !== null){
        arr.push(playerDetails.thirdPlayer.value)
    }
    if(playerDetails.fourthPlayer !== null){
        arr.push(playerDetails.fourthPlayer.value)
    }
    if(playerDetails.fifthPlayer !== null){
        arr.push(playerDetails.fifthPlayer.value)
    }

    const playerList_Options = playerList ? playerList.filter(item => !arr.includes(item.value)): [];
   
    const DuplicatedPosition=[];
    if(positionDetails.firstPosition !== null){
        DuplicatedPosition.push(positionDetails.firstPosition.label)
    }
    if(positionDetails.secondPosition !== null){
        DuplicatedPosition.push(positionDetails.secondPosition.label)
    }
    if(positionDetails.thirdPosition !== null){
        DuplicatedPosition.push(positionDetails.thirdPosition.label)
    }
    if(positionDetails.fourthPosition !== null){
        DuplicatedPosition.push(positionDetails.fourthPosition.label)
    }
    if(positionDetails.fifthPosition !== null){
        DuplicatedPosition.push(positionDetails.fifthPosition.label)
    }
    // functions
    useEffect(()=>{
        setisErrorobj(prevState => ({
            ...prevState,
            firstPlayerErr: false,
            secondPlayerErr: false,
            thirdPlayerErr:false,
            fourthPlayerErr:false,
            fifthPlayerErr:false,
            firstPositionErr:false,
            secondPositionErr:false,
            thirdPositionErr:false,
            fourthPositionErr:false,
            fifthPositionErr:false
        }));

        setisduplicate(prevState => ({
            ...prevState,
            duplicatefirstPosition:false,
            duplicatesecondPosition:false,
            duplicatethirdPosition:false,
            duplicatefourthPosition:false,
            duplicatefifthPosition:false
        }));
        seterrMsg('')
        
    },[updateErr])
    const getPosition=(arg)=>{
        console.log(arg, 'arg')
        if(arg){
            const posArr=[];
            playerData.map((e)=>{
                if(e.playername == arg.label){
                    posArr.push(e.playerposition);
                } else{
                    return e
                }
            })
            return posArr[0];
        }else {
            return [];
        }

    }
    const onHandlePlayer=(e,type)=>{
        seterrMsg("")
        if(type === 'first'){
            
            setplayerDetails(prevState => ({
                ...prevState,
                firstPlayer: e
            }));
            onHandlePosition(null,'first');
        }
        if(type === 'second'){
            setplayerDetails(prevState => ({
                ...prevState,
                secondPlayer: e
            }));
            onHandlePosition(null,'second');
        }
        if(type === 'third'){
            setplayerDetails(prevState => ({
                ...prevState,
                thirdPlayer: e
            }));
            onHandlePosition(null,'third');
        }
        if(type === 'fourth'){
            setplayerDetails(prevState => ({
                ...prevState,
                fourthPlayer: e
            }));
            onHandlePosition(null,'fourth');
        }
        if(type === 'fifth'){
            setplayerDetails(prevState => ({
                ...prevState,
                fifthPlayer: e
            }));
            onHandlePosition(null,'fifth');
        }
        
    }
    
    const onHandlePosition=(e,type)=>{
        seterrMsg("")
        if(type === 'first'){
            
            setpositionDetails(prevState => ({
                ...prevState,
                firstPosition: e
            }));

        }
        if(type === 'second'){
            setpositionDetails(prevState => ({
                ...prevState,
                secondPosition: e
            }));
        }
        if(type === 'third'){
            setpositionDetails(prevState => ({
                ...prevState,
                thirdPosition: e
            }));
        }
        if(type === 'fourth'){
            setpositionDetails(prevState => ({
                ...prevState,
                fourthPosition: e
            }));
        }
        if(type === 'fifth'){
            setpositionDetails(prevState => ({
                ...prevState,
                fifthPosition: e
            }));
        }
    }

    const toFindDuplicates= DuplicatedPosition.filter((item, index) => DuplicatedPosition.indexOf(item) !== index);
    console.log(toFindDuplicates, 'toFindDuplicates');
    const onSave=()=>{
        
        if(
            playerDetails.firstPlayer &&
            playerDetails.secondPlayer &&
            playerDetails.thirdPlayer &&
            playerDetails.fourthPlayer &&
            playerDetails.fifthPlayer &&
            positionDetails.firstPosition &&
            positionDetails.secondPosition &&
            positionDetails.thirdPosition &&
            positionDetails.fourthPosition &&
            positionDetails.fifthPosition

        ){
            
           
            if(toFindDuplicates.length === 0){
                message.success('team created!');
                setteamcreate(true)
                seterrMsg("")
            }else{
                seterrMsg("* Position should be unique for each player")
            }
           
        }
        if(!playerDetails.firstPlayer){
            
            setisErrorobj(prevState => ({
                ...prevState,
                firstPlayerErr: true
            }));
        } else{
            
            setisErrorobj(prevState => ({
                ...prevState,
                firstPlayerErr: false
            }));
        }
        if(!playerDetails.secondPlayer){
            
            setisErrorobj(prevState => ({
                ...prevState,
                secondPlayerErr: true
            }));
        } else{
            setisErrorobj(prevState => ({
                ...prevState,
                secondPlayerErr: false
            }));
        }
        if(!playerDetails.thirdPlayer){
            
            setisErrorobj(prevState => ({
                ...prevState,
                thirdPlayerErr: true
            }));
        } else {
            setisErrorobj(prevState => ({
                ...prevState,
                thirdPlayerErr: false
            }));
        }
        if(!playerDetails.fourthPlayer){
            
            setisErrorobj(prevState => ({
                ...prevState,
                fourthPlayerErr: true
            }));
        } else{
            setisErrorobj(prevState => ({
                ...prevState,
                fourthPlayerErr: false
            }));
        }
        if(!playerDetails.fifthPlayer){
            
            setisErrorobj(prevState => ({
                ...prevState,
                fifthPlayerErr: true
            }));
        } else{
            setisErrorobj(prevState => ({
                ...prevState,
                fifthPlayerErr: false
            }));
        }
        if(!positionDetails.firstPosition){
            setisErrorobj(prevState => ({
                ...prevState,
                firstPositionErr: true
            }));
            setisduplicate(prevState => ({
                ...prevState,
                duplicatefirstPosition: false
            }));
        } else{
            if(toFindDuplicates.includes( positionDetails.firstPosition.label)){
                setisduplicate(prevState => ({
                    ...prevState,
                    duplicatefirstPosition: true
                }));
            } else{
                setisduplicate(prevState => ({
                    ...prevState,
                    duplicatefirstPosition: false
                }));
            }
            
            setisErrorobj(prevState => ({
                ...prevState,
                firstPositionErr: false
            }));
        }
        if(!positionDetails.secondPosition){
            setisErrorobj(prevState => ({
                ...prevState,
                secondPositionErr: true
            }));
            setisduplicate(prevState => ({
                ...prevState,
                duplicatesecondPosition: false
            }));
        } else{
            if(toFindDuplicates.includes( positionDetails.secondPosition.label)){
                setisduplicate(prevState => ({
                    ...prevState,
                    duplicatesecondPosition: true
                }));
            } else {
                setisduplicate(prevState => ({
                    ...prevState,
                    duplicatesecondPosition: false
                }));
            }
            setisErrorobj(prevState => ({
                ...prevState,
                secondPositionErr: false
            }));
        }
        if(!positionDetails.thirdPosition){
            setisErrorobj(prevState => ({
                ...prevState,
                thirdPositionErr: true
            }));
            setisduplicate(prevState => ({
                ...prevState,
                duplicatethirdPosition: false
            }));
        } else{
            if(toFindDuplicates.includes( positionDetails.thirdPosition.label)){
                setisduplicate(prevState => ({
                    ...prevState,
                    duplicatethirdPosition: true
                }));
            } else{
                setisduplicate(prevState => ({
                    ...prevState,
                    duplicatethirdPosition: false
                }));
            }
            setisErrorobj(prevState => ({
                ...prevState,
                thirdPositionErr: false
            }));
        }
        if(!positionDetails.fourthPosition){
            setisErrorobj(prevState => ({
                ...prevState,
                fourthPositionErr: true
            }));
            setisduplicate(prevState => ({
                ...prevState,
                duplicatefourthPosition: false
            }));
        } else{
            if(toFindDuplicates.includes( positionDetails.fourthPosition.label)){
                setisduplicate(prevState => ({
                    ...prevState,
                    duplicatefourthPosition: true
                }));
            } else{
                setisduplicate(prevState => ({
                    ...prevState,
                    duplicatefourthPosition: false
                }));
            }
            setisErrorobj(prevState => ({
                ...prevState,
                fourthPositionErr: false
            }));
        }
        if(!positionDetails.fifthPosition){
            setisErrorobj(prevState => ({
                ...prevState,
                fifthPositionErr: true
            }));
            setisduplicate(prevState => ({
                ...prevState,
                duplicatefifthPosition: false
            }));
        } else {
            if(toFindDuplicates.includes( positionDetails.fifthPosition.label)){
                setisduplicate(prevState => ({
                    ...prevState,
                    duplicatefifthPosition: true
                }));
            }else{
                setisduplicate(prevState => ({
                    ...prevState,
                    duplicatefifthPosition: false
                }));
            }
            setisErrorobj(prevState => ({
                ...prevState,
                fifthPositionErr: false
            }));
        }
       
        if(
            !playerDetails.firstPlayer ||
            !playerDetails.secondPlayer ||
            !playerDetails.thirdPlayer ||
            !playerDetails.fourthPlayer ||
            !playerDetails.fifthPlayer ||
            !positionDetails.firstPosition ||
            !positionDetails.secondPosition ||
            !positionDetails.thirdPosition ||
            !positionDetails.fourthPosition ||
            !positionDetails.fifthPosition 

        ){
            
            seterrMsg('* All fields required')
        }
    }

    return(
        <div className="first-quarter-box" style={{padding: '0rem 0 0rem 0.3rem'}}>
            <Row>
                <Row className="mar-row">
                    <Col lg={6} md={6} className="mar-col">
                        <div className={isErrorobj.firstPlayerErr?'select-dd-err-border':''}>
                            <Select 
                                isClearable
                                onChange={(value)=>{onHandlePlayer(value,"first")}}
                                placeholder="Select Player"
                                name="first"
                                value={playerDetails.firstPlayer}
                                options={playerList_Options}
                            />
                        </div>
                    </Col>
                    <Col lg={6} md={6} className="mar-col">
                        <div className={(isErrorobj.firstPositionErr || isduplicate.duplicatefirstPosition )?'select-dd-err-border':''}>
                            <Select 
                                isClearable
                                onChange={(value)=>{onHandlePosition(value,'first')}}
                                placeholder="Select Position"
                                value={positionDetails.firstPosition}
                                options={getPosition(playerDetails.firstPlayer)}
                            />
                        </div>
                    </Col>
                </Row>
                
            <Row className="mar-row">
                <Col lg={6} md={6} className="mar-col">
                    <div className={isErrorobj.secondPlayerErr?'select-dd-err-border':''} >
                        <Select 
                            isClearable
                            onChange={(value)=>{onHandlePlayer(value,"second")}}
                            placeholder="Select Player"
                            value={playerDetails.secondPlayer}
                            options={playerList_Options}
                        />
                    </div>
                </Col>
                <Col lg={6} md={6} className="mar-col">
                    <div className={(isErrorobj.secondPositionErr || isduplicate.duplicatesecondPosition) ?'select-dd-err-border':''}>
                        <Select 
                            isClearable
                            onChange={(value)=>{onHandlePosition(value,'second')}}
                            placeholder="Select Position"
                            value={positionDetails.secondPosition}
                            options={getPosition(playerDetails.secondPlayer)}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="mar-row">
                <Col lg={6} md={6} className="mar-col">
                    <div className={isErrorobj.thirdPlayerErr?'select-dd-err-border':''}>
                        <Select 
                            isClearable
                            onChange={(value)=>{onHandlePlayer(value,"third")}}
                            placeholder="Select Player"
                            value={playerDetails.thirdPlayer}
                            options={playerList_Options}
                        />
                    </div>
                </Col>
                <Col lg={6} md={6} className="mar-col">
                    <div className={(isErrorobj.thirdPositionErr || isduplicate.duplicatethirdPosition)?'select-dd-err-border':''}>
                        <Select 
                            isClearable
                            onChange={(value)=>{onHandlePosition(value,'third')}}
                            placeholder="Select Position"
                            value={positionDetails.thirdPosition}
                            options={getPosition(playerDetails.thirdPlayer)}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="mar-row">
                <Col lg={6} md={6} className="mar-col">
                    <div className={isErrorobj.fourthPlayerErr?'select-dd-err-border':''}>
                        <Select 
                            isClearable
                            onChange={(value)=>{onHandlePlayer(value,"fourth")}}
                            placeholder="Select Player"
                            value={playerDetails.fourthPlayer}
                            options={playerList_Options}
                        />
                    </div>
                </Col>
                <Col lg={6} md={6} className="mar-col">
                    <div className={(isErrorobj.fourthPositionErr || isduplicate.duplicatefourthPosition) ?'select-dd-err-border':''}>
                        <Select 
                            isClearable
                            onChange={(value)=>{onHandlePosition(value,'fourth')}}
                            placeholder="Select Position"
                            value={positionDetails.fourthPosition}
                            options={getPosition(playerDetails.fourthPlayer)}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="mar-row">
                <Col lg={6} md={6} className="mar-col">
                    <div className={(isErrorobj.fifthPlayerErr)?'select-dd-err-border':''}>
                        <Select 
                            isClearable
                            onChange={(value)=>{onHandlePlayer(value,"fifth")}}
                            placeholder="Select Player"
                            value={playerDetails.fifthPlayer}
                            options={playerList_Options}
                        />
                    </div>
                </Col>
                <Col lg={6} md={6} className="mar-col">
                    <div className={(isErrorobj.fifthPositionErr || isduplicate.duplicatefifthPosition )?'select-dd-err-border':''}>
                        <Select 
                            isClearable
                            onChange={(value)=>{onHandlePosition(value,'fifth')}}
                            placeholder="Select Position"
                            value={positionDetails.fifthPosition}
                            options={getPosition(playerDetails.fifthPlayer)}
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                    <div className="selectplayer-save">
                        <div className="err-style">{errMsg !==""?errMsg:""}</div>
                        <Button onClick={onSave}>Save</Button>
                    </div>
                </Row>
            </Row>
        </div>
    )
}
export default SelectPlayer;