import { CareerResultHeader } from "./CareerResultHeader";
import { CareerResultMain } from "./CareerResultMain";
import { useNavigate } from "react-router";
import { useEffect } from "react";
export function CareerResultPage({ careerResultInfo }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!careerResultInfo) {
      navigate("/");
    }
    /* eslint-disable */
  }, []);

  if (!careerResultInfo) return null;

  return (
    <div className="bg-gray-50 text-gray-900">
      <div className="mx-auto flex h-dvh w-full max-w-3xl flex-col">
        {console.log(careerResultInfo)}
        <CareerResultHeader />
        <CareerResultMain careerResultInfo={careerResultInfo} />
      </div>
    </div>
  );
}
