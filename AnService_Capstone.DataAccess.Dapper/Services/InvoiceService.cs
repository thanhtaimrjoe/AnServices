using AnService_Capstone.Core.Interfaces;
using AnService_Capstone.Core.Interfaces.Services;
using AnService_Capstone.Core.Models.Request;
using AnService_Capstone.Core.Models.Response;
using AnService_Capstone.DataAccess.Dapper.Services.SendEmail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnService_Capstone.DataAccess.Dapper.Services
{
    public class InvoiceService : IInvoiceService
    {
        private readonly IInvoiceRepository _invoice;
        private readonly IServiceRepository _serviceRepository;
        private readonly IContractRepository _contactRepository;
        private readonly IPromotionRepository _promotionRepository;
        private readonly IEmailSender _emailSender;
        private readonly IUserRepository _userRepository;

        public InvoiceService(IInvoiceRepository invoice, IServiceRepository serviceRepository, IContractRepository contactRepository, IPromotionRepository promotionRepository,
            IEmailSender emailSender, IUserRepository userRepository)
        {
            _invoice = invoice;
            _serviceRepository = serviceRepository;
            _contactRepository = contactRepository;
            _promotionRepository = promotionRepository;
            _emailSender = emailSender;
            _userRepository = userRepository;
        }

        public async Task<ErrorResponse> CreateInvoice(CreateInvoice invoice)
        {
            double totalPrice = 0;

            var check = await _invoice.CheckInvoiceExist(invoice.ContractID);

            if (check != null)
            {
                return new ErrorResponse("Duplicate Invoice");
            }

            var detail = await _serviceRepository.GetAllServiceRequestDetailsByServiceRequestID(invoice.ServiceRequestID);

            foreach (var item in detail)
            {
                if (item.RequestDetailStatus == 11)
                {
                    totalPrice += (double)item.RequestDetailPrice;
                }
            }

            var contact = await _contactRepository.GetContractByServiceRequestID(invoice.ServiceRequestID);
            double deposit = (double)(contact.ContractTotalPrice * contact.ContractDeposit);
            double vat = totalPrice * 0.1;

            var promotionObj = await _promotionRepository.GetInformationPromotionByID(invoice.PromotionID);
            if (promotionObj != null)
            {
                double promotion = totalPrice * (double)promotionObj.PromotionValue;
                totalPrice = totalPrice - deposit - promotion + vat;
            }

            totalPrice = totalPrice - deposit + vat;

            /*foreach (var price in invoice.RequestDetails)
            {
                totalPrice += price.Price;
            }*/

            var res = await _invoice.CreateInvoice(invoice.ServiceRequestID, invoice.ContractID, invoice.PromotionID, totalPrice);
            if (res)
            {
                _ = await _serviceRepository.UpdateStatusServiceRequest(invoice.ServiceRequestID, 14);
                return new ErrorResponse("Create Successful");
            }
            return new ErrorResponse("Create Fail");
        }

        public async Task<ContractViewModel> GetInfomationInvoiceByServiceRequestID(int serviceRequestID)
        {
            var res = await _invoice.GetInfomationInvoiceByServiceRequestID(serviceRequestID);
            return res;
        }

        public async Task<List<ContractViewModel>> GetInfomationInvoiceByServiceRequestIDForStaff(int serviceRequestID)
        {
            List<ContractViewModel> list = new List<ContractViewModel>();
            ContractViewModel invoice;

            invoice = await _invoice.GetInfomationInvoiceByServiceRequestID(serviceRequestID);
            var serviceRequest = await _serviceRepository.GetServiceRequestByID(serviceRequestID);
            list.Add(invoice);
            if (serviceRequest.ServiceRequestReference == null)
            {
                return list;
            }

            var serviceRequestReference = await _serviceRepository.GetServiceRequestByID(serviceRequest.ServiceRequestId);
            invoice = await _invoice.GetInfomationInvoiceByServiceRequestID((int)serviceRequestReference.ServiceRequestReference);
            list.Add(invoice);
            return list;
        }

        public async Task<ErrorResponse> SendEmail(int serviceRequestID)
        {
            var service = await _serviceRepository.GetServiceRequestByID(serviceRequestID);
            var customer = await _userRepository.GetCustomerByID(service.CustomerId);
            var contract = await _contactRepository.GetContractByServiceRequestID(serviceRequestID);
            var invoice = await _invoice.GetInfomationInvoiceByServiceRequestID(serviceRequestID);
            var promotion = await _promotionRepository.GetInformationPromotionByID((int)service.PromotionId);
            double totalPrice = 0;
            double deposit = (double)(contract.ContractTotalPrice * contract.ContractDeposit);
            double promotionValue = 0;
            double total = 0;
            string row = "";

            foreach (var item in invoice.Details)
            {
                row += "<tr>" +
                "<td style='padding: 15px'>" + item.Service.ServiceName + "</td>" +
                "<td style='padding: 15px'>" + (double)item.RequestDetailPrice + "</td>" +
                "</tr>";
                totalPrice += (double)item.RequestDetailPrice;
            }

            if (promotion != null)
            {
                promotionValue = totalPrice * (double)promotion.PromotionValue;
            }

            total += totalPrice + (totalPrice * 0.1) - deposit - promotionValue;

            /*var content = "<div style = 'background-color: #eaeaea; display: flex; padding-left: 20%;'>" +
                "<div style='width: 700px; background-color: white'>" +
                "<div style = 'display: flex; flex-direction: row; align-items: center; padding-left: 24px; padding-top: 16px; padding-bottom: 16px;'>" +
                "<img src = 'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/Icon%2Frepair.png?alt=media&token=41e0bb4b-c2c3-4f00-8aac-46df1b316a7a' " +
                "alt = 'Logo' width = '65' height = '65' style = 'margin-right: 10px' /> " +
                "<p style='font-size: 20px'>AnServices</p>" +
                "</div>" +
                "<hr />" +
                "<div style = 'padding-left: 24px; padding-right: 24px; padding-top: 16px; padding-bottom: 16px;'> " +
                "<p style='font-size: 20px; font-weight: bold'>" +
                "Cảm ơn quý khách Nguyễn Văn Huấn đã yêu cầu dịch vụ tại AnService" +
                "</p>" +
                "<p>" +
                "AnService trân trọng gửi đến quý khách chi tiết hóa đơn của quý khách đã yêu cầu vào ngày " + DateTime.Parse(service.ServiceRequestCreateDate.ToString()).Day + " tháng " + DateTime.Parse(service.ServiceRequestCreateDate.ToString()).Month + " năm " + DateTime.Parse(service.ServiceRequestCreateDate.ToString()).Year + "." +
                "</p>" +
                "<p>" +
                "Để thanh toán, vui lòng mời quý khách đến công ty của chúng tôi tại địa chỉ:" +
                "</p>" +
                "Công ty AnService: 113 Hai Bà Trưng, Phường 1, Quận 1, Thành phố Hồ Chí Minh." +
                "</p>" +
                "<div style='margin-top: 20px'> " +
                "<span style = 'color: #1d51b4; font-weight: bold'> THÔNG TIN HÓA ĐƠN </span> " +
                "<span style='color: #747474'> (Ngày tạo " + DateTime.Parse(contract.ContractCreateDate.ToString()).Day + " tháng " + DateTime.Parse(contract.ContractCreateDate.ToString()).Month + " năm " + DateTime.Parse(contract.ContractCreateDate.ToString()).Year + ")</span>" +
                "</div>" +
                "<hr />" +
                "<div style='display: flex; flex-direction: row'>" +
                "<div style='width: 50%'>" +
                "<p>Chủ công trình: " + customer.FullName + "</p>" +
                "<p>Số điện thoại: " + customer.PhoneNumber + "</p>" +
                "<p>Email: " + customer.Email + "</p>" +
                "<p>Đã đặt cọc: " + contract.ContractDeposit * 100 + "%</p>" +
                "</div>" +
                "<div style='width: 50%'>" +
                "<p>Ngày bắt đầu thi công: " + DateTime.Parse(contract.ContractStartDate.ToString()).ToString("dd/MM/yyyy") + "</p>" +
                "<p>Ngày kết thúc thi công: " + DateTime.Parse(contract.ContractEndDate.ToString()).ToString("dd/MM/yyyy") + "</p>" +
                "<p>Địa chỉ: " + service.CustomerAddress + "</p>" +
                "</div>" +
                "</div>" +
                "<div style='margin-top: 20px'>" +
                "<span style='color: #1d51b4; font-weight: bold'>CHI TIẾT ĐƠN HÀNG</span>" +
                "</div>" +
                "<hr />" +
                "<table style = 'width: 100%; border-collapse: collapse; border: 1px solid; margin-top: 20px'> " +
                "<thead>" +
                "<tr style='background-color: #1d51b4'>" +
                "<th style='padding: 15px; text-align: left; color: white'>" +
                "Tên dịch vụ" +
                "</th>" +
                "<th style='padding: 15px; text-align: left; color: white'>" +
                "Giá tiền" +
                "</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody>" + row +
                *//*"<tr>" +
                "<td style='padding: 15px'>Hệ thống nước âm tường</td>" +
                "<td style='padding: 15px'>5.000.000 VNĐ</td>" +
                "</tr>" +
                "<tr>" +
                "<td style='padding: 15px'>Thi công sơn</td>" +
                "<td style='padding: 15px'>1.300.000 VNĐ</td>" +
                "</tr>" +*//*
                "</tbody>" +
                "</table>" +
                "<p>Tổng tiền hợp đồng ban đầu: " + invoice.ContractTotalPrice + " VNĐ</p>" +
                "<p>Tổng tiền dịch vụ: " + totalPrice + " VNĐ</p>" +
                "<p>Trừ tiền đặt cọc: -" + deposit + " VNĐ</p>" +
                "<p>Giảm giá theo voucher: -" + promotionValue + " VNĐ</p>" +
                "<p>Thuế VAT(10%): " + totalPrice * 0.1 + " VNĐ</p>" +
                "<p>Thành tiền: " + total + " VNĐ</p>" +
                "<p style='margin-top: 30px'>" +
                "Mọi thắc mắc và góp ý, quý khách vui lòng phản hồi lại email này." +
                "</p>" +
                "<p>Hoặc có thể gửi qua địa chỉ email: anservice_support@gmail.com.</p>" +
                "<p>Trân trọng,</p>" +
                "<p>AnService</p>" +
                "</div>" +
                "<div style = 'padding-left: 24px; padding-right: 24px; padding-top: 8px; padding-bottom: 8px; background-color: #edeef3;'> " +
                "<p style='font-size: 14px; color: #747474'>" +
                "Quý khách nhận được email này vì đã yêu cầu dịch vụ tại AnService." +
                "</p>" +
                "<p style='font-size: 14px; color: #747474'>Hotline: 1900 100 100</p>" +
                "<p style='font-size: 14px; color: #747474'>" +
                "Công ty AnService: 113 Hai Bà Trưng, Phường 1, Quận 1, Thành phố Hồ Chí Minh" +
                "</p>" +
                "</div>" +
                "</div>" +
                "</div>";*/
            var content = "<body style='background-color: #eaeaea'>" +
                "<table align='center' cellpadding='0' cellspacing='0' width='700px' style='border-collapse: collapse; background-color: white'>" +
                "<tr>" +
                "<td>" +
                "<div style = 'display: flex; flex-direction: row; align-items: center; padding-left: 24px; padding-top: 16px; padding-bottom: 16px;'>" +
                "<img src = 'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/Icon%2Frepair.png?alt=media&token=41e0bb4b-c2c3-4f00-8aac-46df1b316a7a' " +
                "alt = 'Logo' width = '65' height = '65' style = 'margin-right: 10px' /> " +
                "<p style='font-size: 20px'>AnServices</p>" +
                "</div>" +
                "<hr />" +
                "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>" +
                "<div style = 'padding-left: 24px; padding-right: 24px; padding-top: 16px; padding-bottom: 16px;'> " +
                "<p style='font-size: 20px; font-weight: bold'>" +
                "Cảm ơn quý khách " + service.CustomerName + " đã yêu cầu dịch vụ tại AnService" +
                "</p>" +
                "<p>" +
                "AnService trân trọng gửi đến quý khách chi tiết hóa đơn của quý khách đã yêu cầu vào ngày " + DateTime.Parse(service.ServiceRequestCreateDate.ToString()).Day + " tháng " + DateTime.Parse(service.ServiceRequestCreateDate.ToString()).Month + " năm " + DateTime.Parse(service.ServiceRequestCreateDate.ToString()).Year + "." +
                "</p>" +
                "<p>" +
                "Để thanh toán, vui lòng mời quý khách đến công ty của chúng tôi tại địa chỉ:" +
                "</p>" +
                "Công ty AnService: 113 Hai Bà Trưng, Phường 1, Quận 1, Thành phố Hồ Chí Minh." +
                "</p>" +
                "<div style='margin-top: 20px'> " +
                "<span style = 'color: #1d51b4; font-weight: bold'> THÔNG TIN HÓA ĐƠN </span> " +
                "<span style='color: #747474'> (Ngày tạo " + DateTime.Parse(contract.ContractCreateDate.ToString()).Day + " tháng " + DateTime.Parse(contract.ContractCreateDate.ToString()).Month + " năm " + DateTime.Parse(contract.ContractCreateDate.ToString()).Year + ")</span>" +
                "</div>" +
                "<hr />" +
                "<div style='display: flex; flex-direction: row'>" +
                "<div style='width: 50%'>" +
                "<p>Chủ công trình: " + service.CustomerName + "</p>" +
                "<p>Số điện thoại: " + service.CustomerPhone + "</p>" +
                "<p>Email: " + customer.Email + "</p>" +
                "<p>Đã đặt cọc: " + contract.ContractDeposit * 100 + "%</p>" +
                "</div>" +
                "<div style='width: 50%'>" +
                "<p>Ngày bắt đầu thi công: " + DateTime.Parse(contract.ContractStartDate.ToString()).ToString("dd/MM/yyyy") + "</p>" +
                "<p>Ngày kết thúc thi công: " + DateTime.Parse(contract.ContractEndDate.ToString()).ToString("dd/MM/yyyy") + "</p>" +
                "<p>Địa chỉ: " + service.CustomerAddress + "</p>" +
                "</div>" +
                "</div>" +
                "<div style='margin-top: 20px'>" +
                "<span style='color: #1d51b4; font-weight: bold'>CHI TIẾT ĐƠN HÀNG</span>" +
                "</div>" +
                "<hr />" +
                "<table style = 'width: 100%; border-collapse: collapse; border: 1px solid; margin-top: 20px'> " +
                "<thead>" +
                "<tr style='background-color: #1d51b4'>" +
                "<th style='padding: 15px; text-align: left; color: white'>" +
                "Tên dịch vụ" +
                "</th>" +
                "<th style='padding: 15px; text-align: left; color: white'>" +
                "Giá tiền" +
                "</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody>" + row +
                /*"<tr>" +
                "<td style='padding: 15px'>Hệ thống nước âm tường</td>" +
                "<td style='padding: 15px'>5.000.000 VNĐ</td>" +
                "</tr>" +
                "<tr>" +
                "<td style='padding: 15px'>Thi công sơn</td>" +
                "<td style='padding: 15px'>1.300.000 VNĐ</td>" +
                "</tr>" +*/
                "</tbody>" +
                "</table>" +
                "<p>Tổng tiền hợp đồng ban đầu: " + invoice.ContractTotalPrice + " VNĐ</p>" +
                "<p>Tổng tiền dịch vụ: " + totalPrice + " VNĐ</p>" +
                "<p>Trừ tiền đặt cọc: -" + deposit + " VNĐ</p>" +
                "<p>Giảm giá theo voucher: -" + promotionValue + " VNĐ</p>" +
                "<p>Thuế VAT(10%): " + totalPrice * 0.1 + " VNĐ</p>" +
                "<p>Thành tiền: " + total + " VNĐ</p>" +
                "<p style='margin-top: 30px'>" +
                "Mọi thắc mắc và góp ý, quý khách vui lòng phản hồi lại email này." +
                "</p>" +
                "<p>Hoặc có thể gửi qua địa chỉ email: anservice_support@gmail.com.</p>" +
                "<p>Trân trọng,</p>" +
                "<p>AnService</p>" +
                "</div>" +
                "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>" +
                "<div style = 'padding-left: 24px; padding-right: 24px; padding-top: 8px; padding-bottom: 8px; background-color: #edeef3;'> " +
                "<p style='font-size: 14px; color: #747474'>" +
                "Quý khách nhận được email này vì đã yêu cầu dịch vụ tại AnService." +
                "</p>" +
                "<p style='font-size: 14px; color: #747474'>Hotline: 1900 100 100</p>" +
                "<p style='font-size: 14px; color: #747474'>" +
                "Công ty AnService: 113 Hai Bà Trưng, Phường 1, Quận 1, Thành phố Hồ Chí Minh" +
                "</p>" +
                "</div>" +
                "</td>" +
                "</tr>" +
                "</table>" +
                "</body>";
            var message = new Message(customer.Email, "Hóa đơn cho dịch vụ sửa chữa", content);
            await _emailSender.SendEmailAsync(message);
            return new ErrorResponse("Create Successful");
        }
    }
}
