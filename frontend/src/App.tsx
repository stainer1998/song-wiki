import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { RequireAuth } from './auth/RequireAuth'
import { AppShell } from './components/layout/AppShell'
import { LoginPage } from './pages/LoginPage'

import { ArtistList } from './pages/artists/ArtistList'
import { ArtistEdit } from './pages/artists/ArtistEdit'
import { ArtistCreate } from './pages/artists/ArtistCreate'

import { AlbumList } from './pages/albums/AlbumList'
import { AlbumEdit } from './pages/albums/AlbumEdit'
import { AlbumCreate } from './pages/albums/AlbumCreate'

import { SongList } from './pages/songs/SongList'
import { SongEdit } from './pages/songs/SongEdit'
import { SongCreate } from './pages/songs/SongCreate'

import { CreditList } from './pages/credits/CreditList'
import { CreditEdit } from './pages/credits/CreditEdit'
import { CreditCreate } from './pages/credits/CreditCreate'

import { PersonList } from './pages/persons/PersonList'
import { PersonEdit } from './pages/persons/PersonEdit'
import { PersonCreate } from './pages/persons/PersonCreate'

import { GenreList } from './pages/genres/GenreList'
import { GenreEdit } from './pages/genres/GenreEdit'
import { GenreCreate } from './pages/genres/GenreCreate'

import { LabelList } from './pages/labels/LabelList'
import { LabelEdit } from './pages/labels/LabelEdit'
import { LabelCreate } from './pages/labels/LabelCreate'

import { CountryList } from './pages/countries/CountryList'
import { CountryEdit } from './pages/countries/CountryEdit'
import { CountryCreate } from './pages/countries/CountryCreate'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
})

export default function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<RequireAuth />}>
                <Route element={<AppShell />}>
                  <Route index element={<Navigate to="/artists" replace />} />

                  <Route path="artists" element={<ArtistList />} />
                  <Route path="artists/create" element={<ArtistCreate />} />
                  <Route path="artists/:id" element={<ArtistEdit />} />

                  <Route path="albums" element={<AlbumList />} />
                  <Route path="albums/create" element={<AlbumCreate />} />
                  <Route path="albums/:id" element={<AlbumEdit />} />

                  <Route path="songs" element={<SongList />} />
                  <Route path="songs/create" element={<SongCreate />} />
                  <Route path="songs/:id" element={<SongEdit />} />

                  <Route path="credits" element={<CreditList />} />
                  <Route path="credits/create" element={<CreditCreate />} />
                  <Route path="credits/:id" element={<CreditEdit />} />

                  <Route path="persons" element={<PersonList />} />
                  <Route path="persons/create" element={<PersonCreate />} />
                  <Route path="persons/:id" element={<PersonEdit />} />

                  <Route path="genres" element={<GenreList />} />
                  <Route path="genres/create" element={<GenreCreate />} />
                  <Route path="genres/:id" element={<GenreEdit />} />

                  <Route path="labels" element={<LabelList />} />
                  <Route path="labels/create" element={<LabelCreate />} />
                  <Route path="labels/:id" element={<LabelEdit />} />

                  <Route path="countries" element={<CountryList />} />
                  <Route path="countries/create" element={<CountryCreate />} />
                  <Route path="countries/:id" element={<CountryEdit />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  )
}
