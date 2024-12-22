"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/actions";
import { useUserContext } from "@/context";

const SingleUserCard = ({ user }) => {
  const { setOpenPopup, setCurrentEditedUserId, setAddNewUserFormData } =
    useUserContext();
  const handleDeleteUser = async (id) => {
    const result = await deleteUser(id, "/user-management");
    console.log(result);
  };

  const handleEditUser = (editedUser) => {
    setCurrentEditedUserId(editedUser._id);
    setOpenPopup(true);
    setAddNewUserFormData({
      firstName: editedUser.firstName,
      lastName: editedUser.lastName,
      email: editedUser.email,
      address: editedUser.address,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {user.firstName} {user.lastName}
        </CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{user.address}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => handleEditUser(user)}>Edit</Button>
        <Button onClick={() => handleDeleteUser(user._id)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default SingleUserCard;
