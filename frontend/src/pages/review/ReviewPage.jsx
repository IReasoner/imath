import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ReviewHeader } from "./ReviewHeader";
import { ReviewMain } from "./ReviewMain";
import { ReviewFooter } from "./ReviewFooter";

export function ReviewPage({ question, switcher }) {
  const [filter, setFilter] = useState(null);
  const [page, setPage] = useState(1);
  const [filteredQuestion, setFilteredQuestion] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!question) navigate("/");
    /* eslint-disable */
  }, []);

  if (!question) return null;

  return (
    <>
      <title>iMath | Review</title>

      <div className="bg-gray-50">
        <div className="mx-auto flex h-dvh max-w-4xl flex-col">
          {/* <!-- ================= HEADER ================= --> */}

          <ReviewHeader
            question={question}
            filter={filter}
            setFilter={setFilter}
            switcher={switcher}
          />

          {/* <!-- ================= REVIEW LIST ================= --> */}
          <ReviewMain
            question={question}
            filter={filter}
            page={page}
            setPage={setPage}
            filteredQuestion={filteredQuestion}
            setFilteredQuestion={setFilteredQuestion}
          />

          {/* <!-- ================= FOOTER ================= --> */}

          {filteredQuestion && (
            <ReviewFooter
              question={question}
              page={page}
              setPage={setPage}
              filteredQuestion={filteredQuestion}
            />
          )}
        </div>
      </div>
    </>
  );
}
