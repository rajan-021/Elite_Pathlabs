/* eslint-disable react/prop-types */
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from 'react-router-dom';

const Appointments = ({ appointments, loading }) => {

  const navigate = useNavigate();

  const handleNavigation = (appointment) => {
    navigate('/reportform', { state: { appointment } });
  };

  return (
    <>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              Payment
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Booked on
            </th>
            <th scope="col" className="px-6 py-3">
              Booking Time
            </th>
            <th scope="col" className="px-6 py-3">
              Test Name
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((item) => (
            <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={item.user.photo}
                  alt="User image"
                />
                <p className="text-base font-semibold ml-2">
                  {item.user.name}
                </p>
              </th>
              <td className="px-6 py-4">{item.user.gender}</td>
              <td className="px-6 py-4">
                {item.isPaid ? (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                    Paid
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                    Unpaid
                  </div>
                )}
              </td>
              <td className="px-6 py-4">{item.ticketPrice}</td>
              <td className="px-6 py-4">{formatDate(item.createdAt)}</td>
              <td className="px-6 py-4">
                <b>{item.bookingTime?.day}</b> {item.bookingTime.time}
              </td>
              <td className="px-6 py-4">
                {item.test.map((testName, index) => (
                  <div key={index}>{testName}</div>
                ))}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleNavigation(item)}
                  className="bg-cyan-400 text-white p-3 rounded-md px-5"
                >
                  Upload Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {appointments.length === 0 && (
        <p className="text-center mt-4 text-red-500">No Lab Appointment Booked</p>
      )}
    </>
  );
};

export default Appointments;
