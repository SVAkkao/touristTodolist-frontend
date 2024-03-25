import React, { useState } from 'react';
import Book from './Pages/Book';
import Aboard from './Pages/Aboard';
import History from './Pages/History';
import Water from './Pages/Water';
import Outdoor from './Pages/Outdoor';
import { Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
export function Pages() {
    const [bookActive, setBookActive] = useState(true);
    const [aboardActive, setAboardActive] = useState(false);
    const [hikingActive, setHikingActive] = useState(false);
    const [shipActive, setShipActive] = useState(false);
    const [historyActive, setHistoryActive] = useState(false);

    const handleButtonClick = (activeSetter) => {
        // 将所有按钮的状态设置为非活动状态
        setBookActive(false);
        setAboardActive(false);
        setHikingActive(false);
        setShipActive(false);
        setHistoryActive(false);
        // 将点击的按钮状态设置为活动状态
        activeSetter(true);
    }

    return (
        <>
            <Row>
                <Col>
                    <NavLink to="/alist">
                        <a className='book' onClick={() => handleButtonClick(setBookActive)}>
                            <img src={bookActive ? '/UserListSource/book-a.png' : '/UserListSource/book.png'} style={{ width: "48px", height: '48px', paddingBottom: '0' }} />
                        </a>
                        <p style={{ color: bookActive ? '#80BCBD' : '#939393' }} className='bookTitle'>文藝</p>
                    </NavLink>
                </Col>
                <Col>
                    <NavLink to="/alist">
                        <a className='aboard' onClick={() => handleButtonClick(setAboardActive)}>
                            <img src={aboardActive ? '/UserListSource/aboard-a.png' : '/UserListSource/aboard.png'} style={{ width: "48px", height: '48px', paddingBottom: '0' }} />
                        </a>
                        <p style={{ color: aboardActive ? '#80BCBD' : '#939393' }} className='aboardTitle'>出國旅行</p>
                    </NavLink>
                </Col>
                <Col>
                    <NavLink to="/alist">
                        <a className='hiking' onClick={() => handleButtonClick(setHikingActive)}>
                            <img src={hikingActive ? '/UserListSource/hiking-a.png' : '/UserListSource/hiking.png'} style={{ width: "48px", height: '48px', paddingBottom: '0' }} />
                        </a>
                        <p style={{ color: hikingActive ? '#80BCBD' : '#939393' }} className='hikingTitle'>戶外</p>
                    </NavLink>
                </Col>
                <Col>
                    <NavLink to="/alist">
                        <a className='ship' onClick={() => handleButtonClick(setShipActive)}>
                            <img src={shipActive ? '/UserListSource/ship-a.png' : '/UserListSource/ship.png'} style={{ width: "48px", height: '48px', paddingBottom: '0' }} />
                        </a>
                        <p style={{ color: shipActive ? '#80BCBD' : '#939393' }} className='shipTitle'>水上</p>
                    </NavLink>
                </Col>
                <Col>
                    <NavLink to="/alist">
                        <a className='history' onClick={() => handleButtonClick(setHistoryActive)}>
                            <img src={historyActive ? '/UserListSource/castle-a.png' : '/UserListSource/castle.png'} style={{ width: "48px", height: '48px', paddingBottom: '0' }} />
                        </a>
                        <p style={{ color: historyActive ? '#80BCBD' : '#939393' }} className='historyTitle'>文化</p>
                    </NavLink>
                </Col>
            </Row>
            {bookActive && <Book />}
            {aboardActive && <Aboard />}
            {hikingActive && <Outdoor />}
            {shipActive && <Water />}
            {historyActive && <History />}
        </>

    )
}

export default Pages
