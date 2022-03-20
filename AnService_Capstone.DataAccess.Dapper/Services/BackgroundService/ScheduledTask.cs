using AnService_Capstone.Core.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.DataAccess.Dapper.Services.BackgroundService
{
    public class ScheduledTask : ScheduledProcessor
    {
        public ScheduledTask(IServiceScopeFactory serviceScopeFactory) : base(serviceScopeFactory)
        {

        }
        protected override string Schedule => "0 0 */1 * *"; //every day auto run

        public override Task ProcessInScope(IServiceProvider serviceProvider)
        {
            /*Console.WriteLine("SampleTask1: " + DateTime.Now.ToString());*/

            IServiceRepository serviceRepository = serviceProvider.GetRequiredService<IServiceRepository>();
            serviceRepository.BackgroundServiceTask();

            return Task.CompletedTask;
        }
    }
}
