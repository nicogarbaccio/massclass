import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/user";
import SyllabusForm from './SyllabusForm';
import DeleteConfirmation from './DeleteConfirmation';

function CourseDetails(){

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
        // window.location.reload();
    }
    function handleToggle() {
        setShow(!show)
    }

    return (
        <div className='min-h-screen bg-slate-200 pt-10 flex flex-col items-center'>

            <h1 className='text-3xl font-bold underline underline-offset-8 mb-7'>{course.title} ({course.code})</h1>
            <div className='text-base font-bold'>
                {course.syllabus ?
                    <button className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3">
                        <Link to={`/syllabus/${course.syllabus?.id}`}>
                            Syllabus
                        </Link>
                    </button>
                :
                    user.admin ?
                    <div>
                        <h2 className='my-8'>Begin building your course by adding a description for your class.</h2>
                        <SyllabusForm course={course} setCourse={setCourse}/>
                    </div>
                    :
                    <p className='my-8'>Your instructor hasn't posted a syllabus yet!</p>
                }
                <p>
                    <button className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3">
                        <Link to={`/course/${id}/assignments`}>
                            Assignments
                        </Link>
                    </button>
                </p>
                <p>
                    <button className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3">
                        <Link to={`/course/${id}/announcements`}>
                            Announcements
                        </Link>
                    </button>
                </p>
                <p>
                    <button className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3">
                        <Link to={`/course/${id}/discussion_board`}>
                            Discussion Board
                        </Link>
                    </button>
                </p>
                <p>
                    <button className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3">
                        <Link to={`/course/${id}/documents`}>
                            Course Documents
                        </Link>
                    </button>
                </p>
                {user?.admin ?
                    <div>
                        <button className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3">
                            <Link to={`/course/${id}/students`}>
                                Students
                            </Link>
                        </button>
                    </div>
                :
                <button className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3">
                    <Link to={`/course/${id}/grades`}>
                        Grades
                    </Link>
                    </button>
                }
                {user?.admin ?
                    <button onClick={handleToggle} class="text-white bg-red-200 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 mb-10">Delete Course</button>
                    :
                    ""
                }
                </div>
            <div className={show ? "show" : "hide"}>
                <DeleteConfirmation handleToggle={handleToggle} handleDelete={handleDeleteCourse} show={show} item="Course"/>
            </div>
        </div>
    )
}

export default CourseDetails