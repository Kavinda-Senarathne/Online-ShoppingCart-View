using Microsoft.IdentityModel.Tokens;
using OnlineShopping.Common;
using OnlineShopping.Data.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Enum = OnlineShopping.Common.Enum;

namespace OnlineShopping.Business.ManagerClasses
{
   public class UserManager :BaseManage
    {
        User user = new User();
        //key used to encrypt the password
        public static string key = "asdfrtgbvcqwe@59#";

        /// <summary>
        /// method to register user
        /// </summary>
        public OperationResult Register(UserDTO userDTO)
        {

            //new operarion result object to hold responce data
            OperationResult operationResult = new OperationResult();
            operationResult = UserExists(userDTO.Email);
            if (operationResult.Status == Common.Enum.Status.Success)
            {
                operationResult.Message = "user already exists!";
                operationResult.Status = Enum.Status.Error;
            }
            //operationResult.Status = Enum.Status.Success;
            else
            {

                //user.UserId = userDTO.UserId;
                operationResult = PasswordEncrypt(userDTO.Password);
                user.Password = operationResult.Data;
                user.FullName = userDTO.FullName;
                user.Email = userDTO.Email;
                user.Address_Line1 = userDTO.Address_Line1;
                user.Address_Line2 = userDTO.Address_Line2;
                user.State = userDTO.State;
                user.PostalCode = userDTO.PostalCode;

                //user.Password = userDTO.Password;
                UserRepository.Insert(user);
                UserRepository.Save();
                operationResult.Message = Constant.SuccessMessage;
                //check id
                //if (userDTO.UserId > 0)
                //{


                //}
            }



            return operationResult;


        }
        public OperationResult UserExists(string email)
        {
            OperationResult operationResult = new OperationResult();

            operationResult.Data = UserRepository.GetById(email);

            if (operationResult.Data == null)
            {
                operationResult.Status = Enum.Status.Error;
                return operationResult;
            }
            else
            {
                operationResult.Status = Enum.Status.Success;
                operationResult.Data = null;
                return operationResult;
            }
        }
        public OperationResult Login(LoginDTO loginDTO)
        {
            OperationResult operationResult = new OperationResult();

            user.Email = loginDTO.Email;
            operationResult = PasswordEncrypt(loginDTO.Password);
            user.Password = operationResult.Data;
            var email = UserRepository.GetById(user.Email);

            if ((email.Email == user.Email) && (email.Password == user.Password))
            {
                operationResult.Status = Enum.Status.Success;

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[] {
                       new Claim("Email", email.Email)
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("5678901234561234")), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                operationResult.Message = token;
                operationResult.Data = null;


            }
            else
            {
                operationResult.Message = "Username or Password is incorrect";
                operationResult.Status = Enum.Status.Error;
                operationResult.Data = null;
            }

            return operationResult;

        }
        public OperationResult GetUserDetails(string email)
        {
            // new operarion result object to hold responce data
            OperationResult operationResult = new OperationResult();
            operationResult.Status = Enum.Status.Success;
            operationResult.Message = Constant.SuccessMessage;
            var signinUser = UserRepository.GetById(email);
            operationResult.Data = signinUser;
            return operationResult;

        }
        public OperationResult PasswordEncrypt(string password)
        {
            OperationResult operationResult = new OperationResult();
            password += key;
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            operationResult.Data = Convert.ToBase64String(passwordBytes);
            return operationResult;


        }
    }
}
