using Microsoft.EntityFrameworkCore;
using Posts_Website.Data;
using Posts_Website.Entities;
using Posts_Website.Helpers;

namespace Posts_Website.Repositories
{
    public interface IPostRepository
    {
        Post[] Get(
            string search,
            string sort,
            int offset,
            int limit
        );

        Post[] Get(
            Guid userId,
            string search,
            string sort,
            int offset,
            int limit
        );

        Post? GetById(Guid id);

        int GetCount(string search);

        int GetCount(Guid userId, string search);

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
            int offset,
            int limit
        )
        {
            return RepositoryHelper.GetPosts(
                db.Posts.AsQueryable(),
                search,
                sort,
                offset,
                limit
            );
        }

        public Post[] Get(
            Guid userId,
            string search,
            string sort,
            int offset,
            int limit
        )
        {
            return RepositoryHelper.GetPosts(
                db.Posts.Where(p => p.UserId == userId),
                search,
                sort,
                offset,
                limit
            );
        }

        public Post? GetById(Guid id)
        {
            return db.Posts.Include(p => p.User)
                .Include(p => p.Comments)
                    .ThenInclude(c => c.User)
                .FirstOrDefault(p => p.Id == id);
        }

        public int GetCount(string search)
        {
            return db.Posts.Where(p => EF.Functions.Like(
                p.Content.ToLower(),
                $"%{search}%".ToLower()
            )).Count();
        }

        public int GetCount(Guid userId, string search)
        {
            return db.Posts
                .Where(p => p.UserId == userId)
                .Where(p => EF.Functions.Like(
                    p.Content.ToLower(), 
                    $"%{search}%".ToLower()
                )).Count();
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