import React from 'react'
import { atom } from 'recoil'
import { item } from '../screens/HomeScreen'
interface listinter {
    id: number,
    title: string,
}
export const todoList = atom({
    key: 'list',
    default: [] as item[]
})