using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using usmanrv.mvc.Domain;
using usmanrv.mvc.Domain.Enities;

namespace usmanrv.mvc.Domain.Concrete
{
	public class EFDbContext : DbContext
	{
		public EFDbContext()
			: base( "Employees" )
		{
			if ( !Database.Exists() )
			{
				Database.SetInitializer<EFDbContext>( new CreateDatabaseIfNotExists<EFDbContext>() );
				this.Database.Initialize( true );
				//this.Database.Create();
			}

		}

		public DbSet<EmployeeEntity> Employees { get; set; }
	}
}








