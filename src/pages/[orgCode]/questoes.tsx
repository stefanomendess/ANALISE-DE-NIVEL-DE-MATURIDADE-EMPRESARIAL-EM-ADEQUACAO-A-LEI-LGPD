import type { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { QuestionsLayout } from "../../components/QuestionsLayout";
import { database } from "../../services/db";

type QuestionsPageProps = {
  roomCode: string;
};

const QuestionsPage: NextPage<QuestionsPageProps> = ({ roomCode }) => {
  return <QuestionsLayout orgCode={roomCode} />;
};

type MyParams = {
  orgCode: string;
} & ParsedUrlQuery;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { orgCode } = context.params as MyParams;

  try {
    const org = await database.getOrgByKey(orgCode);
    if (!org) throw new Error("Error getting room");

    return {
      props: {
        roomCode: org.key,
        name: org.name,
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

export default QuestionsPage;
