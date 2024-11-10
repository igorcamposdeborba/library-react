import { Alert, CircularProgress, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

// API de terceiros: mostra citação da bíblia
export default function BibleApi() {
  const [verse, setVerse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => { // alterar estado do componente (readOnly)
    fetchVerse();
  }, []);

  // Requisição
  async function fetchVerse() {
    try {
        setError(null); // Limpar o erro anterior
        setLoading(true);
        const response = await fetch('https://bible-api.com/?random=verse&translation=almeida');
      
      if (!response.ok) {
        throw new Error('Erro ao obter o versículo. Tente novamente mais tarde.');
      }

      const data = await response.json();
        setVerse(`${data.reference}: "${data.text}"`);
    } catch (err: any) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  }

  return (
    <Container className="mt-5 text-center">
      <Typography variant="body2" gutterBottom className="text-gray-700">
        API de terceiros: citação bíblica
      </Typography>
      
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">
          {error}
        </Alert>
      ) : (
        <Typography variant="body2" className="text-gray-700 text-sm">
          {verse}
        </Typography>
      )}

    </Container>
  );
}
