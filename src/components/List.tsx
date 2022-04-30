import { ActionIcon, Group, Input, Text, Checkbox, Space, Button } from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import React, { KeyboardEventHandler, useEffect, useState } from 'react'
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
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      addItem()
      setItem('')
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
      <Group position='center'>
        <Input
          value={item}
          onChange={setItem}
          variant='filled'
          icon={<Plus size={16} />}
          placeholder='Add item'
          width='max-width'
          invalid={isInvalid()}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            addItemKey(e).then(getItems)
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

      <Space h={50}></Space>

      {items && items.find((item) => !item.is_complete) && <Text weight='bold'>Needed Items</Text>}
      <div>
        {items &&
          items
            .filter((item) => !item.is_complete)
            .map((item, index) => (
              <Group key={item.id}>
                <Checkbox
                  color='violet'
                  styles={{ input: { cursor: 'pointer' } }}
                  checked={item.is_complete}
                  onChange={() => {
                    updateItem(item)
                  }}
                ></Checkbox>
                <Text> {item.item} </Text>
                <ActionIcon color='red' variant='hover' onClick={() => deleteItem(item.id)}>
                  <Trash size={16} />
                </ActionIcon>
              </Group>
            ))}
      </div>

      {items && items.find((item) => item.is_complete) && (
        <Text weight='bold'>Completed Items</Text>
      )}
      <div>
        {items &&
          items
            .filter((item) => item.is_complete)
            .map((item, index) => (
              <Group key={item.id}>
                <Checkbox
                  color='violet'
                  styles={{ input: { cursor: 'pointer' } }}
                  checked={item.is_complete}
                  onChange={() => {
                    updateItem(item)
                  }}
                ></Checkbox>
                <Text> {item.item} </Text>
                <ActionIcon color='red' variant='hover' onClick={() => deleteItem(item.id)}>
                  <Trash size={16} />
                </ActionIcon>
              </Group>
            ))}
      </div>
    </>
  )
}

export default List
