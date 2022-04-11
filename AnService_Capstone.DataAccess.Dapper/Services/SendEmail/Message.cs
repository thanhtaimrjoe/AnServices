using Microsoft.AspNetCore.Http;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.DataAccess.Dapper.Services.SendEmail
{
    public class Message
    {
        public MailboxAddress To { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        /*public List<IFormFile> Attachments { get; set; }*/
        public Message(string to, string subject, string content)
        {
            To = new MailboxAddress(to);
            Subject = subject;
            Content = content;
        }
    }
}
