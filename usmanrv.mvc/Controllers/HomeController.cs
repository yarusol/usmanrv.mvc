using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using usmanrv.mvc.Models;
using usmanrv.mvc.Domain.Abstract;
using usmanrv.mvc.Domain.Concrete;
using usmanrv.mvc.Domain.Enities;

namespace usmanrv.mvc.Controllers
{
	public class HomeController : Controller
	{

		[HttpGet]
		public ActionResult Index()
		{
			ViewBag.Employees = GetEmployees();
			return View();
		}

		[HttpPost]
		public ActionResult Index( EmployeeModel employee )
		{
			if ( !ModelState.IsValid )
			{
				ViewBag.Employees = GetEmployees();
				return View();
			}
			else
			{
				AddEmployee( employee );
				return RedirectToAction( "Index" );
			}

		}

		private List<EmployeeModel> GetEmployees()
		{
			List<EmployeeModel> emoployees = new List<EmployeeModel>();
			IEmployeesRepository repo = new EFEmployeesRepository();
			foreach ( EmployeeEntity entity in repo.Employees )
			{
				emoployees.Add( new EmployeeModel
				{
					Name = entity.Name,
					Surname = entity.Surname,
					Age = entity.Age,
					Profession = entity.Profession
				} );
			}
			return emoployees;
		}// TODO: DependencyInjection
		private void AddEmployee( EmployeeModel employee )
		{
			IEmployeesRepository repo = new EFEmployeesRepository();
			EmployeeEntity entity = new EmployeeEntity
			{
				Name = employee.Name,
				Surname = employee.Surname,
				Age = employee.Age,
				Profession = employee.Profession
			};
			repo.Add( entity );
		}// TODO: DependencyInjection

	}
}
