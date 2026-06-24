import {
  AlertDialog, AlertDialogBody, AlertDialogFooter,
  AlertDialogHeader, AlertDialogContent, AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import { useRef } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  body?: string
  isLoading?: boolean
}

export function ConfirmDialog({
  isOpen, onClose, onConfirm,
  title = 'Eliminar',
  body = '¿Estás seguro? Esta acción no se puede deshacer.',
  isLoading,
}: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontWeight="bold">{title}</AlertDialogHeader>
          <AlertDialogBody>{body}</AlertDialogBody>
          <AlertDialogFooter gap={3}>
            <Button ref={cancelRef} onClick={onClose} variant="ghost">Cancelar</Button>
            <Button colorScheme="red" onClick={onConfirm} isLoading={isLoading}>Eliminar</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
