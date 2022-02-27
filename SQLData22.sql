USE [master]
GO
/****** Object:  Database [AnServices]    Script Date: 2/27/2022 3:18:31 PM ******/
CREATE DATABASE [AnServices]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'AnServices', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\AnServices.mdf' , SIZE = 3264KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
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
/****** Object:  Table [dbo].[tblContract]    Script Date: 2/27/2022 3:18:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblContract](
	[ContractID] [int] IDENTITY(1,1) NOT NULL,
	[CustomerID] [int] NOT NULL,
	[RequestServiceID] [int] NOT NULL,
	[ContractTitle] [nvarchar](50) NULL,
	[ContractUrl] [varchar](max) NULL,
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
/****** Object:  Table [dbo].[tblInvoice]    Script Date: 2/27/2022 3:18:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblInvoice](
	[InvoiceID] [int] IDENTITY(1,1) NOT NULL,
	[RequestServiceID] [int] NOT NULL,
	[TotalCost] [float] NULL,
	[Date] [date] NULL,
	[Note] [nvarchar](150) NULL,
 CONSTRAINT [PK_tblInvoice] PRIMARY KEY CLUSTERED 
(
	[InvoiceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblMaterial]    Script Date: 2/27/2022 3:18:31 PM ******/
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
/****** Object:  Table [dbo].[tblMedia]    Script Date: 2/27/2022 3:18:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblMedia](
	[MediaID] [int] IDENTITY(1,1) NOT NULL,
	[RequestServiceID] [int] NULL,
	[ReportID] [int] NULL,
	[MediaUrl] [varchar](250) NULL,
 CONSTRAINT [PK_tblMedia] PRIMARY KEY CLUSTERED 
(
	[MediaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblPromotion]    Script Date: 2/27/2022 3:18:31 PM ******/
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
	[PromotionStatus] [int] NULL,
 CONSTRAINT [PK_tblPromotion] PRIMARY KEY CLUSTERED 
