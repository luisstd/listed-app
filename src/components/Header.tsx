import { Text, Header, Group, ActionIcon, Space } from '@mantine/core'
import { Logout, MoonStars, Sun } from 'tabler-icons-react'

function HeaderBar({ colorScheme, toggleColorScheme, signOut, user }: any) {
  return (
    <Header height={60} p='sm'>
      <Group className='justify-around' px='md'>
        <Text className='font-bold font-heading italic text-xl'>listed.fyi</Text>
        <Space w='xl'></Space>
        <Space w='xl'></Space>
        <Group>
          <ActionIcon size='lg' onClick={() => toggleColorScheme()} title='Toggle color scheme'>
            {colorScheme === 'dark' ? <Sun size={20} /> : <MoonStars size={20} />}
          </ActionIcon>
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
