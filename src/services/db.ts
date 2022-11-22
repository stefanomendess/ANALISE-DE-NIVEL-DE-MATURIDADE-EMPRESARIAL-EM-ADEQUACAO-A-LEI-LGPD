import { getDatabase, ref, get, push } from "firebase/database";
import { app } from "./firebase";

const db = getDatabase(app);

const createOrg = async (orgName: string) => {
  const orgRef = ref(db, `orgs`);
  const data = push(orgRef, {
    name: orgName,
  });
  return data.key;
};

const getOrgByKey = async (key: string) => {
  const orgRef = ref(db, `orgs/${key}`);
  const snapshot = await get(orgRef);
  if (snapshot.exists()) {
    return {
      key: snapshot.key,
      name: snapshot.val().name,
    };
  } else {
    return null;
  }
};

type Question = {
  number: number;
  value: number;
  category: string;
};

const saveQuestionsInOrg = async (orgKey: string, questions: Question[]) => {
  const questionsRef = ref(db, `orgs/${orgKey}/questions`);
  const data = push(questionsRef, questions);
  return data.key;
};

type GetQuestionsResponse = {
  [key: string]: Question[];
};

const getQuestionsInOrg = async (orgKey: string) => {
  const questionsRef = ref(db, `orgs/${orgKey}/questions`);
  const snapshot = await get(questionsRef);
  if (snapshot.exists()) {
    return <GetQuestionsResponse>snapshot.val();
  } else {
    return null;
  }
};

export const database = {
  createOrg,
  getOrgByKey,
  saveQuestionsInOrg,
  getQuestionsInOrg,
};
