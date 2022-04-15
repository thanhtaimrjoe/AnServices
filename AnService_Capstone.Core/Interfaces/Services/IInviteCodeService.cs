using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Interfaces.Services
{
    public interface IInviteCodeService
    {
        public Task<string> CreateInviteCode(int userID);
    }
}
