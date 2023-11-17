using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Test_Task.DAL;
using Test_Task.Models;
using Test_Task.Models.DBEntities;

namespace Test_Task.Controllers
{
    public class ContactsController : Controller
    {
        private readonly AppDbContext _context;

        public ContactsController(AppDbContext context)
        {
            _context = context;
        }


        // GET: Contacts
        public  IActionResult Index()
        {
              return 
                          View() ;
        }
        
        public JsonResult GetAll()
        {
           
            return Json(_context.Contacts.ToList());
        }
        [HttpPost]
        public JsonResult Insert(Contact model)
        {
            if (ModelState.IsValid)
            {
                _context.Contacts.Add(model);
                _context.SaveChanges();
                return Json("Saved");
            }
            else return Json("Failed");
        }
        [HttpGet]
        public JsonResult Update(int id)
        {var contact = _context.Contacts.Find(id);
        
            return Json(contact);
        }

        [HttpPost]
        public JsonResult Update (Contact contact)
        {
            if (ModelState.IsValid)
            {
                _context.Contacts.Update(contact);
                _context.SaveChanges();
                return Json("Updated");
            }
            else return Json("Failed");
        }
        [HttpPost]
        public JsonResult Delete (int id)
        {
            var contact = _context.Contacts.Find(id);
            if (contact != null)
            {
                _context.Contacts.Remove(contact);
                _context.SaveChanges();
                return Json("Deleted");
            }
            else return Json("Failed");
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
