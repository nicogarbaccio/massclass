import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Dropdown( { currentCourse, user } ) {
    const [show, setShow] = useState(false)

    return (
        <div>
            <div>
                <button onClick={() => setShow(!show)}>
                    {currentCourse.title}
                </button>
            </div>
            <div>
                <div>
                    <NavLink to={`/syllabus/${currentCourse.syllabus?.id}`} onClick={() => setShow(!show)}>
                        <span>Syllabus</span>
                    </NavLink>
                    <NavLink to={`/course/${currentCourse.id}/assignments`} onClick={() => setShow(!show)}>
                        <span>Assignments</span>
                    </NavLink>
                    <NavLink to={`/course/${currentCourse.id}/announcements`} onClick={() => setShow(!show)}>
                        <span>Announcements</span>
                    </NavLink>
                    <NavLink to={`/course/${currentCourse.id}/discussion_board`} onClick={() => setShow(!show)}>
                        <span>Discussion Board</span>
                    </NavLink>
                    <NavLink to={`/course/${currentCourse.id}/documents`} onClick={() => setShow(!show)}>
                        <span>Course Documents</span>
                    </NavLink>
                    {user?.admin ?
                        <NavLink to={`/course/${currentCourse.id}/students`} onClick={() => setShow(!show)}>
                            <span>Students</span>
                        </NavLink>
                    :
                        <NavLink to={`/course/${currentCourse.id}/grades`} onClick={() => setShow(!show)}>
                            <span>Grades</span>
                        </NavLink>
                    }
                </div>
            </div>
        </div>
    )
}

export default Dropdown;