namespace usmanrv.mvc.Domain.Enities
{
	using System;
	using System.ComponentModel.DataAnnotations;
	using System.Data.Entity;
	using System.Linq;

	public class EmployeeEntity 
	{
		public int Id { get; set; }

		[Required( AllowEmptyStrings = false, ErrorMessage = "Field 'Name' is required." )]
		public string Name { get; set; }

		[Required( AllowEmptyStrings = false, ErrorMessage = "Field 'Name' is required." )]
		public string Surname { get; set; }

		[Range( 0, 100, ErrorMessage = "Available value for 'Age' is from 0 to 100." )]
		public int? Age { get; set; }

		public string Profession { get; set; }

	}

}