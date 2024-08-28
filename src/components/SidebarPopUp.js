import { useState } from "react";
import '../popUp.css';

export const SidebarPopUp = () => {
    const [open, setOpen] = useState(true);
    const list = ['test', 'test2'];
    return (
        <div
            className={`sidebar-popup-container ${open ? "sidebar-popup-open" : "sidebar-popup-closed"}`}
        >
            <div className="sidebar-popup-content">
                <h2>Legend</h2>
                {list.map((item) => (
                    <div className="sidebar-popup-item" key={item}>
                        <p>{item}</p>
                    </div>
                ))}
            </div>
            <div
                className="sidebar-popup-toggle"
                tabIndex={0}
                onClick={() => {
                    setOpen((prevState) => !prevState);
                }}
            >
                Legende {open ? "<" : ">"}
            </div>
        </div>
    );
};