import {
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Text,
} from "@chakra-ui/react";

const Progress = ({ todos }) => {
  const countStatus = (arr, status) => {
    return arr.filter((todo) => todo.status === status).length;
  };
  const complete = countStatus(todos, "complete");
  const pending = countStatus(todos, "pending");
  const total = complete + pending;
  let completePercent = total > 0 ? ((complete / total) * 100).toFixed(2) : 0;

  const getMotivationalQuote = (percentage) => {
    let quote;

    switch (true) {
      case percentage >= 0 && percentage < 25:
        quote = "Let's start and keep going!";
        break;
      case percentage >= 25 && percentage < 50:
        quote = "Nice progress! You're getting there!";
        break;
      case percentage >= 50 && percentage < 75:
        quote = "More than halfway! Awesome work!";
        break;
      case percentage >= 75 && percentage < 100:
        quote = "Almost there! Keep up the great work!";
        break;
      case percentage == 100.0:
        quote = "Congratulations! It feels nice doesn't it?";
        break;
      default:
        quote = "Keep that morale up!";
        break;
    }

    return quote;
  };

  return (
    <>
      <HStack>
        <CircularProgress
          value={completePercent}
          size={150}
          thickness="6px"
          color="green.400"
        >
          <CircularProgressLabel fontSize={10}>
            {`${completePercent}% Completed!`}
          </CircularProgressLabel>
        </CircularProgress>
        <Text marginLeft={"5%"} fontSize={"20px"}>
          {getMotivationalQuote(completePercent)}
        </Text>
      </HStack>
    </>
  );
};

export default Progress;
