import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import SourceIcon from '@mui/icons-material/Source';
import ShareIcon from '@mui/icons-material/Share';
import LanguageIcon from '@mui/icons-material/Language';

export function IconBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLanguageClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = lang => {
    setAnchorEl(null);
    if (lang) {
      console.log('Selected language:', lang);
    }
  };

  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => alert('URL copied to clipboard!'))
      .catch(() => alert('Failed to copy URL'));
  };

  // href="https://example.com"
  // target="_blank"

  return (
    <div className="flex flex-row items-center gap-2 p-2">
      <Button
        variant="outlined"
        startIcon={<SourceIcon />}
        component="a"
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Source
      </Button>
      <Button variant="outlined" startIcon={<ShareIcon />} onClick={handleShare}>
        Source
      </Button>
      <Button variant="outlined" startIcon={<LanguageIcon />} onClick={handleLanguageClick}>
        Language
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={() => handleLanguageClose('')}>
        <MenuItem onClick={() => handleLanguageClose('English')}>English</MenuItem>
        <MenuItem onClick={() => handleLanguageClose('Spanish')}>Spanish</MenuItem>
        <MenuItem onClick={() => handleLanguageClose('French')}>French</MenuItem>
      </Menu>
    </div>
  );
}
