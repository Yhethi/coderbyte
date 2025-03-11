import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const questions = Array.from({ length: 3 }, (_, i) => `question${i + 1}`);

  return (
    <div className="global_navbar">
      <ol>
        {questions.map((question, index) => (
          <li key={index} onClick={() => navigate(`/${question}`)}>
            {question.replace("question", "Question ")}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Navbar;
