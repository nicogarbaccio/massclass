import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/user";

function SignupInstructor() {

    const { setUser } = useContext(UserContext)
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    last_name: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const { first_name, last_name, email, password, confirmPassword } = formData;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    fetch('/instructors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        response.json().then((instructor) => {
          setUser(instructor)
          navigate(`/instructor/${instructor.id}/courses`);
        });
      } else {
        response.json().then((resp) => alert(resp.errors));
      }
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  return (

    <div className="container max-w-sm ml-auto flex-1 flex flex-col items-center justify-center px-2">
      <form onSubmit={ handleSubmit } className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 className="mb-8 text-xl text-center font-bold">Instructor Sign up</h1>

        <input 
          label='First_name'
          type='text'
          required
          className="block border border-grey-light w-full p-3 rounded mb-4"
          onChange={ handleChange }
          placeholder='First Name'
          name='first_name'
          value={ first_name }
        />

        <input 
          label='Last_name'
          type='text'
          required
          className="block border border-grey-light w-full p-3 rounded mb-4"
          onChange={ handleChange }
          placeholder='Late Name'
          name='last_name'
          value={ last_name }
        />

        <input
          label='Email'
          type='email'
          required
          className="block border border-grey-light w-full p-3 rounded mb-4"
          onChange={ handleChange }
          placeholder='Email'
          name='email'
          value={ email }
        />

        <input
          label='Password'
          type='password'
          required
          className="block border border-grey-light w-full p-3 rounded mb-4"
          onChange={ handleChange }
          placeholder='Password'
          name='password'
          value={ password }
        />

        <input
          label='Confirm Password'
          type='password'
          required
          className="block border border-grey-light w-full p-3 rounded mb-4"
          onChange={ handleChange }
          placeholder='Confirm Password'
          name='confirmPassword'
          value={ confirmPassword }
        />

        <button type='submit' className="w-full text-center py-3 rounded bg-green-700 text-white hover:bg-violet-600 focus:outline-none my-1">Create Account</button>    
      </form>

      <div class="text-grey-dark mt-6">
          Already have an account?{' '}
          <a class="no-underline border-b border-blue-600 text-blue-600" href="../login/">
               Log in
          </a>.
      </div>
    </div>
  );
}

export default SignupInstructor;