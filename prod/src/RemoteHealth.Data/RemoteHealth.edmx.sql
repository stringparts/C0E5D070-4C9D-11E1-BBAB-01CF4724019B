
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, and Azure
-- --------------------------------------------------
-- Date Created: 01/10/2012 22:40:33
-- Generated from EDMX file: c:\users\muzahmed\documents\visual studio 2010\Projects\RemoteHealth.Data\RemoteHealth.Data\RemoteHealth.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [remoteHealth];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_PatientPatientIdentifiers]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PatientIdentifiers] DROP CONSTRAINT [FK_PatientPatientIdentifiers];
GO
IF OBJECT_ID(N'[dbo].[FK_VisitLocation]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Visits] DROP CONSTRAINT [FK_VisitLocation];
GO
IF OBJECT_ID(N'[dbo].[FK_VisitClinicians]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Clinicians] DROP CONSTRAINT [FK_VisitClinicians];
GO
IF OBJECT_ID(N'[dbo].[FK_NotesClinicians]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Notes1] DROP CONSTRAINT [FK_NotesClinicians];
GO
IF OBJECT_ID(N'[dbo].[FK_VisitVisitNotes]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Notes1_VisitNote] DROP CONSTRAINT [FK_VisitVisitNotes];
GO
IF OBJECT_ID(N'[dbo].[FK_PatientPatientNotes]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Notes1_PatientNote] DROP CONSTRAINT [FK_PatientPatientNotes];
GO
IF OBJECT_ID(N'[dbo].[FK_HealthItemTypeHealthItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[HealthItemTypes] DROP CONSTRAINT [FK_HealthItemTypeHealthItem];
GO
IF OBJECT_ID(N'[dbo].[FK_VisitHealthItem]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[HealthItems] DROP CONSTRAINT [FK_VisitHealthItem];
GO
IF OBJECT_ID(N'[dbo].[FK_HealthItemHealthItemNote]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Notes1_HealthItemNote] DROP CONSTRAINT [FK_HealthItemHealthItemNote];
GO
IF OBJECT_ID(N'[dbo].[FK_VisitNote_inherits_Note]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Notes1_VisitNote] DROP CONSTRAINT [FK_VisitNote_inherits_Note];
GO
IF OBJECT_ID(N'[dbo].[FK_PatientNote_inherits_Note]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Notes1_PatientNote] DROP CONSTRAINT [FK_PatientNote_inherits_Note];
GO
IF OBJECT_ID(N'[dbo].[FK_HealthItemNote_inherits_Note]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Notes1_HealthItemNote] DROP CONSTRAINT [FK_HealthItemNote_inherits_Note];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Patients]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Patients];
GO
IF OBJECT_ID(N'[dbo].[PatientIdentifiers]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PatientIdentifiers];
GO
IF OBJECT_ID(N'[dbo].[Visits]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Visits];
GO
IF OBJECT_ID(N'[dbo].[Locations]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Locations];
GO
IF OBJECT_ID(N'[dbo].[Clinicians]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Clinicians];
GO
IF OBJECT_ID(N'[dbo].[Notes1]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Notes1];
GO
IF OBJECT_ID(N'[dbo].[HealthItems]', 'U') IS NOT NULL
    DROP TABLE [dbo].[HealthItems];
GO
IF OBJECT_ID(N'[dbo].[HealthItemTypes]', 'U') IS NOT NULL
    DROP TABLE [dbo].[HealthItemTypes];
GO
IF OBJECT_ID(N'[dbo].[Notes1_VisitNote]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Notes1_VisitNote];
GO
IF OBJECT_ID(N'[dbo].[Notes1_PatientNote]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Notes1_PatientNote];
GO
IF OBJECT_ID(N'[dbo].[Notes1_HealthItemNote]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Notes1_HealthItemNote];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Patients'
CREATE TABLE [dbo].[Patients] (
    [PatientId] uniqueidentifier  NOT NULL,
    [LastName] nvarchar(max)  NOT NULL,
    [FirstName] nvarchar(max)  NOT NULL,
    [DateOfBirth] datetime  NOT NULL,
    [CreatedDate] datetime  NOT NULL,
    [UpdatedDate] datetime  NOT NULL,
    [Gender] int  NOT NULL,
    [Image] varbinary(max)  NULL
);
GO

-- Creating table 'PatientIdentifiers'
CREATE TABLE [dbo].[PatientIdentifiers] (
    [IdentifierType] int  NOT NULL,
    [IdentifierValue] nvarchar(max)  NOT NULL,
    [PatientPatientId] uniqueidentifier  NOT NULL,
    [IdentifierName] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Visits'
CREATE TABLE [dbo].[Visits] (
    [VisitId] uniqueidentifier  NOT NULL,
    [VisitDate] datetime  NOT NULL,
    [Location_LocationId] uniqueidentifier  NOT NULL
);
GO

-- Creating table 'Locations'
CREATE TABLE [dbo].[Locations] (
    [LocationId] uniqueidentifier  NOT NULL,
    [LocationName] nvarchar(max)  NOT NULL,
    [LocationDetails] nvarchar(max)  NULL
);
GO

-- Creating table 'Clinicians'
CREATE TABLE [dbo].[Clinicians] (
    [ClinicianId] uniqueidentifier  NOT NULL,
    [LastName] nvarchar(max)  NOT NULL,
    [FirstName] nvarchar(max)  NOT NULL,
    [ClinicianRole] int  NULL,
    [VisitClinicians_Clinicians_VisitId] uniqueidentifier  NOT NULL
);
GO

-- Creating table 'Notes'
CREATE TABLE [dbo].[Notes] (
    [NoteId] uniqueidentifier  NOT NULL,
    [CreatedDate] nvarchar(max)  NOT NULL,
    [UpdatedDate] nvarchar(max)  NOT NULL,
    [IsActive] bit  NOT NULL,
    [Clinician_ClinicianId] uniqueidentifier  NOT NULL
);
GO

-- Creating table 'HealthItems'
CREATE TABLE [dbo].[HealthItems] (
    [HealthItemId] uniqueidentifier  NOT NULL,
    [CreatedDate] datetime  NOT NULL,
    [UpdatedDate] datetime  NOT NULL,
    [HealthItemData] nvarchar(max)  NOT NULL,
    [HealthItemVersion] binary(8)  NULL,
    [VisitVisitId] uniqueidentifier  NOT NULL
);
GO

-- Creating table 'HealthItemTypes'
CREATE TABLE [dbo].[HealthItemTypes] (
    [HealthItemTypeId] uniqueidentifier  NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Version] nvarchar(max)  NOT NULL,
    [HealthItemTypeHealthItem_HealthItemType_HealthItemId] uniqueidentifier  NOT NULL
);
GO

-- Creating table 'Notes_VisitNote'
CREATE TABLE [dbo].[Notes_VisitNote] (
    [VisitId] uniqueidentifier  NOT NULL,
    [NoteId] uniqueidentifier  NOT NULL
);
GO

-- Creating table 'Notes_PatientNote'
CREATE TABLE [dbo].[Notes_PatientNote] (
    [PatientId] uniqueidentifier  NOT NULL,
    [NoteId] uniqueidentifier  NOT NULL
);
GO

-- Creating table 'Notes_HealthItemNote'
CREATE TABLE [dbo].[Notes_HealthItemNote] (
    [HealthItemHealthItemId] uniqueidentifier  NOT NULL,
    [NoteId] uniqueidentifier  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [PatientId] in table 'Patients'
ALTER TABLE [dbo].[Patients]
ADD CONSTRAINT [PK_Patients]
    PRIMARY KEY CLUSTERED ([PatientId] ASC);
GO

-- Creating primary key on [IdentifierType], [PatientPatientId] in table 'PatientIdentifiers'
ALTER TABLE [dbo].[PatientIdentifiers]
ADD CONSTRAINT [PK_PatientIdentifiers]
    PRIMARY KEY CLUSTERED ([IdentifierType], [PatientPatientId] ASC);
GO

-- Creating primary key on [VisitId] in table 'Visits'
ALTER TABLE [dbo].[Visits]
ADD CONSTRAINT [PK_Visits]
    PRIMARY KEY CLUSTERED ([VisitId] ASC);
GO

-- Creating primary key on [LocationId] in table 'Locations'
ALTER TABLE [dbo].[Locations]
ADD CONSTRAINT [PK_Locations]
    PRIMARY KEY CLUSTERED ([LocationId] ASC);
GO

-- Creating primary key on [ClinicianId] in table 'Clinicians'
ALTER TABLE [dbo].[Clinicians]
ADD CONSTRAINT [PK_Clinicians]
    PRIMARY KEY CLUSTERED ([ClinicianId] ASC);
GO

-- Creating primary key on [NoteId] in table 'Notes'
ALTER TABLE [dbo].[Notes]
ADD CONSTRAINT [PK_Notes]
    PRIMARY KEY CLUSTERED ([NoteId] ASC);
GO

-- Creating primary key on [HealthItemId] in table 'HealthItems'
ALTER TABLE [dbo].[HealthItems]
ADD CONSTRAINT [PK_HealthItems]
    PRIMARY KEY CLUSTERED ([HealthItemId] ASC);
GO

-- Creating primary key on [HealthItemTypeId] in table 'HealthItemTypes'
ALTER TABLE [dbo].[HealthItemTypes]
ADD CONSTRAINT [PK_HealthItemTypes]
    PRIMARY KEY CLUSTERED ([HealthItemTypeId] ASC);
GO

-- Creating primary key on [NoteId] in table 'Notes_VisitNote'
ALTER TABLE [dbo].[Notes_VisitNote]
ADD CONSTRAINT [PK_Notes_VisitNote]
    PRIMARY KEY CLUSTERED ([NoteId] ASC);
GO

-- Creating primary key on [NoteId] in table 'Notes_PatientNote'
ALTER TABLE [dbo].[Notes_PatientNote]
ADD CONSTRAINT [PK_Notes_PatientNote]
    PRIMARY KEY CLUSTERED ([NoteId] ASC);
GO

-- Creating primary key on [NoteId] in table 'Notes_HealthItemNote'
ALTER TABLE [dbo].[Notes_HealthItemNote]
ADD CONSTRAINT [PK_Notes_HealthItemNote]
    PRIMARY KEY CLUSTERED ([NoteId] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [PatientPatientId] in table 'PatientIdentifiers'
ALTER TABLE [dbo].[PatientIdentifiers]
ADD CONSTRAINT [FK_PatientPatientIdentifiers]
    FOREIGN KEY ([PatientPatientId])
    REFERENCES [dbo].[Patients]
        ([PatientId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_PatientPatientIdentifiers'
CREATE INDEX [IX_FK_PatientPatientIdentifiers]
ON [dbo].[PatientIdentifiers]
    ([PatientPatientId]);
GO

-- Creating foreign key on [Location_LocationId] in table 'Visits'
ALTER TABLE [dbo].[Visits]
ADD CONSTRAINT [FK_VisitLocation]
    FOREIGN KEY ([Location_LocationId])
    REFERENCES [dbo].[Locations]
        ([LocationId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_VisitLocation'
CREATE INDEX [IX_FK_VisitLocation]
ON [dbo].[Visits]
    ([Location_LocationId]);
GO

-- Creating foreign key on [VisitClinicians_Clinicians_VisitId] in table 'Clinicians'
ALTER TABLE [dbo].[Clinicians]
ADD CONSTRAINT [FK_VisitClinicians]
    FOREIGN KEY ([VisitClinicians_Clinicians_VisitId])
    REFERENCES [dbo].[Visits]
        ([VisitId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_VisitClinicians'
CREATE INDEX [IX_FK_VisitClinicians]
ON [dbo].[Clinicians]
    ([VisitClinicians_Clinicians_VisitId]);
GO

-- Creating foreign key on [Clinician_ClinicianId] in table 'Notes'
ALTER TABLE [dbo].[Notes]
ADD CONSTRAINT [FK_NotesClinicians]
    FOREIGN KEY ([Clinician_ClinicianId])
    REFERENCES [dbo].[Clinicians]
        ([ClinicianId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_NotesClinicians'
CREATE INDEX [IX_FK_NotesClinicians]
ON [dbo].[Notes]
    ([Clinician_ClinicianId]);
GO

-- Creating foreign key on [VisitId] in table 'Notes_VisitNote'
ALTER TABLE [dbo].[Notes_VisitNote]
ADD CONSTRAINT [FK_VisitVisitNotes]
    FOREIGN KEY ([VisitId])
    REFERENCES [dbo].[Visits]
        ([VisitId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_VisitVisitNotes'
CREATE INDEX [IX_FK_VisitVisitNotes]
ON [dbo].[Notes_VisitNote]
    ([VisitId]);
GO

-- Creating foreign key on [PatientId] in table 'Notes_PatientNote'
ALTER TABLE [dbo].[Notes_PatientNote]
ADD CONSTRAINT [FK_PatientPatientNotes]
    FOREIGN KEY ([PatientId])
    REFERENCES [dbo].[Patients]
        ([PatientId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_PatientPatientNotes'
CREATE INDEX [IX_FK_PatientPatientNotes]
ON [dbo].[Notes_PatientNote]
    ([PatientId]);
GO

-- Creating foreign key on [HealthItemTypeHealthItem_HealthItemType_HealthItemId] in table 'HealthItemTypes'
ALTER TABLE [dbo].[HealthItemTypes]
ADD CONSTRAINT [FK_HealthItemTypeHealthItem]
    FOREIGN KEY ([HealthItemTypeHealthItem_HealthItemType_HealthItemId])
    REFERENCES [dbo].[HealthItems]
        ([HealthItemId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_HealthItemTypeHealthItem'
CREATE INDEX [IX_FK_HealthItemTypeHealthItem]
ON [dbo].[HealthItemTypes]
    ([HealthItemTypeHealthItem_HealthItemType_HealthItemId]);
GO

-- Creating foreign key on [VisitVisitId] in table 'HealthItems'
ALTER TABLE [dbo].[HealthItems]
ADD CONSTRAINT [FK_VisitHealthItem]
    FOREIGN KEY ([VisitVisitId])
    REFERENCES [dbo].[Visits]
        ([VisitId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_VisitHealthItem'
CREATE INDEX [IX_FK_VisitHealthItem]
ON [dbo].[HealthItems]
    ([VisitVisitId]);
GO

-- Creating foreign key on [HealthItemHealthItemId] in table 'Notes_HealthItemNote'
ALTER TABLE [dbo].[Notes_HealthItemNote]
ADD CONSTRAINT [FK_HealthItemHealthItemNote]
    FOREIGN KEY ([HealthItemHealthItemId])
    REFERENCES [dbo].[HealthItems]
        ([HealthItemId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_HealthItemHealthItemNote'
CREATE INDEX [IX_FK_HealthItemHealthItemNote]
ON [dbo].[Notes_HealthItemNote]
    ([HealthItemHealthItemId]);
GO

-- Creating foreign key on [NoteId] in table 'Notes_VisitNote'
ALTER TABLE [dbo].[Notes_VisitNote]
ADD CONSTRAINT [FK_VisitNote_inherits_Note]
    FOREIGN KEY ([NoteId])
    REFERENCES [dbo].[Notes]
        ([NoteId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [NoteId] in table 'Notes_PatientNote'
ALTER TABLE [dbo].[Notes_PatientNote]
ADD CONSTRAINT [FK_PatientNote_inherits_Note]
    FOREIGN KEY ([NoteId])
    REFERENCES [dbo].[Notes]
        ([NoteId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [NoteId] in table 'Notes_HealthItemNote'
ALTER TABLE [dbo].[Notes_HealthItemNote]
ADD CONSTRAINT [FK_HealthItemNote_inherits_Note]
    FOREIGN KEY ([NoteId])
    REFERENCES [dbo].[Notes]
        ([NoteId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------