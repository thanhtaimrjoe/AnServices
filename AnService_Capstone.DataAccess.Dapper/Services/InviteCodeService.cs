using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Interfaces.Services;
using AnService_Capstone.DataAccess.Dapper.Customize;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.DataAccess.Dapper.Services
{
    public class InviteCodeService : IInviteCodeService
    {
        private readonly IInviteCodeRepository _inviteCodeRepository;
        private readonly UtilHelper _utilHelper;

        public InviteCodeService(IInviteCodeRepository inviteCodeRepository, UtilHelper utilHelper)
        {
            _inviteCodeRepository = inviteCodeRepository;
            _utilHelper = utilHelper;
        }

        public async Task<string> CreateInviteCode(int userID)
        {
            var inviteCode = _utilHelper.RandomString(10);

            var res = await _inviteCodeRepository.CreateInviteCode(userID, inviteCode);

            return inviteCode;
        }
    }
}
