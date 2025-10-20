'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';

const formSchema = z.object({
  title: z.string().min(20, {message: 'Title must be at least 20 characters.'}),
  content: z.string().
      min(200, {message: 'Content must be at least 200 characters.'}),
  category: z.string().min(1, {message: 'Category is required.'}),
});

export default function AddPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data, status) => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:8080/api/article', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...data, status}),
      });

      if (!res.ok) throw new Error('Failed to create article');
      await res.json();

      reset();
      router.push('/posts');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="w-1/2">
        <main>
          <Link href="/posts">
            <Button className="cursor-pointer">Back to Post</Button>
          </Link>

          <form onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input type="text" id="title"
                     placeholder="Input title..." {...register('title')} />
              {errors.title &&
                  <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                  id="content"
                  placeholder="Write down your content"
                  rows={8}
                  {...register('content')}
              />
              {errors.content &&
                  <p className="text-red-500 text-sm">{errors.content.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                  type="text"
                  id="category"
                  placeholder="Input category..."
                  {...register('category')}
              />
              {errors.category &&
                  <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>

            <div className="flex justify-end mt-4 gap-4">
              <Button
                  type="button"
                  onClick={handleSubmit((data) => onSubmit(data, 'draft'))}
                  disabled={loading}
                  className="cursor-pointer"
              >
                {loading ? 'Saving...' : 'Draft'}
              </Button>

              <Button
                  type="button"
                  onClick={handleSubmit((data) => onSubmit(data, 'publish'))}
                  disabled={loading}
                  className="cursor-pointer"
              >
                {loading ? 'Saving...' : 'Publish'}
              </Button>
            </div>

            {message && <p className="text-sm mt-4 text-center">{message}</p>}
          </form>
        </main>
      </div>
  );
}
