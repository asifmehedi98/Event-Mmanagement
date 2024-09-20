import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import defaultProfileImage from '/vite.svg';
import useAuthData from '../hooks/UseAuthData';

const Profile = () => {
    const userData = useAuthData();
    const navigate = useNavigate();

    // Local state for profile form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        profileImage: '',
    });

    // Local state for password form data
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                profileImage: userData.profileImage || '',
            });
        }
    }, [userData]);

    const handleLogout = () => {
        localStorage.removeItem('email');
        navigate('/login');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/updateProfile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('email'), // Assuming email is stored in localStorage
                    ...formData,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Profile updated successfully');
            } else {
                alert(data.error || 'Error updating profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/updatePassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('email'),
                    ...passwordData,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Password updated successfully');
                setPasswordData({
                    oldPassword: '',
                    newPassword: '',
                });
            } else {
                alert(data.error || 'Error updating password');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="bg-gray-900 text-white w-64 h-full fixed z-50 flex flex-col">
                <div className="p-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                <nav className="flex-1">
                    <ul className="space-y-3">
                        <Link to={"/dashboard"}>
                            <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Home</li>
                        </Link>
                        <Link to="/profile">
                            <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Profile</li>
                        </Link>
                        <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Settings</li>
                        <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Messages</li>
                    </ul>
                </nav>
            </div>

            {/* Content */}
            <div className="flex-1 ml-64">
                <div className="navbar bg-gray-800 shadow-xl px-4 py-2">
                    <a href="/" className="text-white text-xl font-bold">
                        Event Management Service
                    </a>
                    <div className="flex items-center ml-auto space-x-4">
                        <input
                            type="text"
                            placeholder="Search"
                            className="input input-bordered w-24 md:w-auto bg-gray-700"
                        />
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full overflow-hidden">
                                    <img
                                        alt="User avatar"
                                        src={userData?.profileImage || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                                    />
                                </div>
                            </div>
                            <ul className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between cursor-pointer" onClick={handleLogout}>
                                        Logout
                                        <span className="badge bg-red-500">New</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Carousel */}
                <div className="carousel w-full">
                    <div id="slide1" className="carousel-item relative w-full">
                        <img
                            src="/src/assets/images/rest1.jpg"
                            className="w-full"
                        />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide4" className="btn btn-circle">❮</a>
                            <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img
                            src="/src/assets/images/rest2.jpg"
                            className="w-full"
                        />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide1" className="btn btn-circle">❮</a>
                            <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img
                            src="/src/assets/images/rest3.jpg"
                            className="w-full"
                        />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide2" className="btn btn-circle">❮</a>
                            <a href="#slide4" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full">
                        <img
                            src="/src/assets/images/rest4.jpg"
                            className="w-full"
                        />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide3" className="btn btn-circle">❮</a>
                            <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div>

                {/* Profile */}
                <p className="p-20 text-center text-5xl font-semibold">Profile</p>

                {/* Profile Card */}
                <div className="p-8 mb-12 border w-full rounded-lg shadow-lg">
                    <div className="profilePic bg-gray-300 h-56 w-56 rounded-full flex justify-center items-center p-4 mx-auto">
                        <img
                            className="w-32 h-32"
                            src={formData.profileImage || defaultProfileImage}
                            alt="Profile Picture"
                        />
                    </div>
                    <div className="my-4">
                        <h1 className="text-3xl font-bold text-center mt-4">
                            {formData.firstName} {formData.lastName}
                        </h1>
                        <p className="text-center text-lg">@{userData?.username}</p>
                    </div>
                    <div>
                        <form onSubmit={handleProfileSubmit}>
                            <div className="flex gap-8">
                                {/* First Name */}
                                <div className="firstName flex-1 w-full">
                                    <div className="label">
                                        <span className="label-text text-xl font-bold">First Name</span>
                                    </div>
                                    <input
                                        name="firstName"
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered w-full"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* Last Name */}
                                <div className="lastName flex-1 w-full">
                                    <div className="label">
                                        <span className="label-text text-xl font-bold">Last Name</span>
                                    </div>
                                    <input
                                        name="lastName"
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered w-full"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            {/* Image URL */}
                            <div className="imageUrl w-full">
                                <div className="label">
                                    <span className="label-text text-xl font-bold">Image URL</span>
                                </div>
                                <input
                                    name="profileImage"
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered w-full"
                                    value={formData.profileImage}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* Update Profile Button */}
                            <div className="text-center mt-4">
                                <button className="btn btn-primary w-full">Update Profile</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Update Password */}
                <div className="p-8 mb-12 border w-full rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>
                    <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-4">
                            <label className="block text-xl font-bold mb-2">Old Password</label>
                            <input
                                name="oldPassword"
                                type="password"
                                placeholder="Old password"
                                className="input input-bordered w-full"
                                value={passwordData.oldPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xl font-bold mb-2">New Password</label>
                            <input
                                name="newPassword"
                                type="password"
                                placeholder="New password"
                                className="input input-bordered w-full"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="text-center mt-4">
                            <button className="btn btn-primary w-full">Update Password</button>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <footer className="footer bg-base-200 text-base-content p-10">
                    <nav>
                        <h6 className="footer-title">Services</h6>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Company</h6>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Legal</h6>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                    <form>
                        <h6 className="footer-title">Newsletter</h6>
                        <fieldset className="form-control w-80">
                            <label className="label">
                                <span className="label-text">Enter your email address</span>
                            </label>
                            <div className="join">
                                <input
                                    type="text"
                                    placeholder="username@site.com"
                                    className="input input-bordered join-item" />
                                <button className="btn btn-primary join-item">Subscribe</button>
                            </div>
                        </fieldset>
                    </form>
                </footer>
            </div>
        </div>
    );
};

export default Profile;
