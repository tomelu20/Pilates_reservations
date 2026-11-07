import React, { useState } from 'react';
import HomePage from '../frontend/home.jsx';
import Login from '../frontend/Login.jsx';
import Register from '../frontend/Register.jsx';

export default function App() {
    const [activeTab, setActiveTab] = useState('acasa');
    const [currentUser, setCurrentUser] = useState(null);

    const renderContent = () => {
        if (activeTab === 'login') {
            return <Login setActiveTab={setActiveTab} onLoginSuccess={setCurrentUser} />;
        }
        if (activeTab === 'register' || activeTab === 'devino-membru') {
            return <Register setActiveTab={setActiveTab} />;
        }

        return <HomePage activeTab={activeTab} setActiveTab={setActiveTab} currentUser={currentUser} />;
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-[#3A322C] flex flex-col selection:bg-[#8C5E48] selection:text-white">
            {renderContent()}
        </div>
    );
}