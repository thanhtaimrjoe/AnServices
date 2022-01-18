﻿using AnService_Capstone.Core.Entities;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.Core.Interfaces
{
    public interface IServiceRepository
    {
        public Task<int> CreateRequestService(CreateService model);

        public Task<TblService> GetServiceByID(int id);

        public Task<bool> CreateRequestDetai(int requestID, int serviceID);

        public Task<bool> CreateMedia(int requestID, string url);

        /*public Task<IEnumerable<TblRequestService>> GetAllRequestService();*/

        public Task<IEnumerable<RequestService>> GetAllRequestService2();

        public Task<RequestService> GetRequestServiceByID(int id);

        public Task<IEnumerable<RequestService>> GetAllRequestServiceByUserID(int id);

        public Task<IEnumerable<TblService>> GetAllService();

        public Task<IEnumerable<TblService>> GetServiceByName(string name);

        public Task<bool> AssignMansonToRequest(AssignJob job);

        public Task<IEnumerable<RequestService>> GetAllRequestServiceByMansonID(int id);

        public Task<IEnumerable<RequestServiceDetailViewModel>> GetRequestServiceDetailsByRequestServiceID(int id);
    }
}
