import { createStyles, Card, Image, Group, Text, Badge } from "@mantine/core"
import { IconHeart, IconBookmark, IconShare } from "@tabler/icons"
import { Link } from "gatsby"
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
  category: string | null
  title: string
  slug: string
  author: {
    name: string
    description: string
  }
  colorMap: Record<string, string>
}

const EntryCard: React.FC<EntryCardProps> = ({
  image,
  category,
  title,
  author,
  slug,
  colorMap,
}: EntryCardProps) => {
  const { classes, theme } = useStyles()

  return (
    <Card
      withBorder
      p="lg"
      radius="md"
      className={classes.card}
      component={Link}
      to={slug}
    >
      <Card.Section mb="sm">
        <Image src={image ?? "/logo.png"} alt={title} height={180} />
      </Card.Section>

      {category !== null && (
        <Badge color={colorMap[category]}>{category}</Badge>
      )}

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
