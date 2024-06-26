import React, { useState, useEffect, useRef } from 'react'
import './color.css'
import { Row, Col, Form, Spinner } from 'react-bootstrap';
import JourneyProject from './JourneyProject';

const API_HOST = process.env.REACT_APP_API_URL;


function JourneyProjectList({ journeyProjects, onRemoveJourneyProject, setShowJourney, onFocusJourneyProject, onFocusJourney, setrwdShow, setIsSearchAttractionProjectsDataChosen }) {
    if (!journeyProjects) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>;
    }
    // return journeys.map((item, index) => <p key={index}>{JSON.stringify(item)}</p> )
    return journeyProjects.sort((a, b) => {
        const timeA = convertTimeToMinutes(a.jpstart_time);
        const timeB = convertTimeToMinutes(b.jpstart_time);
        return timeA - timeB;
    }).map((item, index) => (
        <JourneyProject
            key={index}
            setrwdShow={setrwdShow}
            journeyProjectsData={item}
            onFocusJourneyProject={onFocusJourneyProject}
            onFocusJourney={onFocusJourney}
            setShowJourney={setShowJourney}
            onRemoveJourneyProject={onRemoveJourneyProject}
        />
    ));

    function convertTimeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }
    {/* {journeyproject.map((item, index) => (
        <JourneyProject key={index} journeyprojectdata={item} projects={projects} />
      ))} */}
}



function Journey({ journeydata, update_info, setSelectedJourneyData, onFocusJourneyProject, onFocusJourney, setShowJourney, onRemoveJourney, setrwdShow, setIsSearchAttractionProjectsDataChosen }) {
    const [journeyDataValue, setJourneyDataValue] = useState({});
    const [checkedValue, setCheckedValue] = useState(false);


    useEffect(() => {
        setJourneyDataValue(journeydata)
        if (journeydata.jchecked == 1) {
            setCheckedValue(true)
        } else {
            setCheckedValue(false)
        }

    }, [journeydata]);




    if (!journeyDataValue) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }


    const updateJourneyChecked = (checked) => {
        fetch(`${API_HOST}/api/POST/updatejourney`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jid: journeyDataValue.jid,
                aname: journeyDataValue.attraction.aname,
                arrived_date: journeyDataValue.arrived_date,
                arrived_time: journeyDataValue.arrived_time,
                leaved_time: journeyDataValue.leaved_time,
                jmemo: journeyDataValue.jmemo,
                jrate: journeyDataValue.jrate,
                jreview: journeyDataValue.jreview,
                jchecked: checked,
            })
        });
    }

    const onRemoveJourneyProject = (selectedjpid) => {

        setShowJourney(true)
        onFocusJourneyProject("")

        fetch(`${API_HOST}/api/POST/deletejourneyproject`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jpid: selectedjpid
            })
        })
            .then(() => {
                update_info();
            })
            ;
    }




    function checked(event) {
        setCheckedValue(event.target.checked);
        updateJourneyChecked(event.target.checked);
        // console.log(event.target.checked); // 這將在控制檯中打印出checkbox的當前狀態（true表示勾選，false表示未勾選）
    }
    // onFocusJourney(journeydata.jid)
    // onClick={onRemoveJourney} 
    const itemAction = (event) => {
        // console.log(ev, ev.currentTarget, ev.target.dataset.action);
        const action = event.target.dataset.action;
        switch (action) {
            case "select":
                console.log(journeydata.jid);
                onFocusJourney(journeydata.jid);
                setSelectedJourneyData(journeydata);
                setShowJourney(true);
                setIsSearchAttractionProjectsDataChosen(true);
                break;
            case "check":
                checked(event);
                break;
            case "delete":
                onRemoveJourney(journeydata.jid);
                break;
            default:
                if (event.target.classList.contains("parent-label")) {
                    console.log(journeydata.jid);
                    onFocusJourney(journeydata.jid);
                    setSelectedJourneyData(journeydata);
                    setShowJourney(true);
                    setIsSearchAttractionProjectsDataChosen(true);

                    break;
                }
                // throw new Error("Action unknown:" + action);
                break;
        }
        console.log();
    };


    const itemRwdAction = (event) => {
        // console.log(ev, ev.currentTarget, ev.target.dataset.action);
        const action = event.target.dataset.action;
        switch (action) {
            case "select":
                console.log(journeydata.jid);
                onFocusJourney(journeydata.jid);
                setSelectedJourneyData(journeydata);
                setShowJourney(true);
                setIsSearchAttractionProjectsDataChosen(true);
                setrwdShow("RightSpace")
                break;
            case "check":
                checked(event);
                break;
            case "delete":
                onRemoveJourney(journeydata.jid);
                break;
            default:
                if (event.target.classList.contains("parent-label")) {
                    console.log(journeydata.jid);
                    onFocusJourney(journeydata.jid);
                    setSelectedJourneyData(journeydata);
                    setShowJourney(true);
                    setIsSearchAttractionProjectsDataChosen(true);
                    setrwdShow("RightSpace")
                    break;
                }
                // throw new Error("Action unknown:" + action);
                break;
        }
        console.log();
    };

    return (
        <Row className='mt-4'>
            <Col sm={1}></Col>
            <Col sm={10}
            >
                <div onClick={itemAction}
                    onDoubleClick={itemRwdAction}
                    className='bg-color2 rounded p-3' style={{ borderColor: 'transparent', width: '100%' }} data-action="select">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div
                            style={{ flex: '1', textAlign: 'center' }}
                            data-action="select"
                        >

                            <Form data-action="select">
                                <Form.Check
                                    type='checkbox'
                                    label={
                                        <div className='the-label' style={{ textAlign: 'center' }} data-action="select">{journeydata.attraction.aname}</div>
                                    }
                                    className='text2 parent-label'
                                    onChange={checked}
                                    checked={checkedValue}
                                    data-action="check"
                                >
                                </Form.Check>
                            </Form>

                        </div>
                        <span className='text3'>{journeydata.arrived_time.slice(0, 5)}</span>
                        <button className='bg-color2' style={{ display: 'flex', alignItems: 'center', borderColor: 'transparent' }} data-action="delete">
                            <img
                                style={{ width: "24px", height: '24px', paddingBottom: '0' }}
                                src="/UserListSource/delete.png" alt="Icon"
                                data-action="delete"
                            />
                        </button>
                    </div>
                </div>
            </Col>
            <Col sm={1}></Col>
            <JourneyProjectList
                onRemoveJourneyProject={onRemoveJourneyProject}
                onFocusJourneyProject={onFocusJourneyProject}
                journeyProjects={journeydata.journey_projects}
                setShowJourney={setShowJourney}
                onFocusJourney={onFocusJourney}
                setrwdShow={setrwdShow}
            />

        </Row>
    )
}

export default Journey