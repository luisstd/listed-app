import { Text, Header, Group, ActionIcon, Space } from '@mantine/core'
import { Logout, MoonStars, Sun } from 'tabler-icons-react'

function HeaderBar({ signOut, user }: any) {
  return (
    <Header height={60} p='sm'>
      <Group className='justify-around md:justify-center md:gap-40' px='md'>
        <Text className='text-xl italic font-bold font-heading'>listed.fyi</Text>
        <Space w='xl'></Space>
        <Space w='xl'></Space>
        <Group>
          {user && (
            <ActionIcon size='lg' onClick={() => signOut()} title='Logout'>
              <Logout></Logout>
            </ActionIcon>
          )}
        </Group>
      </Group>
    </Header>
  )
}

export { HeaderBar }
