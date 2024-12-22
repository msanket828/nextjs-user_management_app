"use server";

import { connectDB } from "@/database";
import User from "@/models/user";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// add new user
export async function addNewUserAction(formData, pathToRevalidate) {
  await connectDB();
  try {
    const newlyCreatedUser = await User.create(formData);
    if (newlyCreatedUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User added successfully...",
      };
    } else {
      return {
        success: false,
        message: "something went wrong...",
      };
    }
  } catch (error) {
    console.log("Error addNewUserAction", error.message);
    return {
      success: false,
      message: "something went wrong...",
    };
  }
}

//  fetch all users
export async function fetchAllUsers() {
  await connectDB();
  try {
    const allUsers = await User.find({});
    if (allUsers) {
      return {
        success: true,
        data: allUsers,
      };
    } else {
      return {
        success: false,
        message: "Something went wrong...",
      };
    }
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      message: "Inside fetchAllUsers something went wrong...",
    };
  }
}

// delete user
export async function deleteUser(id, pathToRevalidate) {
  await connectDB();
  try {
    const deletedUser = await User.findOneAndDelete({ _id: id });
    if (!deletedUser) {
      return {
        success: false,
        messgae: "Delted user is not present...",
      };
    }
    revalidatePath(pathToRevalidate);
    return {
      success: true,
      message: `User deleted successfully`,
    };
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      messgae: "Something went wrong...",
    };
  }
}

// edit user

export async function editUserAction(
  currentEditedUserId,
  formData,
  pathToRevalidate
) {
  await connectDB();
  try {
    const { firstName, lastName, email, address } = formData;
    const updateUser = await User.findByIdAndUpdate(
      { _id: currentEditedUserId },
      {
        firstName,
        lastName,
        email,
        address,
      },
      { new: true }
    );
    if (updateUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User edited successfully...",
      };
    } else {
      return {
        success: true,
        message: "Something went wrong...",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: true,
      message: "Something went wrong...",
    };
  }
}
