import React, { useEffect, useState } from "react";
import { Container,Row,Col,Button } from 'react-bootstrap';
import { Input,message } from 'antd';
import Select from 'react-select';
import './index.css';

const Addplayer =({setplayerData,playerData,updateErr})=>{
    console.log(updateErr, 'updateErr')
    // STATE DECLARATIONS
    const [firstname, setfirstname]= useState('');
    const [lastname, setlastname]= useState('');
    const [height, setheight]= useState('');
    const [positions, setposition]= useState([]);
    const [errMsg, seterrMsg] = useState({firstnameErr:null, lastnameErr:null,heightErr:null,positionsErr:null});
    // CONSTANTS
    const position_options = [
        { value: '1', label: 'point guard (PG)' },
        { value: '2', label: 'shooting guard (SG)' },
        { value: '3', label: 'small forward (SF)' },
        { value: '4', label: 'power forward (PF)' },
        { value: '5', label: 'center (C)' },
      ];
    // FUNCTIONS
    useEffect(()=>{
        seterrMsg(prevState => ({
            ...prevState,
            firstnameErr: null,
            lastnameErr:null,
            positionsErr:null,
            heightErr:null
        }));
    },[updateErr])
    const onHandleFirstname = (e) => {
        if (/^(?![\s-])[\A-Za-z0-9\s-]*$/.test(e.target.value)) {
          const uppercaseName = (e.target.value).toUpperCase();
          setfirstname(uppercaseName);
        }
    };

    const onHandleLastname = (e) => {
        if (/^(?![\s-])[\A-Za-z0-9\s-]*$/.test(e.target.value)) {
          const uppercaseName = (e.target.value).toUpperCase()
          setlastname(uppercaseName);
        }
    };

    const onHandleheight = (e) => {
        if (/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(e.target.value)) {
            setheight(e.target.value);
        }
    };

    const onHandlePosition=(e)=>{
        setposition(e);
    };

    const addPlayer=()=>{
        if(firstname === ""){
            console.log('firstname')
            seterrMsg(prevState => ({
                ...prevState,
                firstnameErr: "* First name empty"
            }));
        } 
        if(lastname === ""){
            console.log('lastname')
            seterrMsg(prevState => ({
                ...prevState,
                lastnameErr: "* last name empty"
            }));
        } 
        if(height === ""){
            console.log('height')
            seterrMsg(prevState => ({
                ...prevState,
                heightErr: "* Height empty"
            }));
            
        } 
        if(positions.length === 0){
            console.log('positions')
            seterrMsg(prevState => ({
                ...prevState,
                positionsErr: "* Position empty"
            }));
        }

        if(firstname !== ""){
            
            seterrMsg(prevState => ({
                ...prevState,
                firstnameErr: null
            }));
        } 
        if(lastname !== ""){
            
            seterrMsg(prevState => ({
                ...prevState,
                lastnameErr: null
            }));
        } 
        if(height !== ""){
            
            seterrMsg(prevState => ({
                ...prevState,
                heightErr: null
            }));
            
        } 
        if(positions.length !== 0){
            
            seterrMsg(prevState => ({
                ...prevState,
                positionsErr: null
            }));
        }

        if(firstname !== "" && lastname !== "" && height !== "" && positions.length !== 0){
            if(!playerData.map((e)=> e.playername).includes(`${firstname} ${lastname}`)){
            message.success('Player Saved successfully');
            const playerDetails = [...playerData,{ playername:`${firstname} ${lastname}`,playerheight:height, playerposition:positions}];
            setfirstname('');
            setlastname('');
            setheight('');
            setposition([]);
            setplayerData(playerDetails);
        }else{
            message.error('Player name exist already');
        }
        }
    }

    return(
        <div>
            <div className="input-style"> 
                <div className="custom-input-style">
                    <div className="heading-style">First Name *</div>
                    <div><Input placeholder="Enter First Name" className={errMsg.firstnameErr?"err-color input-tag-width": "input-tag-width"} value={firstname} onChange={onHandleFirstname}/>
                            <span className="err-style">{errMsg.firstnameErr?errMsg.firstnameErr:""}</span>
                    </div>
                    
                </div>
                <div className="custom-input-style">
                    <div className="heading-style"   >Last Name *</div>
                    <div><Input className={errMsg.lastnameErr?"err-color input-tag-width": "input-tag-width"} placeholder="Enter Last Name" onChange={onHandleLastname} value={lastname}/>
                        <span className="err-style">{errMsg.lastnameErr?errMsg.lastnameErr:""}</span>
                    </div>
                </div>
                <div className="custom-input-style">
                    <div className="heading-style">Height *<span className="feet" style={{marginLeft:"0.3rem"}}>(in feet)</span></div>
                    <div><Input className={errMsg.heightErr?"err-color input-tag-width": "input-tag-width"} placeholder="Enter Height" onChange={onHandleheight} value={height} />
                        <span className="err-style">{errMsg.heightErr?errMsg.heightErr:""}</span>
                    </div>
                </div>
                <div className="custom-input-style">
                    <div className="heading-style">Position *</div>
                    <div className={errMsg.positionsErr?" dd-err dropdown-style":"dropdown-style"}>
                        
                            <Select 
                                className="input-tag-width"
                                isMulti
                                onChange={onHandlePosition}
                                placeholder="Select Position"
                                value={positions}
                                options={position_options}
                            />
                    <span className="err-style">{errMsg.positionsErr?errMsg.positionsErr:""}</span>
                    </div>
                </div>
                <div>
                <div className="addplayer-save">
                    
                    <Button onClick={addPlayer}>Save</Button>
                </div>
            </div>
            </div>
            
        </div>
    )
}
export default Addplayer;