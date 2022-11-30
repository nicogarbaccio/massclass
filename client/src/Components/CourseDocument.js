import React, { useContext } from 'react';
import { UserContext } from '../Context/user';

function CourseDocument( {document, onDeleteDocument} ) {

    const { user } = useContext(UserContext);

    function handleDeleteDocument(e){
        fetch(`/course_documents/${document.id}`, {
            method:'DELETE'
          })
          onDeleteDocument(document)
    }

    return (
        <div>
            <a href="/">Doc</a>
            {user?.admin ?
                <i onClick={handleDeleteDocument}></i>
                :
                ""
            }
        </div>
    )
}

export default CourseDocument;