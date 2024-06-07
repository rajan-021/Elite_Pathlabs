import React from 'react';

const BloodTestParameters = [
  {
    "Name": "Hemoglobin (Hb)",
    "id":"hemoglobin",
    "About": "A protein in red blood cells that carries oxygen throughout the body.",
    "NormalRange": {
      "Men": "13.8–17.2 g/dL",
      "Women": "12.1–15.1 g/dL"
    },
    "CausesEffects": {
      "HighHemoglobin": "Dehydration, lung disease, polycythemia vera.",
      "LowHemoglobin": "Anemia, blood loss, nutritional deficiencies."
    },
    "Recommendations": {
      "Foods": {
        "Dos": "Consume iron-rich foods like red meat, beans, and spinach; vitamin C-rich foods to enhance iron absorption.",
        "Donts": "Avoid excessive caffeine and calcium during iron-rich meals as they can inhibit absorption."
      },
      "Exercises": {
        "Dos": "Moderate aerobic exercises like walking, jogging, and cycling; strength training to improve oxygen utilization.",
        "Donts": "Avoid extreme endurance exercises that could exacerbate anemia."
      },
      "CausesEffects": {
        "High": "Dehydration, lung disease, polycythemia vera.",
        "Low": "Anemia, blood loss, nutritional deficiencies."
      }
    }
  },
  {
    "Name": "White Blood Cell (WBC) Count",
    "id":"wbcCount",
    "About": "Cells that are part of the immune system and help fight infections.",
    "NormalRange": "4500–11000 cells/mcL",

    "Recommendations": {
      "Foods": {
        "Dos": "Eat vitamin C-rich foods like oranges and strawberries; zinc-rich foods like beef and shellfish.",
        "Donts": "Avoid excessive alcohol and sugary foods that can suppress immune function."
      },
      "Exercises": {
        "Dos": "Regular moderate exercise like brisk walking, swimming, and yoga.",
        "Donts": "Avoid overtraining and extremely strenuous activities that can suppress the immune system."
      },
      "CausesEffects": {
        "High": "Infection, inflammation, stress, leukemias.",
        "Low": "Increased risk of infections, bone marrow problems, autoimmune diseases."
      }
    }
  },
  {
    "Name": "Platelet Count",
    "id":"plateletCount",
    "About": "Cells that help with blood clotting and wound healing.",
    "NormalRange": "150000–450000 platelets/mcL",

    "Recommendations": {
      "Foods": {
        "Dos": "Eat vitamin K-rich foods like leafy greens; omega-3 fatty acids from fish and flaxseeds.",
        "Donts": "Avoid excessive alcohol and processed foods."
      },
      "Exercises": {
        "Dos": "Low-impact exercises like walking and swimming; gentle stretching and yoga.",
        "Donts": "Avoid contact sports and high-impact activities that can cause injury."
      },
      "CausesEffects": {
        "High": "Risk of blood clots, thrombocytosis, cardiovascular events.",
        "Low": "Increased risk of bleeding, bruising, petechiae."
      }
    }
  },
  {
    "Name": "Total Cholesterol",
    "id":"cholesterol",
    "About": "A measure of the total amount of cholesterol in your blood, including LDL and HDL.",
    "NormalRange": "1–200 mg/dL",

    "Recommendations": {
      "Foods": {
        "Dos": "Eat foods high in soluble fiber like oats and beans; healthy fats like avocados and nuts.",
        "Donts": "Avoid trans fats and excessive saturated fats found in fried and processed foods."
      },
      "Exercises": {
        "Dos": "Cardiovascular exercises like running, cycling, and swimming; resistance training.",
        "Donts": "Avoid a sedentary lifestyle."
      },
      "CausesEffects": {
        "High": "Increased risk of heart disease, stroke, and atherosclerosis.",
        "Low": "Rare, but can be related to malnutrition or liver disease."
      }
    }
  },
  {
    "Name": "Fasting Blood Glucose",
    "id":"glucose",

    "About": "A measure of the glucose levels in your blood after fasting for at least 8 hours.",
    "NormalRange": "70–99 mg/dL",
    "CausesEffects": {
      "HighBloodGlucose": "Diabetes, increased risk of cardiovascular disease, nerve damage.",
      "LowBloodGlucose": "Hypoglycemia, causing dizziness, confusion, fainting."
    },
    "Recommendations": {
      "Foods": {
        "Dos": "Eat low glycemic index foods like whole grains and non-starchy vegetables; lean proteins.",
        "Donts": "Avoid sugary snacks, refined carbs, and excessive alcohol."
      },
      "Exercises": {
        "Dos": "Aerobic exercises like brisk walking, jogging, and dancing; strength training.",
        "Donts": "Avoid prolonged periods of inactivity."
      },
      "CausesEffects": {
        "High": "Diabetes, increased risk of cardiovascular disease, nerve damage.",
        "Low": "Hypoglycemia, causing dizziness, confusion, fainting."
      }
    }
  },
  {
    "Name": "Creatinine",
    "id":"creatinine",

    "About": "A waste product from muscle metabolism that is filtered by the kidneys.",
    "NormalRange": {
      "Men": "0.74–1.35 mg/dL",
      "Women": "0.59–1.04 mg/dL"
    },

    "Recommendations": {
      "Foods": {
        "Dos": "Stay hydrated with plenty of water; reduce protein intake if levels are high (consult a doctor).",
        "Donts": "Avoid excessive protein and salt intake."
      },
      "Exercises": {
        "Dos": "Moderate aerobic exercises like walking and cycling.",
        "Donts": "Avoid excessive high-intensity exercises if creatinine is high."
      },
      "CausesEffects": {
        "High": "Kidney dysfunction, dehydration, muscle breakdown.",
        "Low": "Low muscle mass, certain muscle diseases."
      }
    }
  },
  {
    "Name": "Vitamin D",
    "id":"vitaminD",

    "About": "A vitamin that helps with calcium absorption and bone health.",
    "NormalRange": "20–50 ng/mL",

    "Recommendations": {
      "Foods": {
        "Dos": "Eat fatty fish like salmon; fortified foods like milk and cereals.",
        "Donts": "Avoid excessive intake of vitamin D supplements without medical advice."
      },
      "Exercises": {
        "Dos": "Outdoor activities like walking or running to get sunlight exposure; weight-bearing exercises.",
        "Donts": "Avoid excessive sun exposure without protection."
      },
      "CausesEffects": {
        "High": "Hypercalcemia, causing nausea, weakness, kidney problems.",
        "Low": "Bone pain, muscle weakness, increased risk of fractures."
      }
    }
  },
  {
    "Name": "Calcium",
    "id":"calcium",

    "About": "A mineral essential for bone health, muscle function, and nerve signaling.",
    "NormalRange": "8.5–10.2 mg/dL",

    "Recommendations": {
      "Foods": {
        "Dos": "Eat dairy products like milk, cheese, yogurt; leafy greens and fortified plant-based milk.",
        "Donts": "Avoid excessive caffeine and high-sodium foods."
      },
      "Exercises": {
        "Dos": "Weight-bearing exercises like walking, jogging, dancing; strength training.",
        "Donts": "Avoid high-impact activities that may cause fractures if bones are weak."
      },
      "CausesEffects": {
        "High": "Hypercalcemia, leading to kidney stones, bone pain, abdominal pain.",
        "Low": "Osteoporosis, muscle cramps, numbness."
      }
    }
  },
  {
    "Name": "Thyroid-Stimulating Hormone (TSH)",
    "id":"tsh",

    "About": "A hormone that stimulates the thyroid gland to produce thyroid hormones.",
    "NormalRange": "0.4–4.0 mIU/L",

    "Recommendations": {
      "Foods": {
        "Dos": "Consume iodine-rich foods like fish and dairy; selenium-rich foods like Brazil nuts.",
        "Donts": "Avoid excessive soy products and goitrogenic foods like raw cruciferous vegetables if you have thyroid issues."
      },
      "Exercises": {
        "Dos": "Regular moderate exercise like walking and swimming; yoga.",
        "Donts": "Avoid extreme physical stress and high-intensity workouts if thyroid function is imbalanced."
      },
      "CausesEffects": {
        "High": "Hypothyroidism, causing fatigue, weight gain, depression.",
        "Low": "Hyperthyroidism, leading to weight loss, rapid heart rate, anxiety."
      }
    }
  }
];



