import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

import { baseURL } from "../../constants";

function UserProfile() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [owner, setOwner] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("Form submitted");
    const formDate = e.target;
    const data = {
      name: formDate.name.value,
      userEmail: formDate.userEmail.value,
      mobile: formDate.mobile.value,
      address: formDate.address.value,
      city: formDate.city.value,
      state: formDate.state.value,
      country: formDate.country.value,
    };
    try {
      await fetch(`${baseURL}/users/user/${owner._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          console.log(data);
          alert("Profile updated successfully");
          //page reload
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch(`${baseURL}/users/user-email/${user.email}`)
      .then((response) => response.json())
      .then((data) => setOwner(data.user));
  }, [user]);

  return (
    <>
      {loading && (
        <div className="px-4 my-12 text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      )}

      {!loading && (
        <div class="relative bg-white w-[1050px] shadow overflow-hidden sm:rounded-lg">
          <div class=" py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              User Profile
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Details and informations about user.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div class="border-t border-gray-200">
              <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Full name</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Full name"
                      value={owner.name}
                      name="name"
                      class="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="email"
                      placeholder="Email"
                      value={owner.userEmail}
                      name="userEmail"
                      class="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Phone Number
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Phone number"
                      value={owner.mobile}
                      name="mobile"
                      class="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Address</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Address"
                      value={owner.address}
                      name="address"
                      class="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">City</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      placeholder="City"
                      value={owner.city}
                      name="city"
                      class="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">State</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      placeholder="State"
                      value={owner.state}
                      name="state"
                      class="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Country</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Country"
                      value={owner.country}
                      name="country"
                      class="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </dd>
                </div>
              </dl>
            </div>
            <div className="text-right mb-5">
              <button
                class="bg-blue-500 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300  mt-5 mr-5"
                type="submit"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default UserProfile;
