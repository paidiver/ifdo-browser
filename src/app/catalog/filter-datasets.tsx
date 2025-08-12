'use client';
import React, { useState } from 'react';
import { TextField, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export function FilterDatasets() {
  const [query, setQuery] = useState('');
  const [keyword, setKeyword] = useState('');

  // const handleLoad = () => {
  //   console.log('Loading for:', query);
  // };

  const handleChange = event => {
    setKeyword(event.target.value);
  };

  return (
    <div className="py-2">
      <div className="flex flex-row items-center gap-4">
        <TextField
          variant="outlined"
          placeholder="Filter datasets by title, description, or tags..."
          size="small"
          value={query}
          onChange={e => setQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon className="text-gray-500 mr-2" />
          }}
          className="bg-white rounded w-[50%]"
        />
        <Select
          className="w-[50%] h-10"
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={keyword}
          onChange={handleChange}
          label="keyword"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'benthic'}>Benthic</MenuItem>
          <MenuItem value={'pelagic'}>Pelagic</MenuItem>
          <MenuItem value={'plankton'}>Plankton</MenuItem>
        </Select>
      </div>
    </div>
  );
}
