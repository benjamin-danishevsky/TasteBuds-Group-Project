import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import './SplashPage.css';

function SplashPage(){

    const sessionUser = useSelector(state => state.session.user)
    let href;
    if(sessionUser) {
        href = '/forbidden'
    }

    return (
        <>
            <div className="page-container">
                <div className="info-container">
                    <div className="info-text">
                        {/* <img src="./TasteBudsFinal.png" style={{width:'300px', height:'300px'}} className='logo'/> */}
                        <h1>Start your journey of connecting with new taste buds</h1>
                        <p>
                            Whatever you're looking to do this year, Taste Buds can help.
                            For a great period of time, people have turned to Taste Buds to meet people,
                            make friends, and explore their interests.
                            Thousands of events are happening every day—join the fun.
                        </p>
                    </div>
                    <div className="info-image">
                        <img className="firstImg" alt='image of a meetup' src='https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=640'/>
                    </div>
                </div>
                <div className="card-links-container">
                    <div className="card-links-info">
                        <h2>How Taste Buds Works</h2>
                        <p>
                            Meet new people who share your interests in food through online and in-person events.
                            It's totally free to create an account, and we don't store any personal data!
                        </p>
                    </div>
                    <div className="card-links">
                        <div className="card-link-join-group">
                            <img className="splashImage" alt='join group high five' src="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=384"/>
                            <a href='/groups' className="cardContainerText">Join a group</a>
                            <p  className='pTag'>Do what you love, meet others who love it, find your community. The rest is history!</p>
                        </div>
                        <div className="card-link-find-event">
                            <img className="splashImage" alt='pic of event ticket' src="https://secure.meetupstatic.com/next/images/shared/ticket.svg?w=384"/>
                            <a href='/events' className="cardContainerText">Find an event</a>
                            <p  className='pTag'>Events are happening on just about any kind of food you can think of, from pizza and wings to pho and sushi.</p>
                        </div>
                        <div className="card-link-start-group">
                            <img className="splashImage" alt='icon of a group' src="https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=384"/>
                            {sessionUser ? (

                                <a href='/groups/new-group'className="cardContainerText">Start a group</a>
                            ) :
                            <p className="cardContainerText">Start a group</p>
                        }
                            <p className='pTag'>You don't have to be an expert to gather people together and explore shared food interests.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SplashPage
