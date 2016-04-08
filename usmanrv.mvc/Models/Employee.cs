using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace usmanrv.mvc.Models
{
	public class Employee
	{
		[Required( AllowEmptyStrings = false, ErrorMessage = "Обов’язково потрібно ввести ім’я" )]
		public string Name { get; set; }

		[Required( AllowEmptyStrings = false, ErrorMessage = "Обов’язково потрібно ввести прізвище" )]
		public string Surname { get; set; }

		[Range( 0, 100, ErrorMessage = "Вік – це ціле число від 0 до 100" )]
		public int? Age { get; set; }

		public string Profession { get; set; }
	}
}