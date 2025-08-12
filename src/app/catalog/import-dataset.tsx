'use client';
import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import { fetchApiData } from '@/data-access/fetch-api-data';

export function ImportDataset() {
  const [query, setQuery] = useState('');
  const [ifdoFormat, setIfdoFormat] = useState('file');

  const handleChange = event => {
    setIfdoFormat(event.target.value);
    setQuery('');
  };
  const handleLoad = () => {
    // if (ifdoFormat === 'file') {
    //   fetchApiData('catalogs/', setCatalog);
    //     console.log('Loading file:', file.name);
    //     // Here you would typically handle the file upload
    //   } else {
    //     console.error('No file selected');
    //   }
    // } else {
    //   console.log('Loading from URL:', query);
    //   // Here you would typically handle the URL import
    // }
    setQuery('');
  };

  return (
    <div className="py-2">
      <p>Please import a dataset (iFDO file)... </p>
      <div className="flex flex-row items-center gap-4">
        <Select
          className="w-40 h-10"
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={ifdoFormat}
          onChange={handleChange}
          label="keyword"
        >
          <MenuItem value={'file'}>File</MenuItem>
          <MenuItem value={'url'}>Url</MenuItem>
        </Select>
        {ifdoFormat === 'file' ? (
          <TextField
            type="file"
            variant="outlined"
            size="small"
            className="flex-1 bg-white rounded"
            onChange={e => setQuery((e.target as HTMLInputElement).files?.[0]?.name || '')}
          />
        ) : (
          <TextField
            variant="outlined"
            placeholder="iFDO file URL or path"
            size="small"
            value={query}
            onChange={e => setQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon className="text-gray-500 mr-2" />
            }}
            className="flex-1 bg-white rounded"
          />
        )}
        <Button variant="contained" color="primary" onClick={handleLoad} disabled={!query}>
          Import
        </Button>
      </div>
    </div>
  );
}
