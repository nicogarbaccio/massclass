import React, { useState, useContext } from 'react';
import { UserContext } from '../Context/user';
import { CourseContext } from '../Context/course';
import { useNavigate } from 'react-router-dom';

function CourseForm( {setCourses, courses} ) {

    const navigate = useNavigate();
    const { user, setUser } = useContext(CourseContext);
    const { currentCourse, setCurrentCourse } = useContext(CourseContext);

    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        instructor: user?.id,
        length: "",
        days: "",
        remote: true,
        code: Math.floor(Math.random() * 100000)
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
    }

    function handleSubmit(e){
        e.preventDefault();

        fetch('/courses', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(newCourse => {
            setCourses([...courses, newCourse])
            navigate(`/course/${newCourse.id}`)
            console.log(newCourse)
            setCurrentCourse(newCourse)
            })
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" id="title" placeholder="Course Title" name="title" value={formData.title} onChange={handleChange} />
            </div>
            <div>
                <input type="text" id="subject" placeholder="Course Subject" name="subject" value={formData.subject} onChange={handleChange} />
            </div>
            <div>
                <select id="length" name="length" value={formData.length} onChange={handleChange} >
                    <option value="">Choose a length</option>
                    <option value="full year">Full year</option>
                    <option value="semester">Semester</option>
                </select>
            </div>
            <div>
                <input type="text" id="days" placeholder="Course Days" name="days " value={formData.days} onChange={handleChange} />
            </div>
            <div>
                <input type="text" id="code" placeholder="Course Code" name="code" value={formData.code} onChange={handleChange} />
            </div>
            <div>
                Remote?
                <input type="checkbox" id="remote" name="remote" value={formData.remote} onChange={handleChange} checked />
            </div>
        </form>
    )
}

export default CourseForm;