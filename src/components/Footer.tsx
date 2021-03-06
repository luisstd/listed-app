import { useState } from 'react'
import { createStyles, Anchor, Group, ActionIcon, Text } from '@mantine/core'
import { BrandGithub, Cup } from 'tabler-icons-react'
import { Privacy } from './Privacy'

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    marginBottom: 0,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}))

function Footer() {
  const { classes } = useStyles()
  const [opened, setOpened] = useState(false)

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Text className='font-heading font-black italic'>listed.fyi</Text>
        <Group className={classes.links}>
          <Anchor<'a'>
            color='dimmed'
            sx={{ lineHeight: 1 }}
            onClick={() => setOpened(true)}
            size='sm'
          >
            Privacy
          </Anchor>
          <Anchor<'a'>
            color='dimmed'
            sx={{ lineHeight: 1 }}
            target='_blank'
            href='https://github.com/luisstd/listed-app#readme'
            size='sm'
          >
            Readme
          </Anchor>
        </Group>

        <Group spacing={0} position='right' noWrap>
          <Anchor href='https://github.com/luisstd/listed-app' target='_blank'>
            <ActionIcon size='lg'>
              <BrandGithub size={18} />
            </ActionIcon>
          </Anchor>
          <Anchor href='https://www.buymeacoffee.com/lstd' target='_blank'>
            <ActionIcon size='lg'>
              <Cup size={18} />
            </ActionIcon>
          </Anchor>
        </Group>
        <Privacy opened={opened} setOpened={setOpened} onClose={() => setOpened(false)} />
      </div>
    </div>
  )
}

export { Footer }
