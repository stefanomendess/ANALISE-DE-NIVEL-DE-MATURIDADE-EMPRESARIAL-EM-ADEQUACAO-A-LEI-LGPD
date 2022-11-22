import styles from "./styles.module.scss";
import Image from "next/image";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { useState } from "react";
import { database } from "../../services/db";
import { useRouter } from "next/router";

export const HomeLayout = () => {
  const [isCreateOrgModalOpen, setIsCreateOrgModalOpen] = useState(false);
  const [isJoinOrgModalOpen, setIsJoinOrgModalOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgCode, setOrgCode] = useState("");
  const router = useRouter();

  const handleCreateOrgAndRoom = async () => {
    try {
      const code = await database.createOrg(orgName);
      if (!code) return;
      setGeneratedCode(code);
    } catch (e) {
      console.log(e);
    }
  };

  const redirectToRoom = (code: string) => router.push(`/${code}/questoes`);

  const handleJoinRoom = async () => {
    try {
      const org = await database.getOrgByKey(orgCode);
      if (!org?.key) return;
      redirectToRoom(org.key);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <header>
        <div>
          <Image src="/logo-2.png" alt="logo" width={200} height={200} />
        </div>
      </header>
      <div>
        <div className={styles.infoContainer}>
          <h1>
            <strong>LGPD</strong> Maduro
          </h1>
          <h2>
            Análise de
            <strong>
              {" "}
              Nível de
              <br />
              Maturidade empresarial em
              <br />
              Adequação LGPD
            </strong>
          </h2>
          <div className={styles.buttonsContainer}>
            <Button onClick={() => setIsCreateOrgModalOpen(true)}>
              Quero iniciar
            </Button>
            <Button onClick={() => setIsJoinOrgModalOpen(true)}>
              Tenho um código
            </Button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isCreateOrgModalOpen}
        onRequestClose={() => setIsCreateOrgModalOpen(false)}
      >
        <Modal.Header onRequestClose={() => setIsCreateOrgModalOpen(false)}>
          <h2>Iniciar análise</h2>
        </Modal.Header>
        <Modal.Content>
          {generatedCode ? (
            <div className={styles.generatedCodeContainer}>
              <h3>Código gerado</h3>
              <p>{generatedCode}</p>
            </div>
          ) : (
            <input
              placeholder="Nome da organização"
              className={styles.input}
              value={orgName}
              onChange={(e) => setOrgName(e.currentTarget.value)}
            />
          )}
        </Modal.Content>
        <Modal.Footer>
          {generatedCode ? (
            <Button type="button" onClick={() => redirectToRoom(generatedCode)}>
              Entrar
            </Button>
          ) : (
            <Button type="button" onClick={handleCreateOrgAndRoom}>
              Iniciar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <Modal
        isOpen={isJoinOrgModalOpen}
        onRequestClose={() => setIsJoinOrgModalOpen(false)}
      >
        <Modal.Header onRequestClose={() => setIsJoinOrgModalOpen(false)}>
          <h2>Entrar em uma sala</h2>
        </Modal.Header>
        <Modal.Content>
          <input
            placeholder="Código para entrar"
            className={styles.input}
            value={orgCode}
            onChange={(e) => setOrgCode(e.currentTarget.value)}
          />
        </Modal.Content>
        <Modal.Footer>
          <Button type="button" onClick={handleJoinRoom}>
            Entrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
