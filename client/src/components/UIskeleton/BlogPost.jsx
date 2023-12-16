/* eslint-disable react/prop-types */
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultImage from "../../assets/images/unilodge-poster.png";

const BlogContent = ({ content }) => {
    // Use DOMPurify.sanitize to clean and sanitize HTML content
    const sanitizedContent = DOMPurify.sanitize(content);

    return (
        <div className="blog-content">
            {/* Use dangerouslySetInnerHTML to render HTML content */}
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            {/* Custom styling for this is in the index css file */}
        </div>
    );

};

const BlogPost = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [blogPost, setBlogPost] = useState({});

    useEffect(() => {
        const getBlogPost = async () => {
            const res = await fetch(`/api/v1/blogs/post/${slug}`);
            const data = await res.json();
            setBlogPost(data);

            if (!res.ok) {
                console.log('Error fetching blog post');
                navigate('/404')
                return;
            }
        }
        getBlogPost();

        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, [slug, navigate]);


    return (
        <div className="relative isolate overflow-hidden bg-white pt-24 pb-20 sm:pt-32 lg:overflow-visible lg:px-0">

            {/* Content */}
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-1 lg:items-start lg:gap-y-10">
                <div className="lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">

                        {blogPost.featuredImage ? (
                            <img
                                src={blogPost.featuredImage}
                                alt={blogPost.title}
                                className="w-full h-64 lg:h-80 object-cover rounded-md mb-6"
                            />
                        ) : (
                            // Render the default image if featuredImage is null, undefined, or falsy
                            <img
                                src={defaultImage}
                                alt={blogPost.title}
                                className="w-full h-64 lg:h-80 object-cover rounded-md mb-6"
                            />
                        )}

                        <div className="lg:px-20 pt-5 lg:pt-14">
                            <p className="text-base font-extralight leading-7 text-orange-600">Published: {blogPost.date}</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{blogPost.title}</h1>
                            <p className="text-base font-light leading-7 text-orange-600">By: {blogPost.author}</p>

                            <div className="mt-6 text-lg leading-8 text-gray-700">
                                <BlogContent content={blogPost.content} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogPost