import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { UserContext, AquariumContext } from "../../AppContext";

export default function EditAquariumForm({ toggleEditForm, aquarium }) {
  const { user, setUser } = useContext(UserContext);

  const AquariumSchema = Yup.object().shape({
    brand: Yup.string().required("Required"),
    model: Yup.string().required("Required"),
    volume: Yup.number().required("Required"),
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
      brand: aquarium.brand,
      model: aquarium.model,
      volume: aquarium.volume.toString(),
    },
    validationSchema: AquariumSchema,
    onSubmit: (values) => {
      fetch(`https://namaka-server.onrender.com/aquariums/${aquarium.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedUser = {
            ...user,
            aquariums: user.aquariums.map((aquarium) =>
              aquarium.id === data.id ? data : aquarium
            ),
          };
          setUser(updatedUser);
          toggleEditForm(data);
        });
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
        <button onClick={() => toggleEditForm()} className={buttonStyles}>
          Back
        </button>
      </div>
      <form onSubmit={handleSubmit} className={"w-full"}>
        <label htmlFor="brand" className={labelStyles}>
          Brand
        </label>
        <input
          id="brand"
          name="brand"
          type="String"
          value={values.brand}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={`${aquarium.brand}`}
          className={inputStyles}
        />
        {touched.brand && errors.brand ? (
          <p className={errorStyles}>{errors.brand}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="model" className={labelStyles}>
          Model
        </label>
        <input
          id="model"
          name="model"
          type="String"
          value={values.model}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={`${aquarium.model}`}
          className={inputStyles}
        />
        {touched.model && errors.model ? (
          <p className={errorStyles}>{errors.model}</p>
        ) : (
          <div className="h-6"></div>
        )}
        <label htmlFor="volume" className={labelStyles}>
          Volume (gallons)
        </label>
        <input
          id="volume"
          name="volume"
          type="number"
          value={values.volume}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={`${aquarium.volume}`}
          className={inputStyles}
        />
        {touched.volume && errors.volume ? (
          <p className={errorStyles}>{errors.volume}</p>
        ) : (
          <div className="h-6"></div>
        )}

        <div className="flex justify-center">
          <button type="submit" className={buttonStyles} onClick={handleSubmit}>
            Update Aquarium
          </button>
        </div>
      </form>
    </section>
  );
}
