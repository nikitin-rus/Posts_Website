using Microsoft.EntityFrameworkCore;
using Posts_Website.Data;
using Posts_Website.Entities;

namespace Posts_Website.Repositories
{
    public interface ICommentRepository
    {
        Comment[] GetAllByUserId(Guid userId);

        Comment[] GetAllByPostId(Guid postId);

        Comment? GetById(Guid id);

        void Insert(Comment comment);

        void Update(Comment comment);

        void Delete(Guid id);

        void Save();
    }

    public class CommentRepository(ApplicationContext db) : ICommentRepository
    {
        public Comment[] GetAllByUserId(Guid userId)
        {
            return [.. db.Comments.Where(c => c.UserId == userId)
                                  .Include(c => c.User)];
        }

        public Comment[] GetAllByPostId(Guid postId)
        {
            return [.. db.Comments.Where(c => c.PostId == postId)
                                  .Include(c => c.User)];
        }

        public Comment? GetById(Guid id)
        {
            return db.Comments.Include(c => c.User)
                              .Include(c => c.Post)
                                  .ThenInclude(p => p!.User)
                              .FirstOrDefault(c => c.Id == id);
        }

        public void Insert(Comment comment)
        {
            db.Comments.Add(comment);
        }

        public void Update(Comment comment)
        {
            var commentInDb = db.Comments.Find(comment.Id);

            if (commentInDb != null)
            {
                commentInDb.Content = comment.Content;
            }
        }

        public void Delete(Guid id)
        {
            var commentInDb = db.Comments.Find(id);

            if (commentInDb != null)
            {
                db.Comments.Remove(commentInDb);
            }
        }

        public void Save()
        {
            db.SaveChanges();
        }
    }
}