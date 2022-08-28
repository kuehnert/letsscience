import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
} from "@mantine/core"
import { IconHeart, IconBookmark, IconShare } from "@tabler/icons"
import React from "react"

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}))

interface EntryCardProps {
  image: string | null
  category: string
  title: string
  author: {
    name: string
    description: string
  }
}

const EntryCard: React.FC<EntryCardProps> = ({
  image,
  category,
  title,
  author,
}: EntryCardProps) => {
  const { classes, theme } = useStyles()

  return (
    <Card withBorder p="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Image src={image ?? "/logo.png"} alt={title} height={180} />
      </Card.Section>

      <Badge>{category}</Badge>

      <Text weight={700} className={classes.title} mt="xs">
        {title}
      </Text>

      <Group mt="lg">
        <div>
          <Text weight={500}>{author.name}</Text>
          <Text size="xs" color="dimmed">
            {author.description}
          </Text>
        </div>
      </Group>
    </Card>
  )
}

export default EntryCard
