import type { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { Question } from "../../components/AnswerQuestions";
import { ResultsLayout } from "../../components/ResultsLayout";
import { database } from "../../services/db";

type PageProps = {
  totalPoints: number;
  totalAnswers: number;
  pointsPerCategory: Record<string, number>;
};

const ResultsPage: NextPage<PageProps> = ({
  totalAnswers,
  totalPoints,
  pointsPerCategory,
}) => {
  return (
    <ResultsLayout
      totalPoints={totalPoints}
      totalAnswers={totalAnswers}
      pointsPerCategory={pointsPerCategory}
    />
  );
};

type MyParams = {
  orgCode: string;
} & ParsedUrlQuery;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { orgCode } = context.params as MyParams;

  try {
    const data = await database.getQuestionsInOrg(orgCode);
    if (!data) throw new Error("Error getting questions");
    const questions = Object.values(data).flatMap((question) => question);
    const pointsPerCategory = questions.reduce((acc, question) => {
      if (question.category in acc) {
        acc[question.category] += question.value;
      } else {
        acc[question.category] = question.value;
      }
      return acc;
    }, {} as Record<string, number>);

    const totalPoints = questions.reduce(
      (acc, question) => acc + question.value,
      0
    );
    const totalAnswers = Object.values(data).length;

    return {
      props: {
        totalPoints,
        totalAnswers,
        pointsPerCategory,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/pagina-nao-encontrada",
        permanent: false,
      },
    };
  }
};

export default ResultsPage;
