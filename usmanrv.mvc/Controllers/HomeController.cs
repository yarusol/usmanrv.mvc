using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using usmanrv.mvc.Models;

namespace usmanrv.mvc.Controllers
{
	public class HomeController : Controller
	{
		[HttpGet]
		public ActionResult Index()
		{
			return View();
		}

		[HttpPost]
		public ActionResult Index( Employee employee )
		{
			if ( ! ModelState.IsValid )
			{
				return View();
			}

			return null;
		}

	}
}
