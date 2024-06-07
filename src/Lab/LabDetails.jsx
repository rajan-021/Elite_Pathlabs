import { Fragment, useEffect, useState, useContext } from "react";
// import doctorImg from "../../assets/images/doctor-img02.png";
import starIcon from "../assets/images/Star.png";
import Feedback from "../pages/Doctors/Feedback";
import LabSidePanel from "../Lab/LabSidePanel";
import { BASE_URL } from "../config";
import useFetchData from "../hooks/useFetchData";
import { useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import moment from "moment";

const LabDetails = () => {
  const [tab, setTab] = useState("about");
  const [slots, setSlot] = useState();
  const [bookedTime, setBookedTime] = useState();
  const [selected, setSelected] = useState({});
  const { id } = useParams();


  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [paisa, setPaisa] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked, value } = event.target;
    if (checked) {
      setSelectedCheckboxes([...selectedCheckboxes, name]);
      setPaisa([...paisa, value]);

    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter(item => item !== name));
      setPaisa(paisa.filter(item => item !== value));

    }

  };

  const {
    data: appointmentSlots,
    loading: loadingData,
    error: loadingError,
  } = useFetchData(`${BASE_URL}/labappointments/${id}`);

  const selectedTimeSlots = {};
  appointmentSlots?.selectedSlots?.forEach((entry) => {
    selectedTimeSlots[entry.day] = entry.slots;
  });

  const { data: lab, loading, error } = useFetchData(`${BASE_URL}/labs/${id}`);

  const {
    name,
    timeSlots,
    reviews,
    bio,
    about,
    averageRating,
    totalRating,
    location,
    ticketPrice,
    photo,
  } = lab;

  function intervals(startString = "12:20", endString = "17:00") {
    var start = moment(startString, "hh:mm a");
    var end = moment(endString, "hh:mm a");

    start.minutes(Math.ceil(start.minutes() / 30) * 30);

    var result = [];

    var current = moment(start);

    while (current <= end) {
      result.push(current.format("HH:mm"));
      current.add(30, "minutes");
    }

    return result;
  }

  const formatTime = (time) => {
    let update = time.slice(0, 2);
    update = parseInt(update);
    if (update >= 12 && update <= 24) {
      update = update % 12;
      update = update === 0 ? 12 : update;
      let formatedTime = update + time.slice(2);
      return formatedTime + " P.M";
    }
    return time + " A.M";
  };

  const handlePickedTimeSlot = (pickedTime, groupIndex, dataIndex, day) => {
    const newSelectedIndexes = { ...selected };

    // Check if a time slot is already selected for the same day
    if (newSelectedIndexes[groupIndex] === dataIndex) {
      // If the same time slot is clicked again, deselect it
      delete newSelectedIndexes[groupIndex];
      setBookedTime({});
    } else {
      // Deselect all other days and select the clicked time slot for this day
      Object.keys(newSelectedIndexes).forEach((key) => {
        delete newSelectedIndexes[key];
      });
      newSelectedIndexes[groupIndex] = dataIndex;
      setBookedTime({
        day: day,
        time: formatTime(pickedTime),
      });
    }

    // Update the state with the new selectedIndexes
    setSelected(newSelectedIndexes);
  };

  useEffect(() => {
    let res = timeSlots?.map((obj) =>
      intervals(obj.startingTime, obj.endingTime)
    );
    setSlot(res);
  }, [timeSlots]);

  return (
    <section>
      <div className="max-w-[1170px] px-[20px] mx-auto">
        {loading && (
          <div className="flex items-center justify-center w-full h-full">
            <HashLoader color="#0067FF" />
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center w-full h-full">
            <h3 className="text-headingColor text-[20px] font-semibold leading-[30px]">
              {error}
            </h3>
          </div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex gap-5 items-center">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img src={photo} alt="" className="w-full" />
                </figure>
                <div>
                  <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-[600]">
                    {location}
                  </span>
                  <h3 className="text-headingColor text-[22px] leading-[36px] mt-3 font-bold">
                    {name}
                  </h3>
                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[600] text-headingColor">
                      <img src={starIcon} alt="" /> {averageRating}
                    </span>
                    <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                      ({totalRating})
                    </span>
                  </div>
                  <p className="text__para text-[14px] md:text-[15px] leading-6 lg:max-w-[390px]">
                    {bio}
                  </p>
                </div>
              </div>

              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <div>
                  <button
                    onClick={() => setTab("about")}
                    className={`${tab === "about" &&
                      "border-b border-solid border-[#0067FF]"
                      }  p-2 mr-5 px-5  text-headingColor font-semibold text-[16px] leading-7  `}
                  >
                    About
                  </button>
                  <button
                    onClick={() => setTab("feedback")}
                    className={`${tab === "feedback" &&
                      "border-b border-solid border-[#0067FF]"
                      } py-2 px-5  font-semibold text-headingColor text-[16px] leading-7 `}
                  >
                    Feedback
                  </button>
                </div>
              </div>

              <div className="mt-[50px]">
                {tab === "about" && (
                  <div>
                    <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex gap-2 items-center">
                      About of
                      <span className="text-irisBlueColor font-bold text-[24px] leading-9">
                        {name}
                      </span>
                    </h3>
                    <p className="text__para">{about}</p>
                  </div>
                )}
                {tab === "feedback" && (
                  <div>
                    <Feedback reviews={reviews} totalRating={totalRating} />
                  </div>
                )}
              </div>
            </div>
            <div>
              <LabSidePanel
                doctorId={lab._id}
                ticketPrice={ticketPrice}
                timeSlots={timeSlots}
                bookedTime={bookedTime}
                paisa={paisa}
                test={selectedCheckboxes}
              />
            </div>
          </div>
        )}

        <div className=" grid grid-cols-2">
          <div>
            <h1 className=" mt-10 mb-3 font-bold">Select Time Slots:</h1>
            <p>
              {slots &&
                slots.map((obj, index) => {
                  return (
                    <div key={index}>
                      <p> {timeSlots[index].day} </p> <br></br>
                      <div className="flex gap-4 flex-wrap ">
                        {obj.map((data, i) => (
                          <button
                            key={i}
                            onClick={() =>
                              handlePickedTimeSlot(
                                data,
                                index,
                                i,
                                timeSlots[index].day
                              )
                            }
                            className={
                              selected[index] === i
                                ? "w-[100px] h-auto rounded bg-sky-600 border-solid border-2 border-black-500 p-3 cursor-pointer text-center text-white"
                                : selectedTimeSlots[timeSlots[index].day]?.includes(
                                  formatTime(data)
                                )
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed py-2 px-4 rounded-md"
                                  : "w-[100px] h-auto rounded bg-white border-solid border-2 border-sky-500 p-3 cursor-pointer text-center"
                            }
                            disabled={selectedTimeSlots[
                              timeSlots[index].day
                            ]?.includes(formatTime(data))}
                          >
                            {" "}
                            {formatTime(data)}{" "}
                          </button>
                        ))}
                      </div>
                      <br></br>
                    </div>
                  );
                })}
            </p>
          </div>

          <div className="mt-10 mb-3">
            <h1 className="font-bold">Select Test Packages:</h1>
            <div>
              <input type="checkbox" id="Blood_Test" name="Blood Test" value="100" onChange={handleCheckboxChange} />
              <label htmlFor="Blood_Test"> Blood test</label>
            </div>
            <div>
              <input type="checkbox" id="Full_body_Checkup" name="Full Body Checkup" value="200" onChange={handleCheckboxChange} />
              <label htmlFor="Full_body_Checkup"> Full Body Checkup</label>
            </div>
            <div>
              <input type="checkbox" id="Kidney_Test" name="Kidney Test" value="300" onChange={handleCheckboxChange} />
              <label htmlFor="Kidney_Test"> Kidney Test</label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabDetails;
