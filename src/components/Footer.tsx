import React from "react"
import { createStyles, Container, Group, ActionIcon, Stack, Anchor } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
import ErasmusLogo from "./ErasmusLogo";
import { Link } from "gatsby";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

const Footer = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Stack justify="left">
            <ErasmusLogo />
        </Stack>
        <Group spacing={0} className={classes.links} position="right" noWrap>
            <Anchor
                component={Link}
                to="/privacy"
                color="dimmed"
                size="sm"
            >
                Privacy
            </Anchor>
          <ActionIcon size="lg" component="a" href="https://www.instagram.com/letsscience.eu/">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}

export default Footer