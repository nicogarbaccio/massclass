import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/user'

function Login() {

    const { user, setUser } = useContext(UserContext)
    const [ formData, setFormData ] = useState ({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch("/login", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData)
        }).then( (resp) => {
          if (resp.ok) {
            resp.json().then( (user) => {
              setUser(user);
              if (user.admin === true) {
                navigate(`/instructor/${user.id}/courses`);
              } else {
                navigate(`/student/${user.id}/courses`);
              }
    
            });
          } else {
            resp.json().then( (json) => {
              alert(json.errors)
            });
          }
        });
      };

    

    return (
        <div>
            { user ?
                user.admin ?
                navigate(`/instructors/${user.id}/courses`)
                :
                navigate(`/students/${user.id}/courses`)
                :
                <div>
                    <div>
                        <h1>ExplorED</h1>
                        <form onSubmit={handleSubmit}>
                            <h1>Welcome back!</h1>
                            <input
                                label="email"
                                type="text"
                                required
                                onChange={handleChange}
                                placeholder="Email"
                                name="email"
                                value={email}
                            />
                            <input 
                                label="password"
                                type="password"
                                required
                                onChange={handleChange}
                                placeholder="Password"
                                name="password"
                                value={password}
                            />
                            <button type="submit">Login</button>
                        </form>
                        <div>
                            Would you like to create an account?{' '}
                            <a href="../">Sign Up</a>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Login;