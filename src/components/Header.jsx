import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const questions = Array.from({ length: 2 }, (_, i) => `question${i + 1}`);

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

export default Header;
