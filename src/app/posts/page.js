'use client';

import {useEffect, useMemo, useState} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {DataTable} from '@/components/datatable';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {DeleteIcon, PencilIcon} from 'lucide-react';

export const columns = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({row}) => {
      const text = row.original.title || '';
      return (
          <span title={text}>
          {text.length > 40 ? text.substring(0, 40) + '...' : text}
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
    cell: function ActionsCell({row}) {
      const article = row.original;
      const [loading, setLoading] = useState(false);
      const [message, setMessage] = useState('');
      const [open, setOpen] = useState(false); // kontrol dialog

      const handleThrash = async () => {
        setLoading(true);
        setMessage('');

        try {
          const res = await fetch(
              `http://localhost:8080/api/article/${article.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({status: 'thrash'}),
              });

          if (!res.ok) throw new Error('Failed to update status');

          setOpen(false);
          window.location.reload();
        } catch (err) {
          console.error(err);
          setMessage('Error updating status');
        } finally {
          setLoading(false);
        }
      };

      return (
          <div className="flex gap-4 items-center">
            <Link href={`/posts/edit/${article.id}`}>
              <Button variant="outline" className="cursor-pointer">
                <PencilIcon/>
              </Button>
            </Link>

            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button
                    variant="destructive"
                    className="cursor-pointer"
                    disabled={loading}
                >
                  <DeleteIcon/>
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will move the article to <b>Thrash</b>.
                    You can recover it later if needed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                      disabled={loading}>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                      onClick={handleThrash}
                      disabled={loading}
                      className="bg-red-600 text-white hover:bg-red-700"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {message && (
                <span className="text-xs text-gray-500 ml-2">{message}</span>
            )}
          </div>
      );
    },
  },
];

export default function Posts() {
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
      <main>
        <Tabs
            defaultValue="all"
            value={statusFilter}
            onValueChange={setStatusFilter}
            className="w-full"
        >
          <div>
            <Link href="/posts/add">
              <Button className="mb-4 cursor-pointer">Add New Post</Button>
            </Link>
          </div>
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
  );
}