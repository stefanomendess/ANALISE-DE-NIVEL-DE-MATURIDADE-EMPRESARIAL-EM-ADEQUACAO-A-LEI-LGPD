import styles from "./styles.module.scss";

type RadioGroupProps = {
  value: number;
  onChange: (value: number) => void;
};

const radioValues = [1, 2, 3, 4, 5];

export const RadioGroup = ({ value, onChange }: RadioGroupProps) => {
  return (
    <div className={styles.radioGroupContainer}>
      {radioValues.map((radioValue) => (
        <div key={radioValue}>
          <span className={`${value === radioValue ? styles.checked : ""}`}>
            <input
              type="radio"
              id={String(radioValue)}
              value={radioValue}
              checked={value === radioValue}
              onChange={() => onChange(radioValue)}
            />
          </span>
          <label htmlFor={String(radioValue)}>{radioValue}</label>
        </div>
      ))}
    </div>
  );
};
