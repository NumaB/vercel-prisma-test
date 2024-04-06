"use client";
import prisma from "./prisma-front";
import * as React from "react";

const CreateUserForm = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const createUser = async () => {
    await prisma.users.create({
      data: {
        name,
        email,
        image:
          "https://images.ctfassets.net/e5382hct74si/4QEuVLNyZUg5X6X4cW4pVH/eb7cd219e21b29ae976277871cd5ca4b/profile.jpg",
      },
    });
  };

  return (
    <>
      <div className="mt-4">
        <p>Prénom Nom</p>
        <input value={name} onChange={(e) => setName(e.currentTarget.value)} />
        <p>email</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
      </div>
      <div className="mt-4">
        <button onClick={() => createUser()}>Create</button>
      </div>
    </>
  );
};
export default CreateUserForm;
