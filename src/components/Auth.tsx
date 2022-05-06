import { useState } from 'react'
import { useInputState } from '@mantine/hooks'
import { supabase } from '../supabase/client'
import { Button, Group, Input, Modal, Notification } from '@mantine/core'
import { At } from 'tabler-icons-react'
import { showNotification } from '@mantine/notifications'

const Auth = () => {
  const [opened, setOpened] = useState(false)
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

  async function signOut() {
    const { error } = await supabase.auth.signOut()
  }

  return (
    <>
      <Group position='center'>
        <Input
          variant='filled'
          icon={<At />}
          placeholder='Your email'
          radius='md'
          size='md'
          value={email}
          onChange={setEmail}
        />

        <Button color='violet' onClick={() => (signInWithEmail(), setOpened(false))}>
          Get login link
        </Button>
      </Group>
    </>
  )
}

export default Auth

// import React from 'react'
// import {
//   createStyles,
//   Paper,
//   Title,
//   Text,
//   TextInput,
//   Button,
//   Container,
//   Group,
//   Anchor,
//   Center,
//   Box,
// } from '@mantine/core'
// import { ArrowLeft } from 'tabler-icons-react'

// const useStyles = createStyles((theme) => ({
//   title: {
//     fontSize: 26,
//     fontWeight: 900,
//     fontFamily: `Greycliff CF, ${theme.fontFamily}`,
//   },

//   controls: {
//     [theme.fn.smallerThan('xs')]: {
//       flexDirection: 'column-reverse',
//     },
//   },

//   control: {
//     [theme.fn.smallerThan('xs')]: {
//       width: '100%',
//       textAlign: 'center',
//     },
//   },
// }))

// export function Auth() {
//   const { classes } = useStyles()

//   return (
//     <Container size={460} my={30}>
//       <Title className={classes.title} align='center'>
//         Login
//       </Title>
//       <Text color='dimmed' size='sm' align='center'>
//         Enter your email to get a login link
//       </Text>

//       <Paper withBorder shadow='md' p={30} radius='md' mt='xl'>
//         <TextInput radius='md' size='md' label='Your email' placeholder='you@mail.com' required />
//         <Group position='apart' mt='lg' className={classes.controls}>
//           <Anchor color='dimmed' size='sm' className={classes.control}></Anchor>
//           <Button radius='sm' color='violet' className={classes.control}>
//             Get link
//           </Button>
//         </Group>
//       </Paper>
//     </Container>
//   )
// }
