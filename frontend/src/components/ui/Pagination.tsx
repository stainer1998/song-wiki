import { HStack, IconButton, Text } from '@chakra-ui/react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

interface Props {
  page: number
  pageSize: number
  total: number
  onChange: (page: number) => void
}

export function Pagination({ page, pageSize, total, onChange }: Props) {
  const from = Math.min((page - 1) * pageSize + 1, total)
  const to = Math.min(page * pageSize, total)
  const totalPages = Math.ceil(total / pageSize)

  return (
    <HStack justify="flex-end" mt={4} spacing={2}>
      <Text fontSize="sm" color="gray.600">
        {total === 0 ? '0 resultados' : `${from}–${to} de ${total}`}
      </Text>
      <IconButton
        aria-label="Página anterior"
        icon={<LuChevronLeft />}
        size="sm"
        variant="outline"
        isDisabled={page <= 1}
        onClick={() => onChange(page - 1)}
      />
      <IconButton
        aria-label="Página siguiente"
        icon={<LuChevronRight />}
        size="sm"
        variant="outline"
        isDisabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      />
    </HStack>
  )
}
