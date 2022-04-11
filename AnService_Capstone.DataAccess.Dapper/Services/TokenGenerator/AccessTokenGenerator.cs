using AnService_Capstone.Core.Models.Response;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.DataAccess.Dapper.TokenGenerator
{
    public class AccessTokenGenerator
    {
        private readonly IConfiguration _configuration;

        public AccessTokenGenerator(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public TokenViewModel GenerateToken(UserViewModel user, string refreshToken)
        {
            var _symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtAuth:SecretKey"]));
            var _signingCredentials = new SigningCredentials(_symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            /*var header = new JwtHeader(signingCredentials);*/

            var claims = new[] {
                 new Claim(ClaimTypes.Name, user.FullName), //user01
                 new Claim(ClaimTypes.Role, user.RoleName)
             };

            /*var payload = new JwtPayload
            (
                _configuration["JwtAuth:Issuer"],
                _configuration["JwtAuth:Audience"],
                claims,
                DateTime.UtcNow.AddMinutes(30),
                DateTime.Now
            );

            var token = new JwtSecurityToken(header, payload);*/

            var token = new JwtSecurityToken(
                    issuer: _configuration["JwtAuth:Issuer"],
                    audience: _configuration["JwtAuth:Audience"],
                    expires: DateTime.UtcNow.AddMinutes(180),
                    claims: claims,
                    signingCredentials: _signingCredentials
                );

            /*return new JwtSecurityTokenHandler().WriteToken(token);*/
            return new TokenViewModel
            {
                Id = user.UserID,
                FullName = user.FullName,
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                RefreshToken = refreshToken,
                UserRole = user.RoleName,
                Expired = token.ValidTo

            };
        }
    }
}
