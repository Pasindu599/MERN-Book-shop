import React from "react";
import { Spinner } from "flowbite-react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

function ChangePassword() {
  const { user, token, changePassword } = useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("Form submitted");
    const formDate = e.target;
    const data = {
      currentPassword: formDate.currentPassword.value,
      newPassword: formDate.newPassword.value,
      confirmNewPassword: formDate.confirmNewPassword.value,
    };
    if (data.newPassword !== data.confirmNewPassword) {
      setLoading(false);
      alert("Password does not match");

      return;
    }
    try {
      await changePassword(data);
      setLoading(false);
      alert("Password updated successfully");
    } catch (error) {
      setLoading(false);
      alert("Not able to update password. Please try again later.");
      console.log(error);
    }
  };
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
              Security and Privacy
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Change your password.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div class="border-t border-gray-200">
              <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Current Password
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="password"
                      placeholder="Current password"
                      name="currentPassword"
                      class="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    New Password
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="password"
                      placeholder="New password"
                      name="newPassword"
                      class="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Confirm New Password
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="password"
                      placeholder="Confirm new Password"
                      name="confirmNewPassword"
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
                Change Password
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default ChangePassword;
