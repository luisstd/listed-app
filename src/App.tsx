import { MantineProvider, ColorScheme, Space } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'

import { Login } from './views/Login'
import { List } from './views/List'
import { HeaderBar } from './components/Header'
import { supabase } from './supabase/client'

import '@fontsource/atkinson-hyperlegible'
import '@fontsource/recursive'
import '@fontsource/space-mono'

function App() {
  const user = supabase.auth.user()

  async function signOut() {
    await supabase.auth.signOut()
    window.location.reload()
  }

  const systemColorScheme = useColorScheme()

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: systemColorScheme,
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || colorScheme === 'dark' ? 'light' : 'dark')

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: 'Atkinson Hyperlegible, sans-serif',
        fontFamilyMonospace: 'Space Mono, monospace',
        colorScheme: colorScheme,
        primaryColor: 'violet',
        headings: {
          fontFamily: 'Recursive, sans-serif',
        },
      }}
    >
      <NotificationsProvider>
        <HeaderBar
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
          signOut={signOut}
          user={user}
        />
        <Space h='lg'></Space>
        {!user ? <Login /> : <List />}
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default App
