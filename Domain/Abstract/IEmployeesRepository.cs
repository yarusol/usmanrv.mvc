using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using usmanrv.mvc.Domain.Enities;

namespace usmanrv.mvc.Domain.Abstract
{
	public interface IEmployeesRepository
	{
		IQueryable<EmployeeEntity> Employees { get; }
		void Add( EmployeeEntity employee );
	}
}
