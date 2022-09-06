import React from "react"
import {
  createStyles,
  ThemeIcon,
  Text,
  SimpleGrid,
  Box,
  Stack
} from "@mantine/core"
import { IconSun, IconPhone, IconMapPin, IconAt } from "@tabler/icons"
import Layout from "../layout/Layout"
import { useDocumentTitle } from "@mantine/hooks"

type ContactIconVariant = "white" | "gradient"

interface ContactIconStyles {
  variant: ContactIconVariant
}

const useStyles = createStyles((theme, { variant }: ContactIconStyles) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    color: theme.white,
  },

  icon: {
    marginRight: theme.spacing.md,
    backgroundImage:
      variant === "gradient"
        ? `linear-gradient(135deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
            theme.colors[theme.primaryColor][6]
          } 100%)`
        : "none",
    backgroundColor: "transparent",
  },

  title: {
    color:
      variant === "gradient"
        ? theme.colors.gray[6]
        : theme.colors[theme.primaryColor][0],
  },

  description: {
    color: variant === "gradient" ? theme.black : theme.white,
  },
}))

interface ContactIconProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  icon: React.FC<any>
  title: React.ReactNode
  description: React.ReactNode
  variant?: ContactIconVariant
}

const ContactIcon: React.FC<ContactIconProps> = ({
  icon: Icon,
  title,
  description,
  variant = "gradient",
  className,
  ...others
}) => {
  const { classes, cx } = useStyles({ variant })
  return (
    <div className={cx(classes.wrapper, className)} {...others}>
      {variant === "gradient" ? (
        <ThemeIcon size={40} radius="md" className={classes.icon}>
          <Icon size={24} />
        </ThemeIcon>
      ) : (
        <Box mr="md">
          <Icon size={24} />
        </Box>
      )}

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  )
}

interface ContactIconsListProps {
  data: ContactIconProps[]
  variant?: ContactIconVariant
}

const contactData1 = [
  {
    title: "Email",
    description: "matthias.kuehnert@marienschule.com",
    icon: IconAt,
  },
  { title: "Phone", description: "+49 2171 48901", icon: IconPhone },
  { title: "Address", description: "An Sankt Remigius 21", icon: IconMapPin },
  { title: "Working hours", description: "8 a.m. – 4 p.m.", icon: IconSun },
]

const contactData2 = [
  {
    title: "Email",
    description: "stefanie.ludwig@marienschule.com",
    icon: IconAt,
  },
  { title: "Phone", description: "+49 2171 48901", icon: IconPhone },
  { title: "Address", description: "An Sankt Remigius 21", icon: IconMapPin },
  { title: "Working hours", description: "7:30 a.m. – 3 p.m.", icon: IconSun },
]

const ContactIconsList: React.FC<ContactIconsListProps> = ({
  data,
  variant,
}) => {
  const items = data.map((item, index) => (
    <ContactIcon key={index} variant={variant} {...item} />
  ))
  return <Stack>{items}</Stack>
}

const ContactPage = () => {

  useDocumentTitle("Contact")

  return (
    <Layout>
    <SimpleGrid cols={2} breakpoints={[{ maxWidth: 755, cols: 1 }]}>
      <Box
        sx={theme => ({
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          backgroundImage: `linear-gradient(135deg, ${
            theme.colors[theme.primaryColor][6]
          } 0%, ${theme.colors[theme.primaryColor][4]} 100%)`,
        })}
      >
        <ContactIconsList variant="white" data={contactData1} />
      </Box>

      <Box
        sx={theme => ({
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          backgroundImage: `linear-gradient(135deg, ${
            theme.colors[theme.primaryColor][6]
          } 0%, ${theme.colors[theme.primaryColor][4]} 100%)`,
        })}
      >
        <ContactIconsList variant="white" data={contactData2} />
      </Box>
    </SimpleGrid>
    </Layout>
  )
}

export default ContactPage
