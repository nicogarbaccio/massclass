import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { UserContext } from '../Context/user';
import { CourseContext } from '../Context/course';
import CourseForm from './CourseForm';

function CourseList() {
    const { user } = useContext(UserContext);
    const { currentCourse, setCurrentCourse } = useState(CourseContext);
    const [courses, setCourses] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [show, setShow] = useState(false);
    const { id } = useParams(); 

    useEffect(() => {
        fetch(`/instructors/${id}/courses`)
        .then((r) => r.json())
        .then(courses => {
        setCourses(courses);
        setIsLoaded(true)
    })
    }, [id])

    if (!isLoaded) return <h2>Loading...</h2>

    function toggleShowForm(){
        setShow(!show)
    }

    return (
        <div>
            <h1>Welcome, {user?.first_name}</h1>
            <h2>Your courses:</h2>
            {courses?.map(course => {
                return (
                    <p className='font-bold my-8'>
                        <NavLink to={`/course/${course.id}`} onClick={() => setCurrentCourse(course)}>
                            <span> - {course.title}</span>
                        </NavLink>
                        <span>, {course.subject}</span>
                        <span>, {course.days}</span>
                        <span>, {course.code}</span>
                    </p>
                    )} )
             }
            <button onClick={toggleShowForm}>Add a course</button>
            <div>
                <CourseForm setCourses={setCourses} courses={courses} />
            </div>
        </div>
    )
}

export default CourseList;