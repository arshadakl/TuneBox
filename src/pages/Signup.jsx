import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { _signup } from '../utils/API';
import { handleError } from '../utils/errorHandler';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function Signup() {

  const navigate = useNavigate()

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
    const response = await _signup(values)
    if(response.success){
      navigate('/')
    }
    } catch (error) {
      const errorMessage = handleError(error);
      toast.error(errorMessage)
      // setError(errorMessage);
    }
  };

  return (
    <div className='bg-gradient-to-tr from-indigo-600 to-slate-50 w-full h-screen flex items-center justify-center'>
      <div className="w-96 rounded-lg bg-B2 p-8 text-gray-200">
        <p className="text-center text-xl font-bold">Join Us</p>
        <Formik
          initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-6">
              <div className="mt-1 text-sm leading-5">
                <label htmlFor="username" className="block text-gray-400 mb-1">
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  className="w-full rounded-md border border-gray-700 outline-none bg-B2 p-3 text-gray-200 focus:border-purple-300"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-xs" />
              </div>
              <div className="mt-1 text-sm leading-5">
                <label htmlFor="email" className="block text-gray-400 mb-1">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full rounded-md border border-gray-700 outline-none bg-B2 p-3 text-gray-200 focus:border-purple-300"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
              </div>
              <div className="mt-1 text-sm leading-5">
                <label htmlFor="password" className="block text-gray-400 mb-1">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-full rounded-md border border-gray-700 outline-none bg-B2 p-3 text-gray-200 focus:border-purple-300"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
              </div>
              <div className="mt-1 text-sm leading-5">
                <label htmlFor="confirmPassword" className="block text-gray-400 mb-1">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="w-full rounded-md border border-gray-700 outline-none bg-B2 p-3 text-gray-200 focus:border-purple-300"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="block w-full mt-4 bg-purple-300 p-3 text-center text-gray-900 rounded-md font-semibold"
              >
                Signup Now
              </button>
            </Form>
          )}
        </Formik>
        <div className="flex items-center pt-4">
          <div className="flex-1 h-px bg-gray-700" />
          <p className="px-3 text-sm leading-5 text-gray-400">Login with social accounts</p>
          <div className="flex-1 h-px bg-gray-700" />
        </div>
        <div className="flex justify-center mt-4">
          <button
            aria-label="Log in with Google"
            className="rounded-sm p-3 bg-transparent border-none mx-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
