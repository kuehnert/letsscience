import {
  createStyles,
  Image,
  Title,
  Text,
  List,
  ThemeIcon,
} from "@mantine/core"
import { IconCheck } from "@tabler/icons"
import React from "react"

const useStyles = createStyles(theme => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}))

const HeroBanner: React.FC = () => {
  const { classes } = useStyles()
  return (
    <div className={classes.inner}>
      <div className={classes.content}>
        <Title className={classes.title}>
          Let's <span className={classes.highlight}>science</span> <br /> our
          environment
        </Title>
        <Text color="dimmed" mt="md">
          In our lives, we constantly interact with the environment, which is
          why we could not live at all without it. That is why the signals we
          receive from the environment today often seem frightening. Examples
          like huge forest fires in Spain, momentous floods in Germany or
          summers of the century all over Europe, are obvious signs that we need
          to take action ourselves. We as a group from all over Europe think
          that now is the time to act! With our three guidelines, we want to
          inspire ourselves and others to learn, come together and take action.
        </Text>

        <List
          mt={30}
          spacing="sm"
          size="sm"
          icon={
            <ThemeIcon size={20} radius="xl">
              <IconCheck size={12} stroke={1.5} />
            </ThemeIcon>
          }
        >
          <List.Item
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck size={12} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <b>Understanding</b> – Learning about our environment and the
            changes it is going through and getting a broader understanding of
            it
          </List.Item>
          <List.Item>
            <b>Cooperating</b> – Working as a community, who is stronger than
            the individual and finding solutions together through communication
            and exchanging ideas
          </List.Item>
          <List.Item>
            <b>Engaging</b> – Starting to actively engage and change things
          </List.Item>
        </List>
      </div>
      <Image src={"./logo.webp"} className={classes.image} />
    </div>
  )
}

export default HeroBanner
