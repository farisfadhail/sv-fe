'use client';

import {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';

export default function PublishedArticles() {
  const [articles, setArticles] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch(
          `http://localhost:8080/api/article?status=publish&limit=${limit}&offset=${offset}`,
      );
      if (!res.ok) throw new Error('Failed to fetch articles');
      const data = await res.json();
      setArticles(data);
      setTotal(data.length);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [offset]);

  const nextPage = () => setOffset(offset + limit);
  const prevPage = () => setOffset(Math.max(0, offset - limit));

  return (
      <div className="max-w-6xl mx-auto py-10 px-6">
        <h1 className="text-2xl font-bold mb-6">Published Articles</h1>

        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {!loading && articles.length === 0 && (
            <p className="text-center text-gray-500">No published articles
              found.</p>
        )}

        <div className="flex flex-col gap-6">
          {articles.map((article) => (
              <Card key={article.id} className="w-full shadow-sm gap-0">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-3">
                    <Badge variant="outline">{article.category}</Badge>
                  </p>
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {article.content}
                  </div>
                </CardContent>
              </Card>
          ))}
        </div>

        <div className="flex justify-between items-center mt-10">
          <Button
              variant="outline"
              onClick={prevPage}
              disabled={offset === 0 || loading}
              className="cursor-pointer"
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
          Showing {offset + 1}–{offset + articles.length} of {total}
        </span>
          <Button
              variant="outline"
              onClick={nextPage}
              disabled={articles.length < limit || loading}
              className="cursor-pointer"
          >
            Next
          </Button>
        </div>
      </div>
  );
}
