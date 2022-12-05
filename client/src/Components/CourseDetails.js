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
        <div className='min-h-screen bg-slate-200 pt-10'>

            <h1 className='text-3xl font-bold my-4 pl-5 underline underline-offset-8'>{course.title} ({course.code})</h1>

            <div className='pl-6 text-base font-bold ml-4'>
                {course.syllabus ?
                    <p className='my-8'>
                        <Link to={`/syllabus/${course.syllabus?.id}`}>
                            <span className='hover:text-blue-700 '>Syllabus</span>
                        </Link>
                    </p>
                :
                    user.admin ?
                    <div>
                        <h2 className='my-8'>Begin building your course by adding a description for your class.</h2> 
                        <SyllabusForm course={course} setCourse={setCourse}/>
                    </div>
                    :
                    <p className='my-8'>Your instructor hasn't posted a syllabus yet!</p>
                }
                <p className='my-8'>
                    <Link to={`/course/${id}/assignments`}>
                        <span className='hover:text-blue-700'>Assignments</span>
                    </Link>
                </p>

                <p className='my-8'>
                    <Link to={`/course/${id}/announcements`}>
                        <span className='hover:text-blue-700'>Announcements</span>
                    </Link>
                </p>

                <p className='my-8'>
                    <Link to={`/course/${id}/discussion_board`}>
                        <span className='hover:text-blue-700'>Discussion Board</span>
                    </Link>
                </p>

                <p className='my-8'>
                    <Link to={`/course/${id}/documents`}>
                        <span className='hover:text-blue-700'>Course Documents</span>
                    </Link>
                </p>
                

                {user?.admin ?
                    <div>
                        <p className='my-8'>
                            <Link to={`/course/${id}/students`}>
                                <span className='hover:text-blue-700'>Students</span>
                            </Link>
                        </p>
                    </div>

                :

                    <p className='my-8'>
                    <Link to={`/course/${id}/grades`}>
                        <span className='hover:text-blue-700'>Grades</span>
                    </Link>
                    </p>
                }
            </div>
                {user?.admin ?
                    <button onClick={handleToggle} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-5">Delete Course</button>
                    :
                    ""
                }
            <div className={show ? "show" : "hide"}>
                <DeleteConfirmation handleToggle={handleToggle} handleDelete={handleDeleteCourse} show={show} item="Course"/>
            </div>
        </div>
    )
}

export default CourseDetails