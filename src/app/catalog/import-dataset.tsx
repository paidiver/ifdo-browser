'use client';
import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { fetchApiData } from '@/data-access/fetch-api-data';
import { SelectChangeEvent } from '@mui/material';

export function ImportDataset() {
  const [query, setQuery] = useState('');
  const [fileObj, setFileObj] = useState<File | null>(null);
  const [ifdoFormat, setIfdoFormat] = useState('file');
  const [loading, setLoading] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setIfdoFormat(event.target.value as 'file' | 'url');
    setQuery('');
    setFileObj(null);
  };

  const handleLoad = async () => {
    try {
      setLoading(true);

      let body: FormData | Record<string, any> | null = null;

      if (ifdoFormat === 'file') {
        if (!fileObj) {
          console.error('No file selected');
          setLoading(false);
          return;
        }
        body = new FormData();
        body.append('input_file', fileObj, fileObj.name);
      } else {
        if (!query.trim()) {
          console.error('No URL provided');
          setLoading(false);
          return;
        }
        body = { input_data: query.trim() };
      }
      const endpoint = ifdoFormat === 'file' ? 'datasets/ifdo/file' : 'datasets/ifdo/url';

      const data = await fetchApiData(endpoint, null, 'POST', body);
      console.log('Import successful:', data);

      window.location.reload();
    } catch (err) {
      console.error('Import failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-2">
      <p>Please import a dataset (iFDO file)...</p>
      <div className="flex flex-row items-center gap-4">
        <Select className="w-40 h-10" value={ifdoFormat} onChange={handleChange}>
          <MenuItem value={'file'}>File</MenuItem>
          <MenuItem value={'url'}>Url</MenuItem>
        </Select>

        {ifdoFormat === 'file' ? (
          <TextField
            type="file"
            variant="outlined"
            size="small"
            className="flex-1 bg-white rounded"
            onChange={e => {
              const file = (e.target as HTMLInputElement).files?.[0] || null;
              setFileObj(file);
              setQuery(file?.name || '');
            }}
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

        <Button
          variant="contained"
          color="primary"
          onClick={handleLoad}
          disabled={loading || (ifdoFormat === 'file' ? !fileObj : !query.trim())}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : undefined}
        >
          {loading ? 'Importing...' : 'Import'}
        </Button>
      </div>
    </div>
  );
}
