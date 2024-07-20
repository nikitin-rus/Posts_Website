using Microsoft.EntityFrameworkCore;
using Posts_Website.Data;
using Posts_Website.Entities;

namespace Posts_Website.Repositories
{
    public interface IUserRepository
    {
        User[] GetAll();

        User? GetById(Guid id);

        User? GetByEmail(string email);

        void Insert(User user);

        void Save();
    }

    public class UserRepository(ApplicationContext db) : IUserRepository
    {
        public User[] GetAll()
        {
            return [.. db.Users];
        }

        public User? GetById(Guid id)
        {
            return db.Users.Include(u => u.Posts)
                           .Include(u => u.Comments)
                           .FirstOrDefault(u => u.Id == id);
        }

        public User? GetByEmail(string email)
        {
            return db.Users.Include(u => u.Posts)
                           .Include(u => u.Comments)
                           .FirstOrDefault(u => u.Email == email);
        }

        public void Insert(User user)
        {
            db.Users.Add(user);
        }

        public void Save()
        {
            db.SaveChanges();
        }
    }
}