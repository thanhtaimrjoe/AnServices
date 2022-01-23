USE [master]
GO
/****** Object:  Database [AnServices]    Script Date: 1/24/2022 4:47:40 AM ******/
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
/****** Object:  Table [dbo].[tblMaterial]    Script Date: 1/24/2022 4:47:40 AM ******/
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
/****** Object:  Table [dbo].[tblMedia]    Script Date: 1/24/2022 4:47:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblMedia](
	[MediaID] [int] IDENTITY(1,1) NOT NULL,
	[RequestServiceID] [int] NOT NULL,
	[MediaUrl] [varchar](250) NULL,
 CONSTRAINT [PK_tblMedia] PRIMARY KEY CLUSTERED 
(
	[MediaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblPromotion]    Script Date: 1/24/2022 4:47:40 AM ******/
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
/****** Object:  Table [dbo].[tblPromotionDetail]    Script Date: 1/24/2022 4:47:40 AM ******/
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
/****** Object:  Table [dbo].[tblRepairDetail]    Script Date: 1/24/2022 4:47:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblRepairDetail](
	[RepairDetailID] [int] IDENTITY(1,1) NOT NULL,
	[RequestDetailID] [int] NULL,
	[MansonID] [int] NULL,
	[RepairDateBegin] [date] NULL,
	[RepairDateEnd] [date] NULL,
	[RepairStatus] [int] NOT NULL,
 CONSTRAINT [PK_tblRepairDetail] PRIMARY KEY CLUSTERED 
(
	[RepairDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblRequestDetails]    Script Date: 1/24/2022 4:47:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblRequestDetails](
	[RequestDetaiID] [int] IDENTITY(1,1) NOT NULL,
	[RequestServiceID] [int] NOT NULL,
	[ServiceID] [int] NOT NULL,
 CONSTRAINT [PK_tblRequestDetails] PRIMARY KEY CLUSTERED 
(
	[RequestDetaiID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblRequestServices]    Script Date: 1/24/2022 4:47:40 AM ******/
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
	[CustomerAddress] [nvarchar](100) NULL,
	[RequestServiceDescription] [nvarchar](150) NULL,
	[RequestServiceStatus] [int] NULL,
	[RequestServiceCreateDate] [date] NULL,
 CONSTRAINT [PK_tblRequestService] PRIMARY KEY CLUSTERED 
