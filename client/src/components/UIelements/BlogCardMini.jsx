/* eslint-disable react/prop-types */
import DOMPurify from 'dompurify';
import defaultImage from '../../assets/images/unilodge-poster.png'

const BlogExcerpt = ({ content }) => {
    // Use DOMPurify.sanitize to clean and sanitize HTML content
    const sanitizedContent = DOMPurify.sanitize(content);

    return (
        <div className="blog-excerpt">
            {/* Use dangerouslySetInnerHTML to render HTML content */}
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            {/* Custom styling for this is in the index css file */}
        </div>
    );

};

const BlogCardMini = ({ post }) => {
    return (
        <div className="bg-gray-100 border-y-2 border-orange-400 rounded-lg overflow-hidden shadow-md p-4">
            <div className="flex gap-4 items-center">
                <div className="w-24 md:w-28 shrink-0">
                    <img
                        src={post.featuredImage || defaultImage} // Use the actual image from your data
                        alt={post.title}
                        className="w-full h-24 object-cover mb-4 rounded-md shrink-0"
                    />
                </div>
                <div className="w-full line-clamp-3">
                    <h2 className="text-lg font-normal text-gray-800">{post.title}</h2>
                    <p className="text-sm text-gray-600">
                        <BlogExcerpt content={post.excerpt} />
                    </p>
                </div>
            </div>

        </div>
    )
}

export default BlogCardMini