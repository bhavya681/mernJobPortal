import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Mail, Contact, Pen } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AppliedJobTable from "./AppliedJobTable";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UpdateProfileDialogue from "./UpdateProfileDialogue";
import UpdatePhotoDialogue from "./UpdatePhotoDialogue";

const ProfilePage = () => {
  const skills = [
    "React Js",
    "Node Js",
    "Docker",
    "Brupsuite",
    "Linux",
    "Express Js",
    "Mongo DB",
    "PostgreSQL",
    "SQL",
  ];
  const { user } = useSelector((state) => state.auth);
  const [isResume, setisResume] = useState(true);

  const [open, setOpen] = useState(false);

  const [popen, setPopen] = useState(false);
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl my-5 p-8 border border-gray-200 shadow-md shadow-gray-200">
      {/* Profile Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Avatar className="h-18 w-20 rounded-[100%]">
            <AvatarImage
              className="rounded-[100%]"
              // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgVrxjssuGoPhblx8MTKoGrF50RAlkKdiNZQ&s"
              src={
                user?.profile?.profilePhoto
                  ? user?.profile?.profilePhoto
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgVrxjssuGoPhblx8MTKoGrF50RAlkKdiNZQ&s"
              }
              alt="Profile Avatar"
              onClick={() => {
                setPopen(true);
              }}
            />
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user?.fullname}</h1>
            <p className="text-gray-600">
              {user?.profile?.bio ||
                "Curtis Blaydes is an American professional mixed martial artist"}
            </p>
          </div>
        </div>

        <Button variant="outline" className="text-right">
          <Pen
            onClick={() => {
              setOpen(true);
            }}
            className="w-5 h-5"
          />
        </Button>
      </div>

      {/* Contact Information */}
      <div className="my-5">
        <h2 className="text-lg font-semibold mb-3">Contact Information</h2>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-5 h-5" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact className="w-5 h-5" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="my-5">
        <h2 className="text-lg font-semibold mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {user?.profile?.skills.length === 0 ? (
            <h1>NA</h1>
          ) : (
            user?.profile?.skills.map((item, index) => (
              <div key={index}>
                <Badge>{item}</Badge>
              </div>
            ))
          )}
        </div>

        {/* Resume Section */}
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold my-4 text-lg">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialogue open={open} setOpen={setOpen} />
      <UpdatePhotoDialogue open={popen} setOpen={setPopen} />
    </div>
  );
};

export default ProfilePage;
