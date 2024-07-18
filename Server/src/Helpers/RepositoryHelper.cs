using Microsoft.EntityFrameworkCore;
using Posts_Website.Entities;

namespace Posts_Website.Helpers
{
    public static class RepositoryHelper
    {
        public static Post[] GetPosts(
            IQueryable<Post> posts,
            string search,
            string sort,
            int offset,
            int limit
        )
        {
            posts = posts.Where(p => EF.Functions.Like(
                p.Content.ToLower(), 
                $"%{search}%".ToLower()
            ));

            switch (sort)
            {
                case "old":
                    {
                        posts = posts.OrderBy(p => p.PublishedAt);
                        break;
                    }
                default:
                    {
                        posts = posts.OrderByDescending(p => p.PublishedAt);
                        break;
                    }
            }

            return [.. posts
                .Skip(offset)
                .Take(limit)
                .Include(p => p.User)
            ];
        }

        public static Comment[] GetComments(
            IQueryable<Comment> comments,
            string search,
            string sort,
            int offset,
            int limit
        )
        {
            comments = comments.Where(c => EF.Functions.Like(
                c.Content.ToLower(), 
                $"%{search}%".ToLower()
            ));

            switch (sort)
            {
                case "old":
                    {
                        comments = comments.OrderBy(c => c.WrittenAt);
                        break;
                    }
                default:
                    {
                        comments = comments.OrderByDescending(c => c.WrittenAt);
                        break;
                    }
            }

            return [.. comments
                .Skip(offset)
                .Take(limit)
                .Include(c => c.User)
            ];
        }
    }
}