const Blood_suggestion = ({ currentValues, gender }) => {

  // Function to check if value is within normal range
  const isValueInRange = (value, range) => {
    const [min, max] = range.split('–').map(parseFloat);
    return value >= min && value <= max;
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-headingColor font-bold text-2xl leading-9 m-10 text-center mb-16">
        Your Important Parameters That Need To Attention
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BloodTestParameters.map((param, index) => {
          const normalRange = typeof param.NormalRange === 'string'
            ? param.NormalRange
            : gender === 'Men'
              ? param.NormalRange.Men
              : param.NormalRange.Women;

          const currentValue = currentValues[param.id];
          const isValid = isValueInRange(currentValue, normalRange);

          return (
            <div key={index} className={`border p-4 rounded-lg shadow-md mb-6 ${isValid ? 'bg-green-100 hidden' : 'bg-red-100'}`}>
            <br></br>
              <h3 className="font-bold mb-2 text-lg">{param.Name}</h3>
              <p className="mb-2"><strong>About:</strong> {param.About}</p>
              <p className="mb-2"><strong>Normal Range:</strong> {normalRange}</p>
              <p className="mb-2"><strong>Current Value:</strong> {currentValue}</p>
              <p className="mb-2"><strong>Status:</strong> {isValid ? 'Normal' : 'Out of Range'}</p>

              <p className="mb-2"><strong>Recommendations:</strong></p>
              <ul className="list-disc list-inside mb-2">
              <li><strong>Causes/Effects(High):</strong> {param.Recommendations.CausesEffects.High}</li>
              <li><strong>Causes/Effects(Low):</strong> {param.Recommendations.CausesEffects.Low}</li>


                <li><strong>Foods (Do's):</strong> {param.Recommendations.Foods.Dos}</li>
                <li><strong>Foods (Don'ts):</strong> {param.Recommendations.Foods.Donts}</li>
                <li><strong>Exercises (Do's):</strong> {param.Recommendations.Exercises.Dos}</li>
                <li><strong>Exercises (Don'ts):</strong> {param.Recommendations.Exercises.Donts}</li>
              </ul>
              <br></br>
              <br></br>
              <br></br>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blood_suggestion;

