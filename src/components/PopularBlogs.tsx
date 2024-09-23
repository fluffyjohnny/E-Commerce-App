import { MessageCircle, ThumbsUp } from "lucide-react";

const PopularBlogs = () => {
  const blogs = [
    {
      title: "Blog 1",
      author: "John",
      likes: 23,
      comments: 44,
    },
    {
      title: "Blog 2",
      author: "Daniel",
      likes: 25,
      comments: 24,
    },
    {
      title: "Blog 3",
      author: "Jeff",
      likes: 53,
      comments: 14,
    },
  ];

  return (
    <div className="bg-white p-5 w-[23rem] mt-4 border ml-5 rounded">
      <h2 className="text-xl font-bold mb-5">Popular Blogs</h2>
      <ul>
        {blogs.map((blog, index) => (
          <li key={index} className="mb-4">
            <div className="flex justify-between items-center">
              <span className="font-bold mb-2">{blog.title}</span>
            </div>
            <span className="text-grey-600">Published by {blog.author}</span>
            <div className="flex items-center mt-2">
              <MessageCircle size={16} />
              <span className="text-grey-500 mr-5 ml-1">{blog.likes}</span>
              <ThumbsUp size={16} />
              <span className="text-grey-500 mr-2 ml-2">{blog.comments}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularBlogs;
