import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../Context/user';

function Home() {

    const navigate = useNavigate();
    const { user } = useContext(UserContext)

    return (
        <div>
            {
                user ?
                    user.admin ?
                    navigate(`/instructor/${user.id}/courses`)
                    :
                    navigate(`/student/${user.id}/courses`)
                :
                <div>
                    <div>
                        <h1>ExplorED</h1>
                    </div>
                    <button><Link to='/SignupInstructor'>Sign up as instructor</Link></button>
                    <button><Link to='/SignupStudent'>Sign up as student</Link></button>
                    <div>
                        <h3>Already have an account?</h3>
                        <button><Link to='/login'>Log in</Link></button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Home;