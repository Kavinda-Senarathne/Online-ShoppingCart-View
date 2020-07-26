using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShopping.Business.ManagerClasses;
using OnlineShopping.Common;

namespace OnlineShopping.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class User : ControllerBase
    {
        #region private properties
        UserManager userManager = new UserManager();
        UserDTO user = new UserDTO();
        LoginDTO loginuser = new LoginDTO();
        #endregion
        /// <summary>
        /// Method to register new user
        /// </summary>
        [HttpPost("Register")]
        public OperationResult Register(UserDTO userDTO)
        {

           
            user.FullName = userDTO.FullName;
            user.Email = userDTO.Email;
            user.Password = userDTO.Password;
            user.Address_Line1 = userDTO.Address_Line1;
            user.Address_Line2 = userDTO.Address_Line2;
            user.State = userDTO.State;
            user.PostalCode = userDTO.PostalCode;

            OperationResult operationResult = userManager.Register(user);

            return operationResult;
        }
        [HttpPost("Login")]
        public OperationResult Login(LoginDTO loginDTO)
        {
            loginuser.Email = loginDTO.Email;
            loginuser.Password = loginDTO.Password;
            OperationResult operation = userManager.Login(loginuser);
            return operation;
        }
        [HttpGet("GetUserDetails")]
        [Authorize]
        public OperationResult GetUserDetails()
        {
            string Email = User.Claims.First(c => c.Type == "Email").Value;
            OperationResult user = userManager.GetUserDetails(Email);
            return user;
        }
    }
}
