import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { AuthContext } from "@/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  // const {setUser}=useContext(AuthContext);

  // const { loading } = useSelector((store) => store.auth);
  // const dispatch = useDispatch();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // dispatch(setLoading(true));
      const res = await fetch(`${USER_API_END_POINT}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });
      const data = await res.json();
      // const tokenD=localStorage.setItem('token',data);
      //  setUser(tokenD);
      if (data.success) {
        dispatch(setUser(data.user));
        localStorage.setItem("auth-token", data.token);
        if (data.user.role === "recruiter") {
          navigate("/admin/companies");
        } else {
          navigate("/");
        }
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
    // finally {
    //   dispatch(setLoading(false));
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-4">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please login to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="block text-sm font-semibold text-gray-700">
              Email address
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
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
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <RadioGroup defaultValue="" className="flex flex-start mt-4">
            <div className="flex items-center gap-4">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={formData.role === "student"}
                onChange={handleChange}
                id="student"
                className="cursor-pointer"
              />
              <Label htmlFor="student" className="text-gray-700">
                Student
              </Label>
            </div>
            <div className="flex items-center gap-4">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={formData.role === "recruiter"}
                onChange={handleChange}
                id="recruiter"
                className="cursor-pointer"
              />
              <Label htmlFor="recruiter" className="text-gray-700">
                Recruiter
              </Label>
            </div>
          </RadioGroup>

          <div className="text-sm mt-4">
            <Link
              to="/forgot-password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </Link>
          </div>

          <div>
            {/* {loading ? (
              <>
                <Button className='w-full my-4'>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait
                </Button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign In
                </button>
              </>
            )} */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
