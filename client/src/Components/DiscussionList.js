import React, { useContext, useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { UserContext } from '../Context/user';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

function DiscussionList() {

    const [isLoaded, setIsLoaded] = useState(false)
    const [discussions, setDiscussions] = useState([])
    const { id } = useParams();
    const { user } = useContext(UserContext);

    const [formData, setFormData] = useState({
        title: "",
        body: "",
        course_id: id
      });
    

    useEffect(() => {
        fetch(`/courses/${id}/discussions`)
        .then((r) => r.json())
        .then(discussions => {
        setDiscussions(discussions);
        setIsLoaded(true)
    })
    }, [id])

    if (!isLoaded) return <h2>Loading...</h2>

    function handleChange(e){
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function handleSubmit(e){
        e.preventDefault();
        fetch('/discussions', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((resp) => resp.json())
        .then((newDiscussion) => {setDiscussions([...discussions, newDiscussion]);
        setFormData({
            title: "",
            body: "",
            course_id: id
        });
        });
    };

    return (
        <div className='min-h-screen bg-slate-200 p-7'>
            <h1 className='text-4xl font-bold my-8'>Discussions</h1>
                {discussions?.map(discussion => {
                    return (
                        <p className='my-8 ml-4'>
                            <NavLink to={`/discussion/${discussion.id}`} className="hover:text-blue-700">
                                <span className='font-bold' >{discussion.title}</span>
                            </NavLink>
                            <span> - {discussion.created_at.slice(0, 10)}</span>
                        </p>

                    )
                })}
                
            {user?.admin ?
                <>
                <h2 className='text-xl font-bold my-8'>Add a discussion</h2>
                <form onSubmit={handleSubmit} className="w-1/2">
                    <input type="text" id="title" placeholder="Title" name="title" value={formData.title} onChange={handleChange} className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-white border-1 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mb-6"></input>
                    <Editor
                        editor={EditorState}
                        data={formData.body}
                        onChange={(editor) => {
                            const data = editor.getData()
                            setFormData({ ...formData, [formData.body]: data })
                        }}
                    />
                    <button type='submit' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">Submit</button>
                </form>
                </>
            :
                null
            }
         </div>
    )
}

export default DiscussionList;