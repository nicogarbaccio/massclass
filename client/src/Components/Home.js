import Login from "./Login";
import SignupInstructor from "./SignupInstructor";
import { useContext } from "react";
import { UserContext } from "../Context/user";
import { NavLink, useNavigate } from 'react-router-dom'
import SignupStudent from "./SignupStudent";

function Home() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext)

    const handleLogout = () => {
        fetch('/logout', {
          method: 'DELETE'
        })
        .then((res) => {
          if (res.ok) {
            setUser(false);
            navigate('/');
          }
        });
      };
    

    return (
      <>
      {user ?

         user.admin ?

          navigate(`/instructor/${user.id}/courses`)

          :

          navigate(`/student/${user.id}/courses`)

        
        
      :

      <div className="bg-slate-200 min-h-screen flex flex-row">
        <div className="container max-w-sm ml-auto flex-1 flex flex-col items-center justify-center">
          <h1 className='text-8xl font-bold my-8'>ExplorED</h1>
          <h2 className="text-xl italic">Class wherever you are</h2>
        </div>
        <SignupInstructor />
        <SignupStudent />
      </div>

      }
      </>

    ); 
}

export default Home;

{/* <div>
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
        </div> */}