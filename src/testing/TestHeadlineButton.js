import React from "react";
import { useNavigate } from "react-router-dom";
import { setupTestEnvironment } from "../utils/testing-utils";

export default function TestHeadlineButton() {
    const navigate = useNavigate();

    const activateTestMode = () => {
        setupTestEnvironment()
        navigate('/headline')
    }

    return (
        <button onClick={activateTestMode}>→ Headline Page Test ←</button>
    )
}