using Posts_Website.Entities;

namespace Posts_Website.Helpers
{
    public class SearchPostsResults
    (
        Post[] posts,
        int totalCount
    )
    {
        public Post[] Posts { get; } = posts;
        public int TotalCount { get; } = totalCount;
    }

    public class SearchCommentsResults
    (
        Comment[] comments,
        int totalCount
    )
    {
        public Comment[] Comments { get; } = comments;
        public int TotalCount { get; } = totalCount;
    }

    public static class ControllerHelper
    {
        public static SearchPostsResults SearchPosts
        (
            IEnumerable<Post> posts,
            string search = "",
            string sort = "new",
            int page = 1,
            int limit = 10
        )
        {
            limit = QueryHelper.NormalizeLimit(limit, 1, 10);

            posts = posts.Where(p =>
            {
                return p.Content.Contains(search, StringComparison.OrdinalIgnoreCase);
            });

            page = QueryHelper.NormalizePage(page, 1,
                QueryHelper.GetPages(posts.Count(), limit)
            );

            int offset = QueryHelper.GetOffset(page, limit);

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

            return new SearchPostsResults(
                [.. posts.Skip(offset).Take(limit)],
                posts.Count()
            );
        }

        public static SearchCommentsResults SearchComments
        (
            IEnumerable<Comment> comments,
            string search = "",
            string sort = "new",
            int page = 1,
            int limit = 10
        )
        {
            limit = QueryHelper.NormalizeLimit(limit, 1, 10);

            comments = comments.Where(c =>
            {
                return c.Content.Contains(search, StringComparison.OrdinalIgnoreCase);
            });

            page = QueryHelper.NormalizePage(page, 1,
                QueryHelper.GetPages(comments.Count(), limit)
            );

            int offset = QueryHelper.GetOffset(page, limit);

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

            return new SearchCommentsResults(
                [.. comments.Skip(offset).Take(limit)],
                comments.Count()
            );
        }
    }
}