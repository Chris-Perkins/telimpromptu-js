import React from "react";
import { Link } from "react-router-dom";

export default function About() {
    
    return (
        <div className="w-full mt-3">
            <div className="bg-[rgb(52,52,92)] p-2.5 rounded-md overflow-y-auto">
                <h3>📒 About</h3>
                <p>Telimpromptu is a free online game where players create and present whacky mad-libs style news broadcasts!</p>
                <Link to='/script-writing' className="text-blue-500 hover:text-blue-700">Want to write your own script? Click here</Link>
            </div>
        </div>
    );    
}