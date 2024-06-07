import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Blood_suggestion from './Blood_suggestion';
import coverImage from '../../../../src/Dashboard/Lab-Account/TestForm/cover_image1.png';
import { useLocation } from 'react-router-dom';

const BloodTest = () => {
  const [formData, setFormData] = useState({
    hemoglobin: '',
    wbcCount: '',
    plateletCount: '',
    cholesterol: '',
    glucose: '',
    creatinine: '',
    vitaminD: '',
    calcium: '',
    tsh: '',
  });

  const location = useLocation();
  const appointments = location.state?.appointment;

  const normalRanges = {
    hemoglobin: { min: 13.8, max: 17.2 },
    wbcCount: { min: 4500, max: 11000 },
    plateletCount: { min: 150000, max: 450000 },
    cholesterol: { max: 200 },
    glucose: { min: 70, max: 99 },
    creatinine: { min: 0.74, max: 1.35 },
    vitaminD: { min: 20, max: 50 },
    calcium: { min: 8.5, max: 10.2 },
    tsh: { min: 0.4, max: 4.0 },
  };

  const isInNormalRange = (name, value) => {
    const range = normalRanges[name];
    if (!range) return true;
    if (range.min !== undefined && value < range.min) return false;
    if (range.max !== undefined && value > range.max) return false;
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();
  };

  const uploadreport = async (item) => {
    try {
      const pdfBlob = await generatePDF();
      const formData = new FormData();
      formData.append('file', pdfBlob, 'blood_test_report.pdf');
      formData.append('userId', item.user._id);

      // http://localhost:4000/api/upload-report
      const response = await fetch('https://elite-pathlabs-backend.onrender.com/api/upload-report', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Report uploaded successfully');
        // Handle the successful upload, e.g., update UI or state
      } else {
        alert('Failed to upload report');
      }
    } catch (error) {
      console.error('Error uploading report:', error);
      alert('An error occurred while uploading the report');
    }
  };



  const generatePDF = async () => {
    const input = document.getElementById('report');
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = imgProps.width;
    const imgHeight = imgProps.height;

    const ratio = imgWidth / pdfWidth;
    const scaledHeight = imgHeight / ratio;

    let heightLeft = scaledHeight;
    let position = 0;

    // Add cover image to the first page
    pdf.addImage(coverImage, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.addPage();

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfWidth * imgHeight / imgWidth);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfWidth * imgHeight / imgWidth);
      heightLeft -= pdfHeight;
    }

    return pdf.output('blob');
  };

  useEffect(() => {
    // Preload the image to ensure it's available when generating the PDF
    const img = new Image();
    img.src = appointments?.user.photo;
    img.crossOrigin = "anonymous";
  }, [appointments]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-headingColor font-bold text-2xl leading-9 mb-10 text-center">
        Blood Test Details
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(formData).map((key) => (
            <div className="mb-5" key={key}>
              <p className="form__label capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                placeholder={`Normal Range: ${normalRanges[key]?.min ?? ''} - ${normalRanges[key]?.max ?? ''}`}
                className={`form__input ${isInNormalRange(key, parseFloat(formData[key])) ? 'bg-green-200' : 'bg-red-200'}`}
              />
            </div>
          ))}
          <div className="col-span-1 md:col-span-2 text-center">
            {/* <button
              type="submit"
              className="py-3 px-10 bg-blue-600 text-white rounded-lg text-lg"
            >
              Generate Pdf
            </button> */}

            <button
              type="button"
              onClick={() => uploadreport(appointments)}
              className="py-3 px-10 bg-blue-600 text-white rounded-lg text-lg"
            >
              Upload Pdf
            </button>
          </div>
        </div>
      </form>

      <div id="report" className="mt-16 mb-10 p-6 border border-gray-300 rounded-lg flex flex-wrap gap-4">
        <div className='flex justify-between w-full'>
          <div className='flex flex-col ml-20 m-4'>
            <h2 className='text-lg mb-4 font-medium'>Patient Name: <span className='text-md font-bold'>{appointments.user.name}</span></h2>
            <h2 className='text-lg mb-4 font-medium'>Sex: <span className='text-md font-bold'>{appointments.user.gender}</span></h2>
            <h2 className='text-lg mb-4 font-medium'>Blood Group: <span className='text-md font-bold'>{appointments.user.bloodType}</span></h2>
          </div>

          <div className='mr-20 m-4'>
            <img src={appointments.user.photo} alt="User Photo" className="w-32 h-32 object-cover rounded-full mx-auto" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-16 w-full text-center m-4">Your Important Parameters at a Glance</h2>
        {Object.keys(formData).map((key) => {
          const value = parseFloat(formData[key]);
          const normalRange = normalRanges[key];
          const isValid = isInNormalRange(key, value);
          const displayName = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
          const color = isValid ? 'bg-green-400' : 'bg-red-400';

          return (
            <div className='w-72 h-52 mx-auto' key={key}>
              <div className={`${color} rounded-lg w-72 h-2.5 `} ></div>
              <div className='rounded-lg shadow-md w-72 p-4 pl-9  h-40 border-2'>
                <h3 className="font-bold text-3xl mb-1 text-violet-500">{displayName}</h3>
                <p className='text-gray-400 text-lg'>Value: <span className='text-blue-600 text-lg'>{value}</span></p>
                <p className='text-gray-400 text-lg'>Range: <span className='text-blue-600 text-lg'>{normalRange?.min ?? ''} - {normalRange?.max ?? ''}</span></p>
                <p className='text-gray-400 text-lg'>Status: <span className='text-blue-600 text-lg'>{isValid ? 'Normal' : 'Out of Range'}</span></p>
              </div>
            </div>
          );
        })}
        <Blood_suggestion currentValues={formData} gender="Men" />
      </div>
    </div>
  );
};

export default BloodTest;
