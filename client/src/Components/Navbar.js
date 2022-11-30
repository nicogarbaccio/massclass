import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/user';
import { CourseContext } from '../Context/course';
import Dropdown from './Dropdown';

function Navbar() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext)
    const { currentCourse, setCurrentCourse } = useContext(CourseContext)
    const [show, setShow] = useState(false)

    const handleLogout = () => {
        fetch('/logout', {
          method: 'DELETE'
        })
        .then((res) => {
          if (res.ok) {
            setUser(null);
            navigate('/login');
          }
        });
    };

    return (
        <div>
            {
                user ?
                <nav>
                    <a href="/"><span>ExplorED</span></a>
                    <button onClick={() => setShow(!show)}>
                        <span>Open main menu</span>
                    </button>
                    <div>
                        <ul>
                            <li>
                                <NavLink to={`/profile/${user.id}`} onClick={() => setCurrentCourse(null)}>
                                    My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={user.admin ? `/instructor/${user.id}/courses` : `/student/${user.id}/courses`} onClick={() => setCurrentCourse(null)}>
                                    My Courses
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/logout' onClick={handleLogout}>
                                    Log out
                                </NavLink>
                            </li>
                            { currentCourse ? 
                                <Dropdown currentCourse={currentCourse} user={user} />
                                :
                                null
                            }
                        </ul>
                    </div>
                </nav>
                :
                ""
            }
        </div>
    )
}

export default Navbar;