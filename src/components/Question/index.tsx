import { RadioGroup } from "../RadioGroup";
import styles from "./styles.module.scss";

type QuestionProps = {
  title: string;
  question: string;
  value: number;
  onAnswer: (value: number) => void;
  number: number;
};

export const Question = ({
  number,
  title,
  question,
  onAnswer,
  value,
}: QuestionProps) => {
  return (
    <div className={styles.questionContainer}>
      <h1>
        {number} - {title}
      </h1>
      <p>{question}</p>
      <small>
        Assinale 5 se estiver totalmente de acordo e 1 para totalmente em
        desacordo*
      </small>
      <RadioGroup value={value} onChange={onAnswer} />
    </div>
  );
};
