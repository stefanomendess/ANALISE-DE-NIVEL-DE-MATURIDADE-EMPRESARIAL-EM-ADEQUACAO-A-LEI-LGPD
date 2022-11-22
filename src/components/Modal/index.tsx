import ReactModal, { Props, Styles } from "react-modal";
import styles from "./styles.module.scss";

type CommonProps = {
  children: React.ReactNode;
};

const customStyles: Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    padding: "1.5rem 2rem",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const CancelIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24px"
    height="24px"
    stroke-width="1.5"
    viewBox="0 0 24 24"
    fill="none"
    color="#000000"
  >
    <path
      d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
      stroke="#000000"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const ModalBase = ({ children, ...props }: Props) => {
  return (
    <ReactModal style={customStyles} {...props}>
      {children}
    </ReactModal>
  );
};

type HeaderProps = {
  onRequestClose?: () => void;
} & CommonProps;

const Header = ({ onRequestClose, children }: HeaderProps) => {
  return (
    <header className={styles.header}>
      {children}
      <button type="button" onClick={onRequestClose}>
        <CancelIcon />
      </button>
    </header>
  );
};

const Content = ({ children }: CommonProps) => {
  return <div className={styles.content}>{children}</div>;
};

const Footer = ({ children }: CommonProps) => {
  return <footer className={styles.footer}>{children}</footer>;
};

export const Modal = Object.assign(ModalBase, {
  Header,
  Content,
  Footer,
});
