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
          Droughts, floods and other extreme weather events are occurring across
          the globe. These issues cannot be solved on a local scale anymore and
          are issues of global importance. In the international collaboration of
          Erasmus+ we hope to contribute our part to the fight against the
          global climate crisis.
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
          <List.Item>
            <b>Global collaboration</b> – the Erasmus+ project spans across
            several european nations
          </List.Item>
          <List.Item>
            <b>Eco-friendly</b> – our goal is to fight climate change
          </List.Item>
          <List.Item>
            <b>Raising awareness</b> – one of the goals is to improve the
            ecological footprint of our local communities
          </List.Item>
        </List>
      </div>
      <Image src={"./logo.png"} className={classes.image} />
    </div>
  )
}

export default HeroBanner
