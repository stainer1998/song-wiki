import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function AppShell() {
  return (
    <Flex minH="100vh">
      <Sidebar />
      <Box flex={1} bg="gray.50" p={8} overflowY="auto">
        <Outlet />
      </Box>
    </Flex>
  )
}
