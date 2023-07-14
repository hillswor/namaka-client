"use client";

import React from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

import { UserContext } from "../AppContext";

export default function SignupForm() {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const stateCodes = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    city: Yup.string()
      .required("Required")
      .min(2, "Must be at least 2 characters")
      .max(50, "Must be 50 characters or less"),
    state: Yup.string()
      .required("Required")
      .length(2, "State code must be 2 characters")
      .transform((value) => value.toUpperCase())
      .oneOf(stateCodes, "Invalid state code"),
  });

  const {
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      city: "",
      state: "",
    },
    validationSchema: SignupSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      fetch("https://namaka-server.onrender.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUser(data);
          router.push(`/users/${data.id}`);
        });
      resetForm();
    },
  });

  const labelStyles = "text-white text-lg mb-2";
  const inputStyles =
    "bg-white text-slate-600 rounded-lg px-4 py-2 mb-2 w-full";
  const errorStyles = "text-red-400 mb-2 rounded text-xs";
  const buttonStyles =
    "bg-red-500 hover:bg-red-600 transition duration-200 ease-in-out text-white font-bold py-2 px-4 rounded";

  return (
    <section>
      <form handleSubmit={handleSubmit}>
        <label htmlFor="firstName" className={labelStyles}>
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="First Name"
          className={inputStyles}
        />
        {touched.firstName && errors.firstName ? (
          <p className={errorStyles}>{errors.firstName}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="lastName" className={labelStyles}>
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Last Name"
          className={inputStyles}
        />
        {touched.lastName && errors.lastName ? (
          <p className={errorStyles}>{errors.lastName}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="email" className={labelStyles}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email"
          className={inputStyles}
        />
        {touched.email && errors.email ? (
          <p className={errorStyles}>{errors.email}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="password" className={labelStyles}>
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Password"
          className={inputStyles}
        />
        {touched.password && errors.password ? (
          <p className={errorStyles}>{errors.password}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="confirmPassword" className={labelStyles}>
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Confirm Password"
          className={inputStyles}
        />
        {touched.confirmPassword && errors.confirmPassword ? (
          <p className={errorStyles}>{errors.confirmPassword}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="city" className={labelStyles}>
          City
        </label>
        <input
          type="text"
          name="city"
          id="city"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="City"
          className={inputStyles}
        />
        {touched.city && errors.city ? (
          <p className={errorStyles}>{errors.city}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="state" className={labelStyles}>
          State
        </label>
        <input
          type="text"
          name="state"
          id="state"
          value={values.state}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="State"
          className={inputStyles}
        />
        {touched.state && errors.state ? (
          <p className={errorStyles}>{errors.state}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <div className={"flex flex-col items-center"}>
          <button type="submit" onClick={handleSubmit} className={buttonStyles}>
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
