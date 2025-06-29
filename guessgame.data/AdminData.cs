using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace guessgame.data
{
    public class AdminData
    {
        public class Admin
        {
            public string First { get; set; } = "";
            public string Second { get; set; } = "";

            public Admin(string first, string second)
            {
                this.First = first;
                this.Second = second;
            }
        }
        public static bool GetAdmin(Admin admin)
        {
            using (var connection = new SqlConnection(Settings.GetConnetionString()))
            using (var command = new SqlCommand("GetAdmin", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@First", admin.First);
                command.Parameters.AddWithValue("@Second", admin.Second);
                command.Parameters.AddWithValue("@TrueAdmin", 1);

                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        bool realAdmin = reader.GetBoolean(reader.GetOrdinal("admin"));
                        return realAdmin;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
        }

    }
}
