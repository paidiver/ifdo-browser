'use client';
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export function SearchCatalog() {
  const [query, setQuery] = useState('');

  const handleLoad = () => {
    console.log('Loading for:', query);
  };

  return (
    <div className="py-2">
      <p>Please specify a iFDO catalog or API... </p>
      <div className="flex flex-row items-center gap-4">
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          value={query}
          onChange={e => setQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon className="text-gray-500 mr-2" />
          }}
          className="flex-1 bg-white rounded"
        />
        <Button variant="contained" color="primary" onClick={handleLoad}>
          Load
        </Button>
      </div>
    </div>
  );
}
