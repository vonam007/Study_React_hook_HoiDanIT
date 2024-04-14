import { useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService'
import { toast } from 'react-toastify';
import { BiShow, BiHide } from "react-icons/bi";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        //validate
        if (!email) {
            toast.warn('Email is required');
        }
        if (password.length < 8) {
            toast.warn('Password must be at least 8 characters');
        }
        if (!email || password.length < 8) {
            return;
        }
        //submit API
        let res = await postLogin(email, password);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
        else if (res && res.EC !== 0) {
            toast.error(res.EM);
        }

    }


    return (
        <div className="login-container">
            <div className='Header'>
                Don't have an account? <Link to="/register">Sign up</Link> <span>Need help?</span>
            </div>
            <div className='Content'>
                <div className='Welcome'>
                    <h1>Welcome to NamVo</h1>
                    <p>Log in to your account</p>
                </div>
                <div className='Login-content'>
                    <div className='Login-input'>
                        <div className='inputInfo'>
                            <label htmlFor='Email'>Email<span style={{ color: "red" }}>*</span></label>
                            <input
                                type='text'
                                placeholder='Example@email.com'
                                id='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='inputInfo password-group'>
                            <label htmlFor='Password'>Password<span style={{ color: "red" }}>*</span></label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='At least 8 characters'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className='show-password'>
                                {showPassword ? < BiHide onClick={() => setShowPassword(false)} /> : < BiShow onClick={() => setShowPassword(true)} />}</span>
                        </div>
                    </div>
                    <div className='forgot-password'>Forgot password?</div>

                    <button onClick={() => handleLogin()}>Log in</button>
                    <span className='back-home' onClick={() => navigate('/')}> &#60; &#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Login;