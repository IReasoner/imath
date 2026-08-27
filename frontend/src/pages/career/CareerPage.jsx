import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { CareerHeader } from "./CareerHeader";
import { CareerMain } from "./CareerMain";
import { LogOutPopUp } from "./LogOutPopUp";

export function CareerPage({ setQuestion, setTimeMs, setSwitcher, isOnline }) {
  const [meInfo, setMeInfo] = useState(null);
  const [careerMe, setCareerMe] = useState(null);
  const [showLogOut, setShowLogOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (meInfo) return;
    const loadMeInfo = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get("http://localhost:8000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.setItem("userId", response.data.id);
        setMeInfo(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          navigate("/login");
          localStorage.removeItem("access_token");
        }
      }
    };

    loadMeInfo();
    /* eslint-disable */
  }, []);

  useEffect(() => {
    if (!meInfo) return;
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("access_token");

    const getCareerMe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/career/me/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setCareerMe(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCareerMe();
  }, [meInfo]);

  if (!careerMe || !meInfo) return null;

  return (
    <>
      <title>iMath | Career</title>
      <div className="bg-gray-50 text-gray-900">
        <div className="mx-auto flex h-dvh w-full max-w-5xl flex-col">
          <CareerHeader meInfo={meInfo} setShowLogOut={setShowLogOut} />
          {showLogOut ? <LogOutPopUp setShowLogOut={setShowLogOut} /> : ""}
          <CareerMain
            careerMe={careerMe}
            setQuestion={setQuestion}
            setTimeMs={setTimeMs}
            setSwitcher={setSwitcher}
            isOnline={isOnline}
          />
        </div>
      </div>
    </>
  );
}
