
'use client';

import React from 'react';
import type { ReactNode } from 'react';
import AppLayout from '@/components/AppLayout';

export default function CommunityLayout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
