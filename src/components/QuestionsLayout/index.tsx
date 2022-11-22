import Image from "next/image";
import { useState } from "react";
import { questions } from "../../data/questions";
import { AnsweredAllQuestions } from "../AnswerQuestions";
import { Button } from "../Button";
import { Question } from "../Question";
import styles from "./styles.module.scss";

type QuestionAnswer = {
  number: number;
  value: number;
  category: string;
};

type QuestionsLayoutProps = {
  orgCode: string;
};

export const QuestionsLayout = ({ orgCode }: QuestionsLayoutProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);

  const handleAnswer = (number: number, value: number, category: string) => {
    const questionAlreadyAnswered = answers.find(
      (questionAnswer) => questionAnswer.number === number
    );

    if (questionAlreadyAnswered) {
      const newAnswers = answers.map((questionAnswer) =>
        questionAnswer.number === number
          ? {
              number,
              value,
              category,
            }
          : questionAnswer
      );

      setAnswers(newAnswers);
    } else {
      setAnswers((oldAnswers) => [
        ...oldAnswers,
        {
          number,
          value,
          category,
        },
      ]);
    }
  };

  return (
    <div className={styles.questionsContainer}>
      <header>
        <div>
          <Image src="/logo.png" alt="logo" width={200} height={200} />
        </div>
      </header>
      {currentQuestion < questions.length ? (
        <div>
          {questions.map(
            (question) =>
              question.number === currentQuestion + 1 && (
                <Question
                  key={question.number}
                  number={question.number}
                  title={question.title}
                  question={question.question}
                  value={
                    answers.find((answer) => answer.number === question.number)
                      ?.value || 0
                  }
                  onAnswer={(value) =>
                    handleAnswer(question.number, value, question.category)
                  }
                />
              )
          )}
          <div className={styles.buttonsContainer}>
            <Button
              type="button"
              onClick={() => setCurrentQuestion((prevState) => prevState - 1)}
              disabled={currentQuestion === 0}
            >
              Voltar
            </Button>
            <Button
              type="button"
              onClick={() => setCurrentQuestion((prevState) => prevState + 1)}
              disabled={answers[currentQuestion] === undefined}
            >
              Próximo
            </Button>
          </div>
        </div>
      ) : (
        <AnsweredAllQuestions
          answeredQuestions={answers}
          onReturn={() => setCurrentQuestion((prevState) => prevState - 1)}
          orgCode={orgCode}
        />
      )}
    </div>
  );
};
