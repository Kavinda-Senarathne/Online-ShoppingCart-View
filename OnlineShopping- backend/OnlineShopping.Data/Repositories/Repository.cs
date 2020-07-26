using Microsoft.EntityFrameworkCore;
using OnlineShopping.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OnlineShopping.Data.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private OnlineShoppingDbContext context = null;
        private DbSet<T> table = null;

        public Repository()
        {
            this.context = new OnlineShoppingDbContext();
            table = context.Set<T>();
        }
        public Repository(OnlineShoppingDbContext context)
        {
            this.context = context;
            table = context.Set<T>();
        }
        public IEnumerable<T> GetAll()
        {
            return table.ToList();
        }
        public T GetById(object id)
        {
            return table.Find(id);
        }
        public void Insert(T obj)
        {
            table.Add(obj);
        }
        public void Update(T obj)
        {
            table.Attach(obj);
            context.Entry(obj).State = EntityState.Modified;
        }
        public void Delete(object id)
        {
            T existing = table.Find(id);
            table.Remove(existing);
        }
        public void Save()
        {
            context.SaveChanges();
        }
    }
}