(
	[RequestServiceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblRoles]    Script Date: 1/24/2022 4:47:40 AM ******/
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
/****** Object:  Table [dbo].[tblServices]    Script Date: 1/24/2022 4:47:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tblServices](
	[ServiceID] [int] IDENTITY(1,1) NOT NULL,
	[ServiceName] [nvarchar](50) NULL,
	[ServiceDescription] [nvarchar](150) NULL,
	[ServicePrice] [float] NULL,
	[ServiceStatus] [bit] NULL,
	[TypeMansonJob] [int] NULL,
	[ServiceImg] [varchar](250) NULL,
 CONSTRAINT [PK_tblServices] PRIMARY KEY CLUSTERED 
(
	[ServiceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblStatus]    Script Date: 1/24/2022 4:47:40 AM ******/
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
/****** Object:  Table [dbo].[tblTypeJobs]    Script Date: 1/24/2022 4:47:40 AM ******/
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
/****** Object:  Table [dbo].[tblUsedMaterial]    Script Date: 1/24/2022 4:47:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUsedMaterial](
	[UsedMaterialID] [int] IDENTITY(1,1) NOT NULL,
	[MaterialID] [int] NULL,
	[RequestDetailID] [int] NULL,
	[MansonID] [int] NULL,
	[quantity] [int] NULL,
	[Status] [int] NULL,
	[Message] [nvarchar](50) NULL,
 CONSTRAINT [PK_tblUsedMaterial] PRIMARY KEY CLUSTERED 
(
	[UsedMaterialID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblUsers]    Script Date: 1/24/2022 4:47:40 AM ******/
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
SET IDENTITY_INSERT [dbo].[tblMaterial] ON 

INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (1, N'Gạch', N'cục')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (2, N'Dây điện', N'mét')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (3, N'Xi măng', N'bao')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (4, N'Sơn', N'thùng')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (5, N'Vôi', N'bao')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (6, N'Cát', N'bao')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (7, N'Thép', N'mét')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (8, N'Ống nhựa', N'mét')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (9, N'Keo dán', N'cuộn')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (10, N'Đinh', N'hộp')
INSERT [dbo].[tblMaterial] ([MaterialID], [MaterialName], [Unit]) VALUES (11, N'Bản lề', N'cái')
SET IDENTITY_INSERT [dbo].[tblMaterial] OFF
SET IDENTITY_INSERT [dbo].[tblMedia] ON 

INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [MediaUrl]) VALUES (10, 17, N'qfasfafaf')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [MediaUrl]) VALUES (11, 17, N'afsafagasg')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [MediaUrl]) VALUES (12, 18, N'fafasfasfgasfsf')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [MediaUrl]) VALUES (13, 18, N'asfagasgasfs')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [MediaUrl]) VALUES (14, 20, N'url')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [MediaUrl]) VALUES (15, 20, N'url2')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [MediaUrl]) VALUES (16, 21, N'imgURL')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [MediaUrl]) VALUES (17, 21, N'videoURL')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [MediaUrl]) VALUES (18, 22, N'imgUrl')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [MediaUrl]) VALUES (19, 22, N'videoUrl')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [MediaUrl]) VALUES (20, 24, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1642852102442rn_image_picker_lib_temp_891b35b1-013e-49d6-8273-a0aaa03fa95a.jpg?alt=media&token=7641c48f-7ac7-44c9-a786-966499fb4877')
INSERT [dbo].[tblMedia] ([MediaID], [RequestServiceID], [MediaUrl]) VALUES (21, 24, N'https://firebasestorage.googleapis.com/v0/b/anservices.appspot.com/o/requestService%2F1642852102433rn_image_picker_lib_temp_77346549-e725-4dc0-a944-f9bbdb21716c.jpg?alt=media&token=dd4c4836-847c-41a4-96a9-c0d51de1641e')
SET IDENTITY_INSERT [dbo].[tblMedia] OFF
SET IDENTITY_INSERT [dbo].[tblPromotion] ON 

INSERT [dbo].[tblPromotion] ([PromotionID], [PromotionCode], [PromotionDescription], [PromotionDateExpired], [PromotionStatus]) VALUES (1, N'703367', N'CODE CA NHAN', NULL, 4)
INSERT [dbo].[tblPromotion] ([PromotionID], [PromotionCode], [PromotionDescription], [PromotionDateExpired], [PromotionStatus]) VALUES (2, N'738871', N'CODE CA NHAN', NULL, 4)
SET IDENTITY_INSERT [dbo].[tblPromotion] OFF
SET IDENTITY_INSERT [dbo].[tblPromotionDetail] ON 

INSERT [dbo].[tblPromotionDetail] ([PromotionDetailID], [CustomerID], [PromotionID]) VALUES (1, 2, 1)
INSERT [dbo].[tblPromotionDetail] ([PromotionDetailID], [CustomerID], [PromotionID]) VALUES (2, 8, 2)
SET IDENTITY_INSERT [dbo].[tblPromotionDetail] OFF
SET IDENTITY_INSERT [dbo].[tblRepairDetail] ON 

INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MansonID], [RepairDateBegin], [RepairDateEnd], [RepairStatus]) VALUES (1, 27, 3, NULL, NULL, 2)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MansonID], [RepairDateBegin], [RepairDateEnd], [RepairStatus]) VALUES (2, 27, 6, NULL, NULL, 2)
INSERT [dbo].[tblRepairDetail] ([RepairDetailID], [RequestDetailID], [MansonID], [RepairDateBegin], [RepairDateEnd], [RepairStatus]) VALUES (3, 28, 5, NULL, NULL, 2)
SET IDENTITY_INSERT [dbo].[tblRepairDetail] OFF
SET IDENTITY_INSERT [dbo].[tblRequestDetails] ON 

