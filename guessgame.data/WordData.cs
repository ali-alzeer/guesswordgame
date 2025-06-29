using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace guessgame.data
{
    public class WordDto
    {
        public string Word { get; set; } = "";
        public string Description { get; set; } = "";

        public WordDto(string word, string description)
        {
            this.Word = word;
            this.Description = description;
        }

    }

    public class WordModel
    {
        public int Id { get; set; }
        public string Word { get; set; } = "";
        public int LettersCount { get; set; }
        public string Description { get; set; } = "";

        public WordModel(int Id, string word, int lettersCount, string description)
        {
            this.Id = Id;
            this.Word = word;
            this.LettersCount = lettersCount;
            this.Description = description;
        }
    }

    public class WordData
    {
        public static WordDto GetRandomWord(byte NumberOfLetters)
        {
            try
            {
                using (var connection = new SqlConnection(Settings.GetConnetionString()))
                using (var command = new SqlCommand("GetRandomWord", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@NumberOfLetters ", NumberOfLetters);

                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new WordDto
                            (
                                reader.GetString(reader.GetOrdinal("Word")),
                                reader.GetString(reader.GetOrdinal("Description"))
                            );
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        public async static Task<List<WordModel>> GetAll(string OrderBy, bool Desc)
        {
            try
            {
                var WordList = new List<WordModel>();

                using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("GetAll", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@OrderBy", OrderBy);
                        cmd.Parameters.AddWithValue("@Desc", Desc);

                        conn.Open();

                        await using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                WordList.Add(new WordModel
                                (
                                    reader.GetInt32(reader.GetOrdinal("Id")),
                                    reader.GetString(reader.GetOrdinal("Word")),
                                    reader.GetByte(reader.GetOrdinal("LettersCount")),
                                    reader.GetString(reader.GetOrdinal("Description"))
                                ));
                            }
                        }
                    }


                    return WordList;
                }
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        public async static Task<List<WordModel>> GetPage(string OrderBy, int PageNumber, int PageSize, bool Desc)
        {
            try
            {
                var WordList = new List<WordModel>();

                using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("GetPage", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@OrderBy", OrderBy);
                        cmd.Parameters.AddWithValue("@PageNumber", PageNumber);
                        cmd.Parameters.AddWithValue("@PageSize", PageSize);
                        cmd.Parameters.AddWithValue("@Desc", Desc);

                        conn.Open();

                        await using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                WordList.Add(new WordModel
                                (
                                    reader.GetInt32(reader.GetOrdinal("Id")),
                                    reader.GetString(reader.GetOrdinal("Word")),
                                    reader.GetByte(reader.GetOrdinal("LettersCount")),
                                    reader.GetString(reader.GetOrdinal("Description"))
                                ));
                            }
                        }
                    }


                    return WordList;
                }
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        public async static Task<List<WordModel>> GetWordsByLettersCount(byte LettersCount, string OrderBy, bool Desc)
        {
            try
            {
                var WordList = new List<WordModel>();

                using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("GetWordsByLettersCount", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@LettersCount", LettersCount);
                        cmd.Parameters.AddWithValue("@OrderBy", OrderBy);
                        cmd.Parameters.AddWithValue("@Desc", Desc);

                        conn.Open();

                        await using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                WordList.Add(new WordModel
                                (
                                    reader.GetInt32(reader.GetOrdinal("Id")),
                                    reader.GetString(reader.GetOrdinal("Word")),
                                    reader.GetByte(reader.GetOrdinal("LettersCount")),
                                    reader.GetString(reader.GetOrdinal("Description"))
                                ));
                            }
                        }
                    }


                    return WordList;
                }
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        public async static Task<int> Post(string Word, string Description)
        {
            try
            {
                var RowsAffected = 0;

                await using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("Post", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Word", Word);
                        cmd.Parameters.AddWithValue("@LettersCount", Word.Length);
                        cmd.Parameters.AddWithValue("@Description", Description);

                        conn.Open();

                        RowsAffected = cmd.ExecuteNonQuery();

                    }


                    return RowsAffected;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }

        }

        public async static Task<int> Put(int Id, string Word, string Description)
        {
            try
            {
                var RowsAffected = 0;

                await using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("Put", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", Id);
                        cmd.Parameters.AddWithValue("@Word", Word);
                        cmd.Parameters.AddWithValue("@LettersCount", Word.Length);
                        cmd.Parameters.AddWithValue("@Description", Description);

                        conn.Open();

                        RowsAffected = cmd.ExecuteNonQuery();

                    }


                    return RowsAffected;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }

        }

        public async static Task<int> DeleteWord(int Id)
        {
            try
            {
                var RowsAffected = 0;

                await using (SqlConnection conn = new SqlConnection(Settings.GetConnetionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("DeleteWord", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", Id);

                        conn.Open();

                        RowsAffected = cmd.ExecuteNonQuery();

                    }


                    return RowsAffected;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }

        }
    }
}
