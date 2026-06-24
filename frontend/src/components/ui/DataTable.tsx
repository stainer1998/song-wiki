import {
  Table, Thead, Tbody, Tr, Th, Td, TableContainer,
  Icon, HStack, Text, Skeleton,
} from '@chakra-ui/react'
import { LuArrowUp, LuArrowDown, LuArrowUpDown } from 'react-icons/lu'
import type { ColumnDef } from '../../types/api'

interface Props<T extends { id: number | string }> {
  columns: ColumnDef<T>[]
  data: T[]
  isLoading?: boolean
  sortField?: string
  sortOrder?: 'asc' | 'desc'
  onSort?: (field: string) => void
  onRowClick?: (row: T) => void
}

export function DataTable<T extends { id: number | string }>({
  columns, data, isLoading, sortField, sortOrder, onSort, onRowClick,
}: Props<T>) {
  function SortIcon({ field }: { field: string }) {
    if (field !== sortField) return <Icon as={LuArrowUpDown} boxSize={3} color="gray.400" />
    return sortOrder === 'asc'
      ? <Icon as={LuArrowUp} boxSize={3} />
      : <Icon as={LuArrowDown} boxSize={3} />
  }

  if (isLoading) {
    return (
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>{columns.map(c => <Th key={c.key}>{c.label}</Th>)}</Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <Tr key={i}>{columns.map(c => <Td key={c.key}><Skeleton h="16px" /></Td>)}</Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <TableContainer>
      <Table size="sm" variant="simple">
        <Thead bg="gray.100">
          <Tr>
            {columns.map(col => (
              <Th
                key={col.key}
                cursor={col.sortable ? 'pointer' : 'default'}
                userSelect="none"
                onClick={() => col.sortable && onSort?.(col.key)}
                _hover={col.sortable ? { bg: 'gray.200' } : undefined}
              >
                <HStack spacing={1}>
                  <Text>{col.label}</Text>
                  {col.sortable && <SortIcon field={col.key} />}
                </HStack>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map(row => (
            <Tr
              key={row.id}
              cursor={onRowClick ? 'pointer' : 'default'}
              _hover={onRowClick ? { bg: 'teal.50' } : undefined}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map(col => (
                <Td key={col.key}>
                  {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '')}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
