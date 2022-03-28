USE [master]
GO
/****** Object:  Database [AnServices]    Script Date: 3/28/2022 9:21:03 AM ******/
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
/****** Object:  Table [dbo].[tblContract]    Script Date: 3/28/2022 9:21:03 AM ******/
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
/****** Object:  Table [dbo].[tblInviteCode]    Script Date: 3/28/2022 9:21:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblInviteCode](
	[InviteCodeID] [int] IDENTITY(1,1) NOT NULL,
	[CustomerID] [int] NOT NULL,
	[Code] [varchar](10) NULL,
	[IsUsed] [bit] NULL,
	[ExpireDate] [datetime] NULL,
 CONSTRAINT [PK_tblInviteCode] PRIMARY KEY CLUSTERED 
(
	[InviteCodeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblInvoice]    Script Date: 3/28/2022 9:21:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblInvoice](
	[InvoiceID] [int] IDENTITY(1,1) NOT NULL,
	[ServiceRequestID] [int] NOT NULL,
	[ContractID] [int] NOT NULL,
	[TotalCost] [decimal](18, 2) NULL,
	[TotalCostUpdate] [decimal](18, 2) NULL,
	[InvoiceDateCreate] [datetime] NULL,
	[InvoiceDateUpdate] [datetime] NULL,
	[PromotionID] [int] NULL,
 CONSTRAINT [PK_tblInvoice] PRIMARY KEY CLUSTERED 
(
	[InvoiceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblMaterial]    Script Date: 3/28/2022 9:21:03 AM ******/
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
/****** Object:  Table [dbo].[tblMedia]    Script Date: 3/28/2022 9:21:03 AM ******/
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
/****** Object:  Table [dbo].[tblPromotion]    Script Date: 3/28/2022 9:21:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblPromotion](
	[PromotionID] [int] IDENTITY(1,1) NOT NULL,
	[CustomerID] [int] NOT NULL,
	[PromotionCode] [varchar](10) NULL,
	[PromotionDescription] [nvarchar](50) NULL,
	[PromotionValue] [decimal](18, 2) NULL,
	[PromotionActive] [bit] NULL,
	[PromotionDateExpired] [datetime] NULL,
 CONSTRAINT [PK_tblPromotion] PRIMARY KEY CLUSTERED 
(
	[PromotionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblRepairDetail]    Script Date: 3/28/2022 9:21:03 AM ******/
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
/****** Object:  Table [dbo].[tblReport]    Script Date: 3/28/2022 9:21:03 AM ******/
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
/****** Object:  Table [dbo].[tblRequestDetails]    Script Date: 3/28/2022 9:21:03 AM ******/
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
 CONSTRAINT [PK_tblRequestDetails] PRIMARY KEY CLUSTERED 
