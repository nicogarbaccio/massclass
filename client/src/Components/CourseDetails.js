import React, { useState, useEffect, useContext } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/user';
import SyllabusForm from './SyllabusForm';
import DeleteConfirmation from './DeleteConfirmation';

function CourseDetails() {

    const [isLoaded, setIsLoaded] = useState(false)
    const [course, setCourse] = useState([])
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch(`/courses/${id}`)
        .then((r) => r.json())
        .then(course => {
        setCourse(course);
        setIsLoaded(true)
    })
    }, [id])

    if (!isLoaded) return <h2>Loading...</h2>

    function handleDeleteCourse() {

        fetch(`/courses/${id}`, {
            method:'DELETE'
          })
 
        navigate(`/instructor/${course.instructor.id}/courses`);
        window.location.reload();
    }

    function handleToggle() {
        setShow(!show)
    }

    return (
        <div>
            <h1>{course.title} ({course.code})</h1>
            <div>
                {course.syllabus ?
                    <p>
                        <NavLink to={`/syllabus/${course.syllabus?.id}`}>
                            <span>Syllabus</span>
                        </NavLink>
                    </p>
                :
                user.admin ?
                    <div>
                        <h2>Add a description for your course</h2>
                        <SyllabusForm course={course} setCourse={setCourse} />
                    </div>
                :
                <p>Your instructor hasn't posted a syllabus yet!</p>
                }
                <div>
                    <button>
                        <NavLink to={`/course/${id}/announcements`}>
                            <span>Announcements</span>
                        </NavLink>
                    </button>
                </div>
                <div>
                    <button>
                        <NavLink to={`/course/${id}/assignments`}>
                            <span>Assignments</span>
                        </NavLink>
                    </button>
                </div>
                <div>
                    <button>
                        <NavLink to={`/course/${id}/discussion_board`}>
                            <span>Discussion Board</span>
                        </NavLink>
                    </button>
                </div>
                <div>
                    <button>
                        <NavLink to={`/course/${id}/documents`}>
                            <span>Course Documents</span>
                        </NavLink>
                    </button>
                </div>
                {user?.admin ?
                    <div>
                        <button>
                            <NavLink to={`/course/${id}/students`}>
                                <span>Students</span>
                            </NavLink>
                        </button>
                    </div>
                :
                    <div>
                        <button>
                            <NavLink to={`/course/${id}/grades`}>
                                <span>Grades</span>
                            </NavLink>
                        </button>
                    </div>
                }
            </div>
            <div>
                {user?.admin ?
                    <button onClick={handleToggle}>Delete Course</button>
                :
                ""
                }
            </div>
            <div>
                <DeleteConfirmation handleToggle={handleToggle} handleDelete={handleDeleteCourse} show={show} />
            </div>
        </div>
    )
}

export default CourseDetails;