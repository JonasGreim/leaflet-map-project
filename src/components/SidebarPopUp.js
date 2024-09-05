import { useState } from "react";
import '../popUp.css';
import basicMaterial from './../images/icons/basic-material.png';
import communications from './../images/icons/communications.png';
import consumerCyclical from './../images/icons/consumer-cyclical.png';
import consumerDefense from './../images/icons/consumer-defense.png';
import energy from './../images/icons/energy.png';
import financials from './../images/icons/financials.png';
import health from './../images/icons/health.png';
import industrials from './../images/icons/industrials.png';
import informationTechnology from './../images/icons/information-technology.png';
import utilities from './../images/icons/utilities.png';

export const iconList = [
    { name: 'Basic Materials', icon: basicMaterial, backend: 'basic_materials' },
    { name: 'Communications', icon: communications, backend: 'communications' },
    { name: 'Consumer Cyclical', icon: consumerCyclical, backend: 'consumer_cyclical' },
    { name: 'Consumer Defensive', icon: consumerDefense, backend: 'consumer_defensive' },
    { name: 'Energy', icon: energy, backend: 'energy' },
    { name: 'Financials', icon: financials, backend: 'financials' },
    { name: 'Health Care', icon: health, backend: 'health' },
    { name: 'Industrials', icon: industrials, backend: 'industrials' },
    { name: 'Information Technology', icon: informationTechnology, backend: 'information_technology' },
    { name: 'Utilities', icon: utilities, backend: 'utilities' }
];


export const SidebarPopUp = ({ changeSmoothBorder }) => {
    const [open, setOpen] = useState(true);

    return (
        <div
            className={`sidebar-popup-container ${open ? "sidebar-popup-open" : "sidebar-popup-closed"}`}
        >
            <div className="sidebar-popup-content">
                <h2>Legend</h2>
                {iconList.map((item, index) => (
                    <div className="sidebar-popup-item" key={index}>
                        <p className="item-name">{item.name}</p>
                        <img className=".sidebar-popup-item img" src={item.icon} alt={item.name}/>
                    </div>
                ))}
                <div className="checkboxSmoothBorderBox">
                    <label>
                        <input
                            className="checkboxSmoothBorder"
                            type="checkbox"
                            onChange={changeSmoothBorder}
                        />
                        Smooth Border: Top 55
                    </label>
                </div>
            </div>
            <div
                className="sidebar-popup-toggle"
                tabIndex={0}
                onClick={() => {
                    setOpen((prevState) => !prevState);
                }}
            >
                Legend {open ? "<" : ">"}
            </div>
        </div>
    );
};