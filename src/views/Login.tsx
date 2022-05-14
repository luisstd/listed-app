import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  useMantineTheme,
  Group,
  Stack,
  Input,
  Space,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useInputState } from '@mantine/hooks'
import { Dots } from '../components/Dots'
import { Features } from '../components/Features'
import { Footer } from '../components/Footer'
import { supabase } from '../supabase/client'
import { At } from 'tabler-icons-react'

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 120,
    paddingBottom: 80,

    '@media (max-width: 755px)': {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  dots: {
    position: 'absolute',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],

    '@media (max-width: 755px)': {
      display: 'none',
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: 52,
    letterSpacing: -1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `'Recursive', ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 46,
      textAlign: 'center',
    },
  },

  description: {
    textAlign: 'center',

    '@media (max-width: 520px)': {
      textAlign: 'left',
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: 'flex',
    justifyContent: 'center',

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      height: 46,
      fontSize: theme.fontSizes.md,

      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}))

function Login() {
  const { classes } = useStyles()
  const theme = useMantineTheme()

  const [email, setEmail] = useInputState('')

  async function signInWithEmail() {
    try {
      const { user, session, error } = await supabase.auth.signIn({
        email: email,
      })
      if (error) throw error
      showNotification({
        title: 'Login link sent',
        message: 'Check your e-mail for the login link',
      })
    } catch (error: any) {
      showNotification({
        title: 'There was an error',
        message: error.error_description || error.message,
        color: 'red',
      })
    }
  }

  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Simple lists {''}
          <Text className='italic ' component='span' color={theme.primaryColor} inherit>
            for your information
          </Text>
        </Title>

        <Container p={0} size={600}>
          <Text size='lg' color='dimmed' className={classes.description}>
            It's just a list app. Because putting stuff into lists is awesome.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Group position='center'>
            <Input
              variant='filled'
              icon={<At />}
              placeholder='Your email'
              radius='md'
              size='lg'
              value={email}
              onChange={setEmail}
            />

            <Button color='violet' size='lg' onClick={() => signInWithEmail()}>
              Get login link
            </Button>
          </Group>
        </div>
      </div>
      <Space h='xl'></Space>
      <Space h='xl'></Space>
      <Features />
      <Footer />
    </Container>
  )
}

export { Login }
