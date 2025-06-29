USE [master]
GO
/****** Object:  Database [guessgamedb]    Script Date: 08/02/2025 10:50:31 ص ******/
CREATE DATABASE [guessgamedb]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'guessgamedb', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\guessgamedb.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'guessgamedb_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\guessgamedb_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [guessgamedb] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [guessgamedb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [guessgamedb] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [guessgamedb] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [guessgamedb] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [guessgamedb] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [guessgamedb] SET ARITHABORT OFF 
GO
ALTER DATABASE [guessgamedb] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [guessgamedb] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [guessgamedb] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [guessgamedb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [guessgamedb] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [guessgamedb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [guessgamedb] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [guessgamedb] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [guessgamedb] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [guessgamedb] SET  ENABLE_BROKER 
GO
ALTER DATABASE [guessgamedb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [guessgamedb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [guessgamedb] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [guessgamedb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [guessgamedb] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [guessgamedb] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [guessgamedb] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [guessgamedb] SET RECOVERY FULL 
GO
ALTER DATABASE [guessgamedb] SET  MULTI_USER 
GO
ALTER DATABASE [guessgamedb] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [guessgamedb] SET DB_CHAINING OFF 
GO
ALTER DATABASE [guessgamedb] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [guessgamedb] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [guessgamedb] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [guessgamedb] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'guessgamedb', N'ON'
GO
ALTER DATABASE [guessgamedb] SET QUERY_STORE = ON
GO
ALTER DATABASE [guessgamedb] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [guessgamedb]
GO
/****** Object:  Table [dbo].[Admin]    Script Date: 08/02/2025 10:50:31 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Admin](
	[Id] [tinyint] IDENTITY(1,1) NOT NULL,
	[First] [nvarchar](max) NOT NULL,
	[Second] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Words]    Script Date: 08/02/2025 10:50:31 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Words](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Word] [nvarchar](10) NOT NULL,
	[LettersCount] [tinyint] NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Words] ON 
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (1, N'a', 1, N'Identifier of a single thing in English language')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (2, N'i', 1, N'Subject pronoun, used for the one doing the verb')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (3, N'o', 1, N'Used in exclamations, especially when you are expressing strong feelings')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (4, N'ok', 2, N'All right')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (5, N'go', 2, N'To move to somewhere')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (6, N'hi', 2, N'Informal of hello')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (7, N'car', 3, N'A vehicle which usually has 4 wheels')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (8, N'ink', 3, N'Used for writing on papers, old pens used to be filled with it')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (9, N'sun', 3, N'The only star that you see in the day')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (10, N'bear', 4, N'Large heavy animal that has long shaggy hair')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (11, N'myth', 4, N'A traditional or legendary story')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (12, N'rain', 4, N'Water that falls from the sky')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (13, N'sword', 5, N'A weapon with a long blade')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (14, N'venom', 5, N'A toxic material produced by animals')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (15, N'fleet', 5, N'A number of warships under a single command')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (16, N'bridge', 6, N'A structure built over water to cennect two lands')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (17, N'wisdom', 6, N'Knowledge gained through experience')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (18, N'puzzle', 6, N'A game or problem that requires thought')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (19, N'climate', 7, N'The general weather over a long period')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (20, N'beijing', 7, N'The capital of China')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (21, N'council', 7, N'An assembly of persons for consultation or advice')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (22, N'daughter', 8, N'You are her father')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (23, N'deadline', 8, N'A date or time before which something must be done')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (24, N'computer', 8, N'An electronic device that manipulates information or data')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (25, N'adulthood', 9, N'The period in the human lifetime in which human is mature')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (26, N'crocodile', 9, N'A large reptile with a hard skin that lives in and near rivers and lakes')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (27, N'armadillo', 9, N'A small animal with hard bony armor on its head and body')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (28, N'dictionary', 10, N'A type of book which explains the meanings of words')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (29, N'strawberry', 10, N'A juicy red fruit of a low-growing herb')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (30, N'rhinoceros', 10, N'A large animal with thick, gray skin and a horn, or two horns, on its nose')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (31, N'e', 1, N'An abbreviation used with the use of electronic communication, especially the internet')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (32, N's', 1, N'A suffix to make plural forms of nouns')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (33, N'x', 1, N'Used in math to represent a number whose value is not mentioned')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (34, N'pi', 2, N'3.1415926535897932384626433...')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (35, N'up', 2, N'Towards or in a higher position')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (36, N'no', 2, N'Negative response')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (37, N'dam', 3, N'A barrier that is built across a river to stop the water from flowing, used to produce electricity')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (38, N'map', 3, N'A drawing or plan of the earth surface showing countries, towns, etc')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (39, N'ram', 3, N'A computer memory that loses its data when shutting down the device')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (40, N'gold', 4, N'A precious metal used for making coins, jewellery, beautiful objects, etc')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (41, N'jail', 4, N'A building where people are kept as a punishment for a crime they have committed')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (42, N'bomb', 4, N'A weapon that is designed to explode')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (43, N'crawl', 5, N'To move forward on your hands and knees or with your body close to the ground')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (44, N'north', 5, N'The main direction in maps')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (45, N'solid', 5, N'Hard; not in the form of liquid or gas')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (46, N'cactus', 6, N'A plant that grows in hot dry regions, covered with spines')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (47, N'damage', 6, N'Physical harm caused to something which makes it less useful or valuable')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (48, N'meteor', 6, N'A piece of rock from outer space that makes a bright line across the night sky')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (49, N'tornado', 7, N'A voilent storm with very strong winds that move in a circle')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (50, N'compass', 7, N'An instrument for finding direction')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (51, N'android', 7, N'A type of operating system, designed for mobile devices')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (52, N'scorpion', 8, N'A small creature like an insect with eight legs and two front claws')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (53, N'backpack', 8, N'A bag that you carry on your back')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (54, N'kangaroo', 8, N'A large Australian animal with a strong tail and back legs, that moves by jumping')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (55, N'universal', 9, N'Known all around the world')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (56, N'architect', 9, N'A person whose job is designing buildings')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (57, N'australia', 9, N'A large island country and continent in the south-west Pacific Ocean')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (58, N'phoenician', 10, N'An ancient Middle Eastern language')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (59, N'electronic', 10, N'An adjective of a device having or using many small parts, such as microchips')
GO
INSERT [dbo].[Words] ([Id], [Word], [LettersCount], [Description]) VALUES (60, N'portuguese', 10, N'A person from Portugal')
GO
SET IDENTITY_INSERT [dbo].[Words] OFF
GO
/****** Object:  StoredProcedure [dbo].[DeleteWord]    Script Date: 08/02/2025 10:50:31 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[DeleteWord]
@Id int
as
begin
delete from Words where Id = @Id;
end
GO
/****** Object:  StoredProcedure [dbo].[GetAdmin]    Script Date: 08/02/2025 10:50:31 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[GetAdmin]
@First nvarchar(max),
@Second nvarchar(max),
@TrueAdmin bit output
as
begin

declare @RealFirst nvarchar(100)
set @RealFirst = (select First from Admin)

declare @RealSecond nvarchar(100)
set @RealSecond = (select Second from Admin)

if (@First = @RealFirst and @Second = @RealSecond ) set @TrueAdmin = 1
else set @TrueAdmin = 0
select @TrueAdmin as admin
end
GO
/****** Object:  StoredProcedure [dbo].[GetAll]    Script Date: 08/02/2025 10:50:31 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetAll]
@OrderBy nvarchar(50),
@Desc bit
as
begin	
	if(@Desc = 1)
	begin
		if(@OrderBy = 'Id')
			select * from Words order by Id desc;
		else if(@OrderBy = 'Word')
			select * from Words order by Word desc;
		else if(@OrderBy = 'LettersCount')
			select * from Words order by LettersCount desc;
		else if(@OrderBy = 'Description')
			select * from Words order by Description desc;
	end
	else if(@Desc = 0)
	begin
		if(@OrderBy = 'Id')
			select * from Words order by Id;
		else if(@OrderBy = 'Word')
			select * from Words order by Word;
		else if(@OrderBy = 'LettersCount')
			select * from Words order by LettersCount;
		else if(@OrderBy = 'Description')
			select * from Words order by Description;
	end
end
GO
/****** Object:  StoredProcedure [dbo].[GetPage]    Script Date: 08/02/2025 10:50:31 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[GetPage]
@OrderBy nvarchar(50),
@PageNumber int,
@PageSize int,
@Desc bit
as
begin
	if(@Desc = 1)
	begin
		if(@OrderBy = 'Id')
			select * from Words order by Id desc OFFSET (@PageSize * (@PageNumber - 1)) ROWS FETCH NEXT @PageSize ROWS ONLY;
		else if(@OrderBy = 'Word')
			select * from Words order by Word desc OFFSET (@PageSize * (@PageNumber - 1)) ROWS FETCH NEXT @PageSize ROWS ONLY;
		else if(@OrderBy = 'LettersCount')
			select * from Words order by LettersCount desc OFFSET (@PageSize * (@PageNumber - 1)) ROWS FETCH NEXT @PageSize ROWS ONLY;
		else if(@OrderBy = 'Description')
			select * from Words order by Description desc OFFSET (@PageSize * (@PageNumber - 1)) ROWS FETCH NEXT @PageSize ROWS ONLY;
	end
	else
	begin
		if(@OrderBy = 'Id')
			select * from Words order by Id OFFSET (@PageSize * (@PageNumber - 1)) ROWS FETCH NEXT @PageSize ROWS ONLY;
		else if(@OrderBy = 'Word')
			select * from Words order by Word OFFSET (@PageSize * (@PageNumber - 1)) ROWS FETCH NEXT @PageSize ROWS ONLY;
		else if(@OrderBy = 'LettersCount')
			select * from Words order by LettersCount OFFSET (@PageSize * (@PageNumber - 1)) ROWS FETCH NEXT @PageSize ROWS ONLY;
		else if(@OrderBy = 'Description')
			select * from Words order by Description OFFSET (@PageSize * (@PageNumber - 1)) ROWS FETCH NEXT @PageSize ROWS ONLY;
	end
end
GO
/****** Object:  StoredProcedure [dbo].[GetRandomWord]    Script Date: 08/02/2025 10:50:31 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[GetRandomWord] 
@NumberOfLetters tinyint
as
select top 1 * from Words where LettersCount = @NumberOfLetters order by  NEWID()
GO
/****** Object:  StoredProcedure [dbo].[GetWordsByLettersCount]    Script Date: 08/02/2025 10:50:31 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[GetWordsByLettersCount]
@LettersCount tinyint,
@OrderBy nvarchar(50),
@Desc bit
as
begin	
	if(@Desc = 1)
	begin
		if(@OrderBy = 'Id')
			select * from Words where LettersCount = @LettersCount order by Id desc;
		else if(@OrderBy = 'Word')
			select * from Words where LettersCount = @LettersCount order by Word desc;
		else if(@OrderBy = 'LettersCount')
			select * from Words where LettersCount = @LettersCount order by LettersCount desc;
		else if(@OrderBy = 'Description')
			select * from Words where LettersCount = @LettersCount order by Description desc;
	end
	else if(@Desc = 0)
	begin
		if(@OrderBy = 'Id')
			select * from Words where LettersCount = @LettersCount order by Id;
		else if(@OrderBy = 'Word')
			select * from Words where LettersCount = @LettersCount order by Word;
		else if(@OrderBy = 'LettersCount')
			select * from Words where LettersCount = @LettersCount order by LettersCount;
		else if(@OrderBy = 'Description')
			select * from Words where LettersCount = @LettersCount order by Description;
	end
end
GO
/****** Object:  StoredProcedure [dbo].[Post]    Script Date: 08/02/2025 10:50:31 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[Post]
@Word nvarchar(10),
@LettersCount tinyint,
@Description nvarchar(100)
as
begin
insert into Words (Word, LettersCount, Description) values (@Word,@LettersCount,@Description);
end
GO
/****** Object:  StoredProcedure [dbo].[Put]    Script Date: 08/02/2025 10:50:31 ص ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[Put]
@Id int,
@Word nvarchar(10),
@LettersCount tinyint,
@Description nvarchar(100)
as
begin
update Words set Word = @Word, LettersCount = @LettersCount, Description = @Description where Id = @Id;
end
GO
USE [master]
GO
ALTER DATABASE [guessgamedb] SET  READ_WRITE 
GO
