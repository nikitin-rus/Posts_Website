using Microsoft.EntityFrameworkCore;
using Posts_Website.Entities;

namespace Posts_Website.Data
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Post> Posts { get; set; } = null!;
        public DbSet<Comment> Comments { get; set; } = null!;

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            User[] users = [
                new(Guid.NewGuid(), "rusnik", "rusnik@gmail.com", "12345678"),
                new(Guid.NewGuid(), "olepak", "olepak@gmail.com", "12345678"),
                new(Guid.NewGuid(), "andfom", "andfom@gmail.com", "12345678")
            ];

            Post[] posts = [
                new(Guid.NewGuid(), users[0].Id, """
                Расшифровка кода Энигмы

                Во время Второй мировой войны немецкая армия использовала шифровальную машину под названием "Энигма" для передачи секретных сообщений.
                
                Считалось, что код Энигмы невозможно взломать, что делало его бесценным инструментом для немецкого командования.
                
                Однако в 1932 году польские математики смогли взломать код Энигмы, а затем поделились этой информацией с британской разведывательной службой MI6.
                
                Британцы смогли создать собственную машину для расшифровки Энигмы, названную "Колосс", которая позволила им читать немецкие сообщения.

                Расшифровка кода Энигмы сыграла решающую роль в победе союзников во Второй мировой войне.
                """, DateTime.Now.ToString("O")),
                new(Guid.NewGuid(), users[1].Id, """
                Переход через Ла-Манш на воздушном шаре

                25 января 1785 года французский воздухоплаватель Жан-Франсуа Пилатр де Розье и его помощник механик Анри Розье совершили первый в истории успешный полет через Ла-Манш на воздушном шаре.

                Их воздушный шар, названный "Le Globe", был наполнен водородом и имел диаметр около 7 метров. Полет длился около двух часов и преодолел расстояние около 37 километров.

                Пилатр де Розье и Розье были встречены с энтузиазмом по прибытии в Англию, где их полет был воспринят как знаменательное событие в истории человечества.    
                """, DateTime.Now.AddHours(-1).ToString("O")),
                new(Guid.NewGuid(), users[2].Id, """
                Первый в мире программируемый компьютер: Z3

                В 1941 году, во время Второй мировой войны, немецкий инженер Конрад Цузе создал первый в мире программируемый компьютер под названием Z3.

                Z3 был электромеханическим компьютером, построенным из 2000 реле и 6000 электронных ламп. Он мог выполнять вычисления и логические операции, а также хранить данные на перфокартах.

                Z3 использовался для различных научных и инженерных расчетов, включая баллистические таблицы для немецких артиллерийских орудий.

                Несмотря на то, что Z3 был разрушен во время бомбардировки союзниками в 1945 году, его влияние на развитие информатики нельзя переоценить. Z3 проложил путь к созданию современных компьютеров, которые сегодня используются во всем мире.

                Интересные факты:

                    Z3 мог выполнять вычисления со скоростью 30 операций в секунду.
                    Z3 был размером с небольшую комнату.
                    Z3 программировался с помощью перфокарт, на которых были записаны двоичные коды.

                Z3 - это важный этап в истории информатики, который демонстрирует человеческую изобретательность и стремление к прогрессу даже в самые трудные времена.
                """, DateTime.Now.AddHours(-2).ToString("O")),
            ];

            Comment[] comments = [
                new(Guid.NewGuid(), users[1].Id, posts[0].Id, "Где вы это прочитали?", DateTime.Now.ToString("O")),
                new(Guid.NewGuid(), users[2].Id, posts[0].Id, "Очень интересно!", DateTime.Now.ToString("O")),
                new(Guid.NewGuid(), users[0].Id, posts[1].Id, "Спасибо!", DateTime.Now.ToString("O")),
                new(Guid.NewGuid(), users[2].Id, posts[1].Id, "Потрясающе.", DateTime.Now.ToString("O")),
                new(Guid.NewGuid(), users[0].Id, posts[2].Id, "Это великое событие в истории человечества.", DateTime.Now.ToString("O")),
                new(Guid.NewGuid(), users[1].Id, posts[2].Id, "Ого!", DateTime.Now.ToString("O")),
            ];

            modelBuilder.Entity<User>().HasData(users);
            modelBuilder.Entity<Post>().HasData(posts);
            modelBuilder.Entity<Comment>().HasData(comments);
        }
    }
}