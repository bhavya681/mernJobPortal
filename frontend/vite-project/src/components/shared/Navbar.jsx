import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  // const {user}=useContext(AuthContext);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await fetch(`${USER_API_END_POINT}/logout`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      dispatch(setUser([]));
      if (data.success) {
        toast.success(data.message);
        navigate("/");
        dispatch(setUser(null));
        localStorage.removeItem("auth-token");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="bg-white">
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
          <div>
            <h1 className="text-2xl font-bold">
              Job<span className="text-[#f83002]">Portal</span>
            </h1>
          </div>
          <div className="flex items-center gap-12">
            <ul className="flex font-medium items-center gap-5">
              {user && user.role === "recruiter" ? (
                <>
                  <li>
                    <Link to={"/admin/companies"}>Companies</Link>
                  </li>
                  <li>
                    <Link to={"/admin/jobs"}>Jobs</Link>{" "}
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li>
                    <Link to={"/jobs"}>Jobs</Link>{" "}
                  </li>
                  <li>
                    <Link to={"/browse"}>Browse</Link>{" "}
                  </li>
                </>
              )}
            </ul>
            {user ? (
              <>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Avatar className={"cursor-pointer"}>
                        <AvatarImage
                          src={
                            user?.profile?.profilePhoto
                              ? user?.profile?.profilePhoto
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgVrxjssuGoPhblx8MTKoGrF50RAlkKdiNZQ&s"
                          }
                          alt="@shadcn"
                        />
                      </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div>
                        <div className="flex gap-4 space-y-2">
                          <Avatar className={"cursor-pointer"}>
                            <AvatarImage
                              src={
                                user?.profile?.profilePhoto
                                  ? user?.profile?.profilePhoto
                                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgVrxjssuGoPhblx8MTKoGrF50RAlkKdiNZQ&s"
                              }
                              alt="@shadcn"
                            />
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{user.fullname}</h4>
                            <p className="text-sm text-muted-foreground">
                              {user.profile.bio}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col my-2 text-gray-600">
                          <div className="flex w-fit items-center gap-2 cursor-pointer">
                         
                            {user?.role === "recruiter" ? (
                              null
                            ) : (
                              <>
                                 <User2 />
                                <Link to="/profile">
                                  <Button
                                    variant={"link"}
                                    className="border-none"
                                  >
                                    View Profile
                                  </Button>
                                </Link>
                              </>
                            )}
                          </div>
                          <div className="flex w-fit items-center gap-2 cursor-pointer">
                            <LogOut />
                            <Button
                              variant={"link"}
                              onClick={() => {
                                logout();
                              }}
                            >
                              Logout
                            </Button>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Button variant={"outline"}>
                    <Link to={"/login"}>Login</Link>
                  </Button>
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                    <Link
                      to={"/register"}
                      className="bg-[#6A38C2] hover:bg-[#5b30a6]"
                    >
                      Signup
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
