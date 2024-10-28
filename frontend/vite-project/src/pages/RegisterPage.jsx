import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const RegisterPage = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    answers: "",
    password: "",
    role: "",
    file: null,
  });
  const navigate = useNavigate();
  const changEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("answers", input.answers);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      // const res = await fetch(`${USER_API_END_POINT}/register`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "mutlipart/form-data",
      //   },
      //   body: JSON.stringify({ formData }),
      // });
      // const data = await res.json();
      // if (data.success) {
      //   navigate("/login");
      //   toast.success(data.message || 'User Successfully Created');
      // } else {
      //   toast.error(data.message || 'Error While Creating User');
      // }
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-4">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Join us today and explore more!
        </p>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <Label className="block text-sm font-semibold text-gray-700">
              Full Name
            </Label>
            <div className="mt-1">
              <Input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Charlie"
                autoComplete="name"
                required
                value={input.fullname}
                onChange={changEventHandler}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <Label className="block text-sm font-semibold text-gray-700">
              Email address
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="abc@gmail.com"
                autoComplete="email"
                required
                value={input.email}
                onChange={changEventHandler}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <Label className="block text-sm font-semibold text-gray-700">
              Phone Number
            </Label>
            <div className="mt-1">
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                autoComplete="phoneNumber"
                placeholder="4284893848"
                required
                value={input.phoneNumber}
                onChange={changEventHandler}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <Label className="block text-sm font-semibold text-gray-700">
              Enter Your Pet Name?
            </Label>
            <div className="mt-1">
              <Input
                id="answers"
                name="answers"
                type="text"
                autoComplete="answerss"
                placeholder="Enter Answer Here"
                required
                value={input.answers}
                onChange={changEventHandler}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <Label className="block text-sm font-semibold text-gray-700">
              Password
            </Label>
            <div className="mt-1">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter Password"
                autoComplete="new-password"
                required
                value={input.password}
                onChange={changEventHandler}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <RadioGroup className="flex flex-start">
            <div className="flex items-center gap-4 mt-4">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changEventHandler}
                id="student"
                className="cursor-pointer"
              />
              <Label htmlFor="student" className="text-gray-700">
                Student
              </Label>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changEventHandler}
                id="recruiter"
                className="cursor-pointer"
              />
              <Label htmlFor="recruiter" className="text-gray-700">
                Recruiter
              </Label>
            </div>
          </RadioGroup>

          <div className="mt-4">
            <Label className="block text-sm font-semibold text-gray-700">
              Upload Profile Picture
            </Label>
            <Input
              type="file"
              id="file"
              name="file"
              onChange={changeFileHandler}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-green-600 hover:text-green-500"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