(
	[RequestDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblRoles]    Script Date: 3/28/2022 9:21:03 AM ******/
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
/****** Object:  Table [dbo].[tblServiceRequest]    Script Date: 3/28/2022 9:21:03 AM ******/
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
	[PromotionID] [int] NULL,
 CONSTRAINT [PK_tblRequestService] PRIMARY KEY CLUSTERED 
(
	[ServiceRequestID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblServices]    Script Date: 3/28/2022 9:21:03 AM ******/
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
/****** Object:  Table [dbo].[tblStatus]    Script Date: 3/28/2022 9:21:03 AM ******/
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
/****** Object:  Table [dbo].[tblTypeJobs]    Script Date: 3/28/2022 9:21:03 AM ******/
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
/****** Object:  Table [dbo].[tblTypeService]    Script Date: 3/28/2022 9:21:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblTypeService](
	[TypeServiceID] [int] IDENTITY(1,1) NOT NULL,
	[TypeServiceDecription] [nvarchar](100) NULL,
	[Value] [int] NULL,
 CONSTRAINT [PK_tblTypeService] PRIMARY KEY CLUSTERED 
(
	[TypeServiceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblUsedMaterial]    Script Date: 3/28/2022 9:21:03 AM ******/
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
/****** Object:  Table [dbo].[tblUsers]    Script Date: 3/28/2022 9:21:03 AM ******/
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

INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [ServiceRequestID], [ContractTitle], [ContractUrl], [ContractStartDate], [ContractEndDate], [ContractDeposit], [ContractTotalPrice], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (22, 79, 160, N'Hợp đồng Test 20/3', N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/files%2F1647878200605QUIZ%204_29.10.2021.pdf?alt=media&token=7dc1dc22-75af-4aff-9171-b51fea759d9b', CAST(N'2022-03-20' AS Date), CAST(N'2022-03-24' AS Date), CAST(0.10 AS Decimal(18, 2)), CAST(1000000.00 AS Decimal(18, 2)), 3, CAST(N'2022-03-20 14:35:06.023' AS DateTime), CAST(N'2022-03-21 11:07:43.967' AS DateTime))
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [ServiceRequestID], [ContractTitle], [ContractUrl], [ContractStartDate], [ContractEndDate], [ContractDeposit], [ContractTotalPrice], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (24, 85, 161, N'Hợp đồng Monkey D Luffy', N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/files%2F1647878200605QUIZ%204_29.10.2021.pdf?alt=media&token=7dc1dc22-75af-4aff-9171-b51fea759d9b', CAST(N'2022-03-21' AS Date), CAST(N'2022-03-24' AS Date), CAST(0.10 AS Decimal(18, 2)), CAST(1400000.00 AS Decimal(18, 2)), 3, CAST(N'2022-03-21 20:51:52.970' AS DateTime), CAST(N'2022-03-22 10:40:29.650' AS DateTime))
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [ServiceRequestID], [ContractTitle], [ContractUrl], [ContractStartDate], [ContractEndDate], [ContractDeposit], [ContractTotalPrice], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (25, 85, 163, N'Hợp đồng Hé hé', N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/files%2F1647921040746HD%20Trie%CC%82%CC%89n%20khai%20KLTN%20KTPM%20-FUHCM_2022.pdf?alt=media&token=fd21b1df-2168-4c0e-8352-4e6fbd4b7274', CAST(N'2022-03-22' AS Date), CAST(N'2022-03-24' AS Date), CAST(0.00 AS Decimal(18, 2)), CAST(550000.00 AS Decimal(18, 2)), 3, CAST(N'2022-03-22 10:50:45.197' AS DateTime), CAST(N'2022-03-24 18:54:36.230' AS DateTime))
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [ServiceRequestID], [ContractTitle], [ContractUrl], [ContractStartDate], [ContractEndDate], [ContractDeposit], [ContractTotalPrice], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (26, 85, 164, N'Hợp đồng Ahihi', N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/files%2F1647945689350SSC102_Chapter%208_Negative%20Messages.pptx.pdf?alt=media&token=1fe5d59e-74a7-42a9-9b83-77f2402d2e85', CAST(N'2022-03-23' AS Date), CAST(N'2022-03-25' AS Date), CAST(0.00 AS Decimal(18, 2)), CAST(1000000.00 AS Decimal(18, 2)), 3, CAST(N'2022-03-22 17:41:20.567' AS DateTime), CAST(N'2022-03-22 17:45:13.470' AS DateTime))
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [ServiceRequestID], [ContractTitle], [ContractUrl], [ContractStartDate], [ContractEndDate], [ContractDeposit], [ContractTotalPrice], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (27, 88, 185, N'Hợp đồng Huỳnh Thanh Tài', N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/files%2F1647952601871SSC102_Chapter%208_Negative%20Messages.pptx.pdf?alt=media&token=7426a77e-be29-4913-bb19-563bfe562b72', CAST(N'2022-03-26' AS Date), CAST(N'2022-03-27' AS Date), CAST(0.50 AS Decimal(18, 2)), CAST(1200000.00 AS Decimal(18, 2)), 3, CAST(N'2022-03-22 19:36:28.830' AS DateTime), CAST(N'2022-03-22 19:37:39.007' AS DateTime))
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [ServiceRequestID], [ContractTitle], [ContractUrl], [ContractStartDate], [ContractEndDate], [ContractDeposit], [ContractTotalPrice], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (28, 85, 162, N'Hợp đồng Rononoa Zoro', N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/files%2F1648122665528IC-Business-Trip-Report-GHN_Tour_PDF.pdf?alt=media&token=0fbe48c5-bf84-44b9-858d-78359b00021f', CAST(N'2022-03-24' AS Date), CAST(N'2022-03-31' AS Date), CAST(0.00 AS Decimal(18, 2)), CAST(1200000.00 AS Decimal(18, 2)), 3, CAST(N'2022-03-24 18:45:24.253' AS DateTime), CAST(N'2022-03-24 18:57:48.600' AS DateTime))
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [ServiceRequestID], [ContractTitle], [ContractUrl], [ContractStartDate], [ContractEndDate], [ContractDeposit], [ContractTotalPrice], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (29, 85, 186, N'Hợp đồng Nguyễn Văn C', N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/files%2F1648127381356IC-Business-Trip-Report-GHN_Tour_PDF.pdf?alt=media&token=12661a12-3adb-4c40-8d0f-484f259bd3c7', CAST(N'2022-03-24' AS Date), CAST(N'2022-03-31' AS Date), CAST(0.00 AS Decimal(18, 2)), CAST(5555500.00 AS Decimal(18, 2)), 3, CAST(N'2022-03-24 20:07:17.673' AS DateTime), CAST(N'2022-03-24 20:21:59.310' AS DateTime))
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [ServiceRequestID], [ContractTitle], [ContractUrl], [ContractStartDate], [ContractEndDate], [ContractDeposit], [ContractTotalPrice], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (30, 85, 187, N'Hợp đồng Nguyễn Văn Po', N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/files%2F1648127432636IC-Business-Trip-Report-GHN_Tour_PDF.pdf?alt=media&token=fcc167aa-978c-4833-8c7e-4ed41146a4b1', CAST(N'2022-03-24' AS Date), CAST(N'2022-03-31' AS Date), CAST(0.70 AS Decimal(18, 2)), CAST(500.00 AS Decimal(18, 2)), 3, CAST(N'2022-03-24 20:10:34.253' AS DateTime), CAST(N'2022-03-24 20:22:04.307' AS DateTime))
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [ServiceRequestID], [ContractTitle], [ContractUrl], [ContractStartDate], [ContractEndDate], [ContractDeposit], [ContractTotalPrice], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (31, 88, 194, N'Hợp đồng Kylian Mbappe', N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/files%2F1648206564389IC-Business-Trip-Report-GHN_Tour_PDF.pdf?alt=media&token=8b98f5bf-94bb-454f-a9a1-d85cdfdb9980', CAST(N'2022-03-25' AS Date), CAST(N'2022-03-31' AS Date), CAST(0.00 AS Decimal(18, 2)), CAST(1200000.00 AS Decimal(18, 2)), 7, CAST(N'2022-03-25 18:09:26.820' AS DateTime), CAST(N'2022-03-25 18:26:16.663' AS DateTime))
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [ServiceRequestID], [ContractTitle], [ContractUrl], [ContractStartDate], [ContractEndDate], [ContractDeposit], [ContractTotalPrice], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (32, 88, 210, N'Hợp đồng Jj', N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/files%2F1648269539571IC-Business-Trip-Report-GHN_Tour_PDF.pdf?alt=media&token=ccd6ada2-da74-46d7-96e1-893abc45e746', CAST(N'2022-03-26' AS Date), CAST(N'2022-03-31' AS Date), CAST(0.50 AS Decimal(18, 2)), CAST(9880000.00 AS Decimal(18, 2)), 3, CAST(N'2022-03-26 11:39:01.957' AS DateTime), CAST(N'2022-03-26 11:39:58.347' AS DateTime))
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [ServiceRequestID], [ContractTitle], [ContractUrl], [ContractStartDate], [ContractEndDate], [ContractDeposit], [ContractTotalPrice], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (33, 88, 209, N'Hợp đồng Jj', N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/files%2F1648270743620IC-Business-Trip-Report-GHN_Tour_PDF.pdf?alt=media&token=d7e3cbe4-c79f-4bbe-8e32-d0036d90cb29', CAST(N'2022-03-26' AS Date), CAST(N'2022-03-30' AS Date), CAST(0.00 AS Decimal(18, 2)), CAST(1200000.00 AS Decimal(18, 2)), 3, CAST(N'2022-03-27 11:59:02.030' AS DateTime), CAST(N'2022-03-27 11:59:07.990' AS DateTime))
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [ServiceRequestID], [ContractTitle], [ContractUrl], [ContractStartDate], [ContractEndDate], [ContractDeposit], [ContractTotalPrice], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (34, 88, 208, N'Hợp đồng Lol', N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/files%2F1648271304978IC-Business-Trip-Report-GHN_Tour_PDF.pdf?alt=media&token=d3e26cfb-54d2-44e9-9e16-1deeaf7fe71d', CAST(N'2022-03-26' AS Date), CAST(N'2022-03-30' AS Date), CAST(0.00 AS Decimal(18, 2)), CAST(700000.00 AS Decimal(18, 2)), 2, CAST(N'2022-03-27 12:05:47.383' AS DateTime), CAST(N'2022-03-27 12:08:24.157' AS DateTime))
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [ServiceRequestID], [ContractTitle], [ContractUrl], [ContractStartDate], [ContractEndDate], [ContractDeposit], [ContractTotalPrice], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (35, 89, 211, N'Hợp đồng Mm', N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/files%2F1648274712488IC-Business-Trip-Report-GHN_Tour_PDF.pdf?alt=media&token=635cfa13-bf5c-4fc8-80a6-921e83de7eac', CAST(N'2022-03-26' AS Date), CAST(N'2022-03-31' AS Date), CAST(0.10 AS Decimal(18, 2)), CAST(9600000.00 AS Decimal(18, 2)), 3, CAST(N'2022-03-26 13:05:13.723' AS DateTime), CAST(N'2022-03-26 13:05:24.870' AS DateTime))
SET IDENTITY_INSERT [dbo].[tblContract] OFF
SET IDENTITY_INSERT [dbo].[tblInviteCode] ON 

INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (1, 79, N'MVR5iNJMi1', 0, CAST(N'2022-04-23 10:38:17.333' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (2, 85, N'oceRxeydN5', 1, CAST(N'2022-04-23 11:20:39.113' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (3, 85, N'KUp28zGGtd', 1, CAST(N'2022-04-23 11:23:26.083' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (4, 85, N'dJmBvaOb7p', 1, CAST(N'2022-04-23 12:07:37.813' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (5, 85, N'8SmlgcVplS', 1, CAST(N'2022-04-23 12:07:46.313' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (6, 85, N'ilLaMBkiEH', 1, CAST(N'2022-04-23 12:07:51.540' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (7, 85, N'R1luXFr7TP', 1, CAST(N'2022-04-23 12:08:27.010' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (8, 85, N'MXtar2rDVg', 1, CAST(N'2022-04-23 12:10:10.653' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (9, 85, N'dafa518Mzu', 1, CAST(N'2022-04-23 12:10:13.990' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (10, 85, N'0qW0YGq2Nb', 1, CAST(N'2022-04-23 12:10:16.790' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (11, 85, N'uYWVGK1vtU', 0, CAST(N'2022-04-23 12:10:42.703' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (12, 85, N'GfHiZgA2Cl', 0, CAST(N'2022-04-23 12:12:55.387' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (13, 95, N'9MdfaTdyNg', 1, CAST(N'2022-04-23 12:22:35.943' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (14, 95, N'ugDrUPQx6k', 0, CAST(N'2022-04-23 12:25:48.223' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (15, 97, N'wMzFg4CmIF', 0, CAST(N'2022-04-23 12:28:47.030' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (16, 97, N'K2mgesruGp', 1, CAST(N'2022-04-23 21:01:14.120' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (17, 88, N'1wX1mCqASe', 1, CAST(N'2022-04-24 17:18:19.573' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (18, 88, N'uGhATNe2bP', 0, CAST(N'2022-04-24 19:48:30.270' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (19, 85, N'AX10nHORyY', 1, CAST(N'2022-04-24 20:10:00.927' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (20, 88, N'4mOPKZmLzl', 0, CAST(N'2022-04-24 20:12:48.253' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (21, 88, N'OFYXnRFxW5', 1, CAST(N'2022-04-25 11:18:34.153' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (22, 88, N'BJ6CSHYJT2', 0, CAST(N'2022-04-25 11:32:21.407' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (23, 88, N'RA8YBQBZP2', 1, CAST(N'2022-04-25 12:40:30.500' AS DateTime))
INSERT [dbo].[tblInviteCode] ([InviteCodeID], [CustomerID], [Code], [IsUsed], [ExpireDate]) VALUES (24, 89, N'UHGWG85ZSL', 0, CAST(N'2022-04-25 13:00:45.557' AS DateTime))
SET IDENTITY_INSERT [dbo].[tblInviteCode] OFF
SET IDENTITY_INSERT [dbo].[tblInvoice] ON 

INSERT [dbo].[tblInvoice] ([InvoiceID], [ServiceRequestID], [ContractID], [TotalCost], [TotalCostUpdate], [InvoiceDateCreate], [InvoiceDateUpdate], [PromotionID]) VALUES (22, 186, 29, CAST(5505500.00 AS Decimal(18, 2)), NULL, CAST(N'2022-03-25 12:55:28.223' AS DateTime), NULL, NULL)
INSERT [dbo].[tblInvoice] ([InvoiceID], [ServiceRequestID], [ContractID], [TotalCost], [TotalCostUpdate], [InvoiceDateCreate], [InvoiceDateUpdate], [PromotionID]) VALUES (23, 162, 28, CAST(550000.00 AS Decimal(18, 2)), NULL, CAST(N'2022-03-25 12:56:43.767' AS DateTime), NULL, NULL)
INSERT [dbo].[tblInvoice] ([InvoiceID], [ServiceRequestID], [ContractID], [TotalCost], [TotalCostUpdate], [InvoiceDateCreate], [InvoiceDateUpdate], [PromotionID]) VALUES (24, 208, 34, CAST(735000.00 AS Decimal(18, 2)), NULL, CAST(N'2022-03-27 12:12:35.320' AS DateTime), NULL, 28)
INSERT [dbo].[tblInvoice] ([InvoiceID], [ServiceRequestID], [ContractID], [TotalCost], [TotalCostUpdate], [InvoiceDateCreate], [InvoiceDateUpdate], [PromotionID]) VALUES (25, 210, 32, CAST(-2645750.00 AS Decimal(18, 2)), NULL, CAST(N'2022-03-26 12:56:45.690' AS DateTime), NULL, 34)
INSERT [dbo].[tblInvoice] ([InvoiceID], [ServiceRequestID], [ContractID], [TotalCost], [TotalCostUpdate], [InvoiceDateCreate], [InvoiceDateUpdate], [PromotionID]) VALUES (26, 211, 35, CAST(720000.00 AS Decimal(18, 2)), NULL, CAST(N'2022-03-26 13:11:22.803' AS DateTime), NULL, 35)
SET IDENTITY_INSERT [dbo].[tblInvoice] OFF
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
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (263, 161, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1647869965176rn_image_picker_lib_temp_a62d530b-f628-46ff-a367-992d2c586842.jpg?alt=media&token=dc894586-c60b-445a-8558-781fdb0b9e64')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (264, 161, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1647869965125rn_image_picker_lib_temp_c62176a1-c173-4311-b442-989c2b54c822.png?alt=media&token=87ac1b01-87f1-4660-becf-50503ce3524e')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (265, 162, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1647874868701rn_image_picker_lib_temp_64ed2084-6261-4d11-85fc-8cf51b614c8e.jpg?alt=media&token=0a4d64ad-035a-417d-98d7-45d553bf1d33')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (266, 162, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1647874868746rn_image_picker_lib_temp_81f4b415-82da-43e4-aa14-a56c4b88b2f7.jpg?alt=media&token=4c2c1f39-39b0-4beb-8340-e01a002bf7f6')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (267, 162, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1647874868749rn_image_picker_lib_temp_6d3a281f-d8c1-4286-886f-f389ed3307ee.jpg?alt=media&token=9ec9d82c-abf7-466d-853f-f8975d01e8ee')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (268, NULL, 38, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1647875167820rn_image_picker_lib_temp_d1721592-6aee-4652-8889-f04fc4a89b72.jpg?alt=media&token=bb81c26c-231c-414a-9699-f670163930de')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (269, NULL, 38, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1647875167872rn_image_picker_lib_temp_efcddaa1-5b2c-4687-997a-85b9859cdffc.jpg?alt=media&token=6e67c4b3-bbfa-414d-84dc-29cfae8306f4')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (270, NULL, 39, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1647875185627rn_image_picker_lib_temp_d4219045-c4cc-406b-99df-a87da59a3f2f.jpg?alt=media&token=72e962eb-0da0-4c47-962c-618087199469')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (271, NULL, 40, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1647920127997rn_image_picker_lib_temp_5e82f820-69f2-4390-bd3a-0d743b1f1d7c.png?alt=media&token=cfba9aaf-47eb-44ba-a1c0-d0d7635118a7')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (272, 163, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1647920931602rn_image_picker_lib_temp_8a6ec044-b59c-45f0-9672-6bf198c24c6d.png?alt=media&token=9f70a68b-79b3-4003-bf96-e30b7d4795fd')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (273, 164, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1647945312879rn_image_picker_lib_temp_5c0cf77d-36cf-480e-af03-503da821dd6b.jpg?alt=media&token=50328540-8929-4644-a3ac-e9b13df1acd6')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (274, 164, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1647945312930rn_image_picker_lib_temp_4a7591c9-8330-49be-904a-fba7562184dc.jpg?alt=media&token=82992407-f949-4ecd-a4a2-4e13321b7c82')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (275, NULL, 41, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1647946050279rn_image_picker_lib_temp_ccc9b55e-7be3-4b45-881e-9a9129df7512.jpg?alt=media&token=45361176-e817-43ac-aa10-7cb930ba1695')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (276, NULL, 42, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1647946083420rn_image_picker_lib_temp_8ec8ecea-774e-4158-9e45-7b6ab7055451.jpg?alt=media&token=39067576-ee45-4eb4-b0d7-9344d0796abb')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (277, NULL, 43, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1647946096964rn_image_picker_lib_temp_43188102-67ff-4515-840d-226eaaad62d8.jpg?alt=media&token=7b950fd4-5568-49f3-b85c-3047accbd0e5')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (298, 185, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1647952493910rn_image_picker_lib_temp_7185f4f3-d77b-440f-b38b-5f8500e1d130.jpg?alt=media&token=03a825e1-ab6e-427e-adef-a96472fd3244')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (299, 185, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1647952493832rn_image_picker_lib_temp_d6d8d0b7-83e9-486a-9956-eba9b6991a97.jpg?alt=media&token=21648f13-c648-44cc-9b04-6be528f278bd')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (300, NULL, 44, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1647952895821rn_image_picker_lib_temp_34eaccbc-f0d3-4515-8fb9-def4ef10d3fe.jpg?alt=media&token=8c25256e-477f-41c4-96f8-da571a998373')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (301, NULL, 45, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1647952917174rn_image_picker_lib_temp_cabe1d29-1af6-4044-9139-c5cb91f8de2a.png?alt=media&token=7cffbbd1-7337-45ea-b990-bf13f882a46c')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (302, NULL, 46, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1647953140969rn_image_picker_lib_temp_79db0f95-e11c-48a6-86cd-3aada612793f.jpg?alt=media&token=e8c3d507-a089-42d7-b19d-3b6aba01dcc2')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (303, NULL, 47, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648124332037rn_image_picker_lib_temp_7a18b782-9dcd-4d75-87d1-a889b050ce2b.jpg?alt=media&token=54c76bad-2294-498f-add1-29efa916003f')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (304, NULL, 48, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648124350573rn_image_picker_lib_temp_32f992fd-6f27-49c9-af8d-1b09ca09097b.png?alt=media&token=2ff7f693-6680-4856-b1c2-cdf69cd44ed2')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (305, 186, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1648127125545rn_image_picker_lib_temp_814bf05c-1888-4095-8827-bf9659e85367.jpg?alt=media&token=7c246886-b8f3-4a36-9262-84ff6f08112f')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (306, 186, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1648127125594rn_image_picker_lib_temp_45f2099c-5b6b-439a-8481-88f761e713a1.jpg?alt=media&token=ca1c8993-3761-49e9-82ea-6b74b3f751d9')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (307, 186, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1648127125598rn_image_picker_lib_temp_a0954c13-675f-4d4e-b046-e562ad4fa4e2.jpg?alt=media&token=53b42188-07c6-403d-b11c-184c38045a63')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (308, 187, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1648127355823rn_image_picker_lib_temp_2a2debea-b963-44c9-a929-e28970f31963.jpg?alt=media&token=b87aea72-2392-4151-9706-88157520ad16')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (309, NULL, 49, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648128262035rn_image_picker_lib_temp_e0b96b29-fd8c-4de9-bb81-abcf79dcb320.jpg?alt=media&token=d296f269-63ba-4b51-8653-0adc7e72fdb8')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (310, NULL, 50, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648128276763rn_image_picker_lib_temp_0ae73462-9071-4066-b269-f313aa3c0bc0.jpg?alt=media&token=3a55e9cb-5cce-47e1-ac88-5317c93136a5')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (311, NULL, 51, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648128297321rn_image_picker_lib_temp_8374f804-9d85-4bf7-8ca0-8f2f07a03e71.jpg?alt=media&token=6265b617-4df5-4d0c-976b-b154055649a0')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (312, NULL, 52, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648128310324rn_image_picker_lib_temp_673b1656-5cca-490b-b7aa-50caee4f8c24.jpg?alt=media&token=ca624eac-c3b8-4463-b8e3-db39778fccc0')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (313, NULL, 53, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648128323560rn_image_picker_lib_temp_e0f678e8-4617-47b2-b556-18f21b1d22a3.jpg?alt=media&token=6fc717c9-4c2c-4767-84ec-d22d379ba711')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (314, 188, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1648129471769rn_image_picker_lib_temp_0b5985c9-f3ab-4534-9d99-af56d0191930.jpg?alt=media&token=614f97f1-2d26-4f7b-8c82-51f4704d90c9')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (315, 189, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1648130374887rn_image_picker_lib_temp_9175db3f-9744-41a5-b914-47705f274813.jpg?alt=media&token=38e9ed59-6e1d-4041-abd6-049cbfa9e8b6')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (316, 190, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1648130603634rn_image_picker_lib_temp_8458f183-3dc0-4424-8139-b3546fef7bd2.png?alt=media&token=37d55a95-ce59-4e60-8646-cd7a05f39714')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (317, 191, NULL, N'string')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (318, 192, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1648188640199rn_image_picker_lib_temp_f663e974-0878-48fd-b7cc-caeadbe9ccef.jpg?alt=media&token=3acd88b7-4c73-4b85-8cf5-40fd33f5c0c4')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (319, 193, NULL, N'string')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (320, 194, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1648206051265rn_image_picker_lib_temp_fee07f96-d171-4c97-b489-ce2eb489863f.jpg?alt=media&token=4d6ed561-d225-418d-b1f0-99c304171aa2')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (321, NULL, 54, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648206701948rn_image_picker_lib_temp_ef8f9238-90e8-48ce-93a1-5f9ab27aaaa6.jpg?alt=media&token=73519ba5-5932-437b-aa09-d8763c8a1c0e')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (322, 195, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1648206908756rn_image_picker_lib_temp_2ed6d119-09cc-40e7-9a94-6fc54979a313.jpg?alt=media&token=ef03c6f9-b1ca-4d5c-9e72-9f941d81b6ca')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (323, 196, NULL, N'string')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (324, 197, NULL, N'string')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (325, 198, NULL, N'string')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (326, 199, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1648212365403rn_image_picker_lib_temp_cf0032a7-867b-4efd-a671-03a871c03ec2.jpg?alt=media&token=e4bc3873-3be3-453f-81d5-85983feab95e')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (327, 200, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1648212606701rn_image_picker_lib_temp_fb5ec05e-9c80-4837-add6-5d73ea25da9f.png?alt=media&token=02159d83-f0e8-4c24-896d-9d01fd36ea66')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (328, 201, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1648212888260rn_image_picker_lib_temp_6e9efa5c-a309-488a-9a02-0a9d6878b115.jpg?alt=media&token=21c6a88e-657d-4e7b-bb58-4a16e374ee2d')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (329, 202, NULL, N'string')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (330, 203, NULL, N'string')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (331, 204, NULL, N'string')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (332, 205, NULL, N'string')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (333, 206, NULL, N'string')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (334, 207, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1648214061562rn_image_picker_lib_temp_3a09fb71-691f-4d04-ae4d-891575cdc36c.jpg?alt=media&token=e8f969da-1d3e-4e6d-9120-bd50447ca6b5')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (335, 208, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1648214109432rn_image_picker_lib_temp_62d0ad14-285c-499e-9a0a-52c4713b67bf.jpg?alt=media&token=fd445653-22e1-4855-a7b5-ae10bfcc2a45')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (336, 209, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1648268208987rn_image_picker_lib_temp_fb23e028-0093-4f8a-996e-1515d2b0af56.jpg?alt=media&token=341b86b9-5af8-41d8-a8ad-2447f0540211')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (337, 210, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1648269443343rn_image_picker_lib_temp_2dbbb7e6-5afa-4d45-87e7-30a081f31893.jpg?alt=media&token=5e85fc72-b863-4e25-b575-0b48fea45bf4')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (338, NULL, 55, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648269682339rn_image_picker_lib_temp_2df49ae0-b065-4fae-94e6-50229670d1f0.jpg?alt=media&token=266bf75f-ebce-4e38-976e-0d5a6b9fb07b')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (339, NULL, 57, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648269908142rn_image_picker_lib_temp_7a7c5590-553b-4495-94a2-f6b2e741c983.jpg?alt=media&token=a3dfe23e-faeb-4827-8082-91c59b00dca7')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (340, NULL, 58, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648269945927rn_image_picker_lib_temp_4a10343d-930c-4b9a-a857-8b67ecdbed16.png?alt=media&token=70d45547-7272-4c0f-90d3-fcfb62356bcc')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (341, NULL, 59, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648269991631rn_image_picker_lib_temp_aa74d2dd-34ca-43d1-a894-b91b1e2eb56d.png?alt=media&token=9cadc0ea-f868-4108-b3c9-f46a933b40ca')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (342, NULL, 60, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648270070008rn_image_picker_lib_temp_69381ccd-8bfb-49de-914d-c947b5a4ef86.jpg?alt=media&token=09e3a890-2006-4221-b984-f2880523a4de')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (343, NULL, 61, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648270290094rn_image_picker_lib_temp_e8de7548-d48e-42b9-a09e-739bcd88b58c.jpg?alt=media&token=b905b450-10af-4cf9-bf62-d0e54f414d38')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (344, NULL, 62, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648270793654rn_image_picker_lib_temp_ec5dca67-b1a5-422f-844e-867b6c044b16.png?alt=media&token=def80ba8-b3d1-4976-8ea5-c4e5b60a56bd')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (345, NULL, 63, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648270809352rn_image_picker_lib_temp_21b1b546-2273-4cb0-8656-a324b455bd78.jpg?alt=media&token=7ffa43e1-d6c6-4063-bfe9-a6c6c0b8330f')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (346, NULL, 64, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648271240033rn_image_picker_lib_temp_87b2b28b-22fa-4855-bf84-960d55bcbb7e.jpg?alt=media&token=24f41079-e5a3-4d1c-bcb7-22745c54acc1')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (347, NULL, 65, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648271435369rn_image_picker_lib_temp_e164e7bb-7cce-43f0-b4ec-0af6db2aa80a.jpg?alt=media&token=66da3605-73df-4012-925a-97755c134f59')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (348, 211, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1648274583561rn_image_picker_lib_temp_04e9cc77-825e-46bf-a327-01a4e844ee00.jpg?alt=media&token=fcef2bad-fc06-48d9-bd53-9b789fff0712')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (349, NULL, 66, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648274867229rn_image_picker_lib_temp_9acbd778-a78f-4c73-bf61-a8beab79ae7a.png?alt=media&token=9fc3af57-46ec-496c-a8fb-d62713293ff5')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (350, NULL, 67, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648274883717rn_image_picker_lib_temp_edcbff73-75e4-4c5a-8a64-672f8639abb9.jpg?alt=media&token=ca9aa642-4213-4c6d-88b1-98599c55a866')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (351, NULL, 68, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648274908227rn_image_picker_lib_temp_74c33d16-e320-4f4c-8dbc-cacee9fbc769.jpg?alt=media&token=c41beb55-2046-4656-905a-77b506471b6c')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (352, NULL, 69, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Reports%2F1648274924364rn_image_picker_lib_temp_9655d900-1d17-467a-9ee7-61f215450187.jpg?alt=media&token=03f614b5-5812-4054-a3e1-2bad66646c90')
SET IDENTITY_INSERT [dbo].[tblMedia] OFF
SET IDENTITY_INSERT [dbo].[tblPromotion] ON 

INSERT [dbo].[tblPromotion] ([PromotionID], [CustomerID], [PromotionCode], [PromotionDescription], [PromotionValue], [PromotionActive], [PromotionDateExpired]) VALUES (27, 79, N'A7Y79QmZ1V', N'Mã Giảm Giá Giới Thiệu - 5%', CAST(0.05 AS Decimal(18, 2)), 1, CAST(N'2022-04-23 11:09:16.697' AS DateTime))
INSERT [dbo].[tblPromotion] ([PromotionID], [CustomerID], [PromotionCode], [PromotionDescription], [PromotionValue], [PromotionActive], [PromotionDateExpired]) VALUES (28, 85, N'TgMin1WKzg', N'Mã Giảm Giá Giới Thiệu - 5%', CAST(0.05 AS Decimal(18, 2)), 1, CAST(N'2022-04-23 12:11:53.127' AS DateTime))
INSERT [dbo].[tblPromotion] ([PromotionID], [CustomerID], [PromotionCode], [PromotionDescription], [PromotionValue], [PromotionActive], [PromotionDateExpired]) VALUES (29, 85, N'Lyz3vEEKUu', N'Mã Giảm Giá Giới Thiệu - 5%', CAST(0.05 AS Decimal(18, 2)), 1, CAST(N'2022-04-23 12:13:07.290' AS DateTime))
INSERT [dbo].[tblPromotion] ([PromotionID], [CustomerID], [PromotionCode], [PromotionDescription], [PromotionValue], [PromotionActive], [PromotionDateExpired]) VALUES (30, 95, N'K9tHIfqTxi', N'Mã Giảm Giá Giới Thiệu - 5%', CAST(0.05 AS Decimal(18, 2)), 1, CAST(N'2022-04-23 12:26:37.003' AS DateTime))
INSERT [dbo].[tblPromotion] ([PromotionID], [CustomerID], [PromotionCode], [PromotionDescription], [PromotionValue], [PromotionActive], [PromotionDateExpired]) VALUES (31, 97, N'DLpf1pvHif', N'Mã Giảm Giá Giới Thiệu - 5%', CAST(0.05 AS Decimal(18, 2)), 1, CAST(N'2022-04-23 12:29:33.637' AS DateTime))
INSERT [dbo].[tblPromotion] ([PromotionID], [CustomerID], [PromotionCode], [PromotionDescription], [PromotionValue], [PromotionActive], [PromotionDateExpired]) VALUES (32, 88, N'QXFvnGATKO', N'Mã Giảm Giá Giới Thiệu - 5%', CAST(0.05 AS Decimal(18, 2)), 0, CAST(N'2022-04-24 19:49:13.057' AS DateTime))
INSERT [dbo].[tblPromotion] ([PromotionID], [CustomerID], [PromotionCode], [PromotionDescription], [PromotionValue], [PromotionActive], [PromotionDateExpired]) VALUES (33, 88, N'0HeMv5YWcY', N'Mã Giảm Giá Giới Thiệu - 5%', CAST(0.05 AS Decimal(18, 2)), 0, CAST(N'2022-04-24 20:13:31.683' AS DateTime))
INSERT [dbo].[tblPromotion] ([PromotionID], [CustomerID], [PromotionCode], [PromotionDescription], [PromotionValue], [PromotionActive], [PromotionDateExpired]) VALUES (34, 88, N'T5UX0Y94OY', N'Mã Giảm Giá Giới Thiệu - 5%', CAST(0.05 AS Decimal(18, 2)), 0, CAST(N'2022-04-25 11:33:13.347' AS DateTime))
INSERT [dbo].[tblPromotion] ([PromotionID], [CustomerID], [PromotionCode], [PromotionDescription], [PromotionValue], [PromotionActive], [PromotionDateExpired]) VALUES (35, 89, N'1NNVZCB3NE', N'Mã Giảm Giá Giới Thiệu - 5%', CAST(0.05 AS Decimal(18, 2)), 0, CAST(N'2022-04-25 13:01:47.847' AS DateTime))
SET IDENTITY_INSERT [dbo].[tblPromotion] OFF
SET IDENTITY_INSERT [dbo].[tblRepairDetail] ON 

INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (127, 236, 80, CAST(N'2022-03-20 13:25:11.953' AS DateTime), NULL, 1, 2)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (128, 236, 82, CAST(N'2022-03-20 13:25:11.980' AS DateTime), NULL, 0, 2)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (129, 239, 82, CAST(N'2022-03-20 14:36:17.860' AS DateTime), NULL, 1, 2)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (130, 239, 80, CAST(N'2022-03-20 14:36:17.867' AS DateTime), NULL, 0, 2)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (131, 241, 80, CAST(N'2022-03-21 21:51:42.593' AS DateTime), NULL, 1, 1)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (132, 241, 82, CAST(N'2022-03-21 21:51:42.600' AS DateTime), NULL, 0, 1)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (133, 242, 86, CAST(N'2022-03-21 21:51:55.087' AS DateTime), NULL, 1, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (134, 242, 83, CAST(N'2022-03-21 21:51:55.093' AS DateTime), NULL, 0, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (135, 249, 86, CAST(N'2022-03-22 17:45:58.257' AS DateTime), NULL, 1, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (136, 249, 80, CAST(N'2022-03-22 17:45:58.267' AS DateTime), NULL, 0, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (137, 250, 86, CAST(N'2022-03-22 17:46:09.753' AS DateTime), NULL, 1, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (138, 250, 82, CAST(N'2022-03-22 17:46:09.757' AS DateTime), NULL, 0, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (139, 250, 83, CAST(N'2022-03-22 17:46:09.760' AS DateTime), NULL, 0, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (140, 250, 80, CAST(N'2022-03-22 17:46:09.760' AS DateTime), NULL, 0, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (141, 284, 86, CAST(N'2022-03-22 19:38:04.410' AS DateTime), NULL, 1, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (142, 284, 83, CAST(N'2022-03-22 19:38:04.413' AS DateTime), NULL, 0, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (143, 285, 86, CAST(N'2022-03-22 19:38:25.430' AS DateTime), NULL, 1, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (144, 285, 80, CAST(N'2022-03-22 19:38:25.437' AS DateTime), NULL, 0, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (145, 285, 82, CAST(N'2022-03-22 19:38:25.440' AS DateTime), NULL, 0, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (146, 285, 83, CAST(N'2022-03-22 19:38:25.443' AS DateTime), NULL, 0, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (147, 284, 82, CAST(N'2022-03-22 19:45:08.450' AS DateTime), NULL, 0, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (148, 284, 80, CAST(N'2022-03-22 19:45:08.490' AS DateTime), NULL, 0, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (149, 244, 86, CAST(N'2022-03-24 18:31:28.483' AS DateTime), NULL, 1, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (150, 244, 82, CAST(N'2022-03-24 18:31:28.507' AS DateTime), NULL, 0, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (151, 243, 86, CAST(N'2022-03-24 18:31:32.023' AS DateTime), NULL, 1, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (152, 243, 82, CAST(N'2022-03-24 18:31:32.027' AS DateTime), NULL, 0, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (153, 286, 86, CAST(N'2022-03-24 20:14:10.840' AS DateTime), NULL, 1, 1)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (154, 286, 80, CAST(N'2022-03-24 20:14:10.860' AS DateTime), NULL, 0, 1)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (155, 287, 86, CAST(N'2022-03-24 20:14:19.393' AS DateTime), NULL, 1, 2)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (156, 287, 82, CAST(N'2022-03-24 20:14:19.400' AS DateTime), NULL, 0, 2)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (157, 288, 86, CAST(N'2022-03-24 20:14:26.310' AS DateTime), NULL, 1, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (158, 288, 82, CAST(N'2022-03-24 20:14:26.310' AS DateTime), NULL, 0, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (159, 289, 86, CAST(N'2022-03-24 20:14:39.323' AS DateTime), NULL, 1, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (160, 289, 82, CAST(N'2022-03-24 20:14:39.327' AS DateTime), NULL, 0, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (161, 290, 86, CAST(N'2022-03-24 20:14:49.967' AS DateTime), NULL, 1, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (162, 290, 83, CAST(N'2022-03-24 20:14:49.967' AS DateTime), NULL, 0, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (163, 291, 86, CAST(N'2022-03-24 20:46:23.393' AS DateTime), NULL, 1, 2)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (164, 291, 80, CAST(N'2022-03-24 20:46:23.400' AS DateTime), NULL, 0, 2)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (165, 303, 86, CAST(N'2022-03-25 18:09:52.293' AS DateTime), NULL, 1, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (166, 303, 83, CAST(N'2022-03-25 18:09:52.303' AS DateTime), NULL, 0, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (167, 303, 80, CAST(N'2022-03-25 18:09:52.303' AS DateTime), NULL, 0, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (168, 303, 82, CAST(N'2022-03-25 18:09:52.307' AS DateTime), NULL, 0, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (169, 303, 102, CAST(N'2022-03-25 18:09:52.310' AS DateTime), NULL, 0, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (170, 302, 86, CAST(N'2022-03-25 18:09:59.727' AS DateTime), NULL, 1, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (171, 302, 80, CAST(N'2022-03-25 18:09:59.737' AS DateTime), NULL, 0, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (172, 302, 82, CAST(N'2022-03-25 18:09:59.740' AS DateTime), NULL, 0, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (173, 328, 86, CAST(N'2022-03-26 11:40:19.570' AS DateTime), NULL, 1, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (174, 328, 80, CAST(N'2022-03-26 11:40:19.573' AS DateTime), NULL, 0, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (175, 329, 86, CAST(N'2022-03-26 11:40:25.713' AS DateTime), NULL, 1, 2)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (176, 329, 82, CAST(N'2022-03-26 11:40:25.720' AS DateTime), NULL, 0, 2)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (177, 330, 86, CAST(N'2022-03-26 11:40:33.313' AS DateTime), NULL, 1, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (178, 330, 83, CAST(N'2022-03-26 11:40:33.317' AS DateTime), NULL, 0, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (179, 331, 86, CAST(N'2022-03-26 11:40:44.380' AS DateTime), NULL, 1, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (180, 331, 102, CAST(N'2022-03-26 11:40:44.387' AS DateTime), NULL, 0, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (181, 332, 86, CAST(N'2022-03-26 11:40:50.957' AS DateTime), NULL, 1, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (182, 332, 102, CAST(N'2022-03-26 11:40:50.963' AS DateTime), NULL, 0, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (183, 330, 82, CAST(N'2022-03-26 11:50:31.960' AS DateTime), NULL, 0, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (184, 327, 86, CAST(N'2022-03-27 11:59:17.620' AS DateTime), NULL, 1, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (185, 327, 80, CAST(N'2022-03-27 11:59:17.627' AS DateTime), NULL, 0, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (186, 326, 86, CAST(N'2022-03-27 11:59:21.820' AS DateTime), NULL, 1, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (187, 326, 102, CAST(N'2022-03-27 11:59:21.823' AS DateTime), NULL, 0, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (188, 325, 86, CAST(N'2022-03-27 12:10:09.037' AS DateTime), NULL, 1, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (189, 325, 102, CAST(N'2022-03-27 12:10:09.040' AS DateTime), NULL, 0, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (190, 333, 86, CAST(N'2022-03-26 13:06:35.997' AS DateTime), NULL, 1, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (191, 333, 80, CAST(N'2022-03-26 13:06:36.063' AS DateTime), NULL, 0, 4)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (192, 334, 86, CAST(N'2022-03-26 13:06:41.937' AS DateTime), NULL, 1, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (193, 334, 82, CAST(N'2022-03-26 13:06:41.937' AS DateTime), NULL, 0, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (194, 335, 86, CAST(N'2022-03-26 13:06:47.677' AS DateTime), NULL, 1, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (195, 335, 82, CAST(N'2022-03-26 13:06:47.687' AS DateTime), NULL, 0, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (196, 336, 86, CAST(N'2022-03-26 13:06:58.063' AS DateTime), NULL, 1, 2)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (197, 336, 80, CAST(N'2022-03-26 13:06:58.067' AS DateTime), NULL, 0, 2)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (198, 336, 82, CAST(N'2022-03-26 13:06:58.067' AS DateTime), NULL, 0, 2)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (199, 336, 83, CAST(N'2022-03-26 13:06:58.070' AS DateTime), NULL, 0, 2)
SET IDENTITY_INSERT [dbo].[tblRepairDetail] OFF
SET IDENTITY_INSERT [dbo].[tblReport] ON 

INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (34, 236, 80, N'Báo cáo vấn đề', N'Có những lỗi rất ngiêm trọng cần xem xét lại', CAST(N'2022-03-20 13:39:37.697' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (35, 237, 80, N'Báo cáo hoàn thành', N'Đã sửa xong', CAST(N'2022-03-19 13:44:13.800' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (36, 239, 82, N'Báo cáo vấn đề', N'Vấn đề lớn hơn trong báo cáo', CAST(N'2022-03-20 14:38:08.080' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (37, 239, 82, N'Báo cáo hoàn thành', N'Vấn đề đã được hoàn thành', CAST(N'2022-03-20 14:38:25.403' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (38, 242, 86, N'Báo cáo vấn đề', N'Jhbjj', CAST(N'2022-03-21 22:06:04.463' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (39, 242, 86, N'Báo cáo hoàn thành', N'OOplkl', CAST(N'2022-03-21 22:06:21.560' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (40, 241, 80, N'Báo cáo hoàn thành', N'Uuuu', CAST(N'2022-03-22 10:35:28.383' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (41, 249, 86, N'Báo cáo hoàn thành', N'Xong', CAST(N'2022-03-22 17:47:31.680' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (42, 250, 86, N'Báo cáo vấn đề', N'Nhà rộng quá', CAST(N'2022-03-22 17:48:03.590' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (43, 250, 86, N'Báo cáo hoàn thành', N'Xong nè', CAST(N'2022-03-22 17:48:16.803' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (44, 284, 86, N'Báo cáo hoàn thành', N'Xong', CAST(N'2022-03-22 19:41:36.160' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (45, 285, 86, N'Báo cáo hoàn thành', N'Rồi', CAST(N'2022-03-22 19:41:57.243' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (46, 284, 86, N'Báo cáo hoàn thành', N'Xông', CAST(N'2022-03-22 19:45:40.893' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (47, 244, 86, N'Báo cáo hoàn thành', N'Ll', CAST(N'2022-03-24 19:18:52.937' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (48, 243, 86, N'Báo cáo hoàn thành', N'Po', CAST(N'2022-03-24 19:19:10.647' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (49, 286, 86, N'Báo cáo hoàn thành', N'P', CAST(N'2022-03-24 20:24:22.507' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (50, 287, 86, N'Báo cáo hoàn thành', N'P', CAST(N'2022-03-24 20:24:36.717' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (51, 288, 86, N'Báo cáo hoàn thành', N'U', CAST(N'2022-03-24 20:24:57.173' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (52, 289, 86, N'Báo cáo hoàn thành', N'U', CAST(N'2022-03-24 20:25:10.060' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (53, 290, 86, N'Báo cáo hoàn thành', N'H', CAST(N'2022-03-24 20:25:23.450' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (54, 303, 86, N'Báo cáo hoàn thành', N'Po', CAST(N'2022-03-25 18:11:41.723' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (55, 328, 86, N'Báo cáo hoàn thành', N'Done', CAST(N'2022-03-26 11:41:26.123' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (56, 329, 86, N'Báo cáo hoàn thành', N'Xong', CAST(N'2022-03-26 11:41:45.840' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (57, 329, 86, N'Báo cáo hoàn thành', N'Oo', CAST(N'2022-03-26 11:45:06.667' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (58, 330, 86, N'Báo cáo hoàn thành', N'Ppoooo', CAST(N'2022-03-26 11:45:44.330' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (59, 331, 86, N'Báo cáo hoàn thành', N'Ajajja', CAST(N'2022-03-26 11:46:30.107' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (60, 332, 86, N'Báo cáo hoàn thành', N'Jk', CAST(N'2022-03-26 11:47:49.407' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (61, 330, 86, N'Báo cáo hoàn thành', N'Kkk', CAST(N'2022-03-26 11:51:28.883' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (62, 327, 86, N'Báo cáo hoàn thành', N'Aaaa', CAST(N'2022-03-27 11:59:49.573' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (63, 326, 86, N'Báo cáo hoàn thành', N'Hh', CAST(N'2022-03-27 12:00:04.787' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (64, 302, 86, N'Báo cáo hoàn thành', N'Hh', CAST(N'2022-03-27 12:07:16.757' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (65, 325, 86, N'Báo cáo hoàn thành', N'Jj', CAST(N'2022-03-27 12:10:30.877' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (66, 333, 86, N'Báo cáo hoàn thành', N'Ppp', CAST(N'2022-03-26 13:07:46.350' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (67, 334, 86, N'Báo cáo hoàn thành', N'Zz', CAST(N'2022-03-26 13:08:01.973' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (68, 335, 86, N'Báo cáo hoàn thành', N'Ju', CAST(N'2022-03-26 13:08:26.633' AS DateTime))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [WorkerID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (69, 336, 86, N'Báo cáo hoàn thành', N'Uu', CAST(N'2022-03-26 13:08:42.783' AS DateTime))
SET IDENTITY_INSERT [dbo].[tblReport] OFF
SET IDENTITY_INSERT [dbo].[tblRequestDetails] ON 

INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (236, 159, 1, 11, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (237, 159, 3, 11, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (238, 159, 5, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (239, 160, 2, 11, CAST(240000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (240, 160, 6, 2, CAST(760000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (241, 161, 3, 12, CAST(500000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (242, 161, 7, 11, CAST(900000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (243, 162, 7, 11, CAST(500000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (244, 162, 13, 16, CAST(700000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (245, 163, 11, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (246, 163, 2, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (249, 164, 7, 12, CAST(700000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (250, 164, 3, 11, CAST(300000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (284, 185, 8, 11, CAST(500000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (285, 185, 11, 11, CAST(700000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (286, 186, 10, 11, CAST(5000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (287, 186, 2, 16, CAST(50000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (288, 186, 14, 16, CAST(500000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (289, 186, 11, 11, CAST(5000000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (290, 186, 1, 16, CAST(500.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (291, 187, 11, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (292, 188, 7, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (293, 189, 4, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (294, 190, 8, 11, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (295, 190, 2, 9, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (296, 190, 11, 9, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (297, 191, 3, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (298, 191, 8, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (299, 192, 7, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (300, 193, 3, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (301, 193, 7, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (302, 194, 4, 9, CAST(500000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (303, 194, 1, 11, CAST(700000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (304, 195, 4, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (305, 196, 3, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (306, 196, 7, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (307, 197, 3, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (308, 197, 7, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (309, 198, 3, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (310, 198, 7, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (311, 199, 2, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (312, 200, 4, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (313, 201, 4, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (314, 202, 3, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (315, 202, 7, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (316, 203, 3, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (317, 203, 7, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (318, 204, 3, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (319, 204, 7, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (320, 205, 3, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (321, 205, 7, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (322, 206, 3, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (323, 206, 7, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (324, 207, 3, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (325, 208, 4, 11, CAST(700000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (326, 209, 4, 9, CAST(500000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (327, 209, 11, 9, CAST(700000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (328, 210, 3, 11, CAST(665000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (329, 210, 1, 11, CAST(855000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (330, 210, 10, 11, CAST(665000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (331, 210, 4, 16, CAST(7600000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (332, 210, 13, 16, CAST(95000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (333, 211, 10, 11, CAST(700000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (334, 211, 3, 16, CAST(8000000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (335, 211, 2, 11, CAST(400000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (336, 211, 13, 11, CAST(500000.00 AS Decimal(18, 2)))
SET IDENTITY_INSERT [dbo].[tblRequestDetails] OFF
SET IDENTITY_INSERT [dbo].[tblRoles] ON 

INSERT [dbo].[tblRoles] ([RoleID], [RoleName]) VALUES (1, N'Staff')
INSERT [dbo].[tblRoles] ([RoleID], [RoleName]) VALUES (2, N'Worker')
INSERT [dbo].[tblRoles] ([RoleID], [RoleName]) VALUES (3, N'Customer')
SET IDENTITY_INSERT [dbo].[tblRoles] OFF
SET IDENTITY_INSERT [dbo].[tblServiceRequest] ON 

INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (159, 79, N'string', N'0123456789', N'123 Phan Văn Trị', N'Cần thợ kiểm tra lại nhà', 14, CAST(N'2022-03-20 11:44:59.753' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (160, 79, N'', N'0934827584', N'123 Nguyễn Oanh, Q.Gò Vấp', N'Nhà tôi đang cần kiểm tra sửa chữa', 14, CAST(N'2022-03-20 14:30:05.313' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (161, 85, N'Monkey D Luffy', N'0966445588', N'Quận 1', N'ゴムゴムの実', 13, CAST(N'2022-03-21 20:39:24.847' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (162, 85, N'Rononoa Zoro', N'0955668833', N'SPAIN', N'Trùm haki vũ trang', 14, CAST(N'2022-03-21 22:01:07.497' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (163, 85, N'Hé hé', N'0933665508', N'Los Angeles', N'No Fear', 1, CAST(N'2022-03-22 10:48:58.373' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (164, 85, N'Ahihi', N'0966554433', N'Ahihi', N'Test ngày 22/3/2022', 13, CAST(N'2022-03-22 17:35:15.093' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (185, 88, N'Huỳnh Thanh Tài', N'0333390995', N'Long', N'Test 22-3-2022 tối', 13, CAST(N'2022-03-22 19:34:58.760' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (186, 85, N'Nguyễn Văn C', N'0966445588', N'Lâm Đồng', N'FPT University', 14, CAST(N'2022-03-24 20:05:28.187' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (187, 85, N'Nguyễn Văn Po', N'0966445588', N'Lâm Đồng', N'Tối 24/3/2022', 14, CAST(N'2022-03-24 20:09:23.253' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (188, 85, N'Yy', N'0988556633', N'Gg', N'Gg', 8, CAST(N'2022-03-24 20:44:32.323' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (189, 85, N'Trần Văn Tuấn', N'0966445577', N'Long An', N'Ngủ khoẻ', 8, CAST(N'2022-03-24 20:59:35.230' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (190, 88, N'Nguyễn Văn Tuấn', N'0966445577', N'Nghệ An', N'Trần Đức Bo', 15, CAST(N'2022-03-24 21:03:25.737' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (191, 85, N'string', N'0966552233', N'string', N'string', 8, CAST(N'2022-03-25 13:09:37.257' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (192, 85, N'Ju', N'0966558833', N'Ko', N'Promotion test', 1, CAST(N'2022-03-25 13:10:40.220' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (193, 85, N'asdqwe', N'0988776622', N'string', N'Promotion test 1', 1, CAST(N'2022-03-25 13:28:10.737' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (194, 88, N'Kylian Mbappe', N'0966445577', N'France', N'Real Madric boy', 6, CAST(N'2022-03-25 18:00:51.167' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (195, 85, N'O', N'0966558822', N'O', N'Promotion test tối 25-3', 2, CAST(N'2022-03-25 18:15:09.397' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (196, 85, N'string', N'0988776622', N'string', N'string', 2, CAST(N'2022-03-25 19:38:00.810' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (197, 79, N'string', N'0988776622', N'string', N'string', 2, CAST(N'2022-03-25 19:38:21.653' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (198, 79, N'string', N'0988776622', N'string', N'string', 2, CAST(N'2022-03-25 19:40:50.553' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (199, 85, N'Op', N'0966558822', N'Op', N'Voucher 1', 2, CAST(N'2022-03-25 19:46:04.620' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (200, 88, N'Pp', N'0966445577', N'Pp', N'Voucher 1', 2, CAST(N'2022-03-25 19:50:06.573' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (201, 88, N'Hu', N'0988445577', N'Hy', N'Hu', 2, CAST(N'2022-03-25 19:56:45.170' AS DateTime), 1, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (202, 88, N'string', N'0988776622', N'string', N'strisssng', 2, CAST(N'2022-03-25 19:57:35.720' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (203, 88, N'string', N'0988776622', N'string', N'strisssng', 2, CAST(N'2022-03-25 20:00:22.953' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (204, 88, N'string', N'0988776622', N'string', N'strisssng', 2, CAST(N'2022-03-25 20:00:59.993' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (205, 88, N'string', N'0988776622', N'string', N'strisssng', 2, CAST(N'2022-03-25 20:03:04.320' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (206, 88, N'string', N'0988776622', N'string', N'strisssng', 1, CAST(N'2022-03-25 20:05:01.193' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (207, 88, N'No game', N'0966445588', N'Nn', N'Ko voucher', 1, CAST(N'2022-03-25 20:14:21.077' AS DateTime), 2, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (208, 88, N'Lol', N'0966445577', N'Lol', N'Có voucher', 13, CAST(N'2022-03-25 20:15:08.630' AS DateTime), 2, 28)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (209, 88, N'Jj', N'0966445588', N'Jj', N'No voucher be like', 6, CAST(N'2022-03-26 11:16:47.260' AS DateTime), 2, 0)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (210, 88, N'Jj', N'0966445522', N'Jj', N'Co voucher 26-3-2022', 14, CAST(N'2022-03-26 11:37:23.150' AS DateTime), 2, 34)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID]) VALUES (211, 89, N'Mm', N'0966445577', N'Mm', N'Voucher 001', 13, CAST(N'2022-03-26 13:03:02.517' AS DateTime), 2, 35)
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
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (8, N'Khách hàng hủy')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (9, N'Chờ xác nhận')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (10, N'Chặn')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (11, N'Hài lòng')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (12, N'Không hài lòng')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (13, N'Đã hoàn thành')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (14, N'Chờ thanh toán')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (15, N'Đang khảo sát')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (16, N'Làm lại yêu cầu')
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

INSERT [dbo].[tblTypeService] ([TypeServiceID], [TypeServiceDecription], [Value]) VALUES (1, N'Dịch vụ xác nhận HÀI LÒNG tự động sau 1 ngày', 1)
INSERT [dbo].[tblTypeService] ([TypeServiceID], [TypeServiceDecription], [Value]) VALUES (2, N'Dịch vụ xác nhận HÀI LÒNG tự động sau 7 ngày', 8)
INSERT [dbo].[tblTypeService] ([TypeServiceID], [TypeServiceDecription], [Value]) VALUES (3, N'Dịch vụ xác nhận HÀI LÒNG tự động sau 14 ngày', 15)
SET IDENTITY_INSERT [dbo].[tblTypeService] OFF
SET IDENTITY_INSERT [dbo].[tblUsedMaterial] ON 

INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (67, 2, 236, 80, 5, NULL, 2, N'test', NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (68, 25, 242, 86, 33, NULL, 3, N'ッッッ', NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (69, 16, 242, 86, 99, NULL, 3, N'木村', NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (70, 25, 242, 86, 500, NULL, 3, N'日本', NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (71, 25, 242, 86, 400, NULL, 3, N'Yyy', NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (72, 25, 242, 86, 330, NULL, 1, N'Uyyyyy', N'no')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (73, 25, 242, 86, 6000, NULL, 3, N'Cyuiii', NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (74, 9, 249, 86, 666, NULL, 3, N'Gu', NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (75, 22, 249, 86, 44, NULL, 2, N'Uuu', NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (76, 26, 249, 86, 456, NULL, 2, N'Qopqpp', NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (77, 17, 285, 86, 33, NULL, 3, N'Hh', NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (78, 33, 285, 86, 66, NULL, 1, N'Uu', N'Dư')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (79, 11, 284, 86, 123, 100, 3, N'Mới', N'dư')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (80, 5, 244, 86, 66, NULL, 3, N'Jjshjs', NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (81, 1, 244, 86, 4, 10, 3, N'Huhu', N'undefined')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (82, 18, 243, 86, 645, NULL, 1, N'Hahah', N'undefined')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (83, 1, 244, 86, 66, NULL, 1, N'Bb', N'undefined')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (84, 18, 243, 86, 12, NULL, 1, N'Zzz', N'undefined')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (85, 1, 244, 86, 66, NULL, 1, N'Tt', N'undefined')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (86, 5, 244, 86, 36, NULL, 1, N'Ff', N'undefined')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (87, 18, 243, 86, 44, NULL, 1, N'Hh', N'undefined')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (88, 5, 244, 86, 66, NULL, 1, N'Hahah', N'Không có ghi chú')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (89, 18, 243, 86, 77, 50, 3, N'Ayhah', N'Không có ghi chú')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (90, 8, 329, 86, 33, NULL, 2, N'Hhh', NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (91, 10, 330, 86, 66, NULL, 2, N'Jj', NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (92, 23, 330, 86, 7, NULL, 2, N'Jja', NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [WorkerID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (93, 8, 291, 86, 66, NULL, 2, N'Ii', NULL)
SET IDENTITY_INSERT [dbo].[tblUsedMaterial] OFF
SET IDENTITY_INSERT [dbo].[tblUsers] ON 

INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (7, N'string111', N'Aa123@', N'Hoàng', N'0123456779', N'Q1', N'hoang@gmail.com', 1, NULL, CAST(N'2022-01-22' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (79, NULL, NULL, N'Test 20/3', N'0332986894', N'Lê Đức Thọ, P16, Q.Gò Vấp', N'test@google.com', 3, NULL, CAST(N'2022-03-20' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (80, NULL, NULL, N'Văn A', N'0339882839', N'123', N'', 2, 3, CAST(N'2022-03-20' AS Date), CAST(N'2022-03-25' AS Date), 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (82, NULL, NULL, N'Văn B', N'0338428573', N'', N'', 2, 2, CAST(N'2022-03-20' AS Date), CAST(N'2022-03-25' AS Date), 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (83, NULL, NULL, N'Văn C', N'0339588275', N'', N'', 2, 7, CAST(N'2022-03-20' AS Date), CAST(N'2022-03-21' AS Date), 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (84, NULL, NULL, N'Test 20/3 2', N'0339852734', N'Q2', N'test2@google.com', 3, NULL, CAST(N'2022-03-20' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (85, NULL, NULL, N'ルフィ', N'0111111111', N'Biển Đông', N'Luffy123@gmail.com', 3, NULL, CAST(N'2022-03-21' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (86, NULL, NULL, N'Huỳnh Thanh Tài', N'0911111110', N'Test_21032022', N'Test_21032022@gmail.com', 2, 1, CAST(N'2022-03-21' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (87, NULL, NULL, N'木下', N'0222222222', N'Okinawa', N'Kinoshita123@gmail.com', 3, NULL, CAST(N'2022-03-22' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (88, NULL, NULL, N'Huỳnh Thanh Tài', N'0333390995', N'Ll', N'Hh@gmail.com', 3, NULL, CAST(N'2022-03-22' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (89, NULL, NULL, N'New user', N'0375250209', N'HCM', N'Hh@gmail.com', 3, NULL, CAST(N'2022-03-22' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (90, NULL, NULL, N'24/3', N'0896758342', N'', N'', 3, NULL, CAST(N'2022-03-24' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (91, NULL, NULL, N'Test invite', N'0111111119', N'string', N'string@gmail.com', 3, NULL, CAST(N'2022-03-24' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (93, NULL, NULL, N'nobb', N'0111111117', N'nobb', N'nobb@gmail.com', 3, NULL, CAST(N'2022-03-24' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (94, NULL, NULL, N'nobb', N'0111111116', N'nobb', N'nobb@gmail.com', 3, NULL, CAST(N'2022-03-24' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (95, NULL, NULL, N'Hu', N'0111111803', N'Hu', N'Hu@gmail.com', 3, NULL, CAST(N'2022-03-24' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (96, NULL, NULL, N'Hj', N'0111111805', N'Hj', N'Hj@gmail.com', 3, NULL, CAST(N'2022-03-24' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (97, NULL, NULL, N'Kk', N'0111111809', N'Kk', N'Kk@gmail.com', 3, NULL, CAST(N'2022-03-24' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (98, NULL, NULL, N'Jii', N'0111111801', N'Jii', N'Jii@gmail.com', 3, NULL, CAST(N'2022-03-24' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (99, NULL, NULL, N'123', N'0177557545', N'q1', N'123@gmail.com', 3, NULL, CAST(N'2022-03-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (100, NULL, NULL, N'Test_25032022', N'0900000012', N'Test_25032022', N'Test_25032022@gmail.com', 2, 7, CAST(N'2022-03-25' AS Date), CAST(N'2022-03-25' AS Date), 5)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (102, NULL, NULL, N'Lý Gia Hoàng', N'0900000013', NULL, N'hoanglg6699@gmail.com', 2, 7, CAST(N'2022-03-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (103, NULL, NULL, N'Kylian Mbappe', N'0911111119', N'France', N'Kylian@gmail.com', 3, NULL, CAST(N'2022-03-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (104, NULL, NULL, N'Erling Haaland', N'0911111118', N'Norway', N'Haaland@gmail.com', 3, NULL, CAST(N'2022-03-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (105, NULL, NULL, N'Bruno Fernandes', N'0911111112', N'Portugal', N'Bruno@gmail.com', 3, NULL, CAST(N'2022-03-26' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (106, NULL, NULL, N'Kk', N'0922222222', N'Kk', N'Kk@gmail.com', 3, NULL, CAST(N'2022-03-26' AS Date), NULL, 4)
SET IDENTITY_INSERT [dbo].[tblUsers] OFF
/****** Object:  Index [IX_tblInvoice]    Script Date: 3/28/2022 9:21:03 AM ******/
ALTER TABLE [dbo].[tblInvoice] ADD  CONSTRAINT [IX_tblInvoice] UNIQUE NONCLUSTERED 
(
	[ContractID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_tblUsers]    Script Date: 3/28/2022 9:21:03 AM ******/
ALTER TABLE [dbo].[tblUsers] ADD  CONSTRAINT [IX_tblUsers] UNIQUE NONCLUSTERED 
(
	[PhoneNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
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
ALTER TABLE [dbo].[tblInviteCode]  WITH CHECK ADD  CONSTRAINT [FK_tblInviteCode_tblUsers] FOREIGN KEY([CustomerID])
REFERENCES [dbo].[tblUsers] ([UserID])
GO
ALTER TABLE [dbo].[tblInviteCode] CHECK CONSTRAINT [FK_tblInviteCode_tblUsers]
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
ALTER TABLE [dbo].[tblPromotion]  WITH CHECK ADD  CONSTRAINT [FK_tblPromotion_tblUsers] FOREIGN KEY([CustomerID])
REFERENCES [dbo].[tblUsers] ([UserID])
GO
ALTER TABLE [dbo].[tblPromotion] CHECK CONSTRAINT [FK_tblPromotion_tblUsers]
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
