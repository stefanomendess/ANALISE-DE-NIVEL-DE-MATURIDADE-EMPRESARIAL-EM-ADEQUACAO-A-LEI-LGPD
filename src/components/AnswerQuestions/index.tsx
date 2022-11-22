import { useRouter } from "next/router";
import { useState } from "react";
import { database } from "../../services/db";
import { Button } from "../Button";
import styles from "./styles.module.scss";

export type Question = {
  value: number;
  number: number;
  category: string;
};

type AnsweredAllQuestionsProps = {
  orgCode: string;
  onReturn: () => void;
  answeredQuestions: Question[];
};

export const AnsweredAllQuestions = ({
  orgCode,
  answeredQuestions,
  onReturn,
}: AnsweredAllQuestionsProps) => {
  const [hasSavedQuestions, setHasSavedQuestions] = useState(false);
  const [hasError, setHasError] = useState(false);
  const router = useRouter();

  const handleAnswerQuestions = async () => {
    try {
      const key = await database.saveQuestionsInOrg(orgCode, answeredQuestions);
      if (!key) throw new Error("Error saving questions");
      setHasSavedQuestions(true);
    } catch (e) {
      console.log(e);
      setHasError(true);
    }
  };

  const redirectToResults = () => router.push(`/${orgCode}/resultados`);

  return (
    <div>
      <div className={styles.textContainer}>
        {hasSavedQuestions ? (
          <>
            <h1>Respostas salvas</h1>
            <p>Agora você já pode ver os resultados</p>
          </>
        ) : (
          <>
            <h1>Parabéns!</h1>
            <p>Você respondeu todas as questões.</p>
            <p>
              Você ainda pode voltar caso queira confirmar suas respostas, ou
              pode clicar no botão abaixo para enviar as respostas
            </p>
            {hasError && (
              <strong>
                Erro ao tentar salvar as respostas, tente novamente
              </strong>
            )}
          </>
        )}
      </div>
      {!hasSavedQuestions ? (
        <div className={styles.buttonsContainer}>
          <Button type="button" onClick={onReturn}>
            Voltar
          </Button>
          <Button type="button" onClick={handleAnswerQuestions}>
            Enviar respostas
          </Button>
        </div>
      ) : (
        <Button type="button" onClick={redirectToResults}>
          Ir até o resultado
        </Button>
      )}
    </div>
  );
};
