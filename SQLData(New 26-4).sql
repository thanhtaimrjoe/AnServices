USE [master]
GO
/****** Object:  Database [AnServices]    Script Date: 4/26/2022 9:25:42 AM ******/
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
/****** Object:  Table [dbo].[tblContract]    Script Date: 4/26/2022 9:25:42 AM ******/
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
/****** Object:  Table [dbo].[tblInviteCode]    Script Date: 4/26/2022 9:25:42 AM ******/
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
/****** Object:  Table [dbo].[tblInvoice]    Script Date: 4/26/2022 9:25:42 AM ******/
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
/****** Object:  Table [dbo].[tblMaterial]    Script Date: 4/26/2022 9:25:42 AM ******/
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
/****** Object:  Table [dbo].[tblMedia]    Script Date: 4/26/2022 9:25:42 AM ******/
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
/****** Object:  Table [dbo].[tblPromotion]    Script Date: 4/26/2022 9:25:42 AM ******/
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
/****** Object:  Table [dbo].[tblRepairDetail]    Script Date: 4/26/2022 9:25:42 AM ******/
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
/****** Object:  Table [dbo].[tblReport]    Script Date: 4/26/2022 9:25:42 AM ******/
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
/****** Object:  Table [dbo].[tblRequestDetails]    Script Date: 4/26/2022 9:25:42 AM ******/
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
/****** Object:  Table [dbo].[tblRoles]    Script Date: 4/26/2022 9:25:42 AM ******/
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
/****** Object:  Table [dbo].[tblServiceRequest]    Script Date: 4/26/2022 9:25:42 AM ******/
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
	[ServiceRequestReference] [int] NULL,
 CONSTRAINT [PK_tblRequestService] PRIMARY KEY CLUSTERED 
