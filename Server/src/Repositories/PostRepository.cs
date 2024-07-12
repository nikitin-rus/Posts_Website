using Microsoft.EntityFrameworkCore;
using Posts_Website.Data;
using Posts_Website.Entities;

namespace Posts_Website.Repositories
{
    public interface IPostRepository
    {
        Post[] Get(
            string search,
            string sort,
            int limit,
            int offset
        );

        int GetLength(string search);

        Post? GetById(Guid id);

        void Insert(Post post);

        void Update(Post post);

        void Delete(Guid id);

        void Save();
    }

    public class PostRepository(ApplicationContext db) : IPostRepository
    {
        public Post[] Get(
            string search,
            string sort,
            int limit,
            int offset
        )
        {
            IQueryable<Post> sorted = sort == "old" ?
                sorted = db.Posts.OrderBy(p => p.PublishedAt) :
                sorted = db.Posts.OrderByDescending(p => p.PublishedAt);

            IEnumerable<Post> searched = sorted.Include(p => p.User)
                .Include(p => p.Comments)
                .ToArray()
                .Where(p => p.Content.Contains(search, StringComparison.OrdinalIgnoreCase))
                .Skip(offset);

            return [.. searched.Take(limit > 0 ? limit : searched.Count())];
        }

        public int GetLength(string search = "")
        {
            return db.Posts.ToArray()
                .Where(p => p.Content.Contains(search, StringComparison.OrdinalIgnoreCase))
                .Count();
        }

        public Post? GetById(Guid id)
        {
            return db.Posts.Include(p => p.User)
                .Include(p => p.Comments)
                    .ThenInclude(c => c.User)
                .FirstOrDefault(p => p.Id == id);
        }

        public void Insert(Post post)
        {
            db.Posts.Add(post);
        }

        public void Update(Post post)
        {
            var postInDb = db.Posts.Find(post.Id);

            if (postInDb != null)
            {
                postInDb.Content = post.Content;
            }
        }

        public void Delete(Guid id)
        {
            var postInDb = db.Posts.Find(id);

            if (postInDb != null)
            {
                db.Posts.Remove(postInDb);
            }
        }

        public void Save()
        {
            db.SaveChanges();
        }
    }
}