USE [master]
GO
/****** Object:  Database [AnServices]    Script Date: 3/20/2022 2:42:59 PM ******/
CREATE DATABASE [AnServices]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'AnServices', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\AnServices.mdf' , SIZE = 4288KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'AnServices_log', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\AnServices_log.ldf' , SIZE = 832KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [AnServices] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [AnServices].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [AnServices] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [AnServices] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [AnServices] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [AnServices] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [AnServices] SET ARITHABORT OFF 
GO
ALTER DATABASE [AnServices] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [AnServices] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [AnServices] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [AnServices] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [AnServices] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [AnServices] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [AnServices] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [AnServices] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [AnServices] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [AnServices] SET  ENABLE_BROKER 
GO
ALTER DATABASE [AnServices] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [AnServices] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [AnServices] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [AnServices] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [AnServices] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [AnServices] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [AnServices] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [AnServices] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [AnServices] SET  MULTI_USER 
GO
ALTER DATABASE [AnServices] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [AnServices] SET DB_CHAINING OFF 
GO
ALTER DATABASE [AnServices] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [AnServices] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [AnServices] SET DELAYED_DURABILITY = DISABLED 
GO
USE [AnServices]
GO
/****** Object:  Table [dbo].[tblContract]    Script Date: 3/20/2022 2:43:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblContract](
	[ContractID] [int] IDENTITY(1,1) NOT NULL,
	[CustomerID] [int] NOT NULL,
	[ServiceRequestID] [int] NOT NULL,
	[ContractTitle] [nvarchar](50) NULL,
	[ContractUrl] [varchar](max) NULL,
	[ContractStartDate] [date] NULL,
	[ContractEndDate] [date] NULL,
	[ContractDeposit] [decimal](18, 2) NULL,
	[ContractTotalPrice] [decimal](18, 2) NULL,
	[ContractStatus] [int] NOT NULL,
	[ContractCreateDate] [datetime] NULL,
	[ContractUpdateDate] [datetime] NULL,
 CONSTRAINT [PK_tblContact] PRIMARY KEY CLUSTERED 
(
	[ContractID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblInvoice]    Script Date: 3/20/2022 2:43:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblInvoice](
	[InvoiceID] [int] IDENTITY(1,1) NOT NULL,
	[ServiceRequestID] [int] NOT NULL,
	[ContractID] [int] NOT NULL,
	[TotalCost] [decimal](18, 2) NULL,
	[InvoiceDateCreate] [datetime] NULL,
	[PromotionID] [int] NULL,
 CONSTRAINT [PK_tblInvoice] PRIMARY KEY CLUSTERED 
(
	[InvoiceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblMaterial]    Script Date: 3/20/2022 2:43:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblMaterial](
	[MaterialID] [int] IDENTITY(1,1) NOT NULL,
	[MaterialName] [nvarchar](50) NULL,
	[Unit] [nvarchar](50) NULL,
 CONSTRAINT [PK_tblMaterial] PRIMARY KEY CLUSTERED 
(
	[MaterialID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblMedia]    Script Date: 3/20/2022 2:43:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblMedia](
	[MediaID] [int] IDENTITY(1,1) NOT NULL,
	[ServiceRequestID] [int] NULL,
	[ReportID] [int] NULL,
	[MediaUrl] [varchar](max) NULL,
 CONSTRAINT [PK_tblMedia] PRIMARY KEY CLUSTERED 
(
	[MediaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblPromotion]    Script Date: 3/20/2022 2:43:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblPromotion](
	[PromotionID] [int] IDENTITY(1,1) NOT NULL,
	[PromotionCode] [varchar](20) NULL,
	[PromotionDescription] [varchar](50) NULL,
	[PromotionDateExpired] [date] NULL,
 CONSTRAINT [PK_tblPromotion] PRIMARY KEY CLUSTERED 
(
	[PromotionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblPromotionDetail]    Script Date: 3/20/2022 2:43:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPromotionDetail](
	[PromotionDetailID] [int] IDENTITY(1,1) NOT NULL,
	[CustomerID] [int] NULL,
	[PromotionID] [int] NULL,
 CONSTRAINT [PK_tblPromotionDetail] PRIMARY KEY CLUSTERED 
(
	[PromotionDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblRepairDetail]    Script Date: 3/20/2022 2:43:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblRepairDetail](
	[RepairDetailID] [int] IDENTITY(1,1) NOT NULL,
	[RequestDetailID] [int] NULL,
	[WorkerID] [int] NULL,
	[RepairDateBegin] [datetime] NULL,
	[RepairDateEnd] [datetime] NULL,
	[IsPrimary] [bit] NULL,
	[RequestDetailPriority] [int] NULL,
 CONSTRAINT [PK_tblRepairDetail] PRIMARY KEY CLUSTERED 
(
	[RepairDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblReport]    Script Date: 3/20/2022 2:43:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblReport](
	[ReportID] [int] IDENTITY(1,1) NOT NULL,
	[RequestDetailID] [int] NOT NULL,
	[WorkerID] [int] NOT NULL,
	[ReportTitle] [nvarchar](50) NULL,
	[ReportDescription] [nvarchar](250) NULL,
	[ReportDate] [datetime] NULL,
 CONSTRAINT [PK_tblReport] PRIMARY KEY CLUSTERED 
(
	[ReportID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblRequestDetails]    Script Date: 3/20/2022 2:43:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblRequestDetails](
	[RequestDetailID] [int] IDENTITY(1,1) NOT NULL,
	[ServiceRequestID] [int] NOT NULL,
	[ServiceID] [int] NOT NULL,
	[RequestDetailStatus] [int] NULL,
	[RequestDetailPrice] [decimal](18, 2) NULL,
	[RequestDetailDescription] [nvarchar](250) NULL,
 CONSTRAINT [PK_tblRequestDetails] PRIMARY KEY CLUSTERED 
(
	[RequestDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblRoles]    Script Date: 3/20/2022 2:43:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblRoles](
	[RoleID] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [nvarchar](50) NULL,
 CONSTRAINT [PK_tblRoles] PRIMARY KEY CLUSTERED 
(
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblServiceRequest]    Script Date: 3/20/2022 2:43:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblServiceRequest](
	[ServiceRequestID] [int] IDENTITY(1,1) NOT NULL,
	[CustomerID] [int] NOT NULL,
	[CustomerName] [nvarchar](50) NULL,
	[CustomerPhone] [varchar](10) NULL,
	[CustomerAddress] [nvarchar](150) NULL,
	[ServiceRequestDescription] [nvarchar](150) NULL,
	[ServiceRequestStatus] [int] NULL,
	[ServiceRequestCreateDate] [datetime] NULL,
	[ServiceRequestPackage] [int] NULL,
 CONSTRAINT [PK_tblRequestService] PRIMARY KEY CLUSTERED 
(
	[ServiceRequestID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblServices]    Script Date: 3/20/2022 2:43:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblServices](
	[ServiceID] [int] IDENTITY(1,1) NOT NULL,
	[ServiceName] [nvarchar](50) NULL,
	[ServiceDescription] [nvarchar](250) NULL,
	[ServiceStatus] [bit] NULL,
	[TypeWorkerJob] [int] NULL,
	[TypeService] [int] NULL,
	[ServiceImg] [varchar](250) NULL,
 CONSTRAINT [PK_tblServices] PRIMARY KEY CLUSTERED 
(
	[ServiceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblStatus]    Script Date: 3/20/2022 2:43:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblStatus](
	[StatusID] [int] IDENTITY(1,1) NOT NULL,
	[StatusName] [nvarchar](50) NULL,
 CONSTRAINT [PK_tblStatus] PRIMARY KEY CLUSTERED 
(
	[StatusID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblTypeJobs]    Script Date: 3/20/2022 2:43:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblTypeJobs](
	[TypeJobID] [int] IDENTITY(1,1) NOT NULL,
	[TypeJobName] [nvarchar](50) NULL,
 CONSTRAINT [PK_tblRoleTypes] PRIMARY KEY CLUSTERED 
(
	[TypeJobID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblTypeService]    Script Date: 3/20/2022 2:43:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblTypeService](
	[TypeServiceID] [int] IDENTITY(1,1) NOT NULL,
	[TypeServiceDecription] [nvarchar](100) NULL,
 CONSTRAINT [PK_tblTypeService] PRIMARY KEY CLUSTERED 
(
	[TypeServiceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblUsedMaterial]    Script Date: 3/20/2022 2:43:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUsedMaterial](
	[UsedMaterialID] [int] IDENTITY(1,1) NOT NULL,
	[MaterialID] [int] NULL,
	[RequestDetailID] [int] NULL,
	[WorkerID] [int] NULL,
	[Quantity] [int] NULL,
	[QuantityNew] [int] NULL,
	[Status] [int] NULL,
	[Note] [nvarchar](50) NULL,
	[Message] [nvarchar](50) NULL,
 CONSTRAINT [PK_tblUsedMaterial] PRIMARY KEY CLUSTERED 
(
	[UsedMaterialID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblUsers]    Script Date: 3/20/2022 2:43:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblUsers](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](50) NULL,
	[Password] [varchar](50) NULL,
	[FullName] [nvarchar](50) NULL,
	[PhoneNumber] [varchar](10) NOT NULL,
	[Address] [nvarchar](100) NULL,
	[Email] [varchar](50) NULL,
	[InviteCode] [varchar](6) NULL,
	[Role] [int] NOT NULL,
	[TypeJob] [int] NULL,
	[CreateDate] [date] NULL,
	[UpdateDate] [date] NULL,
	[Status] [int] NULL,
 CONSTRAINT [PK_tblUsers] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[tblContract] ON 

INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [ServiceRequestID], [ContractTitle], [ContractUrl], [ContractStartDate], [ContractEndDate], [ContractDeposit], [ContractTotalPrice], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (22, 79, 160, N'Hợp đồng Test 20/3', N'url', CAST(N'2022-03-20' AS Date), CAST(N'2022-03-24' AS Date), CAST(0.10 AS Decimal(18, 2)), CAST(1000000.00 AS Decimal(18, 2)), 3, CAST(N'2022-03-20 14:35:06.023' AS DateTime), CAST(N'2022-03-20 14:35:42.910' AS DateTime))
SET IDENTITY_INSERT [dbo].[tblContract] OFF
SET IDENTITY_INSERT [dbo].[tblMaterial] ON 

INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (1, N'Gạch bê tông', N'viên')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (2, N'Gạch block xây tường', N'viên')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (3, N'Gạch bông', N'viên')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (4, N'Gạch men', N'viên')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (5, N'Gạch lát nền', N'viên')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (6, N'Gạch ốp tường', N'viên')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (7, N'Dây điện đơn', N'm')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (8, N'Dây điện đơn mềm', N'm')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (9, N'Dây điên đôi', N'm')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (10, N'Dây điện xoắn mềm', N'm')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (11, N'Dây cáp', N'm')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (12, N'Dây cáp bọc nhựa', N'm')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (13, N'Dây điện ngoài trời - cáp ngầm 3 pha', N'm')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (14, N'Xi măng PC30', N'kg')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (15, N'Xi măng PC40', N'kg')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (16, N'Xi măng PC50', N'kg')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (17, N'Xi măng PCB30', N'kg')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (18, N'Xi măng PCB40', N'kg')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (19, N'Xi măng PCB50', N'kg')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (20, N'Sơn nước', N'kg')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (21, N'Sơn chống rỉ', N'kg')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (22, N'Sơn dầu', N'kg')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (23, N'Vôi gầy', N'kg')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (24, N'Vôi sữa', N'kg')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (25, N'Vôi béo', N'kg')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (26, N'Vôi thủy lực', N'kg')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (27, N'Cát đen', N'kg')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (28, N'Cát vàng', N'kg')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (29, N'Cát Xây Tô', N'kg')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (30, N'Cát bê tông', N'kg')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (31, N'Thép mạ kẽm', N'm')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (32, N'Thép hợp kim', N'm')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (33, N'Thép carbon', N'm')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (34, N'Thép không gỉ', N'm')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (35, N'Ống nhựa phi 21', N'm')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (36, N'Ống nhựa phi 27', N'm')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (37, N'Ống nhựa phi 34', N'm')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (38, N'Ống nhựa phi 42', N'm')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (39, N'Ống nhựa phi 60', N'm')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (40, N'Keo chống thấm', N'tuýp')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (41, N'Keo dán gạch', N'tuýp')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (42, N'Keo dán xây dựng', N'tuýp')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (43, N'Đinh rút nhôm', N'hộp')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (44, N'Đinh rút Inox', N'hộp')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (45, N'Đinh bê tông', N'hộp')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (46, N'Đinh đóng gỗ', N'hộp')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (47, N'Bản lề cửa sắt', N'cái')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (48, N'Bản lề cửa cổng sắt', N'cái')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (49, N'Bản lề cửa gỗ', N'cái')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (50, N'Bản lề cửa tự đóng', N'cái')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (51, N'Bản lề cửa kính', N'cái')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (52, N'Ống gen chịu nhiệt phi 1', N'm')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (53, N'Ống gen chịu nhiệt phi 2', N'm')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (54, N'Ống gen chịu nhiệt phi 3', N'm')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (55, N'Khác', NULL)
SET IDENTITY_INSERT [dbo].[tblMaterial] OFF
SET IDENTITY_INSERT [dbo].[tblMedia] ON 

INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (256, 159, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/RequestServices%2FFriday%2C%20March%2011%2C%202022%204%3A17%20PMrn_image_picker_lib_temp_cb413eb2-40b2-45b0-8b5a-9dbb67d2e8d5.jpg?alt=media&token=4f4662c6-b08a-403e-91b7-efb54c4cc380')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (257, 159, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/RequestServices%2FMonday%2C%20March%207%2C%202022%2010%3A46%20AMrn_image_picker_lib_temp_81038296-31e2-4a30-9ca9-ff82a4e62ea1.jpg?alt=media&token=acbe3d3c-2e47-4098-8014-b637a558b483')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (258, NULL, 34, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/RequestServices%2FMonday%2C%20March%207%2C%202022%207%3A03%20PMrn_image_picker_lib_temp_4fdccce7-cb91-47bb-b1ba-d8db6218ef3a.jpg?alt=media&token=47fafce7-d019-4d6f-89ed-9098ce24f0ba')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (259, NULL, 35, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/RequestServices%2FFriday%2C%20March%2011%2C%202022%204%3A22%20PMrn_image_picker_lib_temp_0547fe12-b1a6-4f0f-8e49-b8eefdc780a7.jpg?alt=media&token=b9666294-4ef4-4e19-bfbc-760a50785347')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (260, 160, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/RequestServices%2FFriday%2C%20March%2011%2C%202022%204%3A22%20PMrn_image_picker_lib_temp_0547fe12-b1a6-4f0f-8e49-b8eefdc780a7.jpg?alt=media&token=b9666294-4ef4-4e19-bfbc-760a50785347')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (261, NULL, 36, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/RequestServices%2FFriday%2C%20March%2011%2C%202022%204%3A17%20PMrn_image_picker_lib_temp_06e21c36-89bb-4e44-9897-3f8f80d9da1b.jpg?alt=media&token=90f5f81c-9694-4a71-bca2-e4b804ea0ef9')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (262, NULL, 37, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/RequestServices%2FFriday%2C%20March%2011%2C%202022%204%3A17%20PMrn_image_picker_lib_temp_06e21c36-89bb-4e44-9897-3f8f80d9da1b.jpg?alt=media&token=90f5f81c-9694-4a71-bca2-e4b804ea0ef9')
SET IDENTITY_INSERT [dbo].[tblMedia] OFF
SET IDENTITY_INSERT [dbo].[tblPromotion] ON 

INSERT [dbo].[tblPromotion] ([PromotionID], [PromotionCode], [PromotionDescription], [PromotionDateExpired]) VALUES (16, N'337321', N'CODE CA NHAN', NULL)
SET IDENTITY_INSERT [dbo].[tblPromotion] OFF
SET IDENTITY_INSERT [dbo].[tblPromotionDetail] ON 

INSERT [dbo].[tblPromotionDetail] ([PromotionDetailID], [CustomerID], [PromotionID]) VALUES (16, 79, 16)
SET IDENTITY_INSERT [dbo].[tblPromotionDetail] OFF
SET IDENTITY_INSERT [dbo].[tblRepairDetail] ON 

INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (127, 236, 80, CAST(N'2022-03-20 13:25:11.953' AS DateTime), NULL, 1, 2)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (128, 236, 82, CAST(N'2022-03-20 13:25:11.980' AS DateTime), NULL, 0, 2)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (129, 239, 82, CAST(N'2022-03-20 14:36:17.860' AS DateTime), NULL, 1, 2)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (130, 239, 80, CAST(N'2022-03-20 14:36:17.867' AS DateTime), NULL, 0, 2)
SET IDENTITY_INSERT [dbo].[tblRepairDetail] OFF
SET IDENTITY_INSERT [dbo].[tblReport] ON 

INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (34, 236, 80, N'Báo cáo vấn đề', N'Có những lỗi rất ngiêm trọng cần xem xét lại', CAST(N'2022-03-20 13:39:37.697' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (35, 237, 80, N'Báo cáo hoàn thành', N'Đã sửa xong', CAST(N'2022-03-20 13:44:13.800' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (36, 239, 82, N'Báo cáo vấn đề', N'Vấn đề lớn hơn trong báo cáo', CAST(N'2022-03-20 14:38:08.080' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (37, 239, 82, N'Báo cáo hoàn thành', N'Vấn đề đã được hoàn thành', CAST(N'2022-03-20 14:38:25.403' AS DateTime))
SET IDENTITY_INSERT [dbo].[tblReport] OFF
SET IDENTITY_INSERT [dbo].[tblRequestDetails] ON 

INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice], [RequestDetailDescription]) VALUES (236, 159, 1, 11, NULL, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice], [RequestDetailDescription]) VALUES (237, 159, 3, 9, NULL, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice], [RequestDetailDescription]) VALUES (238, 159, 5, 2, NULL, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice], [RequestDetailDescription]) VALUES (239, 160, 2, 11, CAST(240000.00 AS Decimal(18, 2)), N'test')
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice], [RequestDetailDescription]) VALUES (240, 160, 6, 2, CAST(760000.00 AS Decimal(18, 2)), N'test2')
SET IDENTITY_INSERT [dbo].[tblRequestDetails] OFF
SET IDENTITY_INSERT [dbo].[tblRoles] ON 

INSERT [dbo].[tblRoles] ([RoleID], [RoleName]) VALUES (1, N'Staff')
INSERT [dbo].[tblRoles] ([RoleID], [RoleName]) VALUES (2, N'Worker')
INSERT [dbo].[tblRoles] ([RoleID], [RoleName]) VALUES (3, N'Customer')
SET IDENTITY_INSERT [dbo].[tblRoles] OFF
SET IDENTITY_INSERT [dbo].[tblServiceRequest] ON 

INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage]) VALUES (159, 79, N'string', N'0123456789', N'123 Phan Văn Trị', N'Cần thợ kiểm tra lại nhà', 14, CAST(N'2022-03-20 11:44:59.753' AS DateTime), 2)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage]) VALUES (160, 79, N'', N'0934827584', N'123 Nguyễn Oanh, Q.Gò Vấp', N'Nhà tôi đang cần kiểm tra sửa chữa', 14, CAST(N'2022-03-20 14:30:05.313' AS DateTime), 2)
SET IDENTITY_INSERT [dbo].[tblServiceRequest] OFF
SET IDENTITY_INSERT [dbo].[tblServices] ON 

INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (1, N'Đục nền gạch cũ', N'40.000-60.000/m2', 1, 4, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fbrick-wall.png?alt=media&token=287c4a63-12e5-42df-8843-01a75a2e9c4e')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (2, N'Tháo dỡ mái tôn', N'40.000-65.000/m2', 1, 4, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Froof.png?alt=media&token=dcd1a8e0-2dbe-4a01-80f8-cc14b4ab501b')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (3, N'Hệ thống điện âm tường', N'Báo giá sau khi khảo sát', 1, 5, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Felectrical-energy.png?alt=media&token=6a9c146b-db43-4f85-9f42-4fe0cf8ff774')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (4, N'Hệ thống nước âm tường', N'Báo giá sau khi khảo sát', 1, 5, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fpipe.png?alt=media&token=a22a0770-2882-4380-8594-c6bf5ac19c74')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (5, N'Lắp kính cường lực 12ly', N'Báo giá sau khi khảo sát', 1, 1, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fglass.png?alt=media&token=1029d2c4-4ece-444f-92d2-edd8bf23fb73')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (6, N'Lắp kính cường lực 15ly', N'Báo giá sau khi khảo sát', 1, 1, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fglass.png?alt=media&token=1029d2c4-4ece-444f-92d2-edd8bf23fb73')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (7, N'Điện năng lượng mặt trời', N'Báo giá sau khi khảo sát', 1, 5, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fsolar-panel.png?alt=media&token=15b0ec07-2c14-4aa4-8c3e-d2e538d888b0')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (8, N'Lắp kính cường lực 19ly', N'Báo giá sau khi khảo sát', 1, 1, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fglass.png?alt=media&token=1029d2c4-4ece-444f-92d2-edd8bf23fb73')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (10, N'Làm trần thạch cao nổi', N'130.000 – 260.000 /m2 phụ thuộc vào vật liệu nhà phân phối', 1, 7, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2F3501444.png?alt=media&token=fe54b84d-eaa8-43f0-b603-8586afe2f452')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (11, N'Thi công sơn', N'30.000 - 80.000/m2 phụ thuộc vào vật liệu nhà phân phối', 1, 3, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fpaint.png?alt=media&token=59a9ccfa-eca4-46b1-b233-6c1eb4ce6df2')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (13, N'Gia công cửa sắt', N'300.000 - 900.000/m2 Báo giá theo mẫu hoặc bản vẽ thiết kế', 1, 2, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fsingle-door.png?alt=media&token=4bb6c698-2114-4df0-87d1-034929fcaa55')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (14, N'Xây cầu thang', N'Giá giao động từ 1.200.000 /1 mét dài, cho đến 1.750.000 /1 mét dài, tùy thuộc vào kiểu dáng, mẫu mã và chất liệu của các loại gỗ, và kính', 1, 4, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fstairs.png?alt=media&token=fcd9f180-eb6a-48a1-a35a-a0c17ab0e669')
SET IDENTITY_INSERT [dbo].[tblServices] OFF
SET IDENTITY_INSERT [dbo].[tblStatus] ON 

INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (1, N'Đã từ chối')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (2, N'Chưa xử lý')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (3, N'Đã đồng ý')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (4, N'Active')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (5, N'InActive')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (6, N'Đang xử lý')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (7, N'Yều cầu cập nhật')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (8, N'Đã hủy')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (9, N'Chờ xác nhận')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (10, N'Chặn')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (11, N'Hài lòng')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (12, N'Không hài lòng')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (13, N'Đã hoàn thành')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (14, N'Chờ thanh toán')
SET IDENTITY_INSERT [dbo].[tblStatus] OFF
SET IDENTITY_INSERT [dbo].[tblTypeJobs] ON 

INSERT [dbo].[tblTypeJobs] ([TypeJobID], [TypeJobName]) VALUES (1, N'Thợ nhôm - kính')
INSERT [dbo].[tblTypeJobs] ([TypeJobID], [TypeJobName]) VALUES (2, N'Thợ cơ khí')
INSERT [dbo].[tblTypeJobs] ([TypeJobID], [TypeJobName]) VALUES (3, N'Thợ sơn')
INSERT [dbo].[tblTypeJobs] ([TypeJobID], [TypeJobName]) VALUES (4, N'Thợ xây')
INSERT [dbo].[tblTypeJobs] ([TypeJobID], [TypeJobName]) VALUES (5, N'Thợ điện - nước')
INSERT [dbo].[tblTypeJobs] ([TypeJobID], [TypeJobName]) VALUES (6, N'Thợ điện lạnh')
INSERT [dbo].[tblTypeJobs] ([TypeJobID], [TypeJobName]) VALUES (7, N'Thợ thạch cao')
SET IDENTITY_INSERT [dbo].[tblTypeJobs] OFF
SET IDENTITY_INSERT [dbo].[tblTypeService] ON 

INSERT [dbo].[tblTypeService] ([TypeServiceID], [TypeServiceDecription]) VALUES (1, N'Dịch vụ cần khách hàng xác nhận ngay')
INSERT [dbo].[tblTypeService] ([TypeServiceID], [TypeServiceDecription]) VALUES (2, N'Dịch vụ khách hàng có thể xác nhận sau 1 tuần')
INSERT [dbo].[tblTypeService] ([TypeServiceID], [TypeServiceDecription]) VALUES (3, N'Dịch vụ khách hàng có thể xác nhận sau 1 tháng')
SET IDENTITY_INSERT [dbo].[tblTypeService] OFF
SET IDENTITY_INSERT [dbo].[tblUsedMaterial] ON 

INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (67, 2, 236, 80, 5, NULL, 2, N'test', NULL)
SET IDENTITY_INSERT [dbo].[tblUsedMaterial] OFF
SET IDENTITY_INSERT [dbo].[tblUsers] ON 

INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (7, N'string111', N'Aa123@', N'Hoàng', N'0123456779', N'Q1', N'hoang@gmail.com', NULL, 1, NULL, CAST(N'2022-01-22' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (79, NULL, NULL, N'Test 20/3', N'0332986894', N'Lê Đức Thọ, P16, Q.Gò Vấp', N'test@google.com', N'337321', 3, NULL, CAST(N'2022-03-20' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (80, NULL, NULL, N'Văn A', N'0339882839', NULL, NULL, NULL, 2, 1, CAST(N'2022-03-20' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (82, NULL, NULL, N'Văn B', N'0338428573', NULL, NULL, NULL, 2, 2, CAST(N'2022-03-20' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (83, NULL, NULL, N'Văn C', N'0339588275', NULL, NULL, NULL, 2, 3, CAST(N'2022-03-20' AS Date), NULL, 4)
SET IDENTITY_INSERT [dbo].[tblUsers] OFF
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_tblUsers]    Script Date: 3/20/2022 2:43:00 PM ******/
ALTER TABLE [dbo].[tblUsers] ADD  CONSTRAINT [IX_tblUsers] UNIQUE NONCLUSTERED 
(
	[PhoneNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[tblContract]  WITH CHECK ADD  CONSTRAINT [FK_tblContact_tblUsers] FOREIGN KEY([CustomerID])
REFERENCES [dbo].[tblUsers] ([UserID])
GO
ALTER TABLE [dbo].[tblContract] CHECK CONSTRAINT [FK_tblContact_tblUsers]
GO
ALTER TABLE [dbo].[tblContract]  WITH CHECK ADD  CONSTRAINT [FK_tblContract_tblRequestServices] FOREIGN KEY([ServiceRequestID])
REFERENCES [dbo].[tblServiceRequest] ([ServiceRequestID])
GO
ALTER TABLE [dbo].[tblContract] CHECK CONSTRAINT [FK_tblContract_tblRequestServices]
GO
ALTER TABLE [dbo].[tblContract]  WITH CHECK ADD  CONSTRAINT [FK_tblContract_tblStatus] FOREIGN KEY([ContractStatus])
REFERENCES [dbo].[tblStatus] ([StatusID])
GO
ALTER TABLE [dbo].[tblContract] CHECK CONSTRAINT [FK_tblContract_tblStatus]
GO
ALTER TABLE [dbo].[tblInvoice]  WITH CHECK ADD  CONSTRAINT [FK_tblInvoice_tblContract] FOREIGN KEY([ContractID])
REFERENCES [dbo].[tblContract] ([ContractID])
GO
ALTER TABLE [dbo].[tblInvoice] CHECK CONSTRAINT [FK_tblInvoice_tblContract]
GO
ALTER TABLE [dbo].[tblInvoice]  WITH CHECK ADD  CONSTRAINT [FK_tblInvoice_tblPromotion] FOREIGN KEY([PromotionID])
REFERENCES [dbo].[tblPromotion] ([PromotionID])
GO
ALTER TABLE [dbo].[tblInvoice] CHECK CONSTRAINT [FK_tblInvoice_tblPromotion]
GO
ALTER TABLE [dbo].[tblMedia]  WITH CHECK ADD  CONSTRAINT [FK_tblMedia_tblReport] FOREIGN KEY([ReportID])
REFERENCES [dbo].[tblReport] ([ReportID])
GO
ALTER TABLE [dbo].[tblMedia] CHECK CONSTRAINT [FK_tblMedia_tblReport]
GO
ALTER TABLE [dbo].[tblMedia]  WITH CHECK ADD  CONSTRAINT [FK_tblMedia_tblRequestServices] FOREIGN KEY([ServiceRequestID])
REFERENCES [dbo].[tblServiceRequest] ([ServiceRequestID])
GO
ALTER TABLE [dbo].[tblMedia] CHECK CONSTRAINT [FK_tblMedia_tblRequestServices]
GO
ALTER TABLE [dbo].[tblPromotionDetail]  WITH CHECK ADD  CONSTRAINT [FK_tblPromotionDetail_tblPromotion] FOREIGN KEY([PromotionID])
REFERENCES [dbo].[tblPromotion] ([PromotionID])
GO
ALTER TABLE [dbo].[tblPromotionDetail] CHECK CONSTRAINT [FK_tblPromotionDetail_tblPromotion]
GO
ALTER TABLE [dbo].[tblPromotionDetail]  WITH CHECK ADD  CONSTRAINT [FK_tblPromotionDetail_tblUsers] FOREIGN KEY([CustomerID])
REFERENCES [dbo].[tblUsers] ([UserID])
GO
ALTER TABLE [dbo].[tblPromotionDetail] CHECK CONSTRAINT [FK_tblPromotionDetail_tblUsers]
GO
ALTER TABLE [dbo].[tblRepairDetail]  WITH CHECK ADD  CONSTRAINT [FK_tblRepairDetail_tblRequestDetails] FOREIGN KEY([RequestDetailID])
REFERENCES [dbo].[tblRequestDetails] ([RequestDetailID])
GO
ALTER TABLE [dbo].[tblRepairDetail] CHECK CONSTRAINT [FK_tblRepairDetail_tblRequestDetails]
GO
ALTER TABLE [dbo].[tblRepairDetail]  WITH CHECK ADD  CONSTRAINT [FK_tblRepairDetail_tblUsers] FOREIGN KEY([WorkerID])
REFERENCES [dbo].[tblUsers] ([UserID])
GO
ALTER TABLE [dbo].[tblRepairDetail] CHECK CONSTRAINT [FK_tblRepairDetail_tblUsers]
GO
ALTER TABLE [dbo].[tblReport]  WITH CHECK ADD  CONSTRAINT [FK_tblReport_tblRequestDetails] FOREIGN KEY([RequestDetailID])
REFERENCES [dbo].[tblRequestDetails] ([RequestDetailID])
GO
ALTER TABLE [dbo].[tblReport] CHECK CONSTRAINT [FK_tblReport_tblRequestDetails]
GO
ALTER TABLE [dbo].[tblReport]  WITH CHECK ADD  CONSTRAINT [FK_tblReport_tblUsers] FOREIGN KEY([WorkerID])
REFERENCES [dbo].[tblUsers] ([UserID])
GO
ALTER TABLE [dbo].[tblReport] CHECK CONSTRAINT [FK_tblReport_tblUsers]
GO
ALTER TABLE [dbo].[tblRequestDetails]  WITH CHECK ADD  CONSTRAINT [FK_tblRequestDetails_tblRequestServices] FOREIGN KEY([ServiceRequestID])
REFERENCES [dbo].[tblServiceRequest] ([ServiceRequestID])
GO
ALTER TABLE [dbo].[tblRequestDetails] CHECK CONSTRAINT [FK_tblRequestDetails_tblRequestServices]
GO
ALTER TABLE [dbo].[tblRequestDetails]  WITH CHECK ADD  CONSTRAINT [FK_tblRequestDetails_tblServices] FOREIGN KEY([ServiceID])
REFERENCES [dbo].[tblServices] ([ServiceID])
GO
ALTER TABLE [dbo].[tblRequestDetails] CHECK CONSTRAINT [FK_tblRequestDetails_tblServices]
GO
ALTER TABLE [dbo].[tblRequestDetails]  WITH CHECK ADD  CONSTRAINT [FK_tblRequestDetails_tblStatus] FOREIGN KEY([RequestDetailStatus])
REFERENCES [dbo].[tblStatus] ([StatusID])
GO
ALTER TABLE [dbo].[tblRequestDetails] CHECK CONSTRAINT [FK_tblRequestDetails_tblStatus]
GO
ALTER TABLE [dbo].[tblServiceRequest]  WITH CHECK ADD  CONSTRAINT [FK_tblRequestServices_tblStatus] FOREIGN KEY([ServiceRequestStatus])
REFERENCES [dbo].[tblStatus] ([StatusID])
GO
ALTER TABLE [dbo].[tblServiceRequest] CHECK CONSTRAINT [FK_tblRequestServices_tblStatus]
GO
ALTER TABLE [dbo].[tblServiceRequest]  WITH CHECK ADD  CONSTRAINT [FK_tblRequestServices_tblUsers] FOREIGN KEY([CustomerID])
REFERENCES [dbo].[tblUsers] ([UserID])
GO
ALTER TABLE [dbo].[tblServiceRequest] CHECK CONSTRAINT [FK_tblRequestServices_tblUsers]
GO
ALTER TABLE [dbo].[tblServices]  WITH CHECK ADD  CONSTRAINT [FK_tblServices_tblTypeService] FOREIGN KEY([TypeService])
REFERENCES [dbo].[tblTypeService] ([TypeServiceID])
GO
ALTER TABLE [dbo].[tblServices] CHECK CONSTRAINT [FK_tblServices_tblTypeService]
GO
ALTER TABLE [dbo].[tblUsedMaterial]  WITH CHECK ADD  CONSTRAINT [FK_tblUsedMaterial_tblMaterial] FOREIGN KEY([MaterialID])
REFERENCES [dbo].[tblMaterial] ([MaterialID])
GO
ALTER TABLE [dbo].[tblUsedMaterial] CHECK CONSTRAINT [FK_tblUsedMaterial_tblMaterial]
GO
ALTER TABLE [dbo].[tblUsedMaterial]  WITH CHECK ADD  CONSTRAINT [FK_tblUsedMaterial_tblRequestDetails] FOREIGN KEY([RequestDetailID])
REFERENCES [dbo].[tblRequestDetails] ([RequestDetailID])
GO
ALTER TABLE [dbo].[tblUsedMaterial] CHECK CONSTRAINT [FK_tblUsedMaterial_tblRequestDetails]
GO
ALTER TABLE [dbo].[tblUsedMaterial]  WITH CHECK ADD  CONSTRAINT [FK_tblUsedMaterial_tblStatus] FOREIGN KEY([Status])
REFERENCES [dbo].[tblStatus] ([StatusID])
GO
ALTER TABLE [dbo].[tblUsedMaterial] CHECK CONSTRAINT [FK_tblUsedMaterial_tblStatus]
GO
ALTER TABLE [dbo].[tblUsers]  WITH CHECK ADD  CONSTRAINT [FK_tblUsers_tblRoles] FOREIGN KEY([Role])
REFERENCES [dbo].[tblRoles] ([RoleID])
GO
ALTER TABLE [dbo].[tblUsers] CHECK CONSTRAINT [FK_tblUsers_tblRoles]
GO
ALTER TABLE [dbo].[tblUsers]  WITH CHECK ADD  CONSTRAINT [FK_tblUsers_tblStatus] FOREIGN KEY([Status])
REFERENCES [dbo].[tblStatus] ([StatusID])
GO
ALTER TABLE [dbo].[tblUsers] CHECK CONSTRAINT [FK_tblUsers_tblStatus]
GO
ALTER TABLE [dbo].[tblUsers]  WITH CHECK ADD  CONSTRAINT [FK_tblUsers_tblTypeJobs] FOREIGN KEY([TypeJob])
REFERENCES [dbo].[tblTypeJobs] ([TypeJobID])
GO
ALTER TABLE [dbo].[tblUsers] CHECK CONSTRAINT [FK_tblUsers_tblTypeJobs]
GO
USE [master]
GO
ALTER DATABASE [AnServices] SET  READ_WRITE 
GO
