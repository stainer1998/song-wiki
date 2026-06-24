import { useState } from 'react'
import { Box, Button, Heading, HStack, Text, useDisclosure } from '@chakra-ui/react'
import { LuPlus } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { DataTable } from '../ui/DataTable'
import { Pagination } from '../ui/Pagination'
import { ConfirmDialog } from '../ui/ConfirmDialog'
import { useResourceList } from '../../hooks/useResourceList'
import { useDeleteMutation } from '../../hooks/useResourceMutation'
import type { ColumnDef } from '../../types/api'

interface Props<T extends { id: number | string }> {
  resource: string
  title: string
  createPath: string
  columns: ColumnDef<T>[]
  pageSize?: number
}

export function ListPage<T extends { id: number | string }>({
  resource, title, createPath, columns, pageSize = 25,
}: Props<T>) {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [sortField, setSortField] = useState('id')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [deleteId, setDeleteId] = useState<number | string | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const ordering = sortOrder === 'desc' ? `-${sortField}` : sortField
  const { data, isLoading } = useResourceList<T>(resource, { page, pageSize, ordering })
  const deleteMutation = useDeleteMutation(resource)

  function handleSort(field: string) {
    if (field === sortField) {
      setSortOrder(o => o === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
    setPage(1)
  }

  function handleDeleteClick(id: number | string) {
    setDeleteId(id)
    onOpen()
  }

  async function handleConfirmDelete() {
    if (deleteId == null) return
    await deleteMutation.mutateAsync(deleteId)
    onClose()
    setDeleteId(null)
  }

  const deleteColumn: ColumnDef<T> = {
    key: '_actions',
    label: '',
    render: (row) => (
      <Button
        size="xs"
        colorScheme="red"
        variant="ghost"
        onClick={(e) => { e.stopPropagation(); handleDeleteClick(row.id) }}
      >
        Eliminar
      </Button>
    ),
  }

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">{title}</Heading>
        <Button leftIcon={<LuPlus />} colorScheme="teal" size="sm" onClick={() => navigate(createPath)}>
          Nuevo
        </Button>
      </HStack>

      {!isLoading && data?.count === 0 && (
        <Text color="gray.500" textAlign="center" py={12}>No hay registros aún.</Text>
      )}

      <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
        <DataTable
          columns={[...columns, deleteColumn]}
          data={data?.results ?? []}
          isLoading={isLoading}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
          onRowClick={(row) => navigate(`/${resource}/${row.id}`)}
        />
      </Box>

      <Pagination
        page={page}
        pageSize={pageSize}
        total={data?.count ?? 0}
        onChange={setPage}
      />

      <ConfirmDialog
        isOpen={isOpen}
        onClose={() => { onClose(); setDeleteId(null) }}
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
      />
    </Box>
  )
}
