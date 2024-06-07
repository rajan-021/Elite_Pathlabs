import React, { useState } from 'react';
import data from './FormData/full_body_checkup.json';

const FullBodyCheckupForm = () => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (event, testName) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [testName]: {
        ...formValues[testName],
        [name]: value,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Submitted:', formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      {data.fullBodyCheckupParameters.map((test, index) => (
        <div key={index} className="">
          <h2>{test.name}</h2>
          <p>{test.about}</p>
          <div className="">
            <h3>Normal Ranges</h3>
            {Object.entries(test.normalRanges).map(([key, value]) => (
              <div key={key} className="">
                <label>{key} ({value})</label>
                <input
                  type="text"
                  name={key}
                  value={(formValues[test.name] && formValues[test.name][key]) || ''}
                  onChange={(e) => handleChange(e, test.name)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FullBodyCheckupForm;
