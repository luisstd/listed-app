import '@fontsource/atkinson-hyperlegible'
import '@fontsource/space-mono'
import '@fontsource/recursive'
import { useEffect, useState } from 'react'
import logo from './logo.svg'
import {
  Header,
  Text,
  Group,
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
  ActionIcon,
  Space,
  Title,
} from '@mantine/core'
import './index.css'
import Auth from './components/Auth'
import List from './components/List'
import { NotificationsProvider } from '@mantine/notifications'
import { supabase } from './supabase/client'
import { useColorScheme } from '@mantine/hooks'
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
            fontFamilyMonospace: 'Space Mono, monospace',
            colorScheme: colorScheme,
            headings: {
              fontFamily: 'Recursive, sans-serif',
            },
          }}
        >
          <NotificationsProvider>
            <Header height={60} p='sm'>
              <Group position='apart' px='md'>
                <Text className='font-bold font-heading italic text-xl '>listed.fyi</Text>
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
