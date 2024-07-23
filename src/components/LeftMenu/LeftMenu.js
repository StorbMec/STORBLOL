'use client'
import React from "react";
import Image from "next/image";

import twitterLogo from "../../../public/icons/twitter.svg";
import discordLogo from "../../../public/icons/discord.svg";
import logoutIcon from "../../../public/icons/logout.svg";
import logo from '../../../public/images/logo.png'

import "./LeftMenu.css";

export default function LeftMenu({changeStore, availableCategories, logoutFunction}) {
    return (
    
        <div className="left-menu">
            <div className="left-menu-header">
                <Image src={logo} className="storb-logo" alt="Storb.lol Logo" width={500}/>
            </div>
            <div className="left-menu-content">
            {availableCategories.map((item, index) => (
                    <div className="menu-item" key={index} id={item.backendType} onClick={()=>{ changeStore(item.backendType)}}>
                        <Image src={item.icon} className="left-menu-navigation-icon" alt={`${item.name} Icon`} width={20} height={20} />
                        <h1 className="menu-option-label">{item.name}</h1>
                    </div>
                ))}
            <div className="menu-item"  id="logout" onClick={()=>logoutFunction()}>
                <Image src={logoutIcon} className="left-menu-navigation-icon" alt={`Logout Icon`} width={20} height={20} />
                <h1 className="menu-option-label">Logout</h1>
            </div>
            </div>
            <div className="left-menu-footer-info">
                <div >
                    <p className="advisory">
                        STORB.LOL works based on an exploit available in League of Legends, So our product can stop working anytime soon. For any stats update,
                    </p>
                    <h2 className="social-media-call">follow us on social media!</h2>
                    <div className="icons">
                        <Image src={twitterLogo} alt="Twitter Logo" width={30} height={30} />
                        <Image src={discordLogo} className="discord-redirect" alt="Discord logo" width={30} height={30} onClick={() => window.open('https://discord.gg/xCErGgHnbp', '_blank')} />
                    </div>
                </div>

            </div>
    </div>
    );
    }
