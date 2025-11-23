
'use client';

import React from 'react';
import type { ReactNode } from 'react';
import AppLayout from '@/components/AppLayout';

export default function SupportLayout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
