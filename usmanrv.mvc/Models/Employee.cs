using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace usmanrv.mvc.Models
{
	public class Employee
	{
		[Required( AllowEmptyStrings = false, ErrorMessage = "Enter the name of employee, please." )]
		public string Name { get; set; }

		[Required( AllowEmptyStrings = false, ErrorMessage = "Enter the surname of employee, please." )]
		public string Surname { get; set; }

		[Range( 0, 100 )]
		public byte Age { get; set; }

		public string Profession { get; set; }
	}
}