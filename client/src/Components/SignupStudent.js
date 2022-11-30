import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/user';

function SignupStudent() {

    const { setUser } = useContext(UserContext)
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        admin: false
    })

    const navigate = useNavigate();

    const { first_name, last_name, email, password, confirmPassword, admin } = formData;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match!")
            return;
        }
        fetch('/students', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }).then((response) => {
            if (response.ok) {
              response.json().then((student) => {
                setUser(student)
                navigate(`/student/${student.id}/courses`);
              });
            } else {
              response.json().then((resp) => alert(resp.errors));
            }
          });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Student Sign Up</h1>
                <input
                    label='first_name'
                    type='text'
                    required
                    onChange={handleChange}
                    placeholder='First name'
                    name='first_name'
                    value={first_name}
                />
                <input
                    label='last_name'
                    type='text'
                    required
                    onChange={handleChange}
                    placeholder='Last name'
                    name='last_name'
                    value={last_name}
                />
                <input
                    label='email'
                    type='email'
                    required
                    onChange={handleChange}
                    placeholder='Email'
                    name='email'
                    value={email}
                />
                <input
                    label='password'
                    type='password'
                    required
                    onChange={handleChange}
                    placeholder='Password'
                    name='password'
                    value={password}
                />
                <input
                    label='confirm password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />
                <button type='submit'>Create Account</button>
            </form>
            <div>
                Already have an account?{' '}
                <a href='../login/'>Log in</a>
            </div>
        </div>
    )
}

export default SignupStudent;