(
	[ServiceRequestID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblServices]    Script Date: 4/26/2022 9:25:42 AM ******/
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
/****** Object:  Table [dbo].[tblTypeJobs]    Script Date: 4/26/2022 9:25:42 AM ******/
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
/****** Object:  Table [dbo].[tblTypeService]    Script Date: 4/26/2022 9:25:42 AM ******/
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
/****** Object:  Table [dbo].[tblUsedMaterial]    Script Date: 4/26/2022 9:25:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUsedMaterial](
	[UsedMaterialID] [int] IDENTITY(1,1) NOT NULL,
	[MaterialID] [int] NULL,
	[RequestDetailID] [int] NULL,
	[WorkerID] [int] NULL,
	[Quantity] [decimal](18, 2) NULL,
	[QuantityNew] [decimal](18, 2) NULL,
	[Status] [int] NULL,
	[Note] [nvarchar](50) NULL,
	[Message] [nvarchar](50) NULL,
 CONSTRAINT [PK_tblUsedMaterial] PRIMARY KEY CLUSTERED 
(
	[UsedMaterialID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblUsers]    Script Date: 4/26/2022 9:25:42 AM ******/
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

INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [ServiceRequestID], [ContractTitle], [ContractUrl], [ContractStartDate], [ContractEndDate], [ContractDeposit], [ContractTotalPrice], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (64, 246, 291, N'Hợp đồng Hồ Văn Hữu Nghĩa', N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/files%2F1650889851032mau-hop-dong-thi-cong-xay-dung.docx.pdf?alt=media&token=698c488b-2799-4a69-91f0-381fdb6cd975', CAST(N'2022-05-01' AS Date), CAST(N'2022-05-17' AS Date), CAST(0.30 AS Decimal(18, 2)), CAST(6000000.00 AS Decimal(18, 2)), 3, CAST(N'2022-04-25 19:30:53.603' AS DateTime), CAST(N'2022-04-25 19:31:16.860' AS DateTime))
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [ServiceRequestID], [ContractTitle], [ContractUrl], [ContractStartDate], [ContractEndDate], [ContractDeposit], [ContractTotalPrice], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (65, 246, 292, N'Hợp đồng Hồ Văn Hữu Nghĩa', N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/files%2F1650890551585SSC102%20Summer%20Semester%202021%20Assessments.pdf?alt=media&token=8e935087-8b93-4f0e-8cd4-c05aa787acfb', CAST(N'2022-05-11' AS Date), CAST(N'2022-05-25' AS Date), CAST(0.20 AS Decimal(18, 2)), CAST(900000.00 AS Decimal(18, 2)), 3, CAST(N'2022-04-25 19:42:33.713' AS DateTime), CAST(N'2022-04-25 19:42:53.877' AS DateTime))
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

INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (521, 290, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1650889345861rn_image_picker_lib_temp_e09ad6bc-4726-425e-b0ec-9c2f238fe4c7.jpg?alt=media&token=4be93a2f-f6be-491b-83a8-615a8785a3cd')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (522, 291, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1650889693944rn_image_picker_lib_temp_54d34b08-4400-4f9f-bada-b4d3ae43941b.jpg?alt=media&token=04bc22e9-6bf6-4e85-a5bf-f7b6be3d21a3')
INSERT [dbo].[tblMedia] ([MediaID], [ServiceRequestID], [ReportID], [MediaUrl]) VALUES (523, 292, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F1650890480342rn_image_picker_lib_temp_6102cdd0-58e7-4471-9212-6b6c9fa2b830.jpg?alt=media&token=1acfc1c4-eb44-44da-8e70-5f58030c6cea')
SET IDENTITY_INSERT [dbo].[tblMedia] OFF
SET IDENTITY_INSERT [dbo].[tblRepairDetail] ON 

INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (292, 451, 232, CAST(N'2022-04-25 19:32:20.847' AS DateTime), NULL, 1, 3)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [WorkerID], [RepairDateBegin], [RepairDateEnd], [IsPrimary], [RequestDetailPriority]) VALUES (293, 451, 235, CAST(N'2022-04-25 19:32:21.000' AS DateTime), NULL, 0, 3)
SET IDENTITY_INSERT [dbo].[tblRepairDetail] OFF
SET IDENTITY_INSERT [dbo].[tblRequestDetails] ON 

INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (450, 290, 4, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (451, 291, 4, 6, CAST(6000000.00 AS Decimal(18, 2)))
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [ServiceRequestID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (452, 292, 8, 2, CAST(900000.00 AS Decimal(18, 2)))
SET IDENTITY_INSERT [dbo].[tblRequestDetails] OFF
SET IDENTITY_INSERT [dbo].[tblRoles] ON 

INSERT [dbo].[tblRoles] ([RoleID], [RoleName]) VALUES (1, N'Staff')
INSERT [dbo].[tblRoles] ([RoleID], [RoleName]) VALUES (2, N'Worker')
INSERT [dbo].[tblRoles] ([RoleID], [RoleName]) VALUES (3, N'Customer')
SET IDENTITY_INSERT [dbo].[tblRoles] OFF
SET IDENTITY_INSERT [dbo].[tblServiceRequest] ON 

INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID], [ServiceRequestReference]) VALUES (290, 246, N'Hồ Văn Hữu Nghĩa', N'0900000001', N'Bến Tre', N'Nước rò rỉ', 5, CAST(N'2022-04-25 19:22:28.303' AS DateTime), 2, 0, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID], [ServiceRequestReference]) VALUES (291, 246, N'Hồ Văn Hữu Nghĩa', N'0900000001', N'Bến Tre', N'Nước bị rò rỉ', 6, CAST(N'2022-04-25 19:28:14.993' AS DateTime), 2, 0, NULL)
INSERT [dbo].[tblServiceRequest] ([ServiceRequestID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [ServiceRequestDescription], [ServiceRequestStatus], [ServiceRequestCreateDate], [ServiceRequestPackage], [PromotionID], [ServiceRequestReference]) VALUES (292, 246, N'Hồ Văn Hữu Nghĩa', N'0900000001', N'Bến Tre', N'Kính vỡ', 3, CAST(N'2022-04-25 19:41:21.733' AS DateTime), 1, 0, NULL)
SET IDENTITY_INSERT [dbo].[tblServiceRequest] OFF
SET IDENTITY_INSERT [dbo].[tblServices] ON 

INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (1, N'Đục nền gạch cũ', N'40.000-60.000/m2', 1, 4, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fbrick-wall.png?alt=media&token=287c4a63-12e5-42df-8843-01a75a2e9c4e')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (2, N'Tháo dỡ mái tôn', N'40.000-65.000/m2', 1, 4, 3, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Froof.png?alt=media&token=dcd1a8e0-2dbe-4a01-80f8-cc14b4ab501b')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (3, N'Hệ thống điện âm tường', N'Báo giá sau khi khảo sát', 1, 5, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Felectrical-energy.png?alt=media&token=6a9c146b-db43-4f85-9f42-4fe0cf8ff774')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (4, N'Hệ thống nước âm tường', N'Báo giá sau khi khảo sát', 1, 5, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fpipe.png?alt=media&token=a22a0770-2882-4380-8594-c6bf5ac19c74')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (5, N'Lắp kính cường lực 12ly', N'Báo giá sau khi khảo sát', 1, 1, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fglass.png?alt=media&token=1029d2c4-4ece-444f-92d2-edd8bf23fb73')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (6, N'Lắp kính cường lực 15ly', N'Báo giá sau khi khảo sát', 1, 1, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fglass.png?alt=media&token=1029d2c4-4ece-444f-92d2-edd8bf23fb73')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (8, N'Lắp kính cường lực 19ly', N'Báo giá sau khi khảo sát', 1, 1, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fglass.png?alt=media&token=1029d2c4-4ece-444f-92d2-edd8bf23fb73')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (10, N'Làm trần thạch cao nổi', N'130.000 – 260.000 /m2 phụ thuộc vào vật liệu nhà phân phối', 1, 7, 2, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2F3501444.png?alt=media&token=fe54b84d-eaa8-43f0-b603-8586afe2f452')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (11, N'Thi công sơn', N'30.000 - 80.000/m2 phụ thuộc vào vật liệu nhà phân phối', 1, 3, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fpaint.png?alt=media&token=59a9ccfa-eca4-46b1-b233-6c1eb4ce6df2')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (13, N'Gia công cửa sắt', N'300.000 - 900.000/m2 Báo giá theo mẫu hoặc bản vẽ thiết kế', 1, 2, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fsingle-door.png?alt=media&token=4bb6c698-2114-4df0-87d1-034929fcaa55')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeWorkerJob], [TypeService], [ServiceImg]) VALUES (14, N'Xây cầu thang', N'Giá giao động từ 1.200.000 /1 mét dài, cho đến 1.750.000 /1 mét dài, tùy thuộc vào kiểu dáng, mẫu mã và chất liệu của các loại gỗ, và kính', 1, 4, 1, N'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fstairs.png?alt=media&token=fcd9f180-eb6a-48a1-a35a-a0c17ab0e669')
SET IDENTITY_INSERT [dbo].[tblServices] OFF
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
SET IDENTITY_INSERT [dbo].[tblUsers] ON 

INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (7, N'string111', N'Aa123@', N'Hoàng', N'0123456779', N'Q1', N'hoang@gmail.com', 1, NULL, CAST(N'2022-01-22' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (138, N'staff123', N'Abc123A', N'Tài', N'0999997992', N'Q1', N'staff@gmail.com', 1, NULL, CAST(N'2022-04-09' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (211, NULL, NULL, N'Nguyễn Văn Đạt', N'0800000001', N'Phú Yên', N'dat123@gmail.com', 2, 1, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (212, NULL, NULL, N'Trần Minh Huy', N'0800000002', N'Gia Lai', N'huy123@gmail.com', 2, 1, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (213, NULL, NULL, N'Đặng Gia Bảo', N'0800000003', N'Hà Nội', N'bao123@gmail.com', 2, 1, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (214, NULL, NULL, N'Đỗ Phạm Anh Khoa', N'0800000004', N'Bắc Ninh', N'khoa123@gmail.com', 2, 1, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (215, NULL, NULL, N'Nguyễn Phát Đạt', N'0800000005', N'Lai Châu', N'dat123@gmail.com', 2, 1, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (216, NULL, NULL, N'Phạm Nhật Duy', N'0800000006', N'Lào Cai', N'duy123@gmail.com', 2, 2, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (217, NULL, NULL, N'Nguyễn Hoàng Nam', N'0800000007', N'Hà Giang', N'nam123@gmail.com', 2, 2, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (218, NULL, NULL, N'Phạm Gia Hưng', N'0800000008', N'Cao Bằng', N'hung123@gmail.com', 2, 2, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (219, NULL, NULL, N'Nguyễn Minh Hiếu', N'0800000009', N'Điện Biên', N'hieu123@gmail.com', 2, 2, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (220, NULL, NULL, N'Nguyễn Nhật Phong', N'0800000010', N'Yên Bái', N'phong123@gmail.com', 2, 2, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (221, NULL, NULL, N'Nguyễn Văn Thành', N'0800000011', N'Tuyên Quang', N'thanh123@gmail.com', 2, 3, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (222, NULL, NULL, N'Nguyễn Văn Nguyên', N'0800000012', N'Lạng Sơn', N'nguyen123@gmail.com', 2, 3, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (223, NULL, NULL, N'Ngô Tấn Lộc', N'0800000013', N'Thái Nguyên', N'loc123@gmail.com', 2, 3, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (224, NULL, NULL, N'Phạm Hoàng Đức', N'0800000014', N'Phú Thọ', N'duc@gmail.com', 2, 3, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (225, NULL, NULL, N'Nguyễn Văn Trí', N'0800000015', N'Phú Thọ', N'tri123@gmail.com', 2, 3, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (226, NULL, NULL, N'Nguyễn Thế Vinh', N'0800000016', N'Sơn La', N'vinh123@gmail.com', 2, 4, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (227, NULL, NULL, N'Phạm Minh Tiến', N'0800000017', N'Bắc Ninh', N'tien123@gmail.com', 2, 4, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (228, NULL, NULL, N'Nguyễn Chí Thiện', N'0800000018', N'Bắc Giang', N'thien123@gmail.com', 2, 4, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (229, NULL, NULL, N'Nguyễn Thanh Hải', N'0800000019', N'Quảng Ninh', N'hai123@gmail.com', 2, 4, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (230, NULL, NULL, N'Trần Nhật Quang', N'0800000020', N'Hòa Bình', N'quang@gmail.com', 2, 4, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (231, NULL, NULL, N'Nguyễn Hoàng Lâm', N'0800000021', N'Hưng Yên', N'lam123@gmail.com', 2, 5, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (232, NULL, NULL, N'Nguyễn Văn Trung', N'0800000022', N'Hải Dương', N'trung123@gmail.com', 2, 5, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (233, NULL, NULL, N'Nguyễn Anh Tú', N'0800000023', N'Thái Bình', N'tu123@gmail.com', 2, 5, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (234, NULL, NULL, N'Nguyễn Thế Hùng', N'0800000024', N'Hà Nam', N'hung123@gmail.com', 2, 5, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (235, NULL, NULL, N'Nguyễn Văn Cường', N'0800000025', N'Nam Định', N'cuong123@gmail.com', 2, 5, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (236, NULL, NULL, N'Ngô Tấn Vũ', N'0800000026', N'Ninh Bình', N'vu123@gmail.com', 2, 6, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (237, NULL, NULL, N'Nguyễn Văn Toàn', N'0800000027', N'Thanh Hóa', N'toan123@gmail.com', 2, 6, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (238, NULL, NULL, N'Phạm Thiên Ân', N'0800000028', N'Nghệ An', N'an123@gmail.com', 2, 6, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (239, NULL, NULL, N'Nguyễn Văn Trường', N'0800000029', N'Hà Tĩnh', N'truong123@gmail.com', 2, 6, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (240, NULL, NULL, N'Nguyễn Trung Kiên', N'0800000030', N'Quảng Bình', N'kien@gmail.com', 2, 6, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (241, NULL, NULL, N'Nguyễn Tấn Phước', N'0800000031', N'Quảng Trị', N'phuoc123@gmail.com', 2, 7, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (242, NULL, NULL, N'Nguyễn Nhật Tân', N'0800000032', N'Đà Nẵng', N'tan123@gmail.com', 2, 7, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (243, NULL, NULL, N'Lương Minh Tùng', N'0800000033', N'Quảng Nam', N'tung123@gmail.com', 2, 7, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (244, NULL, NULL, N'Trần Ngọc Quý', N'0800000034', N'Quãng Ngãi', N'quy123@gmail.com', 2, 7, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (245, NULL, NULL, N'Ngô Trọng Hữu', N'0800000035', N'Kon Tum', N'huu123@gmail.com', 2, 7, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (246, NULL, NULL, N'Hồ Văn Hữu Nghĩa', N'0900000001', N'Bến Tre', N'Nghia123@gmail.com', 3, NULL, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (247, NULL, NULL, N'Nguyễn Tấn Đạt', N'0900000002', N'Tây Ninh', N'Dat123@gmail.com', 3, NULL, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (248, NULL, NULL, N'Hồ Thị Bích Hạnh', N'0900000003', N'Đồng Nai', N'Hanh123@gmail.com', 3, NULL, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (249, NULL, NULL, N'Nguyễn Hoàng Giang', N'0900000004', N'Kiên Giang', N'Giang123@gmail.com', 3, NULL, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (250, NULL, NULL, N'Nguyễn Ngọc Quãng', N'0900000005', N'Cà Mau', N'Quang123@gmail.com', 3, NULL, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (251, NULL, NULL, N'Nguyễn Nhật Huy', N'0900000006', N'An Giang', N'Huy123@gmail.com', 3, NULL, CAST(N'2022-04-25' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (252, NULL, NULL, N'Ngô Tấn Hữu', N'0900000007', N'Trà Vinh', N'Huu123@gmail.com', 3, NULL, CAST(N'2022-04-25' AS Date), NULL, 4)
SET IDENTITY_INSERT [dbo].[tblUsers] OFF
/****** Object:  Index [IX_tblInvoice]    Script Date: 4/26/2022 9:25:42 AM ******/
ALTER TABLE [dbo].[tblInvoice] ADD  CONSTRAINT [IX_tblInvoice] UNIQUE NONCLUSTERED 
(
	[ContractID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_tblUsers]    Script Date: 4/26/2022 9:25:42 AM ******/
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
ALTER TABLE [dbo].[tblServiceRequest]  WITH CHECK ADD  CONSTRAINT [FK_tblRequestServices_tblUsers] FOREIGN KEY([CustomerID])
REFERENCES [dbo].[tblUsers] ([UserID])
GO
ALTER TABLE [dbo].[tblServiceRequest] CHECK CONSTRAINT [FK_tblRequestServices_tblUsers]
GO
ALTER TABLE [dbo].[tblServiceRequest]  WITH CHECK ADD  CONSTRAINT [FK_tblServiceRequest_tblServiceRequest] FOREIGN KEY([ServiceRequestReference])
REFERENCES [dbo].[tblServiceRequest] ([ServiceRequestID])
GO
ALTER TABLE [dbo].[tblServiceRequest] CHECK CONSTRAINT [FK_tblServiceRequest_tblServiceRequest]
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
ALTER TABLE [dbo].[tblUsers]  WITH CHECK ADD  CONSTRAINT [FK_tblUsers_tblRoles] FOREIGN KEY([Role])
REFERENCES [dbo].[tblRoles] ([RoleID])
GO
ALTER TABLE [dbo].[tblUsers] CHECK CONSTRAINT [FK_tblUsers_tblRoles]
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
