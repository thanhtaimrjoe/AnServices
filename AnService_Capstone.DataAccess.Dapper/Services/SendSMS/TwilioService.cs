using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Twilio;
using Twilio.Clients;
using Twilio.Http;
using Twilio.Rest.Api.V2010.Account;

namespace AnService_Capstone.DataAccess.Dapper.Services.SendSMS
{
    public class TwilioService : ITwilioRestClient
    {
        private readonly ITwilioRestClient _innerClient;
        private readonly IConfiguration _config;
        public TwilioService(IConfiguration config, System.Net.Http.HttpClient httpClient)
        {
            // customize the underlying HttpClient
            _config = config;
            httpClient.DefaultRequestHeaders.Add("X-Custom-Header", "CustomTwilioRestClient-Demo");
            _innerClient = new TwilioRestClient(
                config["Twilio:AccountSid"],
                config["Twilio:AuthToken"],
                httpClient: new SystemNetHttpClient(httpClient));
        }

        public string AddNewOutgoingCallerID(string phone)
        {
            TwilioClient.Init(_config["Twilio:AccountSid"], _config["Twilio:AuthToken"]);

            var validationRequest = ValidationRequestResource.Create(
                friendlyName: phone,
                phoneNumber: new Twilio.Types.PhoneNumber(phone)
            );

            return validationRequest.ValidationCode;
        }

        public Response Request(Request request) => _innerClient.Request(request);
        public Task<Response> RequestAsync(Request request) => _innerClient.RequestAsync(request);
        public string AccountSid => _innerClient.AccountSid;
        public string Region => _innerClient.Region;
        public HttpClient HttpClient => _innerClient.HttpClient;
    }
}