(
	[PromotionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblPromotionDetail]    Script Date: 2/27/2022 3:18:31 PM ******/
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
/****** Object:  Table [dbo].[tblRepairDetail]    Script Date: 2/27/2022 3:18:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblRepairDetail](
	[RepairDetailID] [int] IDENTITY(1,1) NOT NULL,
	[RequestDetailID] [int] NULL,
	[MasonID] [int] NULL,
	[RepairDateBegin] [date] NULL,
	[RepairDateEnd] [date] NULL,
 CONSTRAINT [PK_tblRepairDetail] PRIMARY KEY CLUSTERED 
(
	[RepairDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblReport]    Script Date: 2/27/2022 3:18:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblReport](
	[ReportID] [int] IDENTITY(1,1) NOT NULL,
	[RequestDetailID] [int] NOT NULL,
	[MasonID] [int] NOT NULL,
	[ReportTitle] [nvarchar](50) NULL,
	[ReportDescription] [nvarchar](250) NULL,
	[ReportDate] [date] NULL,
 CONSTRAINT [PK_tblReport] PRIMARY KEY CLUSTERED 
(
	[ReportID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblRequestDetails]    Script Date: 2/27/2022 3:18:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblRequestDetails](
	[RequestDetailID] [int] IDENTITY(1,1) NOT NULL,
	[RequestServiceID] [int] NOT NULL,
	[ServiceID] [int] NOT NULL,
	[RequestDetailStatus] [int] NULL,
	[RequestDetailPrice] [float] NULL,
 CONSTRAINT [PK_tblRequestDetails] PRIMARY KEY CLUSTERED 
(
	[RequestDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblRequestServices]    Script Date: 2/27/2022 3:18:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblRequestServices](
	[RequestServiceID] [int] IDENTITY(1,1) NOT NULL,
	[CustomerID] [int] NOT NULL,
	[CustomerName] [nvarchar](50) NULL,
	[CustomerPhone] [varchar](10) NULL,
	[CustomerAddress] [nvarchar](150) NULL,
	[RequestServiceDescription] [nvarchar](150) NULL,
	[RequestServiceStatus] [int] NULL,
	[RequestServiceCreateDate] [date] NULL,
	[RequestServicePackage] [int] NULL,
 CONSTRAINT [PK_tblRequestService] PRIMARY KEY CLUSTERED 
(
	[RequestServiceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblRoles]    Script Date: 2/27/2022 3:18:31 PM ******/
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
/****** Object:  Table [dbo].[tblServices]    Script Date: 2/27/2022 3:18:31 PM ******/
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
	[TypeMasonJob] [int] NULL,
	[ServiceImg] [varchar](250) NULL,
 CONSTRAINT [PK_tblServices] PRIMARY KEY CLUSTERED 
(
	[ServiceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblStatus]    Script Date: 2/27/2022 3:18:31 PM ******/
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
/****** Object:  Table [dbo].[tblTypeJobs]    Script Date: 2/27/2022 3:18:31 PM ******/
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
/****** Object:  Table [dbo].[tblUsedMaterial]    Script Date: 2/27/2022 3:18:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUsedMaterial](
	[UsedMaterialID] [int] IDENTITY(1,1) NOT NULL,
	[MaterialID] [int] NULL,
	[RequestDetailID] [int] NULL,
	[MasonID] [int] NULL,
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
/****** Object:  Table [dbo].[tblUsers]    Script Date: 2/27/2022 3:18:31 PM ******/
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

INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [RequestServiceID], [ContractTitle], [ContractUrl], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (1, 1, 25, N'Hop dong A', N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/mau-hop-dong-thi-cong-xay-dung.docx?alt=media&token=ad55c06a-62ab-426c-933d-b123e83ce88d', 2, NULL, NULL)
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [RequestServiceID], [ContractTitle], [ContractUrl], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (2, 1, 26, N'Hop dong B', N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/mau-hop-dong-thi-cong-xay-dung.docx?alt=media&token=ad55c06a-62ab-426c-933d-b123e83ce88d', 2, NULL, NULL)
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [RequestServiceID], [ContractTitle], [ContractUrl], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (3, 19, 28, N'Hop dong C', N'https://firebasestorage.googleapis.com/v0/b/anservice-986ae.appspot.com/o/files%2Fmau-hop-dong-thi-cong-xay-dung%20(4).docx?alt=media&token=a8c6e135-578d-46bb-84b3-599e12afa3ae', 2, CAST(N'2022-02-20 00:00:00.000' AS DateTime), CAST(N'2022-02-23 00:14:33.990' AS DateTime))
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [RequestServiceID], [ContractTitle], [ContractUrl], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (4, 1, 27, N'Hợp đồng Nguyễn Văn A', N'urlcontract', 2, CAST(N'2022-02-14 23:04:00.660' AS DateTime), NULL)
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [RequestServiceID], [ContractTitle], [ContractUrl], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (5, 1, 22, N'Hợp đồng Trần Văn B', N'updatecackieuurlforcontract', 2, CAST(N'2022-02-16 08:49:20.523' AS DateTime), CAST(N'2022-02-16 08:52:15.053' AS DateTime))
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [RequestServiceID], [ContractTitle], [ContractUrl], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (7, 8, 24, N'Hợp đồng Tung Loc', N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/Contract%2F03.26-BM%C4%90HHDCVFPTU-Phieu-dang-ky-khoa-luan_VANTTN_SPRING2022.docx?alt=media&token=e37a75ca-565b-4b18-bb30-0db931c6125b', 2, CAST(N'2022-02-22 21:04:15.963' AS DateTime), NULL)
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [RequestServiceID], [ContractTitle], [ContractUrl], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (9, 1, 29, N'Hợp đồng Haha', N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/Contract%2F03.26-BM%C4%90HHDCVFPTU-Phieu-dang-ky-khoa-luan_VANTTN_SPRING2022.docx?alt=media&token=e37a75ca-565b-4b18-bb30-0db931c6125b', 2, CAST(N'2022-02-22 21:58:07.287' AS DateTime), NULL)
INSERT [dbo].[tblContract] ([ContractID], [CustomerID], [RequestServiceID], [ContractTitle], [ContractUrl], [ContractStatus], [ContractCreateDate], [ContractUpdateDate]) VALUES (10, 61, 32, N'Hợp đồng Lionel Messi', N'https://firebasestorage.googleapis.com/v0/b/anservice-986ae.appspot.com/o/files%2Fmau-hop-dong-thi-cong-xay-dung%20(4)%20(6)%20(1).docx?alt=media&token=e6ec7744-1698-4746-9e98-a8298e0a323c', 3, CAST(N'2022-02-22 23:34:11.620' AS DateTime), CAST(N'2022-02-23 00:18:50.577' AS DateTime))
SET IDENTITY_INSERT [dbo].[tblContract] OFF
SET IDENTITY_INSERT [dbo].[tblInvoice] ON 

INSERT [dbo].[tblInvoice] ([InvoiceID], [RequestServiceID], [TotalCost], [Date], [Note]) VALUES (4, 22, 25000, CAST(N'2022-02-04' AS Date), NULL)
INSERT [dbo].[tblInvoice] ([InvoiceID], [RequestServiceID], [TotalCost], [Date], [Note]) VALUES (6, 21, 85000, CAST(N'2022-02-04' AS Date), NULL)
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

INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (10, 17, NULL, N'qfasfafaf')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (11, 17, NULL, N'afsafagasg')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (12, 18, NULL, N'fafasfasfgasfsf')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (13, 18, NULL, N'asfagasgasfs')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (14, 20, NULL, N'url')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (15, 20, NULL, N'url2')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (16, 21, NULL, N'imgURL')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (17, 21, NULL, N'videoURL')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (18, 22, NULL, N'imgUrl')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (19, 22, NULL, N'videoUrl')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (20, 24, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1642852102442rn_image_picker_lib_temp_891b35b1-013e-49d6-8273-a0aaa03fa95a.jpg?alt=media&token=7641c48f-7ac7-44c9-a786-966499fb4877')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (21, 24, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1642852102433rn_image_picker_lib_temp_77346549-e725-4dc0-a944-f9bbdb21716c.jpg?alt=media&token=dd4c4836-847c-41a4-96a9-c0d51de1641e')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (22, NULL, 1, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1645002992103rn_image_picker_lib_temp_ae5f37bd-bf3d-4880-aa9f-18e31f67697a.mp4?alt=media&token=089cb6f3-b071-4e19-9f89-72727b9ce978')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (23, NULL, 1, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1645364753274rn_image_picker_lib_temp_3d881c78-60b8-463b-afa0-6639a4ad1825.jpg?alt=media&token=0f6e75f9-039c-45ea-947d-3a1df1ede818')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (24, NULL, 1, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1645364753275rn_image_picker_lib_temp_53cf16a9-ffe1-400e-ae6a-84fd2cae0cbd.jpg?alt=media&token=70520cce-b552-49ca-acec-e60d2696016c')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (25, 25, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1644310238657rn_image_picker_lib_temp_5f07c739-98a6-46a3-98c0-90759883c172.jpg?alt=media&token=7f8d4f65-ac6d-4ba0-a824-db7d4320291a')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (26, 25, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1644310238687rn_image_picker_lib_temp_859d6860-c01c-4d5f-a30d-a4b172a2066c.jpg?alt=media&token=d91eb793-9e04-4e4a-94f2-eab23646c70e')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (27, 26, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1644310303295rn_image_picker_lib_temp_85b079ff-c183-41c0-85b5-1e0d2fd4b7bf.jpg?alt=media&token=25469292-2e1b-4680-be00-ebda54ab1c8f')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (28, 26, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1644310303291rn_image_picker_lib_temp_8d532d59-7168-4015-bc06-091f40a635cf.jpg?alt=media&token=cd1f409c-30ca-40ec-9cf8-6e07062915ac')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (29, 27, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1644310420231rn_image_picker_lib_temp_967fdd67-2938-4098-8822-3730f828df17.png?alt=media&token=168c2482-700e-4199-b678-3d6a2cc9548c')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (30, 28, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1644311734742rn_image_picker_lib_temp_cc1f31e6-2aa6-41e4-bca5-5f658b7b839c.jpg?alt=media&token=d7f546fb-4b3e-4b3e-958b-d34f0f007aeb')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (31, 28, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1644311734759rn_image_picker_lib_temp_d22f3402-c416-439f-a827-7dc0ff2106f1.png?alt=media&token=eef8558f-b0ec-4cfd-bb93-48c2f7a993b2')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (32, 28, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1644311734759rn_image_picker_lib_temp_9874706d-a67e-4509-804d-cd51bdcc6907.mp4?alt=media&token=07d37589-2ce5-4893-ac12-c5721f1470a5')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (33, NULL, 2, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/reportProblem%2F1644314828098rn_image_picker_lib_temp_1db705b9-5e10-4f97-94ea-cbc3845a6788.jpg?alt=media&token=339a93b9-ad0a-4eaf-a455-8bc1a09302a2')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (34, NULL, 2, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/reportProblem%2F1644314828084rn_image_picker_lib_temp_942e03b4-21d2-4707-b341-f6446b865e14.jpg?alt=media&token=7636f997-da61-42e7-b772-9b986f273889')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (35, NULL, 2, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/reportProblem%2F1644314828099rn_image_picker_lib_temp_82a0086e-4d11-401a-8a26-53024a9ed0f5.jpg?alt=media&token=0087bcfc-867f-4a7d-a44b-d432033d784c')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (36, 29, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1645002992103rn_image_picker_lib_temp_ae5f37bd-bf3d-4880-aa9f-18e31f67697a.mp4?alt=media&token=089cb6f3-b071-4e19-9f89-72727b9ce978')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (37, 30, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1645364753263rn_image_picker_lib_temp_32cb3663-a649-4815-9171-243966e54a06.jpg?alt=media&token=0bf99ef7-e18c-464a-93c4-22a1a680a022')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (38, 30, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1645364753274rn_image_picker_lib_temp_3d881c78-60b8-463b-afa0-6639a4ad1825.jpg?alt=media&token=0f6e75f9-039c-45ea-947d-3a1df1ede818')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (39, 30, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1645364753275rn_image_picker_lib_temp_53cf16a9-ffe1-400e-ae6a-84fd2cae0cbd.jpg?alt=media&token=70520cce-b552-49ca-acec-e60d2696016c')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (40, 30, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1645364753275rn_image_picker_lib_temp_591f54d3-8883-489e-8c02-901d1bc0d0d2.mp4?alt=media&token=38746405-7f7d-472c-935d-f613c684a8b4')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (41, 31, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1645374951122rn_image_picker_lib_temp_94db3f60-9362-49b0-a28f-85cbdc75fd65.jpg?alt=media&token=c1fdf452-874e-4e28-b305-60a1263c0450')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (42, NULL, 3, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/reportProblem%2F1644480595379rn_image_picker_lib_temp_d987cd5d-8751-439b-81f1-078a25880e91.jpg?alt=media&token=404b3e5b-47f8-4efe-8967-deca0821a8d9')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (43, NULL, 3, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/reportProblem%2F1644480595379rn_image_picker_lib_temp_d987cd5d-8751-439b-81f1-078a25880e91.jpg?alt=media&token=404b3e5b-47f8-4efe-8967-deca0821a8d9')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (44, NULL, 5, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/reportProblem%2F1645544968922rn_image_picker_lib_temp_a0eb9c13-b0aa-4197-9b2d-181f89a9dbd8.jpg?alt=media&token=12c04e1c-9e3a-4809-9e27-20f0536fcb0b')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (45, NULL, 5, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/reportProblem%2F1645544968909rn_image_picker_lib_temp_62e351f5-4f5d-4d5f-94f7-0af7e4c73dcf.jpg?alt=media&token=9ff26598-ff46-4944-80ba-c159480f0c0c')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (46, 32, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1645545847914rn_image_picker_lib_temp_0ea207ba-5407-486e-907c-5bbd3f74589b.jpg?alt=media&token=bb316765-bbf6-42bf-9694-6d53620345fa')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (47, 32, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1645545847923rn_image_picker_lib_temp_c31d3b68-389b-4af9-bb88-db1c23f71cb9.jpg?alt=media&token=9736380b-5cb4-49f7-9f20-01c8108a5607')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (48, NULL, 6, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/reportProblem%2F1645546299303rn_image_picker_lib_temp_b5cbbb6f-7349-4375-a03d-d98f0cbcda49.jpg?alt=media&token=90b2346e-04b4-4dd5-8f57-bf6f41e672cf')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (49, 33, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F123.jpg?alt=media&token=d43d965f-c454-4f03-b7a4-39f6f6d20a8a')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (50, 33, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2Fvolop.jpg?alt=media&token=87a0c0be-350f-4879-bfc3-50f0f6d7bd88')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (51, 34, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2Fmonleo.jpg?alt=media&token=72db6c60-0a8f-4a04-a999-c35aa710a127')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (52, 34, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2Fgood.jpg?alt=media&token=28d00117-1433-4931-8248-e68dc57df16b')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (53, 35, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2Fgoodcat.png?alt=media&token=18b0932c-db08-4871-af80-aeb943de4c01')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (54, 36, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F123.jpg?alt=media&token=6e791c92-0f4a-4718-b52b-db7a65d15077')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (55, 37, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F123.jpg?alt=media&token=6afd2a95-77f2-4dc0-aab5-47ce76f2697d')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (56, 38, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F123.jpg?alt=media&token=148691f4-46db-4926-a0f7-825c696fb7c2')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (57, 39, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F123.jpg?alt=media&token=7e0167fd-6134-4b2b-8125-756731355f73')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (58, 40, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F123.jpg?alt=media&token=0e07e16c-e7b9-40a7-a2ba-50a955542142')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (59, 41, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F123.jpg?alt=media&token=292c5b7b-25e9-4107-b97f-b05910d6e1ab')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [ReportID], [MediaUrl]) VALUES (60, 42, NULL, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/RequestServices%2F123.jpg?alt=media&token=7d5d4504-c7e3-4970-acb6-499f75b470f7')
SET IDENTITY_INSERT [dbo].[tblMedia] OFF
SET IDENTITY_INSERT [dbo].[tblPromotion] ON 

INSERT [dbo].[tblPromotion] ([PromotionID], [PromotionCode], [PromotionDescription], [PromotionDateExpired], [PromotionStatus]) VALUES (1, N'703367', N'CODE CA NHAN', NULL, 4)
INSERT [dbo].[tblPromotion] ([PromotionID], [PromotionCode], [PromotionDescription], [PromotionDateExpired], [PromotionStatus]) VALUES (2, N'738871', N'CODE CA NHAN', NULL, 4)
INSERT [dbo].[tblPromotion] ([PromotionID], [PromotionCode], [PromotionDescription], [PromotionDateExpired], [PromotionStatus]) VALUES (3, N'389367', N'CODE CA NHAN', NULL, 4)
INSERT [dbo].[tblPromotion] ([PromotionID], [PromotionCode], [PromotionDescription], [PromotionDateExpired], [PromotionStatus]) VALUES (4, N'518140', N'CODE CA NHAN', NULL, 4)
INSERT [dbo].[tblPromotion] ([PromotionID], [PromotionCode], [PromotionDescription], [PromotionDateExpired], [PromotionStatus]) VALUES (5, N'367607', N'CODE CA NHAN', NULL, 4)
SET IDENTITY_INSERT [dbo].[tblPromotion] OFF
SET IDENTITY_INSERT [dbo].[tblPromotionDetail] ON 

INSERT [dbo].[tblPromotionDetail] ([PromotionDetailID], [CustomerID], [PromotionID]) VALUES (1, 2, 1)
INSERT [dbo].[tblPromotionDetail] ([PromotionDetailID], [CustomerID], [PromotionID]) VALUES (2, 8, 2)
INSERT [dbo].[tblPromotionDetail] ([PromotionDetailID], [CustomerID], [PromotionID]) VALUES (3, 19, 3)
INSERT [dbo].[tblPromotionDetail] ([PromotionDetailID], [CustomerID], [PromotionID]) VALUES (4, 40, 4)
INSERT [dbo].[tblPromotionDetail] ([PromotionDetailID], [CustomerID], [PromotionID]) VALUES (5, 61, 5)
SET IDENTITY_INSERT [dbo].[tblPromotionDetail] OFF
SET IDENTITY_INSERT [dbo].[tblRepairDetail] ON 

INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (1, 27, 3, NULL, CAST(N'2022-01-29' AS Date))
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (2, 27, 6, NULL, CAST(N'2022-01-29' AS Date))
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (3, 28, 3, NULL, CAST(N'2022-01-29' AS Date))
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (4, 37, 16, NULL, NULL)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (6, 39, 16, NULL, NULL)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (7, 39, 6, NULL, NULL)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (8, 42, 36, NULL, NULL)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (9, 42, 32, NULL, NULL)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (11, 35, 3, CAST(N'2022-02-20' AS Date), NULL)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (12, 35, 5, CAST(N'2022-02-20' AS Date), NULL)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (13, 35, 12, CAST(N'2022-02-20' AS Date), NULL)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (14, 35, 60, CAST(N'2022-02-20' AS Date), NULL)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (15, 35, 57, CAST(N'2022-02-20' AS Date), NULL)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (16, 39, 3, CAST(N'2022-02-20' AS Date), NULL)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (17, 39, 5, CAST(N'2022-02-20' AS Date), NULL)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (18, 43, 3, CAST(N'2022-02-20' AS Date), NULL)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (19, 43, 6, CAST(N'2022-02-20' AS Date), NULL)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (20, 39, 5, CAST(N'2022-02-20' AS Date), NULL)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (21, 39, 17, CAST(N'2022-02-20' AS Date), NULL)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (22, 38, 16, CAST(N'2022-02-20' AS Date), NULL)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (23, 43, 16, CAST(N'2022-02-20' AS Date), NULL)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (24, 42, 16, CAST(N'2022-02-20' AS Date), NULL)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MasonID], [RepairDateBegin], [RepairDateEnd]) VALUES (25, 47, 62, CAST(N'2022-02-22' AS Date), NULL)
SET IDENTITY_INSERT [dbo].[tblRepairDetail] OFF
SET IDENTITY_INSERT [dbo].[tblReport] ON 

INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [MasonID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (1, 27, 3, N'Báo cáo kết quả', N'da sua xong', CAST(N'2022-01-29' AS Date))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [MasonID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (2, 37, 16, N'Báo cáo vấn đề', N'Testing home nay', CAST(N'2022-02-08' AS Date))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [MasonID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (3, 28, 16, N'Báo cáo vấn đề', N'Just do it!!!', CAST(N'2022-02-21' AS Date))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [MasonID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (5, 39, 16, N'Báo cáo vấn đề', N'Thay toàn bô', CAST(N'2022-02-22' AS Date))
INSERT [dbo].[tblReport] ([ReportID], [RequestDetailID], [MasonID], [ReportTitle], [ReportDescription], [ReportDate]) VALUES (6, 47, 62, N'Báo cáo vấn đề', N'Nha nay be kinh het roi sep', CAST(N'2022-02-22' AS Date))
SET IDENTITY_INSERT [dbo].[tblReport] OFF
SET IDENTITY_INSERT [dbo].[tblRequestDetails] ON 

INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (19, 17, 3, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (20, 17, 4, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (21, 18, 1, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (22, 18, 2, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (25, 20, 1, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (26, 20, 2, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (27, 21, 2, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (28, 21, 3, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (29, 22, 2, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (30, 22, 5, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (31, 24, 2, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (32, 25, 1, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (33, 25, 3, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (34, 26, 8, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (35, 27, 10, 6, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (36, 28, 7, 2, 50000)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (37, 28, 10, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (38, 29, 11, 6, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (39, 29, 3, 6, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (42, 30, 7, 6, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (43, 30, 13, 6, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (45, 31, 2, 2, 55000)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (46, 31, 3, 2, 75000)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (47, 32, 8, 6, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (48, 32, 4, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (49, 33, 2, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (50, 33, 3, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (51, 33, 6, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (52, 34, 1, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (53, 34, 2, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (54, 35, 4, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (55, 35, 5, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (56, 36, 2, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (57, 36, 3, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (58, 37, 2, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (59, 37, 3, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (60, 38, 2, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (61, 38, 3, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (62, 39, 1, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (63, 40, 1, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (64, 41, 3, 2, NULL)
INSERT [dbo].[tblRequestDetails] ([RequestDetailID], [RequestServiceID], [ServiceID], [RequestDetailStatus], [RequestDetailPrice]) VALUES (65, 42, 2, 2, NULL)
SET IDENTITY_INSERT [dbo].[tblRequestDetails] OFF
SET IDENTITY_INSERT [dbo].[tblRequestServices] ON 

INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (17, 1, N'BCA', N'1234567899', N'Q1', N'qfqfqfqwfq', 2, CAST(N'2022-01-09' AS Date), NULL)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (18, 1, N'ACB', N'1234567890', N'Q2', N'afafadacas', 2, CAST(N'2022-01-10' AS Date), NULL)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (20, 1, N'BAC', N'1234567899', N'Q1', N'sua nha', 2, CAST(N'2022-01-10' AS Date), NULL)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (21, 1, N'ABC', N'1234567899', N'Tân Bình', N'Sửa cửa, thay kính', 1, CAST(N'2022-01-11' AS Date), NULL)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (22, 1, N'ABC', N'0987654321', N'Nhà Bè', N'Sửa nhà', 3, CAST(N'2022-01-18' AS Date), NULL)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (24, 8, N'Tung Loc', N'0987654000', N'Go Vap', N'Ok la', 2, CAST(N'2022-01-22' AS Date), NULL)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (25, 1, N'Huynh Thanh Tai', N'0123456754', N'Long An', N'Gach nha toi bi hu', 1, CAST(N'2022-02-08' AS Date), NULL)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (26, 1, N'Nguyen Van A', N'0875985642', N'Quan 11', N'Be ong nuoc', 1, CAST(N'2022-02-08' AS Date), NULL)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (27, 1, N'Pham Phu Thuong', N'0934343444', N'Quan 8', N'Mai ton bi nga mau', 2, CAST(N'2022-02-08' AS Date), NULL)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (28, 19, N'Pham Van A', N'0987923232', N'Quan 1', N'Sua mai nha cho toi', 1, CAST(N'2022-02-08' AS Date), NULL)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (29, 1, N'Huynh Thanh Tai', N'0987654321', N'Quan 9', N'Testing', 1, CAST(N'2022-02-16' AS Date), NULL)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (30, 1, N'Son Tung M-TP', N'0951753654', N'Somewhere', N'Chung ta khong thuoc ve nhau', 2, CAST(N'2022-02-20' AS Date), NULL)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (31, 1, N'Thuc khuya', N'0785412589', N'Good Night', N'Good Night', 6, CAST(N'2022-02-20' AS Date), NULL)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (32, 61, N'Lionel Messi', N'0999111888', N'1 Hai Ba Trung, Phuong 1, Quan 1, Thanh pho Ho Chi Minh', N'Lap kinh cuong luc cho lau 2, thay doi he thong nuoc nha toi', 2, CAST(N'2022-02-22' AS Date), NULL)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (33, 2, N'Hàng Xóm', N'0123456789', N'123 đường 456 p7 q8', N'Hàng xóm tôi nhờ đăng ký sửa chữa nhà', 2, CAST(N'2022-02-26' AS Date), 2)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (34, 2, N'Hàng Xóm 2', N'0123456798', N'127 đường 456 p7 q8', N'Hàng xóm lại tiếp tục nhờ tôi đặt hộ dịch vụ sửa chữa', 2, CAST(N'2022-02-26' AS Date), 2)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (35, 61, N'Hàng Xóm Tôi', N'0978563751', N'Q1', N'Sửa nhà', 2, CAST(N'2022-02-26' AS Date), 1)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (36, 2, N'Hàng Xóm Tôi', N'0978563751', N'Q1', N'test block', 2, CAST(N'2022-02-26' AS Date), 1)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (37, 2, N'Hàng Xóm Tôi', N'0978563751', N'Q1', N'test block', 2, CAST(N'2022-02-26' AS Date), 1)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (38, 2, N'Hàng Xóm Tôi', N'0978563751', N'Q1', N'test block', 2, CAST(N'2022-02-26' AS Date), 1)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (39, 2, N'Hàng Xóm Tôi', N'0978563751', N'Q1', N'test block', 2, CAST(N'2022-02-26' AS Date), 1)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (40, 2, N'Hàng Xóm Tôi', N'0978563751', N'Q1', N'test block', 2, CAST(N'2022-02-26' AS Date), 1)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (41, 2, N'Hàng Xóm Tôi', N'0978563751', N'Q1', N'test block 1', 2, CAST(N'2022-02-26' AS Date), 2)
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate], [RequestServicePackage]) VALUES (42, 2, N'Hàng Xóm Tôi', N'0978563751', N'Q1', N'2', 2, CAST(N'2022-02-26' AS Date), 2)
SET IDENTITY_INSERT [dbo].[tblRequestServices] OFF
SET IDENTITY_INSERT [dbo].[tblRoles] ON 

INSERT [dbo].[tblRoles] ([RoleID], [RoleName]) VALUES (1, N'Staff')
INSERT [dbo].[tblRoles] ([RoleID], [RoleName]) VALUES (2, N'Mason')
INSERT [dbo].[tblRoles] ([RoleID], [RoleName]) VALUES (3, N'Customer')
SET IDENTITY_INSERT [dbo].[tblRoles] OFF
SET IDENTITY_INSERT [dbo].[tblServices] ON 

INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeMasonJob], [ServiceImg]) VALUES (1, N'Đục nền gạch cũ', N'40.000-60.000/m2', 1, 4, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/icon%2Fbrick-wall.png?alt=media&token=6d2a007f-c14b-4b4e-a983-d7bd72286478')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeMasonJob], [ServiceImg]) VALUES (2, N'Tháo dỡ mái tôn', N'40.000-65.000/m2', 1, 4, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/icon%2Fceiling.png?alt=media&token=dc752e3d-beaa-41ab-b950-4562a23f33cb')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeMasonJob], [ServiceImg]) VALUES (3, N'Hệ thống điện âm tường', N'Báo giá sau khi khảo sát', 1, 5, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/icon%2Felectrical-energy.png?alt=media&token=0998e7e9-fda5-4139-a57d-fa33f3373a6e')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeMasonJob], [ServiceImg]) VALUES (4, N'Hệ thống nước âm tường', N'Báo giá sau khi khảo sát', 1, 5, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/icon%2Fpipe.png?alt=media&token=28ffdffd-7064-4a86-aef8-1f2ef6e01e01')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeMasonJob], [ServiceImg]) VALUES (5, N'Lắp kính cường lực 12ly', N'Báo giá sau khi khảo sát', 1, 1, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/icon%2Fglass.png?alt=media&token=74513808-0a29-4bb1-8e75-b942c16cf7f1')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeMasonJob], [ServiceImg]) VALUES (6, N'Lắp kính cường lực 15ly', N'Báo giá sau khi khảo sát', 1, 1, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/icon%2Fglass.png?alt=media&token=74513808-0a29-4bb1-8e75-b942c16cf7f1')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeMasonJob], [ServiceImg]) VALUES (7, N'Điện năng lượng mặt trời', N'Báo giá sau khi khảo sát', 1, 5, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/icon%2Fsolar-panel.png?alt=media&token=385e352b-494a-474c-8381-903c5c9fd625')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeMasonJob], [ServiceImg]) VALUES (8, N'Lắp kính cường lực 19ly', N'Báo giá sau khi khảo sát', 1, 1, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/icon%2Fglass.png?alt=media&token=74513808-0a29-4bb1-8e75-b942c16cf7f1')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeMasonJob], [ServiceImg]) VALUES (10, N'Làm trần thạch cao nổi', N'130.000 – 260.000 /m2 phụ thuộc vào vật liệu nhà phân phối', 1, 7, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/icon%2Froof.png?alt=media&token=195c7e75-f0cf-4f7c-81af-62d89470d29a')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeMasonJob], [ServiceImg]) VALUES (11, N'Thi công sơn', N'30.000 - 80.000/m2 phụ thuộc vào vật liệu nhà phân phối', 1, 3, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/icon%2Fpainting.png?alt=media&token=ddb12100-27b2-4f96-9431-f1745f4bba33')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeMasonJob], [ServiceImg]) VALUES (13, N'Gia công cửa sắt', N'300.000 - 900.000/m2 Báo giá theo mẫu hoặc bản vẽ thiết kế', 1, 2, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/icon%2Fsingle-door.png?alt=media&token=3ca846e5-8a6d-4c7e-ad90-598d501fdafa')
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServiceStatus], [TypeMasonJob], [ServiceImg]) VALUES (14, N'Xây cầu thang', N'Giá giao động từ 1.200.000 /1 mét dài, cho đến 1.750.000 /1 mét dài, tùy thuộc vào kiểu dáng, mẫu mã và chất liệu của các loại gỗ, và kính', 1, 4, NULL)
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
SET IDENTITY_INSERT [dbo].[tblUsedMaterial] ON 

INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (2, 1, 27, 3, 10, 50, 3, NULL, N'50')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (3, 5, 27, 3, 5, NULL, 3, NULL, N'test update')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (4, 3, 28, 5, 2, NULL, 1, NULL, N'dư')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (5, 4, 28, 5, 5, NULL, 3, NULL, NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (6, 11, 27, 3, 99, NULL, 2, NULL, NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (7, 3, 27, 3, 3, NULL, 2, NULL, NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (8, 9, 27, 3, 10, NULL, 2, NULL, NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (9, 10, 37, 16, 50, NULL, 3, NULL, N'nhiều quá')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (10, 9, 37, 16, 50, NULL, 3, NULL, N'Nhiều quá')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (11, 10, 37, 16, 5, NULL, 3, NULL, NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (16, 1, 27, 3, 12, NULL, 2, N'trang', NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (17, 5, 27, 3, 2, 5, 3, N'', N'thieu')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (18, 11, 39, 16, 5, NULL, 1, N'Abc', N'undefined')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (19, 55, 39, 16, 3, 20, 1, N'Mũi khoang tường, cái, xyz', N'undefined')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (20, 43, 39, 16, 1, NULL, 1, N'Aaa', N'undefined')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (21, 8, 37, 16, 39, NULL, 1, N'Vvvv', N'undefined')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (22, 44, 39, 16, 999, NULL, 1, N' Kimochi', N'undefined')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (23, 11, 39, 16, 999, NULL, 1, N'Ngu', N'undefined')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (28, 43, 39, 16, 555, NULL, 2, N'qweqwe', NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (29, 9, 38, 16, 999, NULL, 2, N'ngu', NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (30, 28, 47, 62, 800, NULL, 3, N'Cho xe tai toi day', N'undefined')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (32, 55, 47, 62, 999, NULL, 1, N'Mui khoang, cai, Loai sieu to khong lo', N'undefined')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MasonID], [Quantity], [QuantityNew], [Status], [Note], [Message]) VALUES (34, 28, 47, 62, 345, NULL, 2, N'Rasdasd', NULL)
SET IDENTITY_INSERT [dbo].[tblUsedMaterial] OFF
SET IDENTITY_INSERT [dbo].[tblUsers] ON 

INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (1, N'user01', N'user123', N'Lộc', N'0123456789', N'Q2', N'loclttse130296@fpt.edu.vn', N'123456', 3, NULL, CAST(N'2022-07-01' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (2, NULL, NULL, N'Lộc', N'0332986894', N'Gò Vấp', N'loclttse130296@fpt.edu.vn', N'703367', 3, NULL, CAST(N'2022-01-14' AS Date), NULL, 10)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (3, NULL, NULL, N'updatemasonphone', N'0342986894', N'Q12', N'updatemasonphone@googlw.com', NULL, 2, 1, CAST(N'2022-01-15' AS Date), CAST(N'2022-02-07' AS Date), 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (4, NULL, NULL, N'Manson2', N'0123456739', N'Q2', N'tai45654@gmail.com', NULL, 2, 2, CAST(N'2022-01-15' AS Date), CAST(N'2022-02-17' AS Date), 5)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (5, NULL, NULL, N'updated', N'0938932440', N'string', N'user@example.com', NULL, 2, 1, CAST(N'2022-01-15' AS Date), CAST(N'2022-02-18' AS Date), 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (6, NULL, NULL, N'Manson4', N'0123456759', N'Q4', N'tai78987@gmail.com', NULL, 2, 1, CAST(N'2022-01-15' AS Date), CAST(N'2022-02-20' AS Date), 5)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (7, N'string111', N'Aa123@', N'Hoàng', N'0123456779', N'Q1', N'hoang@gmail.com', NULL, 1, NULL, CAST(N'2022-01-22' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (8, NULL, NULL, N'Nghi Tet', N'0987654123', N'Cu Chi', N'nghitet@gmail.com', N'738871', 3, NULL, CAST(N'2022-01-22' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (12, NULL, NULL, N'Manson5', N'0123456059', N'Q1', N'manson05@gmail.com', NULL, 2, 4, CAST(N'2022-01-23' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (16, NULL, NULL, N'Manson6', N'0123456678', N'Q2', N'manson06@gmail.com', NULL, 2, 5, CAST(N'2022-01-23' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (17, NULL, NULL, N'Manson7', N'0329581275', N'Q3', N'manson07@gmail.com', NULL, 2, 6, CAST(N'2022-01-23' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (18, NULL, NULL, N'Manson8', N'0248582952', N'Q3', N'manson08@gmail.com', NULL, 2, 7, CAST(N'2022-01-23' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (19, NULL, NULL, N'Huynh Thanh Tai', N'0333390995', N'Long An', N'thanhtai123@gmail.com', N'389367', 3, NULL, CAST(N'2022-02-08' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (22, NULL, NULL, N'MasonCreate', N'0343409961', N'123 duong 456 p7 q8', N'masoncreate@example.com', NULL, 2, 2, CAST(N'2022-02-11' AS Date), CAST(N'2022-02-14' AS Date), 5)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (23, NULL, NULL, N'Mason9', N'0294851725', N'789 duong so 6 p1 q12', N'9ason9@google.com', NULL, 2, 4, CAST(N'2022-02-11' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (26, NULL, NULL, N'MasonPhone', N'0188567899', N'An Giang', N'MasonPhone@example.com', NULL, 2, 2, CAST(N'2022-02-14' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (27, NULL, NULL, N'Lý Gia Hoàng', N'0938932441', N'Q12', N'hoanglg6699@gmail.com', NULL, 2, 6, CAST(N'2022-02-18' AS Date), CAST(N'2022-02-20' AS Date), 5)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (28, NULL, NULL, N'Nguyen C', N'0332456785', N'Q1', N'nguyenC@google.com', NULL, 2, 5, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (29, NULL, NULL, N'Tran Van Z', N'0344329988', N'123/321 Le Quy Don Q1', N'tranvanz@google.com', NULL, 2, 2, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (30, NULL, NULL, N'Lý Gia Hoàng', N'0938932442', N'Q12', N'hoanglg6699@gmail.com', NULL, 2, 7, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (31, NULL, NULL, N'Le Van A', N'0224438847', N'Q1', N'banana123_banana321@gmail.com', NULL, 2, 2, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (32, NULL, NULL, N'Le Van B', N'0442245678', N'Q2', N'vanble@google.com', NULL, 2, 5, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (33, NULL, NULL, N'hoang', N'0938932411', N'string', N'user@example.com', NULL, 2, 2, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (34, NULL, NULL, N'test', N'0123456768', N'Q1', N'test@google.com', NULL, 2, 1, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (35, NULL, NULL, N'hoang', N'0938932412', N'string', N'user@example.com', NULL, 2, 2, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (36, NULL, NULL, N'Nguyen D', N'0332456786', N'Q1', N'nguyenD@google.com', NULL, 2, 5, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (37, NULL, NULL, N'Nguyen E', N'0332456758', N'Q3', N'nguyenD@google.com', NULL, 2, 4, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (38, NULL, NULL, N'Nguyen F', N'0332456578', N'Q4', N'nguyenF@google.com', NULL, 2, 3, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (39, NULL, NULL, N'Nguyen H', N'0335346785', N'Tan Binh', N'nguyenH@google.com', NULL, 2, 5, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (40, NULL, NULL, N'CustomerA', N'0336346785', N'Go Vap', N'customerA@google.com', N'518140', 3, NULL, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (41, NULL, NULL, N'Nguyen H', N'0333246785', N'Tan Binh', N'nguyenH@google.com', NULL, 2, 5, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (43, NULL, NULL, N'Nguyen C', N'0332226785', N'Q1', N'nguyenC@google.com', NULL, 2, 5, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (45, NULL, NULL, N'hoanglg1', N'0938932123', N'string', N'user@example.com', NULL, 2, 4, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (46, NULL, NULL, N'asd', N'0938931234', N'asd', N'user@example.com', NULL, 2, 1, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (47, NULL, NULL, N'Lý Gia Hoàng', N'0938932121', N'Q12', N'hoanglg6699@gmail.com', NULL, 2, 7, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (48, NULL, NULL, N'Lý Gia Hoàng111', N'0938931111', N'Q12', N'hoanglg6699@gmail.com', NULL, 2, 7, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (49, NULL, NULL, N'001', N'0933322222', N'Q12', N'hoanglg6699@gmail.com', NULL, 2, 1, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (50, NULL, NULL, N'001', N'0900000000', N'Q001', N'hoanglg6699@gmail.com', NULL, 2, 1, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (52, NULL, NULL, N'002', N'0900000001', N'Q001', N'hoanglg6699@gmail.com', NULL, 2, 1, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (53, NULL, NULL, N'1', N'0311111111', N'1', N'hoanglg6699@gmail.com', NULL, 2, 1, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (54, NULL, NULL, N'2', N'0333333333', N'3', N'3@gmail.com', NULL, 2, 3, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (55, NULL, NULL, N'3', N'0333333311', N'3', N'3@gmail.com', NULL, 2, 3, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (56, NULL, NULL, N'3', N'0933333333', N'3', N'hoanglg6699@gmail.com', NULL, 2, 2, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (57, NULL, NULL, N'3', N'0933333331', N'3', N'3@gmail.com', NULL, 2, 4, CAST(N'2022-02-18' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (60, NULL, NULL, N'Lý Gia Hoàng', N'0333333332', N'3', N'hoanglg6699@gmail.com', NULL, 2, 7, CAST(N'2022-02-20' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (61, NULL, NULL, N'Cristiano Ronaldo', N'0999111888', N'Portugal', N'ronaldoCR7@gmail.com', N'367607', 3, NULL, CAST(N'2022-02-22' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (62, NULL, NULL, N'Tài 1', N'0935555555', N'Q8', N'Taiht@gmail.com', NULL, 2, 5, CAST(N'2022-02-22' AS Date), NULL, 4)
SET IDENTITY_INSERT [dbo].[tblUsers] OFF
/****** Object:  Index [IX_tblInvoice]    Script Date: 2/27/2022 3:18:32 PM ******/
ALTER TABLE [dbo].[tblInvoice] ADD  CONSTRAINT [IX_tblInvoice] UNIQUE NONCLUSTERED 
(
	[RequestServiceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_tblUsers]    Script Date: 2/27/2022 3:18:32 PM ******/
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
ALTER TABLE [dbo].[tblContract]  WITH CHECK ADD  CONSTRAINT [FK_tblContract_tblRequestServices] FOREIGN KEY([RequestServiceID])
REFERENCES [dbo].[tblRequestServices] ([RequestServiceID])
GO
ALTER TABLE [dbo].[tblContract] CHECK CONSTRAINT [FK_tblContract_tblRequestServices]
GO
ALTER TABLE [dbo].[tblContract]  WITH CHECK ADD  CONSTRAINT [FK_tblContract_tblStatus] FOREIGN KEY([ContractStatus])
REFERENCES [dbo].[tblStatus] ([StatusID])
GO
ALTER TABLE [dbo].[tblContract] CHECK CONSTRAINT [FK_tblContract_tblStatus]
GO
ALTER TABLE [dbo].[tblInvoice]  WITH CHECK ADD  CONSTRAINT [FK_tblInvoice_tblRequestServices] FOREIGN KEY([RequestServiceID])
REFERENCES [dbo].[tblRequestServices] ([RequestServiceID])
GO
ALTER TABLE [dbo].[tblInvoice] CHECK CONSTRAINT [FK_tblInvoice_tblRequestServices]
GO
ALTER TABLE [dbo].[tblMedia]  WITH CHECK ADD  CONSTRAINT [FK_tblMedia_tblReport] FOREIGN KEY([ReportID])
REFERENCES [dbo].[tblReport] ([ReportID])
GO
ALTER TABLE [dbo].[tblMedia] CHECK CONSTRAINT [FK_tblMedia_tblReport]
GO
ALTER TABLE [dbo].[tblMedia]  WITH CHECK ADD  CONSTRAINT [FK_tblMedia_tblRequestServices] FOREIGN KEY([RequestServiceID])
REFERENCES [dbo].[tblRequestServices] ([RequestServiceID])
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
ALTER TABLE [dbo].[tblRepairDetail]  WITH CHECK ADD  CONSTRAINT [FK_tblRepairDetail_tblUsers] FOREIGN KEY([MasonID])
REFERENCES [dbo].[tblUsers] ([UserID])
GO
ALTER TABLE [dbo].[tblRepairDetail] CHECK CONSTRAINT [FK_tblRepairDetail_tblUsers]
GO
ALTER TABLE [dbo].[tblReport]  WITH CHECK ADD  CONSTRAINT [FK_tblReport_tblRequestDetails] FOREIGN KEY([RequestDetailID])
REFERENCES [dbo].[tblRequestDetails] ([RequestDetailID])
GO
ALTER TABLE [dbo].[tblReport] CHECK CONSTRAINT [FK_tblReport_tblRequestDetails]
GO
ALTER TABLE [dbo].[tblReport]  WITH CHECK ADD  CONSTRAINT [FK_tblReport_tblUsers] FOREIGN KEY([MasonID])
REFERENCES [dbo].[tblUsers] ([UserID])
GO
ALTER TABLE [dbo].[tblReport] CHECK CONSTRAINT [FK_tblReport_tblUsers]
GO
ALTER TABLE [dbo].[tblRequestDetails]  WITH CHECK ADD  CONSTRAINT [FK_tblRequestDetails_tblRequestServices] FOREIGN KEY([RequestServiceID])
REFERENCES [dbo].[tblRequestServices] ([RequestServiceID])
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
ALTER TABLE [dbo].[tblRequestServices]  WITH CHECK ADD  CONSTRAINT [FK_tblRequestServices_tblStatus] FOREIGN KEY([RequestServiceStatus])
REFERENCES [dbo].[tblStatus] ([StatusID])
GO
ALTER TABLE [dbo].[tblRequestServices] CHECK CONSTRAINT [FK_tblRequestServices_tblStatus]
GO
ALTER TABLE [dbo].[tblRequestServices]  WITH CHECK ADD  CONSTRAINT [FK_tblRequestServices_tblUsers] FOREIGN KEY([CustomerID])
REFERENCES [dbo].[tblUsers] ([UserID])
GO
ALTER TABLE [dbo].[tblRequestServices] CHECK CONSTRAINT [FK_tblRequestServices_tblUsers]
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
ALTER TABLE [dbo].[tblUsedMaterial]  WITH CHECK ADD  CONSTRAINT [FK_tblUsedMaterial_tblUsers] FOREIGN KEY([MasonID])
REFERENCES [dbo].[tblUsers] ([UserID])
GO
ALTER TABLE [dbo].[tblUsedMaterial] CHECK CONSTRAINT [FK_tblUsedMaterial_tblUsers]
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
