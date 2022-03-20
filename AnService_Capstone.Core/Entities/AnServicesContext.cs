using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace AnService_Capstone.Core.Entities
{
    public partial class AnServicesContext : DbContext
    {
        public AnServicesContext()
        {
        }

        public AnServicesContext(DbContextOptions<AnServicesContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblContract> TblContracts { get; set; }
        public virtual DbSet<TblInvoice> TblInvoices { get; set; }
        public virtual DbSet<TblMaterial> TblMaterials { get; set; }
        public virtual DbSet<TblMedium> TblMedia { get; set; }
        public virtual DbSet<TblPromotion> TblPromotions { get; set; }
        public virtual DbSet<TblPromotionDetail> TblPromotionDetails { get; set; }
        public virtual DbSet<TblRepairDetail> TblRepairDetails { get; set; }
        public virtual DbSet<TblReport> TblReports { get; set; }
        public virtual DbSet<TblRequestDetail> TblRequestDetails { get; set; }
        public virtual DbSet<TblRole> TblRoles { get; set; }
        public virtual DbSet<TblService> TblServices { get; set; }
        public virtual DbSet<TblServiceRequest> TblServiceRequests { get; set; }
        public virtual DbSet<TblStatus> TblStatuses { get; set; }
        public virtual DbSet<TblTypeJob> TblTypeJobs { get; set; }
        public virtual DbSet<TblTypeService> TblTypeServices { get; set; }
        public virtual DbSet<TblUsedMaterial> TblUsedMaterials { get; set; }
        public virtual DbSet<TblUser> TblUsers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Name=DefaultConnection");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<TblContract>(entity =>
            {
                entity.HasKey(e => e.ContractId)
                    .HasName("PK_tblContact");

                entity.ToTable("tblContract");

                entity.Property(e => e.ContractId).HasColumnName("ContractID");

                entity.Property(e => e.ContractCreateDate).HasColumnType("datetime");

                entity.Property(e => e.ContractDeposit).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.ContractEndDate).HasColumnType("date");

                entity.Property(e => e.ContractStartDate).HasColumnType("date");

                entity.Property(e => e.ContractTitle).HasMaxLength(50);

                entity.Property(e => e.ContractTotalPrice).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.ContractUpdateDate).HasColumnType("datetime");

                entity.Property(e => e.ContractUrl).IsUnicode(false);

                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");

                entity.Property(e => e.ServiceRequestId).HasColumnName("ServiceRequestID");

                entity.HasOne(d => d.ContractStatusNavigation)
                    .WithMany(p => p.TblContracts)
                    .HasForeignKey(d => d.ContractStatus)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblContract_tblStatus");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.TblContracts)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblContact_tblUsers");

                entity.HasOne(d => d.ServiceRequest)
                    .WithMany(p => p.TblContracts)
                    .HasForeignKey(d => d.ServiceRequestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblContract_tblRequestServices");
            });

            modelBuilder.Entity<TblInvoice>(entity =>
            {
                entity.HasKey(e => e.InvoiceId);

                entity.ToTable("tblInvoice");

                entity.Property(e => e.InvoiceId).HasColumnName("InvoiceID");

                entity.Property(e => e.ContractId).HasColumnName("ContractID");

                entity.Property(e => e.InvoiceDateCreate).HasColumnType("datetime");

                entity.Property(e => e.PromotionId).HasColumnName("PromotionID");

                entity.Property(e => e.ServiceRequestId).HasColumnName("ServiceRequestID");

                entity.Property(e => e.TotalCost).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.Contract)
                    .WithMany(p => p.TblInvoices)
                    .HasForeignKey(d => d.ContractId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblInvoice_tblContract");

                entity.HasOne(d => d.Promotion)
                    .WithMany(p => p.TblInvoices)
                    .HasForeignKey(d => d.PromotionId)
                    .HasConstraintName("FK_tblInvoice_tblPromotion");
            });

            modelBuilder.Entity<TblMaterial>(entity =>
            {
                entity.HasKey(e => e.MaterialId);

                entity.ToTable("tblMaterial");

                entity.Property(e => e.MaterialId).HasColumnName("MaterialID");

                entity.Property(e => e.MaterialName).HasMaxLength(50);

                entity.Property(e => e.Unit).HasMaxLength(50);
            });

            modelBuilder.Entity<TblMedium>(entity =>
            {
                entity.HasKey(e => e.MediaId);

                entity.ToTable("tblMedia");

                entity.Property(e => e.MediaId).HasColumnName("MediaID");

                entity.Property(e => e.MediaUrl).IsUnicode(false);

                entity.Property(e => e.ReportId).HasColumnName("ReportID");

                entity.Property(e => e.ServiceRequestId).HasColumnName("ServiceRequestID");

                entity.HasOne(d => d.Report)
                    .WithMany(p => p.TblMedia)
                    .HasForeignKey(d => d.ReportId)
                    .HasConstraintName("FK_tblMedia_tblReport");

                entity.HasOne(d => d.ServiceRequest)
                    .WithMany(p => p.TblMedia)
                    .HasForeignKey(d => d.ServiceRequestId)
                    .HasConstraintName("FK_tblMedia_tblRequestServices");
            });

            modelBuilder.Entity<TblPromotion>(entity =>
            {
                entity.HasKey(e => e.PromotionId);

                entity.ToTable("tblPromotion");

                entity.Property(e => e.PromotionId).HasColumnName("PromotionID");

                entity.Property(e => e.PromotionCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PromotionDateExpired).HasColumnType("date");

                entity.Property(e => e.PromotionDescription)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblPromotionDetail>(entity =>
            {
                entity.HasKey(e => e.PromotionDetailId);

                entity.ToTable("tblPromotionDetail");

                entity.Property(e => e.PromotionDetailId).HasColumnName("PromotionDetailID");

                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");

                entity.Property(e => e.PromotionId).HasColumnName("PromotionID");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.TblPromotionDetails)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_tblPromotionDetail_tblUsers");

                entity.HasOne(d => d.Promotion)
                    .WithMany(p => p.TblPromotionDetails)
                    .HasForeignKey(d => d.PromotionId)
                    .HasConstraintName("FK_tblPromotionDetail_tblPromotion");
            });

            modelBuilder.Entity<TblRepairDetail>(entity =>
            {
                entity.HasKey(e => e.RepairDetailId);

                entity.ToTable("tblRepairDetail");

                entity.Property(e => e.RepairDetailId).HasColumnName("RepairDetailID");

                entity.Property(e => e.RepairDateBegin).HasColumnType("datetime");

                entity.Property(e => e.RepairDateEnd).HasColumnType("datetime");

                entity.Property(e => e.RequestDetailId).HasColumnName("RequestDetailID");

                entity.Property(e => e.WorkerId).HasColumnName("WorkerID");

                entity.HasOne(d => d.RequestDetail)
                    .WithMany(p => p.TblRepairDetails)
                    .HasForeignKey(d => d.RequestDetailId)
                    .HasConstraintName("FK_tblRepairDetail_tblRequestDetails");

                entity.HasOne(d => d.Worker)
                    .WithMany(p => p.TblRepairDetails)
                    .HasForeignKey(d => d.WorkerId)
                    .HasConstraintName("FK_tblRepairDetail_tblUsers");
            });

            modelBuilder.Entity<TblReport>(entity =>
            {
                entity.HasKey(e => e.ReportId);

                entity.ToTable("tblReport");

                entity.Property(e => e.ReportId).HasColumnName("ReportID");

                entity.Property(e => e.ReportDate).HasColumnType("datetime");

                entity.Property(e => e.ReportDescription).HasMaxLength(250);

                entity.Property(e => e.ReportTitle).HasMaxLength(50);

                entity.Property(e => e.RequestDetailId).HasColumnName("RequestDetailID");

                entity.Property(e => e.WorkerId).HasColumnName("WorkerID");

                entity.HasOne(d => d.RequestDetail)
                    .WithMany(p => p.TblReports)
                    .HasForeignKey(d => d.RequestDetailId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblReport_tblRequestDetails");

                entity.HasOne(d => d.Worker)
                    .WithMany(p => p.TblReports)
                    .HasForeignKey(d => d.WorkerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblReport_tblUsers");
            });

            modelBuilder.Entity<TblRequestDetail>(entity =>
            {
                entity.HasKey(e => e.RequestDetailId);

                entity.ToTable("tblRequestDetails");

                entity.Property(e => e.RequestDetailId).HasColumnName("RequestDetailID");

                entity.Property(e => e.RequestDetailDescription).HasMaxLength(250);

                entity.Property(e => e.RequestDetailPrice).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.ServiceId).HasColumnName("ServiceID");

                entity.Property(e => e.ServiceRequestId).HasColumnName("ServiceRequestID");

                entity.HasOne(d => d.RequestDetailStatusNavigation)
                    .WithMany(p => p.TblRequestDetails)
                    .HasForeignKey(d => d.RequestDetailStatus)
                    .HasConstraintName("FK_tblRequestDetails_tblStatus");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.TblRequestDetails)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblRequestDetails_tblServices");

                entity.HasOne(d => d.ServiceRequest)
                    .WithMany(p => p.TblRequestDetails)
                    .HasForeignKey(d => d.ServiceRequestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblRequestDetails_tblRequestServices");
            });

            modelBuilder.Entity<TblRole>(entity =>
            {
                entity.HasKey(e => e.RoleId);

                entity.ToTable("tblRoles");

                entity.Property(e => e.RoleId).HasColumnName("RoleID");

                entity.Property(e => e.RoleName).HasMaxLength(50);
            });

            modelBuilder.Entity<TblService>(entity =>
            {
                entity.HasKey(e => e.ServiceId);

                entity.ToTable("tblServices");

                entity.Property(e => e.ServiceId).HasColumnName("ServiceID");

                entity.Property(e => e.ServiceDescription).HasMaxLength(250);

                entity.Property(e => e.ServiceImg)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.ServiceName).HasMaxLength(50);

                entity.HasOne(d => d.TypeServiceNavigation)
                    .WithMany(p => p.TblServices)
                    .HasForeignKey(d => d.TypeService)
                    .HasConstraintName("FK_tblServices_tblTypeService");
            });

            modelBuilder.Entity<TblServiceRequest>(entity =>
            {
                entity.HasKey(e => e.ServiceRequestId)
                    .HasName("PK_tblRequestService");

                entity.ToTable("tblServiceRequest");

                entity.Property(e => e.ServiceRequestId).HasColumnName("ServiceRequestID");

                entity.Property(e => e.CustomerAddress).HasMaxLength(150);

                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");

                entity.Property(e => e.CustomerName).HasMaxLength(50);

                entity.Property(e => e.CustomerPhone)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ServiceRequestCreateDate).HasColumnType("datetime");

                entity.Property(e => e.ServiceRequestDescription).HasMaxLength(150);

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.TblServiceRequests)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblRequestServices_tblUsers");

                entity.HasOne(d => d.ServiceRequestStatusNavigation)
                    .WithMany(p => p.TblServiceRequests)
                    .HasForeignKey(d => d.ServiceRequestStatus)
                    .HasConstraintName("FK_tblRequestServices_tblStatus");
            });

            modelBuilder.Entity<TblStatus>(entity =>
            {
                entity.HasKey(e => e.StatusId);

                entity.ToTable("tblStatus");

                entity.Property(e => e.StatusId).HasColumnName("StatusID");

                entity.Property(e => e.StatusName).HasMaxLength(50);
            });

            modelBuilder.Entity<TblTypeJob>(entity =>
            {
                entity.HasKey(e => e.TypeJobId)
                    .HasName("PK_tblRoleTypes");

                entity.ToTable("tblTypeJobs");

                entity.Property(e => e.TypeJobId).HasColumnName("TypeJobID");

                entity.Property(e => e.TypeJobName).HasMaxLength(50);
            });

            modelBuilder.Entity<TblTypeService>(entity =>
            {
                entity.HasKey(e => e.TypeServiceId);

                entity.ToTable("tblTypeService");

                entity.Property(e => e.TypeServiceId).HasColumnName("TypeServiceID");

                entity.Property(e => e.TypeServiceDecription).HasMaxLength(100);
            });

            modelBuilder.Entity<TblUsedMaterial>(entity =>
            {
                entity.HasKey(e => e.UsedMaterialId);

                entity.ToTable("tblUsedMaterial");

                entity.Property(e => e.UsedMaterialId).HasColumnName("UsedMaterialID");

                entity.Property(e => e.MaterialId).HasColumnName("MaterialID");

                entity.Property(e => e.Message).HasMaxLength(50);

                entity.Property(e => e.Note).HasMaxLength(50);

                entity.Property(e => e.RequestDetailId).HasColumnName("RequestDetailID");

                entity.Property(e => e.WorkerId).HasColumnName("WorkerID");

                entity.HasOne(d => d.Material)
                    .WithMany(p => p.TblUsedMaterials)
                    .HasForeignKey(d => d.MaterialId)
                    .HasConstraintName("FK_tblUsedMaterial_tblMaterial");

                entity.HasOne(d => d.RequestDetail)
                    .WithMany(p => p.TblUsedMaterials)
                    .HasForeignKey(d => d.RequestDetailId)
                    .HasConstraintName("FK_tblUsedMaterial_tblRequestDetails");

                entity.HasOne(d => d.StatusNavigation)
                    .WithMany(p => p.TblUsedMaterials)
                    .HasForeignKey(d => d.Status)
                    .HasConstraintName("FK_tblUsedMaterial_tblStatus");
            });

            modelBuilder.Entity<TblUser>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("tblUsers");

                entity.HasIndex(e => e.PhoneNumber, "IX_tblUsers")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Address).HasMaxLength(100);

                entity.Property(e => e.CreateDate).HasColumnType("date");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FullName).HasMaxLength(50);

                entity.Property(e => e.InviteCode)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("date");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.RoleNavigation)
                    .WithMany(p => p.TblUsers)
                    .HasForeignKey(d => d.Role)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblUsers_tblRoles");

                entity.HasOne(d => d.StatusNavigation)
                    .WithMany(p => p.TblUsers)
                    .HasForeignKey(d => d.Status)
                    .HasConstraintName("FK_tblUsers_tblStatus");

                entity.HasOne(d => d.TypeJobNavigation)
                    .WithMany(p => p.TblUsers)
                    .HasForeignKey(d => d.TypeJob)
                    .HasConstraintName("FK_tblUsers_tblTypeJobs");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
