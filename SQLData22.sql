USE [master]
GO
/****** Object:  Database [AnServices]    Script Date: 2/26/2022 9:25:18 PM ******/
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
/****** Object:  Table [dbo].[tblContract]    Script Date: 2/26/2022 9:25:18 PM ******/
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
/****** Object:  Table [dbo].[tblInvoice]    Script Date: 2/26/2022 9:25:18 PM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_tblInvoice] UNIQUE NONCLUSTERED 
(
	[RequestServiceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tblMaterial]    Script Date: 2/26/2022 9:25:18 PM ******/
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
/****** Object:  Table [dbo].[tblMedia]    Script Date: 2/26/2022 9:25:18 PM ******/
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
/****** Object:  Table [dbo].[tblPromotion]    Script Date: 2/26/2022 9:25:18 PM ******/
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
/****** Object:  Table [dbo].[tblPromotionDetail]    Script Date: 2/26/2022 9:25:18 PM ******/
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
/****** Object:  Table [dbo].[tblRepairDetail]    Script Date: 2/26/2022 9:25:18 PM ******/
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
/****** Object:  Table [dbo].[tblReport]    Script Date: 2/26/2022 9:25:18 PM ******/
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
/****** Object:  Table [dbo].[tblRequestDetails]    Script Date: 2/26/2022 9:25:18 PM ******/
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
/****** Object:  Table [dbo].[tblRequestServices]    Script Date: 2/26/2022 9:25:18 PM ******/
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
/****** Object:  Table [dbo].[tblRoles]    Script Date: 2/26/2022 9:25:18 PM ******/
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
/****** Object:  Table [dbo].[tblServices]    Script Date: 2/26/2022 9:25:18 PM ******/
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
/****** Object:  Table [dbo].[tblStatus]    Script Date: 2/26/2022 9:25:18 PM ******/
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
/****** Object:  Table [dbo].[tblTypeJobs]    Script Date: 2/26/2022 9:25:18 PM ******/
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
/****** Object:  Table [dbo].[tblUsedMaterial]    Script Date: 2/26/2022 9:25:18 PM ******/
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
/****** Object:  Table [dbo].[tblUsers]    Script Date: 2/26/2022 9:25:18 PM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_tblUsers] UNIQUE NONCLUSTERED 
(
	[PhoneNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
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
