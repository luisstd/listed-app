import { useEffect, useState } from 'react'
import logo from './logo.svg'
import {
  AppShell,
  Button,
  Header,
  Navbar,
  Text,
  Group,
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
  ActionIcon,
  Stack,
  Space,
  Center,
  Container,
} from '@mantine/core'
import './index.css'
import Auth from './components/Auth'
import List from './components/List'
import { NotificationsProvider } from '@mantine/notifications'
import { supabase } from './supabase/client'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
import { MoonStars, Sun } from 'tabler-icons-react'

function App() {
  const user = supabase.auth.user()

  const preferredColorScheme = useColorScheme(undefined)

  const [count, setCount] = useState(0)
  const [opened, setOpened] = useState(false)
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme)

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || colorScheme === 'dark' ? 'light' : 'dark')

  return (
    <div className={colorScheme}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: 'Atkinson Hyperlegible, sans-serif',
            colorScheme: colorScheme,
            headings: {
              fontFamily: 'Atkinson Hyperlegible, sans-serif',
            },
          }}
        >
          <NotificationsProvider>
            <Header height={60} p='sm'>
              <Group position='apart' px='md'>
                <Text size='xl' weight='bold'>
                  <em>listed.fyi </em>
                </Text>
                <ActionIcon
                  size='lg'
                  onClick={() => toggleColorScheme()}
                  title='Toggle color scheme'
                >
                  {colorScheme === 'dark' ? <Sun size={20} /> : <MoonStars size={20} />}
                </ActionIcon>
              </Group>
            </Header>
            <Space h='lg'></Space>
            {!user ? <Auth /> : <List />}
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  )
}

export default App
