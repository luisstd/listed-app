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
  const session = supabase.auth.session()

  async function signOut() {
    await supabase.auth.signOut()
    window.location.reload()
  }

  const systemColorScheme = useColorScheme()

  const mantineTheme = {
    fontFamily: 'Atkinson Hyperlegible, sans-serif',
    fontFamilyMonospace: 'Space Mono, monospace',
    colorScheme: systemColorScheme,
    primaryColor: 'violet',
    headings: {
      fontFamily: 'Recursive, sans-serif',
    },
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
      <NotificationsProvider>
        <HeaderBar signOut={signOut} user={user} />
        <Space h='lg'></Space>
        {!session ? <Login /> : <List />}
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default App
