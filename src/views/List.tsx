import React, { useEffect, useState } from 'react'
import {
  ActionIcon,
  Group,
  Input,
  Text,
  Checkbox,
  Space,
  Button,
  Container,
  Stack,
  Title,
} from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { Plus, Trash } from 'tabler-icons-react'
import { supabase } from '../supabase/client'
import Item from '../types/Item'

const List = () => {
  const [item, setItem] = useInputState('')
  const [items, setItems] = useState<Item[] | null>([])

  useEffect(() => {
    getItems().catch(console.error)
  }, [])

  const getItems = async () => {
    let { data: items, error } = await supabase
      .from('items')
      .select('*')
      .order('id', { ascending: false })
    if (error) console.log('error', error)
    else setItems(items)
  }

  const addItem = async () => {
    const user = supabase.auth.user()
    if (user) {
      await supabase.from('items').insert({ item, user_id: user.id }).single()
    }
  }

  const updateItem = async (item: Item) => {
    const user = supabase.auth.user()
    if (user) {
      if (item.is_complete) {
        await supabase.from('items').update({ is_complete: false }).match({ item: item.item })
        getItems().catch(console.error)
      } else {
        await supabase.from('items').update({ is_complete: true }).match({ item: item.item })
        getItems().catch(console.error)
      }
    }
  }

  const addItemKey = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // triggers by pressing the enter key
    if (e.keyCode === 13) {
      addItem()
      setItem('')
      getItems()
    }
  }

  const deleteItem = async (id: number) => {
    try {
      await supabase.from('items').delete().eq('id', id)
      if (items) setItems(items.filter((x) => x.id !== id))
    } catch (error) {
      console.log('error', error)
    }
  }

  const isInvalid = () => {
    if (item) return item.length < 4
    else undefined
  }

  return (
    <>
      <Container>
        <Group position='center'>
          <Input
            value={item}
            onChange={setItem}
            variant='filled'
            icon={<Plus size={16} />}
            placeholder='Add item'
            radius='md'
            size='md'
            invalid={isInvalid()}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              addItemKey(e)
            }}
          ></Input>
          <Button
            onClick={() => {
              addItem().then(getItems), setItem('')
            }}
            color='violet'
          >
            Add
          </Button>
        </Group>
      </Container>

      <Space h='xl'></Space>
      <Space h='xl'></Space>

      <Group>
        <Container>
          {items && items.find((item) => !item.is_complete) && (
            <Title>Needed Items &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Title>
          )}

          <Space h='lg'></Space>

          <Stack>
            {items &&
              items
                .filter((item) => !item.is_complete)
                .map((item, index) => (
                  <Group
                    className='hover:bg-neutral-100 dark:hover:bg-neutral-800 bg-opacity-10 rounded-md p-2'
                    position='apart'
                    key={item.id}
                  >
                    <Group>
                      <Checkbox
                        color='violet'
                        styles={{ input: { cursor: 'pointer' } }}
                        size='md'
                        checked={item.is_complete}
                        onChange={() => {
                          updateItem(item)
                        }}
                      ></Checkbox>
                      <Text size='xl'>{item.item}</Text>
                    </Group>
                    <ActionIcon color='red' variant='hover' onClick={() => deleteItem(item.id)}>
                      <Trash size={16} />
                    </ActionIcon>
                  </Group>
                ))}
          </Stack>
          <Space h='xl'></Space>
          <Space h='xl'></Space>

          {items && items.find((item) => item.is_complete) && <Title>Completed Items</Title>}
          <Space h='lg'></Space>
          <Stack>
            {items &&
              items
                .filter((item) => item.is_complete)
                .map((item) => (
                  <Group
                    className='hover:bg-neutral-100 dark:hover:bg-neutral-800 bg-opacity-10 rounded-md p-2'
                    position='apart'
                    key={item.id}
                  >
                    <Group>
                      <Checkbox
                        color='violet'
                        styles={{ input: { cursor: 'pointer' } }}
                        size='md'
                        checked={item.is_complete}
                        onChange={() => {
                          updateItem(item)
                        }}
                      ></Checkbox>
                      <Text size='xl'>{item.item}</Text>
                    </Group>
                    <ActionIcon color='red' variant='hover' onClick={() => deleteItem(item.id)}>
                      <Trash size={16} />
                    </ActionIcon>
                  </Group>
                ))}
          </Stack>
        </Container>
      </Group>
    </>
  )
}

export { List }
