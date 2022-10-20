import React from "react"
import {
  createStyles,
  Text,
  Card,
  SimpleGrid,
  Container,
} from "@mantine/core"
import {
  IconMicroscope,
  IconHeartHandshake,
  IconMessages,
} from "@tabler/icons"

const keypoints = [
  {
    title: "Understanding",
    description:
      "We learn a lot about our environment and the changes it is undergoing in order to develop a more comprehensive and profound understanding of it.",
    icon: IconMicroscope,
  },
  {
    title: "Cooperating",
    description:
      "Through cooperation, we exchange ideas with each other in order to find common solutions. The group is stronger than the individual.",
    icon: IconHeartHandshake,
  },
  {
    title: "Engaging",
    description:
      "We get actively involved to change the environment around us and do our own part to protect the climate.",
    icon: IconMessages,
  },
]

const useStyles = createStyles(theme => ({
  title: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 24,
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },
}))

const Keypoints: React.FC = () => {
  const { classes, theme } = useStyles()
  const features = keypoints.map(feature => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      p="xl"
    >
      <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
      <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text size="sm" color="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ))
  return (
    <Container size="lg" py="xl">
      <SimpleGrid
        cols={3}
        spacing="xl"
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Container>
  )
}

export default Keypoints
