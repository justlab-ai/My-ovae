
'use client';

import React, { Suspense } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeleton = () => (
    <div className="p-8">
        <Skeleton className="h-10 w-1/4 mb-8" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
        </div>
        <Skeleton className="h-64 w-full" />
    </div>
);

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
      <main className="flex-1 pt-20 pb-28">
        <AnimatePresence mode="wait">
          <m.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Suspense fallback={<LoadingSkeleton />}>
              {children}
            </Suspense>
          </m.div>
        </AnimatePresence>
      </main>
  );
}

    