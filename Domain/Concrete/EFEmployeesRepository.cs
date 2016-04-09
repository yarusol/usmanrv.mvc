using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using usmanrv.mvc.Domain.Abstract;
using usmanrv.mvc.Domain.Enities;

namespace usmanrv.mvc.Domain.Concrete
{
	public class EFEmployeesRepository : IEmployeesRepository
	{
		private EFDbContext context = new EFDbContext();

		public IQueryable<EmployeeEntity> Employees
		{
			get
			{
				return context.Employees;
			}
		}

		public void Add( EmployeeEntity employee )
		{
			context.Employees.Add( employee );
			context.SaveChanges();
		}
	}
}
