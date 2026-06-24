import { VStack, Box, Text, Button, Divider, Link } from '@chakra-ui/react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LuMusic, LuDisc, LuMic, LuUser, LuGlobe,
  LuTag, LuBuilding2, LuListMusic, LuLogOut,
} from 'react-icons/lu'
import { useAuth } from '../../auth/AuthContext'

const NAV_ITEMS = [
  { to: '/artists',  label: 'Artistas',       icon: LuMic },
  { to: '/albums',   label: 'Álbumes',         icon: LuDisc },
  { to: '/songs',    label: 'Canciones',       icon: LuMusic },
  { to: '/credits',  label: 'Créditos',        icon: LuListMusic },
  { to: '/persons',  label: 'Personas',        icon: LuUser },
  { to: '/genres',   label: 'Géneros',         icon: LuTag },
  { to: '/labels',   label: 'Sellos',          icon: LuBuilding2 },
  { to: '/countries',label: 'Países',          icon: LuGlobe },
]

export function Sidebar() {
  const { logout, user } = useAuth()
  const location = useLocation()

  return (
    <Box
      w="220px"
      minH="100vh"
      bg="gray.800"
      color="white"
      display="flex"
      flexDirection="column"
      py={4}
      px={3}
      flexShrink={0}
    >
      <Text fontWeight="bold" fontSize="lg" mb={6} px={2} color="teal.300">
        Song Wiki
      </Text>

      <VStack align="stretch" spacing={1} flex={1}>
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
          const active = location.pathname.startsWith(to)
          return (
            <Link
              key={to}
              as={NavLink}
              to={to}
              display="flex"
              alignItems="center"
              gap={3}
              px={3}
              py={2}
              borderRadius="md"
              bg={active ? 'teal.600' : 'transparent'}
              _hover={{ bg: active ? 'teal.500' : 'gray.700', textDecoration: 'none' }}
              fontSize="sm"
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </VStack>

      <Divider borderColor="gray.600" my={4} />
      <Text fontSize="xs" color="gray.400" px={2} mb={2}>{user?.username}</Text>
      <Button
        leftIcon={<LuLogOut />}
        variant="ghost"
        colorScheme="red"
        size="sm"
        justifyContent="flex-start"
        onClick={logout}
      >
        Cerrar sesión
      </Button>
    </Box>
  )
}
