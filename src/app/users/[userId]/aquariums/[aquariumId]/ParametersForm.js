"use client";

import { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { AquariumContext } from "../../../../AppContext";

export default function ParametersForm({ toggleParameterForm }) {
  const { aquarium, setAquarium } = useContext(AquariumContext);

  const parametersSchema = yup.object().shape({
    salinity: yup
      .number()
      .required("Required")
      .positive()
      .min(1.01, "Must Be At Least 1.010 d SG")
      .max(1.04, "Must Be No More Than 1.040 d SG"),
    ph: yup
      .number()
      .required("Required")
      .positive()
      .min(0, "Must Be At Least 0")
      .max(14, "Must Be No More Than 14"),
    ammonia: yup
      .number()
      .required("Required")
      .positive()
      .min(0, "Must Be At Least 0 ppm")
      .max(8, "Must Be No More Than 8 ppm"),
    nitrate: yup
      .number()
      .required("Required")
      .positive()
      .min(0, "Must Be At Least 0 ppm")
      .max(5, "Must Be No More Than 5 ppm"),
    phosphate: yup
      .number()
      .required("Required")
      .positive()
      .min(0, "Must Be At Least 0 ppm")
      .max(0.06, "Must Be No More Than 0.06 ppm"),
    calcium: yup
      .number()
      .required("Required")
      .positive()
      .min(0, "Must Be At Least 0 ppm")
      .max(900, "Must Be No More Than 900 ppm"),
    magnesium: yup
      .number()
      .required("Required")
      .positive()
      .min(0, "Must Be At Least 0 ppm")
      .max(2000, "Must Be No More Than 2000 ppm"),
    alkalinity: yup
      .number()
      .required("Required")
      .positive()
      .min(0, "Must Be At Least 0 dKH")
      .max(20, "Must Be No More Than 20 dKH"),
  });

  const {
    values,
    handleBlur,
    handleChange,
    touched,
    resetForm,
    errors,
    handleSubmit,
  } = useFormik({
    initialValues: {
      salinity: "",
      ph: "",
      ammonia: "",
      nitrate: "",
      phosphate: "",
      calcium: "",
      magnesium: "",
      alkalinity: "",
    },
    validationSchema: parametersSchema,
    onSubmit: (values) => {
      values.aquarium_id = aquarium.id;
      fetch("/api/water-parameters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          setAquarium((prevAquarium) => {
            const updatedParameters = [...prevAquarium.water_parameters, data];
            return { ...prevAquarium, water_parameters: updatedParameters };
          });
          resetForm();
          toggleParameterForm();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      resetForm();
      toggleShowForm();
    },
  });

  const containerStyles =
    "flex flex-col bg-slate-600 rounded-md max-w-xl mx-6 p-8 mt-16 mb-16 shadow-2xl sm:mx-auto md:mx-auto";
  const labelStyles = "text-white text-lg mb-2";
  const inputStyles =
    "bg-white text-slate-600 rounded-lg px-4 py-2 mb-2 w-full";
  const errorStyles = "text-red-400 mb-2 rounded text-xs";
  const buttonStyles =
    "bg-red-500 hover:bg-red-600 transition duration-200 ease-in-out text-white font-bold py-2 px-4 rounded";

  return (
    <section className={containerStyles}>
      <div className="text-center">
        <button onClick={toggleParameterForm} className={buttonStyles}>
          Back
        </button>
      </div>
      <form onSubmit={handleSubmit} className={"w-full"}>
        <label htmlFor="salinity" className={labelStyles}>
          Salinity (d SG)
        </label>
        <input
          id="salinity"
          name="salinity"
          type="number"
          value={values.salinity}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Safe Range 1.025 - 1.027"
          className={inputStyles}
        />
        {touched.salinity && errors.salinity ? (
          <p className={errorStyles}>{errors.salinity}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="ph" className={labelStyles}>
          pH
        </label>
        <input
          id="ph"
          name="ph"
          type="number"
          value={values.ph}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Safe Range 7.8 - 8.5"
          className={inputStyles}
        />
        {touched.ph && errors.ph ? (
          <p className={errorStyles}>{errors.ph}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="ammonia" className={labelStyles}>
          Ammonia (ppm)
        </label>
        <input
          id="ammonia"
          name="ammonia"
          type="number"
          value={values.ammonia}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Safe Range 0 - 0.1 ppm"
          className={inputStyles}
        />
        {touched.ammonia && errors.ammonia ? (
          <p className={errorStyles}>{errors.ammonia}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="nitrate" className={labelStyles}>
          Nitrate (ppm)
        </label>
        <input
          id="nitrate"
          name="nitrate"
          type="number"
          value={values.nitrate}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Safe Range 0 - 5 ppm"
          className={inputStyles}
        />
        {touched.nitrate && errors.nitrate ? (
          <p className={errorStyles}>{errors.nitrate}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="phosphate" className={labelStyles}>
          Phosphate (ppm)
        </label>
        <input
          id="phosphate"
          name="phosphate"
          type="number"
          value={values.phosphate}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Safe Range 0 - 0.03 ppm"
          className={inputStyles}
        />
        {touched.phosphate && errors.phosphate ? (
          <p className={errorStyles}>{errors.phosphate}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="calcium" className={labelStyles}>
          Calcium (ppm)
        </label>
        <input
          id="calcium"
          name="calcium"
          type="number"
          value={values.calcium}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Safe Range 375 - 450 ppm"
          className={inputStyles}
        />
        {touched.calcium && errors.calcium ? (
          <p className={errorStyles}>{errors.calcium}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="magnesium" className={labelStyles}>
          Magnesium (ppm)
        </label>
        <input
          id="magnesium"
          name="magnesium"
          type="number"
          value={values.magnesium}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Safe Range 1250 - 1350 ppm"
          className={inputStyles}
        />
        {touched.magnesium && errors.magnesium ? (
          <p className={errorStyles}>{errors.magnesium}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="alkalinity" className={labelStyles}>
          Alkalinity (dKH)
        </label>
        <input
          id="alkalinity"
          name="alkalinity"
          type="number"
          value={values.alkalinity}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Safe Range 7 - 11 dKH"
          className={inputStyles}
        />
        {touched.alkalinity && errors.alkalinity ? (
          <p className={errorStyles}>{errors.alkalinity}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <div className="flex justify-center">
          <button type="submit" className={buttonStyles}>
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
