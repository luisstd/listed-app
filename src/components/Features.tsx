import React from 'react'
import { createStyles, Text, SimpleGrid, Container } from '@mantine/core'
import { Login, Database, BrandGithub } from 'tabler-icons-react'

const useStyles = createStyles((theme) => ({
  feature: {
    position: 'relative',
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  overlay: {
    position: 'absolute',
    height: 100,
    width: 160,
    top: 0,
    left: 0,
    borderRadius: 4,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
    zIndex: 1,
  },

  content: {
    position: 'relative',
    zIndex: 2,
  },

  icon: {
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}))

interface FeatureProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: React.FC<React.ComponentProps<typeof Login>>
  title: string
  description: string
}

function Feature({ icon: Icon, title, description, className, ...others }: FeatureProps) {
  const { classes, cx } = useStyles()

  return (
    <div className={cx(classes.feature, className)} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon size={38} className={classes.icon} />
        <Text weight={700} size='lg' mb='xs' mt={5} className={classes.title}>
          {title}
        </Text>
        <Text color='dimmed' size='sm'>
          {description}
        </Text>
      </div>
    </div>
  )
}

const mockdata = [
  {
    icon: Login,
    title: 'No sign-up required',
    description: 'Just enter your email and login via link',
  },
  {
    icon: Database,
    title: 'Create your own instance',
    description: 'Use the public instance or set up your own',
  },
  {
    icon: BrandGithub,
    title: 'Open-Source',
    description: 'The source code is available on Github',
  },
]

function Features() {
  const items = mockdata.map((item) => <Feature {...item} key={item.title} />)

  return (
    <Container mt={30} mb={30} size='lg'>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing={50}>
        {items}
      </SimpleGrid>
    </Container>
  )
}

export { Features }
