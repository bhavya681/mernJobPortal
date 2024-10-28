import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useCompanyById = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await fetch(`${COMPANY_API_END_POINT}/get/${id}`, {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        });
        const data = await res.json();
        if (data.success) {
          dispatch(setSingleCompany(data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany();
  }, [id, dispatch]);
};

export default useCompanyById;
