import React, { useState } from "react";
import { Container } from 'react-bootstrap';
import { Tabs,Result,Button } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import Addplayer from "../addplayer";
import Selectplayer from "../selectplayer";
import { SmileOutlined } from '@ant-design/icons';

const Teamselection =()=>{
    //CONSTANTS
    const { TabPane } = Tabs;

    //HOOKS
    const [updateErr, setupdateErr] = useState(false);
    const [playerData, setplayerData]=useState([]);
    const [teamcreate, setteamcreate]=useState(false);
    
    //Functions

    const callback=()=>{
        setupdateErr(!updateErr);
    }
    const handleResult=()=>{
        setteamcreate(false);
    }
    console.log(teamcreate, 'teamcreate');
    return(
        <Container className="home-body">
            {teamcreate?(
                 <Result
                 icon={<SmileOutlined />}
                 title="Great, your team is ready now!"
                 extra={<Button type="primary" onClick={handleResult}>Done</Button>}
               />
            )
            :
            <div>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Compose Team" key="1">
                        <Addplayer setplayerData={setplayerData} playerData={playerData} updateErr={updateErr}/>
                    </TabPane>
                    <TabPane tab="First Quarter" key="2">
                        <Selectplayer playerData={playerData} updateErr={updateErr} teamcreate={teamcreate} setteamcreate={setteamcreate} />
                    </TabPane>
                </Tabs>
            </div>
        }

        </Container>
    )
}
export default Teamselection;