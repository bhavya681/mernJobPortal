import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const UpdatePhotoDialogue = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    file: user?.profile.profilePhoto,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/pic/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": localStorage.getItem("auth-token"),
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setOpen(false);
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  return (
    <>
      <div>
        <Dialog open={open}>
          <DialogContent
            className="sm:max-w-[425px]"
            onInteractOutside={() => setOpen(false)}
          >
            <DialogHeader>
              <DialogTitle>Update Profile Picture</DialogTitle>
            </DialogHeader>
            <form onSubmit={submitHandler}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file">Profile Picture</Label>
                  <Input
                    id="pic"
                    name="pic"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={fileChangeHandler}
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full my-4">
                Update
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default UpdatePhotoDialogue;
