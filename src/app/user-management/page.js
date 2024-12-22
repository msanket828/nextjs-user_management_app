import { fetchAllUsers } from "@/actions";
import AddnewUser from "@/components/add-new-user";
import SingleUserCard from "@/components/single-user-card";
import React from "react";

const UserManagement = async () => {
  let getAllUsers = await fetchAllUsers();
  getAllUsers = await JSON.parse(JSON.stringify(getAllUsers));
  return (
    <div className="w-[95%] mx-auto my-10">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold mb-4">User Management </h2>
        <AddnewUser />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
        {getAllUsers?.data?.length > 0 ? (
          getAllUsers.data.map((userItem) => {
            return <SingleUserCard user={userItem} key={userItem._id} />;
          })
        ) : (
          <h2 className="text-3xl font-bold">No users found...</h2>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
