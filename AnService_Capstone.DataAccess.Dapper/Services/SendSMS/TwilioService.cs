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
using Twilio.Types;

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
                phoneNumber: new PhoneNumber(phone)
            );

            return validationRequest.ValidationCode;
        }

        public void SendSMS(string phone, string msg)
        {
            var message = MessageResource.Create(
                to: new PhoneNumber(phone),
                from: new PhoneNumber("+17752695428"),
                body: msg,
                client: _innerClient);
        }

        public Response Request(Request request) => _innerClient.Request(request);
        public Task<Response> RequestAsync(Request request) => _innerClient.RequestAsync(request);
        public string AccountSid => _innerClient.AccountSid;
        public string Region => _innerClient.Region;
        public HttpClient HttpClient => _innerClient.HttpClient;
    }
}
