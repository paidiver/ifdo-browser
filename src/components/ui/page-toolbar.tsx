'use client';
import { Button, Divider, ToolbarProps } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import { IconBar } from './icon-bar';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
export interface PageToolbarProps extends ToolbarProps {
  title?: string;
  divider?: boolean;
  previous?: any;
}

export function PageToolbar({ title, divider = true, previous = null }: PageToolbarProps) {
  const newTitle = title || 'iFDO Browser';
  return (
    <div>
      <Head>
        <title>{newTitle} | iFDO Browser</title>
      </Head>
      <div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              {newTitle.length > 30 ? `${newTitle.slice(0, 30)}...` : title}
            </div>
            <IconBar />
          </div>
          {previous && (
            <div className="flex justify-start items-center">
              <p>In</p>
              <a href={`/${previous.url}`} className="text-blue-600 hover:underline px-2">
                {previous.name.length > 100 ? `${previous.name.slice(0, 100)}...` : previous.name}
              </a>
              <Button
                className="ml-2 p-2"
                variant="outlined"
                startIcon={<KeyboardReturnIcon />}
                href={`/${previous.url}`}
              >
                Up
              </Button>
            </div>
          )}
        </div>
      </div>
      {divider && <Divider />}
    </div>
  );
}
