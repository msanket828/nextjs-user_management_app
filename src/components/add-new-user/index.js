"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  addNewUserFormControls,
  addNewUserFormInitialState,
} from "@/utils/index";
import { addNewUserAction, editUserAction } from "@/actions";
import { useUserContext } from "@/context";

const AddnewUser = () => {
  // const [openPopup, setOpenPopup] = useState(false);
  // const [addNewUserFormData, setAddNewUserFormData] = useState(
  //   addNewUserFormInitialState
  // );
  const {
    openPopup,
    setOpenPopup,
    addNewUserFormData,
    setAddNewUserFormData,
    currentEditedUserId,
    setCurrentEditedUserId,
  } = useUserContext();

  const handleDisabled = () => {
    return Object.keys(addNewUserFormData).every(
      (key) => addNewUserFormData[key].trim() != ""
    );
  };

  const handleAddNewUserAction = async (e) => {
    e.preventDefault();
    const result = currentEditedUserId
      ? await editUserAction(
          currentEditedUserId,
          addNewUserFormData,
          "/user-management"
        )
      : await addNewUserAction(addNewUserFormData, "/user-management");
    setOpenPopup(false);
    setAddNewUserFormData(addNewUserFormInitialState);
    setCurrentEditedUserId(null);
  };

  return (
    <div>
      <Button onClick={() => setOpenPopup(true)}>Add new user</Button>

      <Dialog
        open={openPopup}
        onOpenChange={() => {
          setOpenPopup(false);
          setAddNewUserFormData(addNewUserFormInitialState);
          setCurrentEditedUserId(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentEditedUserId ? "Edit user" : "Add new user"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form action="" onSubmit={handleAddNewUserAction}>
              {addNewUserFormControls.map((controlItem) => {
                return (
                  <div className="mb-4" key={controlItem.name}>
                    <Label htmlFor={controlItem.name} className="text-right">
                      {controlItem.label}
                    </Label>
                    <Input
                      id={controlItem.name}
                      name={controlItem.name}
                      placeholder={controlItem.placeholder}
                      value={addNewUserFormData[controlItem.name]}
                      onChange={(e) =>
                        setAddNewUserFormData({
                          ...addNewUserFormData,
                          [controlItem.name]: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                );
              })}
              <DialogFooter>
                <Button
                  type="submit"
                  className="disabled:opacity-60"
                  disabled={!handleDisabled()}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddnewUser;
