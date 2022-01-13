using AnService_Capstone.Core.Models.Response;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.DataAccess.Dapper.TokenGenerator
{
    public class RefreshTokenGenerator
    {
        private readonly IConfiguration _configuration;

        public RefreshTokenGenerator(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken()
        {
            var _symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtAuth:RefreshSecretKey"]));
            var _signingCredentials = new SigningCredentials(_symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                    issuer: _configuration["JwtAuth:Issuer"],
                    audience: _configuration["JwtAuth:Audience"],
                    expires: DateTime.UtcNow.AddMinutes(131400),
                    signingCredentials: _signingCredentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
