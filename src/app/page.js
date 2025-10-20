'use client';

import {useEffect, useMemo, useState} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {DataTable} from '@/components/datatable';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

export const columns = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({row}) => {
      const text = row.original.title || '';
      return (
          <span title={text}>
          {text.length > 30 ? text.substring(0, 30) + '...' : text}
        </span>
      );
    },
  },
  {
    accessorKey: 'content',
    header: 'Content',
    cell: ({row}) => {
      const text = row.original.content || '';
      return (
          <span title={text}>
          {text.length > 100 ? text.substring(0, 100) + '...' : text}
        </span>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    id: 'actions',
    cell: ({row}) => {
      const article = row.original;

      return (
          <div className="gap-4 flex">
            <Link href="/posts/edit/[id]" as={`/posts/edit/${article.id}`}>
              <Button variant="outline" className="cursor-pointer">
                Edit
              </Button>
            </Link>
            <Button variant="outline" className="cursor-pointer">
              Thrash
            </Button>
          </div>
      );
    },
  },
];

export default function Home() {
  const [data, setData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:8080/api/article');
        if (!res.ok) throw new Error('Failed to fetch data');
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    if (statusFilter === 'all') return data;
    return data.filter((item) => item.status === statusFilter);
  }, [data, statusFilter]);

  return (
      <div className="p-8 sm:p-20">
        <main>
          <Tabs
              defaultValue="all"
              value={statusFilter}
              onValueChange={setStatusFilter}
              className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="all"
                           className="cursor-pointer">All</TabsTrigger>
              <TabsTrigger value="draft"
                           className="cursor-pointer">Draft</TabsTrigger>
              <TabsTrigger value="publish"
                           className="cursor-pointer">Publish</TabsTrigger>
              <TabsTrigger value="thrash"
                           className="cursor-pointer">Thrash</TabsTrigger>
            </TabsList>

            <TabsContent value={statusFilter}>
              {loading ? (
                  <div className="text-center p-8">Loading...</div>
              ) : error ? (
                  <div className="text-center text-red-500 p-8">{error}</div>
              ) : (
                  <DataTable columns={columns} data={filteredData}/>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
  );
}