import Image from "next/image";
import styles from "./styles.module.scss";
import { questions } from "../../data/questions";
import { ResponsiveBar } from "@nivo/bar";

type ResultsLayoutProps = {
  totalPoints: number;
  totalAnswers: number;
  pointsPerCategory: Record<string, number>;
};

const formatAsPercent = (num: number) => {
  return new Intl.NumberFormat("default", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num / 100);
};

export const ResultsLayout = ({
  totalAnswers,
  totalPoints,
  pointsPerCategory,
}: ResultsLayoutProps) => {
  const maxNumber = 5 * questions.length * totalAnswers;
  const questionsPerCategory = questions.reduce((acc, question) => {
    if (question.category in acc) {
      acc[question.category] += 1;
    } else {
      acc[question.category] = 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const categoryChart = Object.entries(pointsPerCategory).map(
    ([category, points]) => ({
      category,
      points:
        (points / (questionsPerCategory[category] * 5 * totalAnswers)) * 100,
    })
  );

  return (
    <div className={styles.resultsContainer}>
      <header>
        <div>
          <Image src="/logo.png" alt="logo" width={200} height={200} />
        </div>
      </header>
      <div>
        <div>
          <h1>O formulário foi respondido: {totalAnswers} vez(es)</h1>
          <h1>A pontuação total é: {totalPoints}</h1>
          <h1>
            O Nível de Maturidade Empresarial em Adequação à LGPD:{" "}
            {formatAsPercent((totalPoints / maxNumber) * 100)}
          </h1>
          <div
            className={styles.chartContainer}
            style={{ width: 1000, height: 400 }}
          >
            <ResponsiveBar
              maxValue={100}
              data={[...categoryChart]}
              keys={["points"]}
              indexBy="category"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.1}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={{ scheme: "nivo" }}
              valueFormat={(value) => formatAsPercent(value)}
              axisLeft={{
                format: (value) => formatAsPercent(value),
              }}
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "#38bcb2",
                  size: 1,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "#eed312",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 1,
                },
              ]}
              fill={[
                {
                  match: {
                    id: "fries",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "sandwich",
                  },
                  id: "lines",
                },
              ]}
              borderColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={null}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
              }}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              role="application"
              ariaLabel="Nivo bar chart demo"
              tooltip={({ indexValue, formattedValue }) => (
                <div className={styles.tooltip}>
                  <p>
                    {indexValue} - {formattedValue}
                  </p>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
