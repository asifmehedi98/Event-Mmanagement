import bg from '../assets/images/bg1.jpg';
import {Link} from 'react-router-dom';

const Landing = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${bg})`, backgroundAlt: "Background Image" }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content flex justify-center items-center">
                    <div className="max-w-xl">
                        <div className="text-white">
                            <h1 className="mb-6 text-6xl font-semibold">Event Management Service</h1>
                            <ul className="text-xl space-y-2 text-center font-light">
                                <li>Manage your events</li>
                                <li>Keep track of your events</li>
                                <li>Get notified of upcoming events</li>
                            </ul>
                            <br />
                            <Link to="/login">
                            <button className="btn btn-warning">Jump into the app</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default Landing;
