"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { UserContext, AquariumContext } from "../../AppContext";
import AddAquariumForm from "./AddAquariumForm";
import EditAquariumForm from "./EditAquariumForm";

export default function UserPage() {
  const { setUser, user } = useContext(UserContext);
  const { setAquarium } = useContext(AquariumContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedAquarium, setSelectedAquarium] = useState(null);
  const router = useRouter();

  function toggleAddForm() {
    setShowAddForm(!showAddForm);
  }

  function toggleEditForm(aquarium) {
    setSelectedAquarium(aquarium);
    setShowEditForm(!showEditForm);
  }

  function handleDelete(aquarium) {
    fetch(`/api/aquariums/${aquarium.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        const updatedAquariums = user.aquariums.filter(
          (a) => a.id !== aquarium.id
        );
        const updatedUser = { ...user, aquariums: updatedAquariums };
        setUser(updatedUser);
      }
    });
  }

  if (showAddForm) {
    return <AddAquariumForm toggleAddForm={toggleAddForm} />;
  }

  if (showEditForm) {
    return (
      <EditAquariumForm
        toggleEditForm={toggleEditForm}
        aquarium={selectedAquarium}
      />
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  const containerStyles =
    "flex flex-col bg-slate-600 rounded-md max-w-xl mx-6 p-8 mt-16 mb-16 shadow-2xl sm:mx-auto md:mx-auto";
  const buttonStyles =
    "bg-red-500 hover:bg-red-600 transition duration-200 ease-in-out text-white font-bold py-2 px-4 rounded";

  return (
    <main className={containerStyles}>
      <h1 className="text-3xl text-white text-center font-bold mt-2 mb-6">
        Hello, {user.first_name}
      </h1>
      <div className={"text-center"}>
        <button onClick={toggleAddForm} className={buttonStyles}>
          Add Aquarium
        </button>
      </div>
      {user.aquariums.length > 0 ? (
        <ul>
          {user.aquariums.map((aquarium) => (
            <li
              key={aquarium.id}
              className="flex items-center justify-between space-x-4 rounded-lg p-2 mt-4 bg-gray-200 text-blue-500"
            >
              <figure className="flex-shrink-0">
                <Image
                  src="/reef-tank.jpeg"
                  alt="Reef Tank"
                  width={100}
                  height={100}
                  className="rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
                />
              </figure>
              <article>
                <p className="flex items-center text-gray-800 mb-2">
                  {aquarium.brand}
                </p>
                <p className="flex items-center text-gray-800 mb-2">
                  {aquarium.model}
                </p>
                <p className="flex items-center text-gray-800 mb-2">
                  {aquarium.volume} gallons
                </p>
                <div className="flex">
                  <button
                    className={buttonStyles}
                    onClick={() =>
                      setAquarium(aquarium) &
                      router.push(`/users/${user.id}/aquariums/${aquarium.id}`)
                    }
                  >
                    View
                  </button>
                  <button
                    className={`${buttonStyles} mx-2`}
                    onClick={() => toggleEditForm(aquarium)}
                  >
                    Edit
                  </button>
                  <button
                    className={buttonStyles}
                    onClick={() => handleDelete(aquarium)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-white text-center mt-6">
          You currently have no aquariums.
        </p>
      )}
      {user.shared_aquariums.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-2 mt-6 text-center">
            Aquariums Shared With You
          </h2>
          <ul>
            {user.shared_aquariums.map((sharedAquarium) => (
              <li
                key={sharedAquarium.id}
                className="flex items-center justify-between space-x-4 border-2 border-blue-500 rounded-lg p-2 mt-4 bg-gray-200 text-blue-500"
              >
                <figure className="flex-shrink-0">
                  <Image
                    src="/reef-tank.jpeg"
                    alt="Reef Tank"
                    width={100}
                    height={100}
                    className="rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
                  />
                </figure>
                <article>
                  <p className="flex items-center text-gray-800 mb-2">
                    {sharedAquarium.aquarium.brand}
                  </p>
                  <p className="flex items-center text-gray-800 mb-2">
                    {sharedAquarium.aquarium.model}
                  </p>
                  <p className="flex items-center text-gray-800 mb-2">
                    {sharedAquarium.aquarium.volume} gallons
                  </p>
                  <button
                    className={buttonStyles}
                    onClick={() =>
                      setAquarium(sharedAquarium.aquarium) &
                      router.push(
                        `/users/${user.id}/aquariums/${sharedAquarium.aquarium.id}`
                      )
                    }
                  >
                    View Aquarium
                  </button>
                </article>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
