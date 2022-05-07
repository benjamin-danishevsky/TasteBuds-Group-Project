import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import './SplashPage.css';

function SplashPage(){


    return (
        <>
            <div className="page-container">
                <div className="info-container">
                    <div className="info-text">
                        <img src="./TasteBudsFinal.png" style={{width:'300px', height:'300px'}}/>
                        <h1>Start your journey of connecting with new taste buds</h1>
                        <p>
                            Whatever you're looking to do this year, Taste Buds can help.
                            For a great period of time, people have turned to Taste Buds to meet people,
                            make friends, and explore their interests.
                            Thousands of events are happening every day—join the fun.
                        </p>
                    </div>
                    <div className="info-image">
                        <img alt='image of a meetup' src='https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=640'/>
                    </div>
                </div>
                <div className="search-bar-container">
                    <div className="search-bar">Search Bar Goes Here...</div>
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
                            <img alt='join group high five' src="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=384"/>
                            <a>Join a group</a>
                            <p>Do what you love, meet others who love it, find your community. The rest is history!</p>
                        </div>
                        <div className="card-link-find-event">
                            <img alt='pic of event ticket' src="https://secure.meetupstatic.com/next/images/shared/ticket.svg?w=384"/>
                            <a>Find an event</a>
                            <p>Events are happening on just about any kind of food you can think of, from pizza and wings to pho and sushi.</p>
                        </div>
                        <div className="card-link-start-group">
                            <img alt='icon of a group' src="https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=384"/>
                            <a>Start a group</a>
                            <p>You don't have to be an expert to gather people together and explore shared food interests.</p>
                        </div>
                    </div>
                </div>
                <div className="button-container">
                    <a>Join Taste Buds</a>
                </div>
            </div>
        </>
    )
}

export default SplashPage
