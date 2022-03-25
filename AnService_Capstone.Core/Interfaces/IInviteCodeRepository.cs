using AnService_Capstone.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Interfaces
{
    public interface IInviteCodeRepository
    {
        public Task<TblInviteCode> CheckInviteCode(string code);

        public Task<bool> CreateInviteCode(int userID, string code);

        public Task<bool> UpdateIsUsedInviteCode(int id);
    }
}
