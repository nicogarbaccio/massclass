import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { UserContext } from '../Context/user';
import { CourseContext } from '../Context/course';

function CourseListStudent() {

    const { user } = useContext(UserContext)
    const { currentCourse, setCurrentCourse } = useContext(CourseContext)
    const [courses, setCourses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [show, setShow] = useState(false)
    const [displayError, setDisplayError] = useState(false)
    const [code, setCode] = useState("")
    const { id } = useParams();

    useEffect(() => {
        fetch(`/students/${id}/courses`)
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

    function handleChange(e){
        setCode(e.target.value);
    };

    function handleSubmit(e){
        e.preventDefault();

        fetch('/course_students', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify({code: code, student_id: id}),
        })
        .then(res => {
            if(res.ok){
                res.json().then(newCourse => {
                setCourses([...courses, newCourse.course])
                setCode("")})
                setShow(!show)
            } else {
                setShow(!show)
                setDisplayError(!displayError)
            }
        })
    };

    return (
        <div>
            <h1>Welcome, {user?.first_name}</h1>
            <h2>Your courses:</h2>
            {courses?.map(course => {
                return (
                    <p className='font-bold my-8'>
                        <NavLink to={`/course/${course.id}`} onClick={(e) => setCurrentCourse(course)}>
                            <span>{course.title}</span>
                        </NavLink>
                        <span>, {course.subject}</span>
                        <span>, {course.days}</span>
                    </p>
                    )} )
             }
            <button onClick={toggleShowForm}>Add a course</button>
            <div>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div>
                        <input type="text" id="code" placeholder="Code" name="code" value={code} onChange={handleChange} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                <p>Please enter a valid course code!</p>
                <button onClick={() =>{
                    setShow(!show)
                    setDisplayError(!displayError)}}>Try again</button>
            </div>
        </div>
    )
}

export default CourseListStudent;