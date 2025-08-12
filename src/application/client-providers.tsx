'use client';
import { ContextHandleProvider } from '@/application/context-handle';
import { LayersManagementHandleProvider } from '@/application/layers-management';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ContextHandleProvider>
      <LayersManagementHandleProvider>{children}</LayersManagementHandleProvider>
    </ContextHandleProvider>
  );
}
