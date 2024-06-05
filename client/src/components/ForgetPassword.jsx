import React from "react";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate();
  const { user, token, getResetPasswordLink } = useContext(AuthContext);
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    setIsLoading(true);
    getResetPasswordLink(email)
      .then((res) => {
        setIsLoading(false);
        setError(false);
        alert("Email sent successfully");
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(true);
        alert("Your email is wrong");
        console.log(err);
      });
  };

  return (
    <>
      {isLoading && (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      )}
      {!isLoading && (
        <div class="">
          <div class="p-8 lg:w-1/2 mx-auto">
            <div class="bg-white rounded-t-lg p-8">
              <p class="text-center text-sm text-gray-400 font-light">
                Reset your password
              </p>
              <div class="bg-orange-100 rounded-b-lg py-12 px-4 lg:px-24">
                <p class="text-center text-sm text-gray-500 font-light">
                  Enter your email and we will send you a link to reset your
                  password
                </p>
                <form class="mt-6" onSubmit={handleSubmit}>
                  <div class="relative">
                    <input
                      class="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                      id="email"
                      type="text"
                      placeholder="Email"
                      name="email"
                    />
                    <div class="absolute left-0 inset-y-0 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-7 w-7 ml-3 text-gray-400 p-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                  </div>

                  <div class="mt-4 flex items-center text-gray-500">
                    {/* <input
                type="checkbox"
                id="remember"
                name="remember"
                class="mr-3"
              /> */}
                    {/* <label for="remember">Remember me</label> */}
                  </div>
                  {error && (
                    <p class="text-red-500 text-sm">Your email is wrong</p>
                  )}
                  <div class="flex items-center justify-center mt-8">
                    <button
                      type="submit"
                      class="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                    >
                      Send Email
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ForgetPassword;
