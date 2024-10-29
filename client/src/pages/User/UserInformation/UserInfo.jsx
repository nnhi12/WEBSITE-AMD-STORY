import React, { useState } from 'react';
import './UserInfo.css';

function UserInfo() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="profile-container">
            <div className="row">
                <div className="col-6">
                    <div className="profile-img">
                        <img
                            src="https://via.placeholder.com/100" // Replace this URL with the image you want to display
                            alt="profile"
                        />
                    </div>
                    <p className="profile-username">nguyenvana</p>
                </div>
                <div className="col-6">
                    <div className="profile-form-group">
                        <label>Fullname</label>
                        <input type="text" placeholder="Nguyen Van A" />
                    </div>
                    <div className="profile-form-group">
                        <label>Email</label>
                        <input type="email" placeholder="a1234@gmail.com" />
                    </div>
                    <div className="profile-form-group">
                        <label>Password</label>
                        <div className="profile-password-wrapper">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="******************"
                            />
                            <button
                                type="button"
                                className="profile-toggle-password"
                                onClick={togglePasswordVisibility}
                            >
                                👁️
                            </button>
                        </div>
                    </div>
                    <div className="profile-form-group">
                        <label>Age</label>
                        <input type="number" placeholder="18" />
                    </div>
                    <div className="profile-button-group">
                        <button className="profile-edit-button">Edit</button>
                        <button className="profile-save-button">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
