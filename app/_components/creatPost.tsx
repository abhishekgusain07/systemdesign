'use client'

import { Button } from "@/components/ui/button";
import { createPost } from "@/utils/data/post/createPost";
import { ComponentType, createElement, useState } from "react";
import { toast } from "sonner";
import { MDXProvider } from "@mdx-js/react";
import { evaluate, EvaluateOptions } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { CompiledMDX, MDXComponents } from "@/utils/mdx/types";
import { Post } from "@/utils/types";

const components: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1 className="text-2xl font-bold mb-4" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-xl font-semibold mb-3" {...props}>
      {children}
    </h2>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-4 text-gray-700" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc pl-6 mb-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal pl-6 mb-4" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="mb-2" {...props}>
      {children}
    </li>
  ),
  code: ({ children, ...props }) => (
    <code className="bg-gray-100 rounded px-2 py-1 text-sm" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre className="bg-gray-100 rounded p-4 overflow-x-auto mb-4" {...props}>
      {children}
    </pre>
  ),
};

const CreatePost = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [fetchingPost, setFetchingPost] = useState<boolean>(false);
    const [compiledContent, setCompiledContent] = useState<ComponentType | null>(null);
    const [error, setError] = useState<string | null>(null);

    const renderMDX = async (content: string): Promise<void> => {
        try {
            const options: EvaluateOptions = {
                ...runtime,
                baseUrl: typeof window !== 'undefined' ? window.location.href : '',
            };

            const { default: Content } = await evaluate(content, options) as CompiledMDX;
            setCompiledContent(() => Content);
            setError(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error compiling MDX';
            console.error('Error compiling MDX:', err);
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    const createThePost = async (): Promise<void> => {
        setFetchingPost(true);
        try {
            const newPost = await createPost();
            if (!newPost) {
                throw new Error('Failed to create post');
            }
            
            setPost(newPost);
            if (newPost.content) {
                await renderMDX(newPost.content);
            }
            toast.success('Post created successfully');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setFetchingPost(false);
        }
    };

    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            <Button 
                variant="default" 
                onClick={createThePost} 
                disabled={fetchingPost}
            >
                {fetchingPost ? 'Creating...' : 'Create Post'}
            </Button>
            
            {error && (
                <div className="text-red-500 mt-2">
                    {error}
                </div>
            )}
            
            {post && (
                <div className="w-full max-w-2xl mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                    <div className="prose prose-sm sm:prose lg:prose-lg">
                        <MDXProvider components={components as Readonly<MDXComponents>}>
                            {compiledContent && createElement(compiledContent)}
                        </MDXProvider>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreatePost;