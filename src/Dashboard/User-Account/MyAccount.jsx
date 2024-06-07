import { useContext, useState } from "react";
// import userProfile from "../../assets/images/doctor-img01.png";
import Profile from "./Profile";
import MyBookings from "./MyBookings";
import MyLabBookings from "./MyLabBookings"
import { BASE_URL } from "./../../config";

import useGetProfile from "../../hooks/useFetchData";
import HashLoader from "react-spinners/HashLoader";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

import { token } from "./../../config";
import axios from "axios";


const MyAccount = () => {
  const [tab, setTab] = useState("bookings");
  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token()}` }
    });
    const res = await response.json()
    if (res.success = true) {
      dispatch({ type: "LOGOUT" });
      navigate('/');
      toast.success("Account deleted successfully");
    }

  }


  const handleDownload = async () => {
    // http://localhost:4000/api/download-report/${userData._id}
    try {
      const response = await axios.get(`https://elite-pathlabs-backend.onrender.com/api/download-report/${userData._id}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'smart_report.pdf');
      document.body.appendChild(link);
      link.click();
      alert('Smart Report downloaded successfully');
    } catch (error) {
      console.error('Smart Report is not uploaded yet !:', error);
      alert('Smart Report is not uploaded yet !');
    }
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && (
          <div className="flex items-center justify-center w-full h-full">
            <HashLoader color="#0067FF" />
          </div>
        )}
        {error && !loading && (
          <div className="flex items-center justify-center w-full h-full">
            <h3 className="text-headingColor text-[20px] font-semibold leading-[30px]">
              {error}
            </h3>
          </div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10 ">
            <div className=" px-[30px] pb-[50px] rounded-md  ">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-[#0067FF]">
                  <img
                    src={userData?.photo}
                    alt=""
                    className="w-full rounded-full"
                  />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {userData?.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {userData?.email}
                </p>

                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood Type:
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {userData?.bloodType}
                  </span>
                </p>
              </div>

              <div className="mt-[50px] md:mt-[100px]">
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#181A1E] p-3 rounded-md text-white text-[16px] leading-7"
                >
                  Logout
                </button>
                <button
                  onClick={() => handleDelete(userData._id)}
                  className="w-full bg-red-600 mt-4 p-3 rounded-md text-white text-[16px] leading-7"
                >
                  Delete Account
                </button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div className="flex gap-x-3">
                <button
                  onClick={() => setTab("bookings")}
                  className={`${tab === "bookings" && "bg-[#0067FF] text-white font-normal"
                    }  p-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7  border border-solid border-[#0067FF]`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={`${tab === "settings" && "bg-[#0067FF] text-white font-normal"
                    } py-2 px-5 rounded-md font-semibold text-headingColor text-[16px] leading-7  border border-solid border-[#0067FF]`}
                >
                  Settings
                </button>

                <button
                  onClick={handleDownload}
                  className={`${tab === "reports" && "bg-[#0067FF] text-white font-normal"
                    } py-2 px-5 rounded-md font-semibold text-headingColor text-[16px] leading-7  border border-solid border-[#0067FF]`}
                >
                  Get my Smart Report
                </button>
              </div>

              <div className="mt-[50px]">
                {tab === "bookings" && (
                  <div>
                    <h2 className="heading text-[30px]">My bookings</h2>
                    <MyBookings />

                    <h2 className="heading text-[30px]">My lab bookings</h2>
                    <MyLabBookings />
                  </div>

                )}
                {tab === "settings" && (
                  <div>
                    <h2 className="heading text-[30px]">Profile Settings</h2>
                    <Profile userData={userData} />
                  </div>
                )}


              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
