import {
  createStyles,
  Header,
  Menu,
  Group,
  Center,
  Burger,
  Container,
  Stack,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconChevronDown } from "@tabler/icons"
import { Link } from "gatsby"
import React from "react"
import ErasmusLogo from "./ErasmusLogo"

const useStyles = createStyles(theme => ({
  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}))

interface HeaderSearchProps {
  links: {
    link: string
    label: string
    links?: { link: string; label: string }[]
  }[]
}

const Navbar = ({ links }: HeaderSearchProps) => {
  const [opened, { toggle }] = useDisclosure(false)
  const { classes } = useStyles()

  const items = links.map(link => {
    const menuItems = link.links?.map(item => (
      <a key={item.link} href={item.link} className={classes.link}>
        <Menu.Item>{item.label}</Menu.Item>
      </a>
    ))

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <Link
              to={link.link}
              className={classes.link}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={12} stroke={1.5} />
              </Center>
              </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      )
    }

    return (
      <Link
        key={link.label}
        to={link.link}
        className={classes.link}
      >
        {link.label}
      </Link>
    )
  })

  return (
    <Header height={56} mb={60}>
      <Container>
        <div className={classes.inner}>
          <Stack justify="left" style={{ cursor: "pointer" }}>
            <ErasmusLogo />
          </Stack>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
        </div>
      </Container>
    </Header>
  )
}

export default Navbar
