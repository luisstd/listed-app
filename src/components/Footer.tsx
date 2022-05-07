import React from 'react'
import { createStyles, Anchor, Group, ActionIcon, Text } from '@mantine/core'
import { BrandTwitter, BrandYoutube, BrandInstagram, BrandGithub, Cup } from 'tabler-icons-react'

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

interface FooterCenteredProps {
  links: { link: string; label: string }[]
}

export function Footer({ links }: FooterCenteredProps) {
  const { classes } = useStyles()
  const items = links.map((link) => (
    <Anchor<'a'>
      color='dimmed'
      key={link.label}
      href={link.link}
      sx={{ lineHeight: 1 }}
      onClick={(event) => event.preventDefault()}
      size='sm'
    >
      {link.label}
    </Anchor>
  ))

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Text className='font-heading font-black italic'>listed.fyi</Text>
        <Group className={classes.links}>{items}</Group>

        <Group spacing={0} position='right' noWrap>
          <ActionIcon size='lg'>
            <BrandGithub size={18} />
          </ActionIcon>
          <ActionIcon size='lg'>
            <Cup size={18} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  )
}
