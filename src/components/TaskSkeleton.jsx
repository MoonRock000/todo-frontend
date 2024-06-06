import {
  Card,
  CardBody,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  HStack,
} from "@chakra-ui/react";
const TaskSkeleton = () => {
  return (
    <Card mb={5}>
      <Skeleton height={"100px"}></Skeleton>
      <CardBody>
        <HStack>
          <SkeletonCircle />
          <SkeletonCircle />
          <SkeletonCircle />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default TaskSkeleton;
