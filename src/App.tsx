import { useEffect, useState } from 'react'
import logo from './logo.svg'
import {
  AppShell,
  Button,
  Header,
  Navbar,
  Text,
  Group,
  MediaQuery,
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
  ActionIcon,
} from '@mantine/core'
import './App.css'
import Auth from './components/Auth'
import List from './components/List'
import { NotificationsProvider } from '@mantine/notifications'
import { supabase } from './supabase/client'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
import { MoonStars, Sun } from 'tabler-icons-react'
import { ColorSliderStylesNames } from '@mantine/core/lib/components/ColorPicker/ColorSlider/ColorSlider'

function App() {
  const user = supabase.auth.user()

  const preferredColorScheme = useColorScheme(undefined)

  const [count, setCount] = useState(0)
  const [opened, setOpened] = useState(false)
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme)

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || colorScheme === 'dark' ? 'light' : 'dark')

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <AppShell
            padding='md'
            navbar={
              <Navbar hidden={!opened} width={{ base: 300 }} height={500} p='xs'>
                <></>
              </Navbar>
            }
            header={
              <Header height={60} p='sm'>
                <Group position='apart' px='md'>
                  <Text size='xl' weight='bold'>
                    <em>listed.fyi </em>
                  </Text>
                  {!user && <Auth></Auth>}
                  <ActionIcon
                    size='lg'
                    onClick={() => toggleColorScheme()}
                    title='Toggle color scheme'
                  >
                    {colorScheme === 'dark' ? <Sun size={20} /> : <MoonStars size={20} />}
                  </ActionIcon>
                </Group>
              </Header>
            }
          >
            <List></List>
          </AppShell>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
