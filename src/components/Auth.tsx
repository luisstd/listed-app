import { useState } from 'react'
import { useInputState } from '@mantine/hooks'
import { supabase } from '../supabase/client'
import { Button, Group, Input, Modal, Notification } from '@mantine/core'
import { At } from 'tabler-icons-react'
import { showNotification } from '@mantine/notifications'

const Login = () => {
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
      <Modal opened={opened} onClose={() => setOpened(false)} title='Login via e-mail'>
        <Group>
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
            Get link
          </Button>
        </Group>
      </Modal>
      <Button color='violet' onClick={() => setOpened(true)}>
        Login
      </Button>
    </>
  )
}
export default Login
