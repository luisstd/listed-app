import '@fontsource/atkinson-hyperlegible'
import '@fontsource/space-mono'
import '@fontsource/recursive'
import { ColorSchemeProvider, MantineProvider, ColorScheme, Space } from '@mantine/core'
import './index.css'
import Login from './components/Login'
import List from './components/List'
import HeaderBar from './components/Header'
import { NotificationsProvider } from '@mantine/notifications'
import { supabase } from './supabase/client'
import { useLocalStorage } from '@mantine/hooks'

function App() {
  const user = supabase.auth.user()

  async function signOut() {
    await supabase.auth.signOut()
    window.location.reload()
  }

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })

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
      </ColorSchemeProvider>
    </div>
  )
}

export default App