INSERT [dbo].[tblRequestDetails] ([RequestDetaiID], [RequestServiceID], [ServiceID]) VALUES (19, 17, 3)
INSERT [dbo].[tblRequestDetails] ([RequestDetaiID], [RequestServiceID], [ServiceID]) VALUES (20, 17, 4)
INSERT [dbo].[tblRequestDetails] ([RequestDetaiID], [RequestServiceID], [ServiceID]) VALUES (21, 18, 1)
INSERT [dbo].[tblRequestDetails] ([RequestDetaiID], [RequestServiceID], [ServiceID]) VALUES (22, 18, 2)
INSERT [dbo].[tblRequestDetails] ([RequestDetaiID], [RequestServiceID], [ServiceID]) VALUES (25, 20, 1)
INSERT [dbo].[tblRequestDetails] ([RequestDetaiID], [RequestServiceID], [ServiceID]) VALUES (26, 20, 2)
INSERT [dbo].[tblRequestDetails] ([RequestDetaiID], [RequestServiceID], [ServiceID]) VALUES (27, 21, 2)
INSERT [dbo].[tblRequestDetails] ([RequestDetaiID], [RequestServiceID], [ServiceID]) VALUES (28, 21, 3)
INSERT [dbo].[tblRequestDetails] ([RequestDetaiID], [RequestServiceID], [ServiceID]) VALUES (29, 22, 2)
INSERT [dbo].[tblRequestDetails] ([RequestDetaiID], [RequestServiceID], [ServiceID]) VALUES (30, 22, 5)
INSERT [dbo].[tblRequestDetails] ([RequestDetaiID], [RequestServiceID], [ServiceID]) VALUES (31, 24, 2)
SET IDENTITY_INSERT [dbo].[tblRequestDetails] OFF
SET IDENTITY_INSERT [dbo].[tblRequestServices] ON 

INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate]) VALUES (17, 1, N'BCA', N'1234567899', N'Q1', N'qfqfqfqwfq', 2, CAST(N'2022-01-09' AS Date))
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate]) VALUES (18, 1, N'ACB', N'1234567890', N'Q2', N'afafadacas', 2, CAST(N'2022-01-10' AS Date))
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate]) VALUES (20, 1, N'BAC', N'1234567899', N'Q1', N'sua nha', 2, CAST(N'2022-01-10' AS Date))
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate]) VALUES (21, 1, N'ABC', N'1234567899', N'Tân Bình', N'Sửa cửa, thay kính', 2, CAST(N'2022-01-11' AS Date))
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate]) VALUES (22, 1, N'ABC', N'0987654321', N'Nhà Bè', N'Sửa nhà', 3, CAST(N'2022-01-18' AS Date))
INSERT [dbo].[tblRequestServices] ([RequestServiceID], [CustomerID], [CustomerName], [CustomerPhone], [CustomerAddress], [RequestServiceDescription], [RequestServiceStatus], [RequestServiceCreateDate]) VALUES (24, 8, N'Tung Loc', N'0987654000', N'Go Vap', N'Ok la', 2, CAST(N'2022-01-22' AS Date))
SET IDENTITY_INSERT [dbo].[tblRequestServices] OFF
SET IDENTITY_INSERT [dbo].[tblRoles] ON 

INSERT [dbo].[tblRoles] ([RoleID], [RoleName]) VALUES (1, N'Staff')
INSERT [dbo].[tblRoles] ([RoleID], [RoleName]) VALUES (2, N'Manson')
INSERT [dbo].[tblRoles] ([RoleID], [RoleName]) VALUES (3, N'Customer')
SET IDENTITY_INSERT [dbo].[tblRoles] OFF
SET IDENTITY_INSERT [dbo].[tblServices] ON 

INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServicePrice], [ServiceStatus], [TypeMansonJob], [ServiceImg]) VALUES (1, N'Đục nền gạch cũ', N'Đục nền gạch cũ (m2)', 25000, 1, 4, NULL)
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServicePrice], [ServiceStatus], [TypeMansonJob], [ServiceImg]) VALUES (2, N'Tháo dỡ mái tôn', N'Tháo dỡ mái tôn (m20', 15000, 1, 4, NULL)
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServicePrice], [ServiceStatus], [TypeMansonJob], [ServiceImg]) VALUES (3, N'Hệ thống điện âm tường', N'Hệ thống điện âm tường (m2)', 70000, 1, 5, NULL)
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServicePrice], [ServiceStatus], [TypeMansonJob], [ServiceImg]) VALUES (4, N'Hệ thống nước âm tường', N'Hệ thống nước âm tường (m2)', 65000, 1, 5, NULL)
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServicePrice], [ServiceStatus], [TypeMansonJob], [ServiceImg]) VALUES (5, N'Lắp kính cường lực', N'Lắp kính', 10000, 1, 1, NULL)
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServicePrice], [ServiceStatus], [TypeMansonJob], [ServiceImg]) VALUES (6, N'Lắp kính thủy lực', N'Lắp kính', 10000, 1, 1, NULL)
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServicePrice], [ServiceStatus], [TypeMansonJob], [ServiceImg]) VALUES (7, N'Điện năng lượng mặt trời', N'Điện năng lượng', 20000, 1, 5, NULL)
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServicePrice], [ServiceStatus], [TypeMansonJob], [ServiceImg]) VALUES (8, N'Rò rỉ nước tại ống xả máy giặt', N'Rò rỉ', 10000, 1, 5, NULL)
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServicePrice], [ServiceStatus], [TypeMansonJob], [ServiceImg]) VALUES (9, N'Sửa máy lạnh', N'Sửa máy lạnh', 15000, 1, 6, NULL)
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServicePrice], [ServiceStatus], [TypeMansonJob], [ServiceImg]) VALUES (10, N'Làm trần thạch cao nổi', N'Làm trần thạch cao nổi', 20000, 1, 7, NULL)
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServicePrice], [ServiceStatus], [TypeMansonJob], [ServiceImg]) VALUES (11, N'Thi công sơn nước nhà cấp 4', N'Thi cong son nuoc nhà cấp 4', 22000, 1, 3, NULL)
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServicePrice], [ServiceStatus], [TypeMansonJob], [ServiceImg]) VALUES (12, N'Tho son nuoc nhà 3d', N'Tho son nuoc nhà 3d', 28000, 1, 3, NULL)
INSERT [dbo].[tblServices] ([ServiceID], [ServiceName], [ServiceDescription], [ServicePrice], [ServiceStatus], [TypeMansonJob], [ServiceImg]) VALUES (13, N'Gia công cửa sắt', N'Gia công', 24000, 1, 2, NULL)
SET IDENTITY_INSERT [dbo].[tblServices] OFF
SET IDENTITY_INSERT [dbo].[tblStatus] ON 

INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (1, N'Deny')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (2, N'Pending')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (3, N'Approve')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (4, N'Active')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (5, N'InActive')
INSERT [dbo].[tblStatus] ([StatusID], [StatusName]) VALUES (6, N'Processing')
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

INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MansonID], [quantity], [Status], [Message]) VALUES (2, 1, 27, 3, 10, 1, N'dư')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MansonID], [quantity], [Status], [Message]) VALUES (3, 5, 27, 3, 5, 3, N'test update')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MansonID], [quantity], [Status], [Message]) VALUES (4, 3, 28, 5, 2, 1, N'dư')
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MansonID], [quantity], [Status], [Message]) VALUES (5, 4, 28, 5, 5, 3, NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MansonID], [quantity], [Status], [Message]) VALUES (6, 11, 27, 3, 99, 2, NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MansonID], [quantity], [Status], [Message]) VALUES (7, 3, 27, 3, 3, 2, NULL)
INSERT [dbo].[tblUsedMaterial] ([UsedMaterialID], [MaterialID], [RequestDetailID], [MansonID], [quantity], [Status], [Message]) VALUES (8, 9, 27, 3, 10, 2, NULL)
SET IDENTITY_INSERT [dbo].[tblUsedMaterial] OFF
SET IDENTITY_INSERT [dbo].[tblUsers] ON 

INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (1, N'user01', N'user123', N'Lộc', N'0123456789', N'Q2', N'loclttse130296@fpt.edu.vn', N'123456', 3, NULL, CAST(N'2022-07-01' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (2, NULL, NULL, N'Lộc', N'0332986894', N'Gò Vấp', N'loclttse130296@fpt.edu.vn', N'703367', 3, NULL, CAST(N'2022-01-14' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (3, NULL, NULL, N'Manson1', N'0375250209', N'Q1', N'tai1234321@gmail.com', NULL, 2, 1, CAST(N'2022-01-15' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (4, NULL, NULL, N'Manson2', N'0123456779', N'Q2', N'tai45654@gmail.com', NULL, 2, 2, CAST(N'2022-01-15' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (5, NULL, NULL, N'Manson3', N'0123456769', N'Q3', N'tai134543@gmail.com', NULL, 2, 3, CAST(N'2022-01-15' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (6, NULL, NULL, N'Manson4', N'0123456759', N'Q4', N'tai78987@gmail.com', NULL, 2, 1, CAST(N'2022-01-15' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (7, N'string111', N'Aa123@', N'Hoàng', N'0123456779', N'Q1', N'hoang@gmail.com', NULL, 1, NULL, CAST(N'2022-01-22' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (8, NULL, NULL, N'Nghi Tet', N'0987654123', N'Cu Chi', N'nghitet@gmail.com', N'738871', 3, NULL, CAST(N'2022-01-22' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (12, NULL, NULL, N'Manson5', N'0123456769', N'Q1', N'manson05@gmail.com', NULL, 2, 4, CAST(N'2022-01-23' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (16, NULL, NULL, N'Manson6', N'0123456678', N'Q2', N'manson06@gmail.com', NULL, 2, 5, CAST(N'2022-01-23' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (17, NULL, NULL, N'Manson7', N'0329581275', N'Q3', N'manson07@gmail.com', NULL, 2, 6, CAST(N'2022-01-23' AS Date), NULL, 4)
INSERT [dbo].[tblUsers] ([UserID], [Username], [Password], [FullName], [PhoneNumber], [Address], [Email], [InviteCode], [Role], [TypeJob], [CreateDate], [UpdateDate], [Status]) VALUES (18, NULL, NULL, N'Manson8', N'0248582952', N'Q3', N'manson08@gmail.com', NULL, 2, 7, CAST(N'2022-01-23' AS Date), NULL, 4)
SET IDENTITY_INSERT [dbo].[tblUsers] OFF
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
REFERENCES [dbo].[tblRequestDetails] ([RequestDetaiID])
GO
ALTER TABLE [dbo].[tblRepairDetail] CHECK CONSTRAINT [FK_tblRepairDetail_tblRequestDetails]
GO
ALTER TABLE [dbo].[tblRepairDetail]  WITH CHECK ADD  CONSTRAINT [FK_tblRepairDetail_tblStatus] FOREIGN KEY([RepairStatus])
REFERENCES [dbo].[tblStatus] ([StatusID])
GO
ALTER TABLE [dbo].[tblRepairDetail] CHECK CONSTRAINT [FK_tblRepairDetail_tblStatus]
GO
ALTER TABLE [dbo].[tblRepairDetail]  WITH CHECK ADD  CONSTRAINT [FK_tblRepairDetail_tblUsers] FOREIGN KEY([MansonID])
REFERENCES [dbo].[tblUsers] ([UserID])
GO
ALTER TABLE [dbo].[tblRepairDetail] CHECK CONSTRAINT [FK_tblRepairDetail_tblUsers]
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
REFERENCES [dbo].[tblRequestDetails] ([RequestDetaiID])
GO
ALTER TABLE [dbo].[tblUsedMaterial] CHECK CONSTRAINT [FK_tblUsedMaterial_tblRequestDetails]
GO
ALTER TABLE [dbo].[tblUsedMaterial]  WITH CHECK ADD  CONSTRAINT [FK_tblUsedMaterial_tblStatus] FOREIGN KEY([Status])
REFERENCES [dbo].[tblStatus] ([StatusID])
GO
ALTER TABLE [dbo].[tblUsedMaterial] CHECK CONSTRAINT [FK_tblUsedMaterial_tblStatus]
GO
ALTER TABLE [dbo].[tblUsedMaterial]  WITH CHECK ADD  CONSTRAINT [FK_tblUsedMaterial_tblUsers] FOREIGN KEY([MansonID])
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
