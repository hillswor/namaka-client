"use client";

import { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { AquariumContext } from "../../../../AppContext";

export default function ParametersForm({ toggleParameterForm }) {
  const { aquarium, setAquarium } = useContext(AquariumContext);

  const buttonStyling =
    "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all duration-200";

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

  return (
    <section
      className={
        "flex flex-col items-center justify-center border-4 border-blue-500 bg-gray-800 text-white rounded-lg max-w-xl mx-auto p-8 mt-10 sm:mt-16"
      }
    >
      <button onClick={toggleParameterForm} className={buttonStyling}>
        Back
      </button>
      <form onSubmit={handleSubmit} className={"w-full"}>
        <label htmlFor="salinity" className={"block text-white text-lg mb-2"}>
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
          className={
            "number-input border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 w-full"
          }
        />
        {touched.salinity && errors.salinity ? (
          <p className={"text-red-500 mb-2 rounded text-xs"}>
            {errors.salinity}
          </p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="ph" className={"block text-white text-lg mb-2"}>
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
          className={
            "number-input border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 w-full"
          }
        />
        {touched.ph && errors.ph ? (
          <p className={"text-red-500 mb-2 rounded text-xs"}>{errors.ph}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="ammonia" className={"block text-white text-lg mb-2"}>
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
          className={
            "number-input border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 w-full"
          }
        />
        {touched.ammonia && errors.ammonia ? (
          <p className={"text-red-500 mb-2 rounded text-xs"}>
            {errors.ammonia}
          </p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="nitrate" className={"block text-white text-lg mb-2"}>
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
          className={
            "number-input border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 w-full"
          }
        />
        {touched.nitrate && errors.nitrate ? (
          <p className={"text-red-500 mb-2 rounded text-xs"}>
            {errors.nitrate}
          </p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="phosphate" className={"block text-white text-lg mb-2"}>
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
          className={
            "number-input border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 w-full"
          }
        />
        {touched.phosphate && errors.phosphate ? (
          <p className={"text-red-500 mb-2 rounded text-xs"}>
            {errors.phosphate}
          </p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="calcium" className={"block text-white text-lg mb-2"}>
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
          className={
            "number-input border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 w-full"
          }
        />
        {touched.calcium && errors.calcium ? (
          <p className={"text-red-500 mb-2 rounded text-xs"}>
            {errors.calcium}
          </p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="magnesium" className={"block text-white text-lg mb-2"}>
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
          className={
            "number-input border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 w-full"
          }
        />
        {touched.magnesium && errors.magnesium ? (
          <p className={"text-red-500 mb-2 rounded text-xs"}>
            {errors.magnesium}
          </p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="alkalinity" className={"block text-white text-lg mb-2"}>
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
          className={
            "number-input border-2 border-blue-500 bg-gray-700 text-white rounded-lg px-4 py-2 mb-2 w-full"
          }
        />
        {touched.alkalinity && errors.alkalinity ? (
          <p className={"text-red-500 mb-2 rounded text-xs"}>
            {errors.alkalinity}
          </p>
        ) : (
          <div className="h-6"></div>
        )}
        <div className="flex justify-center">
          <button
            type="submit"
            className={
              "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all duration-200 mt-4"
            }
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
